import { DB } from "../../db/DB";
import { Artifact } from "../Artifact";
import { Condition } from "../Condition";
import { FeatureCompiler } from "../Feature2/Compiler";
import { isPercent, Stats } from "../Stats";

const MAX_ROLLS_TO_PUT_LOWEST = 2;
const MAX_STATS_PER_ARTIFACT = 4;
const MAX_UPGRADES_PER_ARTIFACT = 5;
const MAX_ROLLS_PER_ARTIFACT = 1 + MAX_UPGRADES_PER_ARTIFACT;
const MAX_UPGRADES_TOTAL = MAX_UPGRADES_PER_ARTIFACT * 5;
const MAX_ROLLS = 30;
const MAX_REALLOCATE_LOOP = 10;

export class ArtifactGenerator {
    constructor(data) {
        this.build = data.build;
        this.combinations = data.combinations;
        this.featureName = data.feature;
        this.settings = data.settings;
        this.progressCallback = data.progressCallback;

        this.prepare();
    }

    log(msg, toString) {
        if (typeof __DEVEL__ !== 'undefined' && __DEVEL__) {
            if (toString)
                console.log(JSON.stringify(msg));
            else
                console.log(msg);
        }
    }

    prepare() {
        this.applySets();

        let feature = this.build.getFeatureByName(this.featureName);
        this.buildData = this.build.getBuildData();
        let postItems = this.buildData.getActivePostEffectsTree();

        let tree = feature.getTree(this.buildData);
        let compiler = new FeatureCompiler(tree, postItems);
        let usedStats = compiler.usedStats;
        let ensureStats = ['recharge'].concat(usedStats);
        this.buildData.stats.ensure(ensureStats);

        if (usedStats.includes('crit_value')) {
            this.calcCritValue = true;
            usedStats.push('crit_rate');
            usedStats.push('crit_dmg');
        }

        compiler.prepare(this.buildData);
        compiler.compile();
        this.compiled = compiler;

        this.usefulStats = [];
        this.uselessStats = [];
        if (this.settings.mode == 'min') {
            this.statRolls = [0];
        } else if (this.settings.mode == 'max') {
            this.statRolls = [3];
        } else {
            this.statRolls = [1, 2];
        }

        for (let stat of DB.Artifacts.Substats.getKeys()) {
            if (usedStats.includes(stat)) {
                this.usefulStats.push(stat);
            } else {
                this.uselessStats.push(stat);
            }
        }

        this.progressTotal = this.combinations.length;
        this.progressCurrent = 0;
    }

    setsList() {
        let sets = Array.isArray(this.settings.sets) ? [].concat(this.settings.sets) : [];
        if (sets.length < 5) {
            let setKeys = [];
            for (let set of DB.Artifacts.Sets.getList()) {
                if (!set.isBeta()) {
                    setKeys.push(set.key)
                }
            }

            for (let setName of shuffle(setKeys)) {
                if (sets.includes(setName)) {
                    continue
                }

                let setData = DB.Artifacts.Sets.get(setName);
                if (setData.maxRarity < 5) {
                    continue;
                }

                sets.push(setName);
                if (sets.length >= 5) {
                    break;
                }
            }
        }
        return shuffle(sets);
    }

    applySets() {
        let sets = this.setsList();
        this.artifactSets = [].concat(sets);
        this.build.clearArtifacts();
        let stats = ['hp', 'atk'];

        for (let slot of DB.Artifacts.Slots.getKeys()) {
            let art = new Artifact(5, 20, slot, sets.shift() || '', stats.shift() || '');
            this.build.setArtifact(art);
        }

        let artConditions = this.build.getConditions({objects: 'artifacts'});
        let allSettings = Condition.allConditionsOn(artConditions);

        if (this.settings.required_sets_settings) {
            allSettings = Object.assign(allSettings, this.settings.required_sets_settings);
        }

        this.build.setArtifactsSettings(allSettings);
    }

    makeTestObject(combination, stats) {
        let testObj = new StatsObject(combination, this.usefulStats, this.usefulStats, this.statRolls, this.settings);
        if (!testObj.satisfyStat('recharge', this.minRecharge, stats) ) {
            return;
        }
        return testObj;
    }

    makeObject(combination, stats) {
        return new StatsObject(combination, this.usefulStats, this.uselessStats, this.statRolls, this.settings);
    }

