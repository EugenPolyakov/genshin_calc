import { REAL_TOTAL } from "../db/Constants";
import { DB } from "../db/DB";
import { Artifact } from "./Artifact.js";
import { filterPostEffectTreeByStats } from "./Build/Data.js";
import { Condition } from "./Condition.js";
import { CBlock } from "./Feature2/Compile/Types.js";
import { FeatureCompiler } from "./Feature2/Compiler.js";
import { isPercent, Stats } from "./Stats.js";

export const FEATURE_TYPE_INDEX = {
    'normal': 0,
    'crit': 1,
    'average': 2,
};

const DYNAMIC_STATS = ['crit_value'];

export class CalcBuildFastPermutations {
    constructor(data) {
        this.build = data.build;
        this.artifacts = data.artifacts;
        this.featureName = data.featureName;
        this.settings = data.settings;
    }

    prepare() {
        this.buildData = this.build.getBuildData();

        // ???
        let baseConditions = this.build.getActiveConditions(this.buildData.settings);
        Condition.setCommonValues(this.buildData.settings, baseConditions);

        this.prepareArtifactSets();
        this.prepareDynamicStats();

        let compilerOpts = {
            // dontProcessTree: 1,
            ignoreSideEffects: 1,
            staticStats: [],
        };

        this.featureVariants = {};
        this.usedStats = new Set();
        let variationData = [];

        let statFilterUsedStats = new Set();
        for (let name of Object.keys(this.settings.stats || {})) {
            if (!this.settings.stats[name])
                continue;
            name = name.replace('_min', '').replace('_max', '');
            statFilterUsedStats.add(name);
            statFilterUsedStats.add(name +'_base');
            if (REAL_TOTAL.includes(name)) {
                statFilterUsedStats.add(name +'_percent');
            }
        }

        this.usedStats = this.usedStats.union(statFilterUsedStats);

        for (let variant of this.getVariations()) {
            let vBuild = this.build.clone();
            let setSettings = Object.assign({}, this.settings.sets_settings);
            let variantNames = [];
            let artSetIds = [];

            for (let vItem of variant) {
                if (vItem.setId) {
                    variantNames.push(vItem.name);
                    setSettings[ Artifact.settingName(vItem.setId) ] = vItem.pieces;
                    for (let i = 0; i < vItem.pieces; ++i) {
                        artSetIds.push(vItem.setId);
                    }
                }
            }

            for (let slot of DB.Artifacts.Slots.getKeys()) {
                let setId = artSetIds.pop();
                if (!setId) break;

                let art = new Artifact(5, 20, slot, setId, '');
                vBuild.setArtifact(art);
            }

            let variandId = variantNames.sort().join('-') || 'default';
            vBuild.artifacts.modifySettings(setSettings);
            let vBuildData = vBuild.getBuildData();
            this.addDynamicStats(vBuildData.getActivePostEffectsTree());
            let feature = vBuild.getFeatureByName(this.featureName);

            // FIXME rotation detect
            if (feature.items) {
                this.addDynamicStatsFromItems(vBuildData, feature.items);
            }

            variationData.push({
                variandId: variandId,
                feature: feature,
                buildData: vBuildData,
            });
        }

        for (let item of variationData) {
            let activePostTree = item.buildData.postEffectTreeByPriority();
            let postTrees = this.filterPostEffects(item.feature, item.buildData);

            let tree = item.feature.getTree(item.buildData, compilerOpts);
            let compiler = new FeatureCompiler(tree, postTrees);

            let usedStats = compiler.usedStats;
            this.usedStats = this.usedStats.union(new Set(usedStats));
            usedStats = usedStats.concat(statFilterUsedStats);
            item.buildData.stats.ensure(usedStats);

            compilerOpts.staticStats = this.makeStaticStats(usedStats);

            compiler.prepare(item.buildData, compilerOpts);
            compiler.compile(compilerOpts);

            compiler.checkFunc = makeStatCheckFunc(this.settings.stats, activePostTree);

            this.featureVariants[item.variandId] = compiler;
        }

        this.usedStats.delete('crit_value');
        this.usedStatsArray = Array.from(this.usedStats);
        this.buildData.stats.truncate(this.usedStatsArray);
        this.buildData.stats.ensure(this.usedStatsArray);
    }

    log(msg, toString) {
        if (typeof __DEVEL__ !== 'undefined' && __DEVEL__) {
            if (toString)
                console.log(JSON.stringify(msg));
            else
                console.log(msg);
        }
    }

