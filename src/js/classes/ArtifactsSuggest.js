import { REAL_TOTAL } from "../db/Constants";
import { Artifact } from "./Artifact";
import { filterPostEffectTreeByStats } from "./Build/Data";
import { Condition } from "./Condition";
import { CBlock } from "./Feature2/Compile/Types";
import { FeatureCompiler } from "./Feature2/Compiler";
import { isPercent, Stats } from "./Stats";

const FEATURE_TYPE_INDEX = {
    'normal': 0,
    'crit': 1,
    'average': 2,
};

const DYNAMIC_STATS = ['crit_value'];

export class ArtifactsSuggest {
    constructor(data) {
        this.build = data.build;
        this.artifacts = data.artifacts;
        this.featureName = data.featureName;
        this.featureType = data.featureType;
        this.settings = data.settings;
        this.skippedOnPrepare = 0;
        this.limit = data.limit || 20;
    }

    prepare() {
        this.currentArts = this.build.getArtifacts();
        this.build.clearArtifacts();
        // this.addArtifactPostSettings();
        this.build.artifacts.modifySettings(this.settings.sets_settings);

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
        let arr = Array.from(this.usedStats);
        this.buildData.stats.truncate(arr);
        this.buildData.stats.ensure(arr);

        this.prepareArtifacts();
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

    logExcluded(expluded, because, key, setStats) {
        if (typeof __DEVEL__ !== 'undefined' && __DEVEL__) {
            console.log('--------');
            console.log('excluded by key: ' + key);
            console.log("art: " + JSON.stringify(expluded.calculated) + "set: " + JSON.stringify(setStats));
            console.log('because:');
            console.log(JSON.stringify(because.calculated));
        }
    }

    tryExcludeArtifacts(list, baseArt, base, cmp, setDataStats) {
        let skiped = 0;
        for (let l = list.length - 1; l >= 0; l--) {
            if (cmp(baseArt.calculated, list[l].calculated, setDataStats[list[l].set])) {
                this.logExcluded(list[l], baseArt, base, setDataStats[list[l].set]);
                list.splice(l, 1);
                skiped++;
            }
        }
        return skiped;
    }

    prepareArtifacts() {
        this.slots = {
            flower: [],
            plume: [],
            sands: [],
            goblet: [],
            circlet: [],
        };
        let skiped = {
            flower: 0,
            plume: 0,
            sands: 0,
            goblet: 0,
            circlet: 0,
        };
        let filteredSlots = {
            flower: [],
            plume: [],
            sands: [],
            goblet: [],
            circlet: [],
        };
        this.setNames = {};
        this.totalCombinations = 1;
        let actualCombinations = 1;
        let setDataStats = {};

        for (let setId in this.setData) {
            setDataStats[setId] = new Stats(this.setData[setId][Math.max(...Object.keys(this.setData[setId]))].stats);
        }

        let canEmblem4 = this.setData['EmblemofSeveredFate'] && Math.max(...Object.keys(this.setData['EmblemofSeveredFate'])) >= 4;
        let arr = Array.from(this.usedStats);
        for (let art of this.artifacts) {
            art.calcCache(arr);

            //фильтрация работает пока нет артефакта с пост-эффектами которые увеличивают обычные хар-ки
            //если появится такой набор артефактов, то все эти оптимизации идут нафиг, т.к. любой кусок может зарешать
            //Эмблема всегда добавляется если учитывается урон Взрыва стихии, т.к. на данном этапе невозможно просчитать насколько артефакт будет полезен
            //подобный механизм нужно делать для всех артефактов с постэффектами
            //так же добавляем все артефакты из наборов которые требует пользователь, чтобы можно было хоть что-то подобрать
            if ((canEmblem4 && this.usedStats.has("dmg_burst") && art.set == "EmblemofSeveredFate") || this.settings.setMinValues[art.set]) {
                art.concatFunc = art.calculated.getConcatFunc();
                this.setNames[art.set] = 1;
                this.slots[art.slot].push(art);
                if (!setDataStats[art.set])
                    setDataStats[art.set] = new Stats();
            } else if (!art.calculated.isEmpty() || (setDataStats[art.set] && setDataStats[art.set].includesAny(this.usedStats))) {
                filteredSlots[art.slot].push(art);
                if (!setDataStats[art.set])
                    setDataStats[art.set] = new Stats();
            } else {
                skiped[art.slot]++;
            }
        }

        let base_params = {
            atk: this.buildData.stats['atk_base'],
            def: this.buildData.stats['def_base'],
            hp: this.buildData.stats['hp_base'],
        };
        let mapComparer = new Map();
        for (let slot of Object.keys(this.slots)) {
            let artsParams = new Map();
            prepareArtList(mapComparer, artsParams, this.slots[slot], setDataStats, base_params, this.usedStats);
            let keyList = Array.from(artsParams.keys()).sort((a, b) => b.split(';').length - a.split(';').length);
            truncateArtList(mapComparer, artsParams, setDataStats, keyList, this.logExcluded, skiped, slot);
            this.slots[slot] = Array.from(artsParams.values()).flat();

            artsParams = new Map();
            prepareArtList(mapComparer, artsParams, filteredSlots[slot], setDataStats, base_params, this.usedStats);

            keyList = Array.from(artsParams.keys()).sort((a, b) => b.split(';').length - a.split(';').length);
            //исключим все арты которые хуже тех что мы по любому взяли в поиск
            for (let art of this.slots[slot]) {
                /**
                 * @type {Set}
                */
                let baseSet = this.usedStats.intersection(new Set(Object.keys(art.calculated).concat(Object.keys(setDataStats[art.set])).map(x => x.endsWith('_percent') ? x.slice(0, -8) : x)));
                let base = [...baseSet].sort().join(';');
                for (let j = 0, len = keyList.length; j < len; j++)
                    if (baseSet.isSupersetOf(new Set(keyList[j].split(';')))) {
                        let cmp = mapComparer.get(keyList[j]);
                        let list = artsParams.get(keyList[j]);
                        skiped[slot] += this.tryExcludeArtifacts(list, art, base, cmp, setDataStats);
                    }
            }

            truncateArtList(mapComparer, artsParams, setDataStats, keyList, this.logExcluded, skiped, slot);

            for (let i = 0, len = keyList.length; i < len; i++) {
                let base = keyList[i];
                let baseSet = new Set(base.split(';'));
                if (artsParams.get(base).length > 0)
                    for (let j = i + 1; j < len; j++)
                        if (baseSet.isSupersetOf(new Set(keyList[j].split(';')))) {
                            let cmp = mapComparer.get(keyList[j]);
                            let list = artsParams.get(keyList[j]);
                            let superset = artsParams.get(base);
                            for (let k = 0, lenSup = superset.length; k < lenSup; k++) {
                                skiped[slot] += this.tryExcludeArtifacts(list, superset[k], base, cmp, setDataStats);
                            }
                        }
            }

            for (let art of Array.from(artsParams.values()).flat()) {
                art.concatFunc = art.calculated.getConcatFunc();
                this.setNames[art.set] = 1;
                this.slots[slot].push(art);
            }
        }

        this.log("skiped arts count: " + (skiped.flower + skiped.plume + skiped.sands + skiped.goblet + skiped.circlet));
        for (let slot of Object.keys(this.slots)) {
            if (this.slots[slot].length == 0) {
                let curArt = this.currentArts[slot];
                if (curArt) {
                    curArt.calcCache(arr);
                    this.slots[slot].push(curArt);
                } else {
                    let emptyArtifact = new Artifact(5, 0, slot, 'none', 'none');
                    emptyArtifact.isEmpty = true;
                    emptyArtifact.calculated = new Stats();
                    emptyArtifact.concatFunc = emptyArtifact.calculated.getConcatFunc();
                    this.slots[slot].push(emptyArtifact);
                }
            }

            this.totalCombinations *= this.slots[slot].length + skiped[slot];
            actualCombinations *= this.slots[slot].length;
        }

        this.skippedOnPrepare = this.totalCombinations - actualCombinations;
        this.log("skiped combinations count: " + this.skippedOnPrepare);
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

    getResult(callback) {
        let combination;
        let results = [];
        let minimalValue = 0;
        this.currentCombinations = this.skippedOnPrepare;
        this.skippedCombinations = this.skippedOnPrepare;

        let artifacts;
        let artSets;
        let artStats;
        let featureData;
        let value;
        let featureIndex = FEATURE_TYPE_INDEX[this.featureType];

        let initialStatFunc = this.buildData.stats.getSetFunc();
        let checkFunc = generateCheckFunc(this.settings);
        let requireFunc = generateRequireFunc(this.settings);
        let generator = artifactCombinations(checkFunc, requireFunc, this.setNames, this.slots, (val) => {
            this.currentCombinations += val;
            this.skippedCombinations += val;
            if (callback && this.currentCombinations % 50000 == 0 || val > 50000) {
                callback(this.currentCombinations, this.totalCombinations, this.skippedCombinations);
            }
        });

        callback(this.currentCombinations, this.totalCombinations, this.skippedCombinations);

        while (combination = generator.next()) {
            if (combination.done) {
                break;
            }

            ++this.currentCombinations;
            artSets = {};
            artifacts = combination.value;
            artStats = new Stats();
            initialStatFunc(artStats);

            for (let item of artifacts) {
                if (item) {
                    artSets[item.set] = (artSets[item.set] || 0) + 1;
                    item.concatFunc(artStats);
                }
            }

            let variation = [];
            for (let id in artSets) {
                let sdata = this.setData[id] && this.setData[id][artSets[id]];
                if (!sdata) continue;

                if (sdata.variation) {
                    variation.push(sdata.variation)
                }

                if (sdata.concatFunc) {
                    sdata.concatFunc(artStats);
                }
            }
            variation = variation.sort().join('-') || 'default';

            let compiler = this.featureVariants[variation];

            // check for stat requirements
            if (!compiler.checkFunc || compiler.checkFunc(artStats)) {
                this.buildData.stats = artStats;
                featureData = compiler.execute(this.buildData);
                value = featureData[featureIndex] || 0;

                if (value >= minimalValue) {
                    results.push({
                        value: value,
                        artifacts: artifacts,
                    });
                }
            } else {
                ++this.skippedCombinations;
            }

            if (callback && this.currentCombinations % 50000 == 0) {
                if (results.length > this.limit * 100) {
                    truncateResults(results, this.limit);
                    minimalValue = results[results.length - 1].value;
                }

                callback(this.currentCombinations, this.totalCombinations, this.skippedCombinations);
            }
        }

        callback(this.currentCombinations, this.totalCombinations, this.skippedCombinations);
        truncateResults(results, this.limit);
        removeEmptyArtifacts(results);

        return results;
    }


}

function* artifactCombinations(checkFunc, requireFunc, setNames, slots, skipCallback) {
    let s1, s2, s3, s4, s5;

    let sets = {};
    for (let name of Object.keys(setNames)) {
        sets[name] = 0;
    }

    let skip5 = slots.circlet.length;
    let skip4 = skip5 * slots.goblet.length;
    let skip3 = skip4 * slots.sands.length;

    for (let i1 = 0; i1 < slots.flower.length; --sets[s1.set], ++i1) {
        s1 = slots.flower[i1];
        ++sets[s1.set];

        for (let i2 = 0; i2 < slots.plume.length; --sets[s2.set], ++i2) {
            s2 = slots.plume[i2];
            ++sets[s2.set];

            if (checkFunc(sets)) {
                skipCallback(skip3);
                continue;
            }

            for (let i3 = 0; i3 < slots.sands.length; --sets[s3.set], ++i3) {
                s3 = slots.sands[i3];
                ++sets[s3.set];

                if (checkFunc(sets)) {
                    skipCallback(skip4);
                    continue;
                }

                for (let i4 = 0; i4 < slots.goblet.length; --sets[s4.set], ++i4) {
                    s4 = slots.goblet[i4];
                    ++sets[s4.set];

                    if (checkFunc(sets)) {
                        skipCallback(skip5);
                        continue;
                    }

                    for (let i5 = 0; i5 < slots.circlet.length; --sets[s5.set], ++i5) {
                        s5 = slots.circlet[i5];
                        ++sets[s5.set];

                        if (checkFunc(sets) || requireFunc(sets)) {
                            skipCallback(1);
                            continue;
                        }

                        yield [s1, s2, s3, s4, s5];
                    }
                }
            }
        }
    }
}

function prepareArtList(mapComparer, artsParams, artList, setDataStats, base_params, usedStats) {
    for (let art of artList) {
        /**
         * @type {Set}
        */
        let prm = usedStats.intersection(new Set(Object.keys(art.calculated).concat(Object.keys(setDataStats[art.set])).map(x => x.endsWith('_percent') ? x.slice(0, -8) : x)));
        //добавляем параметры набора, таким образом бонус от знати на урон взрыва, если он нужен будет сравниваться только между знатью, т.к. в такой ускоренной проверке мы не можем его отсеять
        let arrPrm = [...prm].sort().join(';');
        if (!artsParams.has(arrPrm)) {
            artsParams.set(arrPrm, []);
            if (!mapComparer.has(arrPrm)) {
                let code = [];
                //бонус набора учитываем только у исключаемого артефакта, что бы не выкинуть потенциального кандидата для набора
                //т.е. проверяем что A лучше B даже с учётом набора к которому относится B
                for (let st of prm)
                    if (base_params[st])
                        //code.push(`(a.get('${st}') + aSet.get('${st}') + (a.get('${st}_percent') + aSet.get('${st}_percent')) * ${base_params[st]} >= b.get('${st}') + bSet.get('${st}') + (b.get('${st}_percent') + bSet.get('${st}_percent')) * ${base_params[st]})`);
                        code.push(`(a.get('${ st }') + a.get('${ st }_percent') * ${ base_params[st] } >= b.get('${ st }') + bSet.get('${ st }') + (b.get('${ st }_percent') + bSet.get('${ st }_percent')) * ${ base_params[st] })`);
                    else
                        //code.push(`(a.${st} + aSet.get('${st}') >= b.${st} + bSet.get('${st}'))`);
                        code.push(`(a.${ st } >= b.${ st } + bSet.get('${ st }'))`);
                mapComparer.set(arrPrm, Function('a', 'b', 'bSet', "return " + code.join('&&') + ";"));
            }
        }
        artsParams.get(arrPrm).push(art);
    }
}

function truncateArtList(mapComparer, artsParams, setDataStats, keyList, logExcluded, skiped, slot) {
    for (let i = 0, len = keyList.length; i < len; i++) {
        let base = keyList[i];
        let cmp = mapComparer.get(base);
        let list = artsParams.get(base);
        for (let k = 0; k < list.length - 1; k++) {
            for (let l = k + 1; l < list.length; l++) {
                if (cmp(list[k].calculated, list[l].calculated, setDataStats[list[l].set])) {
                    logExcluded(list[l], list[k], base, setDataStats[list[l].set]);
                    list.splice(l, 1);
                    l--;
                    skiped[slot]++;
                } else if (cmp(list[l].calculated, list[k].calculated, setDataStats[list[k].set])) {
                    logExcluded(list[k], list[l], base, setDataStats[list[k].set]);
                    list.splice(k, 1);
                    k--;
                    skiped[slot]++;
                    break;
                }
            }
        }
    }
}

function truncateResults(results, limit) {
    results = results.sort(function(a,b) {
        return b.value - a.value;
    });
    results.splice(limit);
}

function removeEmptyArtifacts(results) {
    for (let item of results) {
        let arts = [];
        for (let art of item.artifacts) {
            if (art.isEmpty) continue;
            arts.push(art);
        }
        item.artifacts = arts;
    }
}

function generateCheckFunc(settings) {
    let parts = [];
    for (let [setName, pieces] of Object.entries(settings.setMaxValues)) {
        parts.push('if (sets.'+ setName +' >= '+ pieces +') {return true}');
    }

    parts.push('return false');
    return Function('sets', parts.join(';'));
}

function generateRequireFunc(settings) {
    let parts = [];
    for (let [setName, pieces] of Object.entries(settings.setMinValues)) {
        parts.push('if (sets.'+ setName +' < '+ pieces +') {return true}');
    }

    parts.push('return false');
    return Function('sets', parts.join(';'));
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