    getCombinationStatsFunc(combination) {
        let result = new Stats();
        for (let slot of Object.keys(combination)) {
            let stat = combination[slot];
            let data = DB.Artifacts.Mainstats.get(stat);
            let value = data.values[4].getValue(20);
            if (isPercent(stat)) {
                value = value / 100;
            }
            result.add(stat, value);
        }
        return result.getConcatFunc();
    }

    * generateBase(preparedData, maxBySettings) {
        let cnt = preparedData.actualList.length;
        preparedData.fullSkipped = 0;

        let generatedList = [];

        let statsCnt = preparedData.mainStats.map(x => Math.min(4, preparedData.actualList.reduce((a, v) => a + (preparedData.maxVal[v] && x != v ? 1 : 0), 0)));
        let max = Math.min(maxBySettings, statsCnt.reduce((a, v) => a + (v > 0 ? v + 5 : 0), 0));
        preparedData.localMax = max;
        let minimalCount = 0;
        let critVal = 0;
        for (let i = 0; i < preparedData.actualList.length; i++) {
            let cnt = preparedData.min[preparedData.actualList[i]];
            minimalCount += cnt;
            if (preparedData.actualList[i] == 'crit_rate' || preparedData.actualList[i] == 'crit_dmg')
                critVal += cnt;
            generatedList.push({
                actualCnt: cnt,
                min: cnt,
                base: preparedData.maxVal[preparedData.actualList[i]],
                stat: preparedData.actualList[i],
                crit: preparedData.actualList[i] == 'crit_rate' || preparedData.actualList[i] == 'crit_dmg',
            });
            max -= cnt;
        }

        cnt = generatedList.length;
        let result = {
            crit_rate: 0,
            crit_dmg: 0,
        };


        var check = (actualCnt) => {
            let statsCnt = preparedData.mainStats.map(x => Math.min(4, preparedData.actualList.reduce((a, v) => a + (result[v] && x != v ? 1 : 0), 0)));
            let max = statsCnt.reduce((a, v) => a + (v > 0 ? v + 5 : 0), 0);
            if (max < actualCnt)
                return false;
            let base = statsCnt.reduce((a, v) => a + v, 0);
            for (let i of Object.keys(result))
                if (result[i])
                    base -= Math.min(result[i], preparedData.mainStatCnt[i]);
            return max - base >= actualCnt;
        }

        var regenerate = (critRolls, critVal) => {
            max = preparedData.localMax;
            let minLimit = minimalCount;
            for (let i = 0; i < cnt; i++) {
                minLimit -= generatedList[i].min;
                if (generatedList[i].crit) {
                    critVal -= generatedList[i].actualCnt;
                    generatedList[i].max = Math.min(generatedList[i].base, critRolls - critVal, max - minLimit);
                    critVal += generatedList[i].actualCnt;
                } else {
                    generatedList[i].max = Math.min(generatedList[i].base, max - minLimit);
                }
                max -= generatedList[i].actualCnt;
            }
            if (max < 0)
                return true;

            for (let i = cnt - 1; i >= 0; i--) {
                max += generatedList[i].actualCnt;
                if (generatedList[i].crit) {
                    critVal -= generatedList[i].actualCnt;
                    generatedList[i].actualCnt = Math.max(generatedList[i].min, Math.min(max, generatedList[i].max, critRolls - critVal));
                    critVal += generatedList[i].actualCnt;
                } else
                    generatedList[i].actualCnt = Math.max(generatedList[i].min, Math.min(max, generatedList[i].max));
                max -= generatedList[i].actualCnt;

                result[generatedList[i].stat] = generatedList[i].actualCnt;
            }
            //максимум для последнего сбрасываем к актуальному, т.к. всегда заполняем его на максимум
            //в идеале нужно переделать алгоритм поиска следующего и пропускать последний элемент, т.к. он всегда заполнен на максимум
            generatedList[cnt - 1].max = generatedList[cnt - 1].actualCnt;
            return false;
        }
        //max содержит кол-во не израсходованных стаков, по сути max = sum(min)
        if (regenerate(this.settings.critRolls, critVal))
            return;

        while (true) {
            if (check(preparedData.localMax - max)) {
                let uid = this.usefulStats.reduce((a, i) => a * 30 + (result[i] || 0), 0);
                yield [uid, result];
            } else {
                preparedData.fullSkipped++;
            }

            if (cnt == 1)
                return;
            else {
                generatedList[cnt - 1].actualCnt = generatedList[cnt - 1].min;
                result[generatedList[cnt - 1].stat] = generatedList[cnt - 1].actualCnt;
                for (let i = cnt - 2; i >= 0; i--) {
                    generatedList[i].actualCnt++;
                    if (generatedList[i].actualCnt > generatedList[i].max) {
                        if (i == 0)
                            return;
                        generatedList[i].actualCnt = generatedList[i].min;
                        result[generatedList[i].stat] = generatedList[i].actualCnt;
                    } else {
                        //нужно актуализировать текущее значение, чтобы правильно посчитать critVal
                        result[generatedList[i].stat] = generatedList[i].actualCnt;
                        if (regenerate(this.settings.critRolls, result.crit_dmg + result.crit_rate))
                            return;
                        break;
                    }
                }
            }
        }
    }