    getVariations() {
        let usedVariations = {};
        let variations = [];

        for (let setId of Object.keys(this.setData)) {
            for (let pieces of Object.keys(this.setData[setId])) {
                let data = this.setData[setId][pieces];
                if (data.variation && !usedVariations[data.variation]) {
                    usedVariations[data.variation] = 1;
                    variations.push({
                        name: data.variation,
                        setId: setId,
                        pieces: parseInt(pieces),
                    });
                }
            }
        }

        let variationCombinations = [
            [{name: 'default'}],
        ];

        for (let i = 0; i < variations.length; ++i) {
            let item1 = variations[i];
            variationCombinations.push([item1]);

            for (let j = i + 1; j < variations.length; ++j) {
                let item2 = variations[j];
                if (item1.pieces + item2.pieces <= 5) {
                    variationCombinations.push([item1, item2]);
                }
            }
        }

        return variationCombinations;
    }

    filterPostEffects(feature, buildData) {
        if (feature.isRotation()) {
            return [];
        }

        let postItems = buildData.postEffectTreeByPriority();
        buildData.postEffects = [];
        let result = [];

        for (let items of postItems) {
            let tree = feature.getTree(buildData);
            let compiler = new FeatureCompiler(tree, result);
            let usedStats = compiler.usedStats;

            for (let item of items) {
                for (let stat of item.getAssignedStats()) {
                    if (usedStats.includes(stat)) {
                        result.push(item);
                    }
                }
            }
        }

        return result;
    }

    prepareArtifactSets() {
        let setPieces = {};
        for (let art of this.artifacts) {
            if (!setPieces[art.set]) {
                setPieces[art.set] = {};
            }
            setPieces[art.set][art.slot] = 1;
        }

        let blockedSlots = 0;
        for (let s in this.settings.setMinValues)
            blockedSlots += this.settings.setMinValues[s];

        let setMaxPieces = {};
        for (let setName of Object.keys(setPieces)) {
            if ((this.settings.setMinValues[setName] && Object.keys(setPieces[setName]).length >= this.settings.setMinValues[setName])
                    || !this.settings.setMinValues[setName]) {
                setMaxPieces[setName] = Math.min(Object.keys(setPieces[setName]).length, 5 - blockedSlots + (this.settings.setMinValues[setName] || 0));
                if (this.settings.setMaxValues[setName])
                    setMaxPieces[setName] = Math.min(setMaxPieces[setName], this.settings.setMaxValues[setName] - 1);
            } else
                setMaxPieces[setName] = 0;
        }

        this.setData = {};
        // let baseSettings = Object.assign({}, this.buildData.settings, this.settings.sets_settings);
        let baseSettings = Object.assign({}, this.buildData.settings);

        // let artPostItems = DB.Buffs.get('Artifacts').getPostEffects();
        // let postArtNames = [];
        // for (let item of artPostItems) {
        //     if (item.params.suggesterPieces) {
        //         postArtNames.push(item.params.suggesterPieces);
        //     }
        // }

        let defaultStats = new Stats();
        let defaultCond = this.build.buffs.buffs.items.Artifacts.getConditions();
        for (let cond of defaultCond) {
            let data = cond.getActualStats(baseSettings);
            defaultStats.concat(data);
        }

        let activePostEffects = this.buildData.getActivePostEffects().length;

        for (let setId of DB.Artifacts.Sets.getKeys()) {
            let set = DB.Artifacts.Sets.get(setId);
            let bonuses = set.getConditionsByPieces();

            let setStats = new Stats();
            let setPostStats;
            let setTotalSettings = {};
            let artPiecesName = Artifact.settingNameShort(setId);
            let maxPieces = setMaxPieces[setId] || 0;

            let buildData = this.build.getBuildData();
            let prevActivePostEffects = activePostEffects;
            let featureVariation = '';

            for (let pieces = 1; pieces < bonuses.length; ++pieces) {
                if (pieces > maxPieces) {
                    break
                }

                buildData.addSettings({[Artifact.settingName(setId)]: pieces});

                let conditions = bonuses[pieces];
                let pieceSettings = {};

                if (conditions.length) {
                    pieceSettings = Condition.allConditionsOn(conditions, baseSettings);
                    for (let key of Object.keys(pieceSettings)) {
                        if (baseSettings.hasOwnProperty(key)) {
                            pieceSettings[key] = baseSettings[key];
                        }
                    }
                    let localSettings = Object.assign({}, pieceSettings, baseSettings);

                    let stats = new Stats();

                    conditions = conditions.concat(defaultCond);
                    for (let cond of conditions) {
                        let data = cond.getActualStats(localSettings);
                        stats.concat(data);
                    }

                    stats.exclude(defaultStats);

                    setStats.concat(stats);
                    Object.assign(setTotalSettings, pieceSettings);
                    buildData.addSettings(pieceSettings);
                }

                // change variation if new togglable condition or post effect appears
                let curActivePostEffects = buildData.getActivePostEffects().length;
                let curSerializableConditions = conditions.filter((i) => {return i.isSerializable()}).length
                if (curActivePostEffects > prevActivePostEffects) {
                    prevActivePostEffects = curActivePostEffects;
                    featureVariation = artPiecesName + pieces;
                } else if (curSerializableConditions) {
                    featureVariation = artPiecesName + pieces;
                }

                if (Object.keys(setStats).length || setPostStats || featureVariation) {
                    let s = new Stats(setStats);
                    s.processPercent();

                    if (!this.setData[setId]) {
                        this.setData[setId] = {};
                    }

                    this.setData[setId][pieces] = {
                        stats: s,
                        variation: featureVariation,
                        concatFunc: s.getConcatFunc(),
                    };
                }
            }
        }
    }