    * generateObject(combination, recharge) {
        var result = {
            recharge,
        };
        let preparedData = {
            canBeIn: {},
            maxVal: {},
            mainStats: ['hp', 'atk'].concat(Object.values(combination)),
            min: {},
            actualList: Object.keys(result).filter(x => !this.usefulStats.includes(x) && result[x]).concat(this.usefulStats),
        };

        preparedData.actualList.forEach(x => preparedData.canBeIn[x] = preparedData.mainStats.map(a => a != x));
        preparedData.mainStatCnt = Object.fromEntries(Object.entries(preparedData.canBeIn).map(x => [x[0], x[1].reduce((a, item) => a + (item ? 1 : 0), 0)]));
        preparedData.actualList.forEach(x => {
            if (this.usefulStats.includes(x)) {
                preparedData.maxVal[x] = preparedData.mainStatCnt[x] * 6;
                preparedData.min[x] = 0;
            } else {
                preparedData.maxVal[x] = Math.min(preparedData.mainStatCnt[x] * 6, result[x]);
                preparedData.min[x] = result[x];
            }
        });

        yield* this.generateBase(preparedData, this.settings.count + ((this.usefulStats.includes("recharge") ? 0 : preparedData.min.recharge) | 0));

        this.log(preparedData);
    }

    generate() {
        let result = [];

        let initialStatFunc = this.buildData.stats.getSetFunc();
        this.minRecharge = this.settings.minRecharge / 100;

        let b = true;
        for (let combination of this.combinations) {
            this.log(combination);
            let combinationStatFunc = this.getCombinationStatsFunc(combination);
            let maxObj;
            let maxValue = 0;
            let calcCount = 0;
            let skipCount = 0;

            let stats = new Stats();
            initialStatFunc(stats);
            combinationStatFunc(stats);
            let testObj = this.makeTestObject(combination, stats);
            if (!testObj) {
                this.updateProgress();
                continue;
            }
            testObj.satisfyStat('recharge', this.minRecharge, stats);

            let processed = new Set();
            let generator = this.generateObject(combination, testObj.rolls['recharge'] ? testObj.rolls['recharge'].length : 0);
            for (let objStats of generator) {
                if (processed.has(objStats)) {
                    skipCount++;
                    continue;
                }
                processed.add(objStats[0]);
                stats = new Stats();
                initialStatFunc(stats);
                combinationStatFunc(stats);

                let obj = this.makeObject(combination, stats);
                for (let stat in objStats[1]) {
                    for (let j = 0; j < objStats[1][stat]; j++) {
                        let rollValue = obj.addRoll(stat);
                        stats.add(stat, DB.Artifacts.Substats.get(stat).rollsReal[4][rollValue]);
                    }
                }
                if (this.calcCritValue) {
                    stats.set('crit_value', stats.get('crit_rate') * 2 + stats.get('crit_dmg'));
                }

                this.buildData.stats = stats;
                let featureValue = this.compiled.execute(this.buildData)[2];

                if (featureValue > maxValue) {
                    maxValue = featureValue;
                    maxObj = obj;
                }
                calcCount++;
            }

            if (typeof __DEVEL__ !== 'undefined' && __DEVEL__ && b) {
                this.log(processed);
                this.log(Array.from(processed.values()).sort((a, b) => a - b).reduce((a, v) => {
                    let str = "";
                    let sum = 0;
                    for (let i = this.usefulStats.length - 1; i >= 0; i--) {
                        sum += v % 30;
                        str = this.usefulStats[i] + ":" + (v % 30).toString() + ";" + str;
                        v = Math.floor(v / 30);
                    }
                    //if (sum < this.settings.count)
                    return a + "," + str;
                    //else
                    //    return a;
                }, ""));
                this.log(calcCount);
                this.log(skipCount);
                b = false;
            }
            this.updateProgress();

            if (maxObj) {
                result.push({
                    value: maxValue,
                    mainStats: combination,
                    rollsPerStat: maxObj.getDistribution(),
                    artifacts: maxObj.makeArtifacts(this.setsList()),
                    calcCount,
                });
            }
        }

        return result.sort((a, b) => b.value - a.value);
    }

    updateProgress() {
        ++this.progressCurrent;
        if (this.progressCallback) {
            this.progressCallback({
                total: this.progressTotal,
                completed: this.progressCurrent,
            });
        }
    }
}

export class StatsObject {
    constructor(combination, usefulStats, uselessStats, statValues, settings) {
        this.mainStats = {
            flower: 'hp',
            plume: 'atk',
            ...combination,
        };
        this.usefulStats = usefulStats;
        this.uselessStats = uselessStats;
        this.rollsCnt = 0;
        this.rolls = {};
        this.statValues = statValues;
        this.stats = new Stats();
        this.settings = settings;
    }

    copyObject() {
        let result = new StatsObject();
        return result;
    }

    prepareGeneratorData() {
        this.mainStatCnt = {};
        this.usefulStats.forEach(x => this.mainStatCnt[x] = Object.values(this.mainStats).reduce((a, item) => a + (item == x ? 1 : 0), 0));

    }

    prepareStats() {

    }

    getMainStatsCnt(stat) {
        let result = 0;
        for (let s of Object.values(this.mainStats)) {
            if (stat == s) ++result;
        }
        return result;
    }

    getStatRollsAllowed(stat) {
        let used = this.rolls[stat] ? this.rolls[stat].length : 0;

        let maxBySettings = Math.max(0, this.settings.count - used);
        let maxByStat = MAX_ROLLS - used;
        let maxByMainStat = Math.max(0, (5 - this.getMainStatsCnt(stat)) * MAX_ROLLS_PER_ARTIFACT - used);

        if (stat == 'crit_rate' || stat == 'crit_dmg') {
            maxByStat = this.settings.critRolls - (this.rolls.crit_rate ? this.rolls.crit_rate.length : 0) - (this.rolls.crit_dmg ? this.rolls.crit_dmg.length : 0);
        }

        return Math.min(maxBySettings, maxByStat, maxByMainStat);
    }

    getUpgradesCnt() {
        let upgradesCnt = 0;
        for (let stat of Object.keys(this.rolls)) {
            let used = this.rolls[stat].length;
            for (let mainStat of Object.values(this.mainStats)) {
                if (stat != mainStat) --used;
            }

            upgradesCnt += Math.max(0, used);
        }
        return upgradesCnt;
    }

    getAllowedRolls(exclude) {
        let result = [];

        if (this.rollsCnt >= this.settings.count) {
            return result;
        }

        let upgradesCnt = this.getUpgradesCnt();

        for (let stat of DB.Artifacts.Substats.getKeys()) {
            if (exclude && exclude == stat) continue;
            if (!this.usefulStats.includes(stat)) continue;

            if (upgradesCnt >= MAX_UPGRADES_TOTAL && this.rolls[stat]) continue;

            let value = this.getRollValue(stat);
            let allowed = this.getStatRollsAllowed(stat);
            if (allowed > 0) {
                result.push({stat: stat, value: value});
            }
        }

        return result;
    }

    getRollValue(stat) {
        let cnt = this.statValues.length;

        if (cnt > 1) {
            let used = 1 + (this.rolls[stat] ? this.rolls[stat].length : 0);
            let index = used % cnt;
            return this.statValues[index];
        }

        return this.statValues[0];
    }

    satisfyStat(stat, value, total) {
        let current = total.getTotal(stat);

        while (current - value < -0.001) {
            if (this.getStatRollsAllowed(stat) <= 0) {
                return false;
            }

            let rollValue = DB.Artifacts.Substats.get(stat).rollsReal[4][this.addRoll(stat)];
            current += rollValue;
            total.add(stat, rollValue);
        }

        return true;
    }

    addRoll(stat) {
        let value = this.getRollValue(stat);

        if (!this.rolls[stat]) { this.rolls[stat] = []; }
        this.rolls[stat].push(value);
        ++this.rollsCnt;
        this.stats.add(stat, DB.Artifacts.Substats.get(stat).rollsReal[4][value]);

        return value;
    }