    prepareDynamicStats() {
        let stats = {};

        for (let stat of DB.Artifacts.Mainstats.getKeys()) {
            stats[stat] = 1;
        }

        for (let stat of DB.Artifacts.Substats.getKeys()) {
            stats[stat] = 1;
        }

        for (let setId of Object.keys(this.setData)) {
            for (let pieces of Object.keys(this.setData[setId])) {
                let setStats = this.setData[setId][pieces].stats;
                for (let stat of Object.keys(setStats)) {
                    if (/^text_/.test(stat)) continue;
                    stats[stat] = 1;
                }
            }
        }

        this.dynamicStats = Object.keys(stats);
    }

    addDynamicStats(items) {
        for (let item of items) {
            if (item.stat && !this.dynamicStats.includes(item.stat)) {
                this.dynamicStats.push(item.stat);
            }
        }
    }

    addDynamicStatsFromItems(buildData, items) {
        for (let item of items) {

            if (item.postEffects) {
                for (let post of item.postEffects) {
                    if (!post.getTree) continue;
                    this.addDynamicStats(post.getTree(buildData));
                }
            }

            if (item.items) {
                this.addDynamicStatsFromItems(buildData, item.items);
            }

            if (item.conditions) {
                this.addDynamicStatsFromItems(buildData, item.conditions);
            }
        }
    }

    makeStaticStats(usedStats) {
        let result = [];

        for (let stat of usedStats) {
            if (this.dynamicStats.includes(stat)) continue;
            if (DYNAMIC_STATS.includes(stat)) continue;
            result.push(stat);
        }

        return result;
    }
}

function makeStatCheckFunc(settings, post) {
    let [parts, usedStats] = makeStatCheckParts(settings);
    if (parts.length == 0) return;

    let code = parts.join(';\n');

    let filtered = filterPostEffectTreeByStats(post, usedStats);
    if (filtered) {
        let [assign, revert] = FeatureCompiler.postTreeBlocks(filtered);
        let before = getBlockCode(assign);
        let after = getBlockCode(revert);

        code = before +';\n' + code + ';\n'+ after;
    }

    return Function('stats', code + ';\nreturn true');
}

function makeStatCheckParts(settings) {
    let parts = [];
    let usedStats = [];

    for (let name of Object.keys(settings)) {
        let [str, stat, op] = /^(.*)_(min|max)$/.exec(name);
        let value = settings[name];
        if (!value) continue;

        if (isPercent(stat)) {
            value /= 100;
        }

        let statStr;
        if (REAL_TOTAL.includes(stat)) {
            statStr = 'stats.'+ stat +'_base * (1 + stats.'+ stat + '_percent) + stats.'+ stat;
        } else {
            statStr = 'stats.'+ stat +'_base + stats.'+ stat;
        }

        if (!usedStats.includes(stat)) {
            usedStats.push(stat);
            usedStats.push(stat + '_base');

            if (REAL_TOTAL.includes(stat)) {
                usedStats.push(stat + '_percent');
            }
        }

        if (op == 'max') {
            parts.push('if ('+ statStr +' > '+ value +') {return false}')
        } else if (op == 'min') {
            parts.push('if ('+ statStr +' < '+ value +') {return false}')
        }
    }
    return [parts, usedStats];
}

function getBlockCode(items) {
    let compiler = new FeatureCompiler(new CBlock(items, {noReturn: true}), []);
    compiler.prepare();
    return compiler.getCode();
}