    getDistribution() {
        let result = {};
        for (let [stat, rolls] of Object.entries(this.rolls)) {
            result[stat] = rolls.length;
        }
        return result;
    }

    getDistibutor() {
        return new StatDistributor(this.mainStats, this.rolls);
    }

    makeArtifacts(setsList) {
        let result = [];

        let dist = this.getDistibutor();
        dist.process();
        dist.fillUselessStats(this.uselessStats, this.statValues);

        for (let slot of Object.keys(this.mainStats)) {
            let art = new Artifact(5, 20, slot, setsList.shift(), this.mainStats[slot]);
            for (let [stat, rolls] of Object.entries(dist.result[slot])) {
                art.addStatByProcs(stat, rolls);
            }
            result.push(art);
        }

        return result;
    }
}

export class StatDistributor {
    constructor(mainStats, rolls) {
        this.mainStats = mainStats;
        this.rolls = {};

        for (let stat of Object.keys(rolls)) {
            this.rolls[stat] = [].concat(rolls[stat]);
        }

        this.prepare();
        this.result = {
            plume: {},
            flower: {},
            sands: {},
            goblet: {},
            circlet: {},
        };
        this.rollsCount = {plume: 0, flower: 0, sands: 0, goblet: 0, circlet: 0};
        this.upgradesCount = {plume: 0, flower: 0, sands: 0, goblet: 0, circlet: 0};
    }

    prepare() {
        this.possibleStatSlots = {};
        for (let stat of Object.keys(this.rolls)) {
            this.possibleStatSlots[stat] = [];

            for (let slot of Object.keys(this.mainStats)) {
                if (this.mainStats[slot] != stat) {
                    this.possibleStatSlots[stat].push(slot);
                }
            }
        }
    }

    process() {
        let byNumSlots = {};
        for (let stat of Object.keys(this.rolls)) {
            let avail = Object.values(this.mainStats).reduce((s, i) => { return s + (stat == i ? 0 : 1) }, 0);
            if (!byNumSlots[avail]) byNumSlots[avail] = [];
            byNumSlots[avail].push(stat);
        }


        for (let stat of Object.keys(this.rolls)) {
            let min = Math.floor((this.rolls[stat].length + 5) / 6);
            if (Object.keys(this.mainStats).reduce((a, v) => a + (stat != v ? 1 : 0), 0) == min) {
                for (let i = 0; i < min; i++) {
                    let rolls = this.rolls[stat].splice(0, 6);
                    this.putIntoLowestCount(stat, rolls);
                    if (this.rolls[stat].length == 0) {
                        delete this.rolls[stat];
                    }
                }
            }
        }
        let byCount = {};
        for (let stat of Object.keys(this.rolls)) {
            byCount[stat] = this.rolls[stat].length;
        }
        for (let num of Object.keys(byNumSlots).sort((a, b) => a - b)) {
            let stats = byNumSlots[num];

            let filtered = Object.entries(byCount).filter(x => stats.includes(x[0])).reduce((acc, x) => { acc[x[0]] = x[1]; return acc; }, {});
            for (let stat of Object.keys(filtered).sort((a, b) => filtered[b] - filtered[a])) {
                let len = this.rolls[stat].length;
                for (let i = 0, cnt = Math.floor((len + 5) / 6); i < cnt; i++) {
                    let rolls = this.rolls[stat].splice(0, Math.max(1, Math.floor(len / num)));
                    this.putIntoLowestCount(stat, rolls);

                    if (this.rolls[stat].length == 0) {
                        delete this.rolls[stat];
                    }
                }
            }
        }

        byCount = {};
        for (let stat of Object.keys(this.rolls)) {
            byCount[stat] = this.rolls[stat].length;
        }

        for (let stat of Object.keys(this.rolls).sort((a, b) => byCount[b] - byCount[a])) {
            while (this.rolls[stat] && this.rolls[stat].length > 0) {
                let rolls = this.rolls[stat].splice(0, 1);
                this.putIntoLowestCount(stat, rolls);

                if (this.rolls[stat].length == 0) {
                    delete this.rolls[stat];
                }
            }
        }

        this.balanceUpgrades();
    }

    balanceUpgrades() {
        let loop = 0;
        let lastSlot = "";
        mainloop: while (true) {
            if (++loop > MAX_REALLOCATE_LOOP) break;

            let overflow = false;
            for (let slot of Object.keys(this.mainStats)) {
                if (this.upgradesCount[slot] <= MAX_UPGRADES_PER_ARTIFACT) continue;
                overflow = true;
                for (let stat of Object.keys(this.result[slot])) {
                    if (this.result[slot][stat].length == 1) continue;

                    for (let possibleSlot of Object.keys(this.mainStats)) {
                        if (slot == possibleSlot) continue;
                        if (stat == this.mainStats[possibleSlot]) continue;
                        if (!this.result[possibleSlot][stat]) continue;
                        if (this.upgradesCount[possibleSlot] >= MAX_UPGRADES_PER_ARTIFACT) continue;

                        let roll = this.result[slot][stat].pop();
                        this.putIntoSlot(possibleSlot, stat, roll);

                        --this.upgradesCount[slot];

                        continue mainloop;
                    }
                }
            }

            // try to move 1 upgrade to another piece without this stat
            for (let slot of Object.keys(this.mainStats)) {
                if (this.upgradesCount[slot] <= MAX_UPGRADES_PER_ARTIFACT && lastSlot != slot && !overflow) continue;

                for (let stat of Object.keys(this.result[slot])) {
                    if (this.result[slot][stat].length == 1) continue;

                    for (let possibleSlot of Object.keys(this.mainStats)) {
                        if (slot == possibleSlot) continue;
                        if (stat == this.mainStats[possibleSlot]) continue;
                        if (this.result[possibleSlot][stat]) continue;
                        if (Object.keys(this.result[possibleSlot]).length >= MAX_STATS_PER_ARTIFACT) continue;

                        let roll = this.result[slot][stat].pop();
                        this.result[possibleSlot][stat] = [roll];

                        --this.upgradesCount[slot];

                        lastSlot = "";
                        continue mainloop;
                    }
                }
            }

            for (let slot of Object.keys(this.mainStats)) {
                if (this.upgradesCount[slot] >= MAX_UPGRADES_PER_ARTIFACT) continue;
                for (let stat of Object.keys(this.result[slot])) {
                    for (let possibleSlot of Object.keys(this.mainStats)) {
                        if (slot == possibleSlot) continue;
                        if (!this.result[possibleSlot][stat]) continue;
                        if (this.result[possibleSlot][stat].length <= 1) continue;
                        if (this.upgradesCount[possibleSlot] < MAX_UPGRADES_PER_ARTIFACT) continue;

                        let roll = this.result[possibleSlot][stat].pop();
                        this.putIntoSlot(slot, stat, roll);

                        --this.upgradesCount[possibleSlot];

                        continue mainloop;
                    }
                }
            }

            lastSlot = "";
            if (overflow) {
                for (let slot of Object.keys(this.mainStats)) {
                    if (Object.keys(this.result[slot]).length >= MAX_STATS_PER_ARTIFACT) continue;

                    for (let possibleSlot of Object.keys(this.mainStats)) {
                        if (slot == possibleSlot && Object.keys(this.result[possibleSlot]).length < MAX_STATS_PER_ARTIFACT) continue;
                        for (let stat of Object.keys(this.result[possibleSlot])) {
                            if (this.result[possibleSlot][stat].length > 1) continue;
                            if (stat == this.mainStats[slot]) continue;
                            if (this.result[slot][stat]) continue;

                            let roll = this.result[possibleSlot][stat];
                            this.result[slot][stat] = roll;
                            delete this.result[possibleSlot][stat];
                            lastSlot = slot;

                            continue mainloop;
                        }
                    }
                }
            }

            break;
        }

        // try to reallocate upgrades
        // TODO
    }

    fillUselessStats(uselessStats, rollValues) {
        for (let [slot, mainStat] of Object.entries(this.mainStats)) {
            let list = shuffle([].concat(uselessStats)).filter((i) => {return i != mainStat});
            let used = [];

            while (Object.keys(this.result[slot]).length < MAX_STATS_PER_ARTIFACT) {
                let stat = list.pop();
                if (!stat) break;
                if (this.result[slot][stat]) continue;

                used.push(stat);

                // console.log(stat)
                this.putIntoSlot(slot, stat, rollValues[0]);
            }

            if (used.length == 0) continue;

            while (this.upgradesCount[slot] < MAX_UPGRADES_PER_ARTIFACT) {
                for (let stat of used) {
                    this.putIntoSlot(slot, stat, rollValues[0]);
                    // console.log(stat)
                    if (this.upgradesCount[slot] >= MAX_UPGRADES_PER_ARTIFACT) break;
                }
            }
        }
    }

    putIntoLowestCount(stat, rolls) {
        let list = [];
        for (let [slot, mainStat] of Object.entries(this.mainStats)) {
            if (stat == mainStat) continue;

            if (Object.keys(this.result[slot]).length >= MAX_STATS_PER_ARTIFACT) {
                if (!this.result[slot][stat]) continue;
            }

            if (this.result[slot][stat] && this.upgradesCount[slot] >= MAX_UPGRADES_PER_ARTIFACT) continue;

            list.push({
                slot: slot,
                // used: this.upgradesCount[slot] - Object.values(this.result[slot]).length / 10,
                used: this.upgradesCount[slot] + Object.values(this.result[slot]).length - (this.result[slot][stat] ? 0 : 2),
            });
        }

        if (list.length == 0) {
            for (let [slot, mainStat] of Object.entries(this.mainStats)) {
                if (stat == mainStat) continue;
                if (!this.result[slot][stat]) continue;

                list.push({
                    slot: slot,
                    used: this.upgradesCount[slot],
                });
            }
        }

        list = list.sort((a, b) => {return a.used - b.used});
        this.putIntoSlot(list[0].slot, stat, rolls);
    }

    putIntoLowestDifferent(stat, rolls) {
        let list = [];
        for (let [slot, mainStat] of Object.entries(this.mainStats)) {
            if (stat == mainStat) continue;

            if (Object.keys(this.result[slot]) >= MAX_STATS_PER_ARTIFACT) {
                if (!this.result[slot][stat]) continue;
            }

            list.push({
                slot: slot,
                used: Object.values(this.result[slot]).length,
            })
        }

        list = list.sort((a, b) => {return a.used - b.used});

        this.putIntoSlot(list[0].slot, stat, rolls);
    }

    putIntoSlot(slot, stat, rolls) {
        if (!this.result[slot][stat]) {
            if (Object.keys(this.result[slot]).length >= MAX_STATS_PER_ARTIFACT) {
                // console.log('invalid')
            }

            this.result[slot][stat] = [];
        }

        this.result[slot][stat] = this.result[slot][stat].concat(rolls);
        this.rollsCount[slot] += rolls.length;
        this.refreshUpgrages(slot);
    }

    refreshUpgrages(slot) {
        let count = 0;
        for (let [stat, rolls] of Object.entries(this.result[slot])) {
            count += rolls.length - 1;
        }
        this.upgradesCount[slot] = count;
    }
}

export function getMainStatCombinations(params) {
    let build = params.build.clone();
    let feature = params.build.getFeatureByName(params.feature);
    let buildData = build.getBuildData();
    let usedStats = feature.getUsedStats(buildData);

    let statsBySlot = {
        sands: [],
        goblet: [],
        circlet: [],
    };

    let useless = {
        sands: '',
        goblet: '',
        circlet: '',
    };

    if (params.settings.minRecharge > 100) {
        usedStats.push('recharge')
    }

    if (usedStats.includes('crit_value')) {
        usedStats.push('crit_rate')
        usedStats.push('crit_dmg')
    }

    for (let stat of DB.Artifacts.Mainstats.getKeys()) {
        let data = DB.Artifacts.Mainstats.get(stat);

        for (let slot of data.slots) {
            if (slot == 'flower' || slot == 'plume') continue;

            if (!usedStats.includes(stat)) {
                useless[slot] ||= stat;
                continue;
            }

            statsBySlot[slot].push(stat);
        }
    }

    for (let slot of Object.keys(statsBySlot)) {
        if (statsBySlot[slot].length == 0) {
            statsBySlot[slot].push(useless[slot]);
        }
    }

    let result = [];
    for (let s1 of statsBySlot.sands) {
        for (let s2 of statsBySlot.goblet) {
            for (let s3 of statsBySlot.circlet) {
                result.push({sands: s1, goblet: s2, circlet: s3});
            }
        }
    }

    return result;
}

function shuffle(array) {
    let result = [].concat(array);
    let currentIndex = result.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [result[currentIndex], result[randomIndex]] = [result[randomIndex], result[currentIndex]];
    }

    return result;
}
