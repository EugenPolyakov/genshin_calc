import { DB } from '../db/DB';
import { Serializer } from './Serializer';
import { Stats } from './Stats';
import { substatCheck, substatListValid } from './SubstatCheck';

export class Artifact {
    constructor(rarity, level, slot, set, mainStat, subStats) {
        this.rarity = rarity;
        this.level = level;
        this.slot = slot;
        this.set = set;
        this.mainStat = mainStat;
        if (subStats)
            this.subStats = Object.assign({}, subStats);
        else
            this.subStats = {};
        this.locked = false;
        this.groups = [];
        this.calculated = null;
    }

    addStat(stat, value, unactivated, firstValue) {
        this.subStats[stat] = {
            index: Object.keys(this.subStats).length,
            value: value,
            unactivated: unactivated,
            initialValue: firstValue,
        };

        this.calculated = null;
    }

    addStatByProcs(stat, values, unactivated) {
        let substat = DB.Artifacts.Substats.get(stat);
        if (!substat) {
            this.subStats[stat] = {
                index: Object.keys(this.subStats).length,
                value: 0,
                values: [],
                unactivated: unactivated,
            };
        } else {
            values = values.sort((a, b) => a - b);
            let value = substat.rollsToValue[this.rarity - 1][values.join('')];
            if (!value)
                value = values.reduce((a, x) => a + substat.rolls[this.rarity - 1][x], 0);

            this.subStats[stat] = {
                index: Object.keys(this.subStats).length,
                value: value,
                values: values,
                unactivated: unactivated,
            };
        }

        this.calculated = null;
    }

    tryDoRightSubstats() {
        let upgradesCnt = 0;
        let isWrong = false;
        Object.keys(this.subStats).forEach((i) => {
            this.tryGetSubstatValues(this.subStats[i], i);
            if (this.subStats[i].values)
                upgradesCnt += this.subStats[i].values.length - 1;
            else
                isWrong = true;
        });

        if (isWrong) return;

        let rarityData = DB.Artifacts.Rarity[this.rarity - 1];
        let minRarityUpdates = Math.max(0, rarityData.minSubstats - 4 + Math.floor(this.level / 4));
        if (upgradesCnt < minRarityUpdates) {
            let possibleStacks = {};
            Object.keys(this.subStats).forEach((sub) => {
                let subStat = this.subStats[sub];
                if (subStat.values.length > 1) {
                    let statData = DB.Artifacts.Substats.get(sub);
                    let stacks = statData.stacks[this.rarity - 1][subStat.value];
                    if (subStat.initialValue)
                        stacks = stacks.filter(x => x.includes(subStat.initialValue - 1));
                    possibleStacks[sub] = stacks;
                }
            });
            let keys = Object.keys(possibleStacks);
            if (keys.length > 0) {
                let key1 = keys[0];
                for (let i = 0; i < possibleStacks[key1].length; i++) {
                    upgradesCnt = possibleStacks[key1][i].length - 1;
                    if (keys.length > 1) {
                        let key2 = keys[1];
                        for (let j = 0; j < possibleStacks[key2].length; j++) {
                            upgradesCnt += possibleStacks[key2][j].length - 1;
                            if (keys.length > 2) {
                                let key3 = keys[2];
                                for (let k = 0; k < possibleStacks[key3].length; k++) {
                                    upgradesCnt += possibleStacks[key3][k].length - 1;
                                    if (keys.length > 3) {
                                        key4 = keys[3];
                                        for (let l = 0; l < possibleStacks[key4].length; l++) {
                                            if (upgradesCnt + possibleStacks[key4][l].length - 1 >= minRarityUpdates) {
                                                this.subStats[key1].values = possibleStacks[key1][i].slice();
                                                this.subStats[key2].values = possibleStacks[key2][j].slice();
                                                this.subStats[key3].values = possibleStacks[key3][k].slice();
                                                this.subStats[key4].values = possibleStacks[key4][l].slice();
                                                return;
                                            }
                                        }
                                    } else {
                                        if (upgradesCnt >= minRarityUpdates) {
                                            this.subStats[key1].values = possibleStacks[key1][i].slice();
                                            this.subStats[key2].values = possibleStacks[key2][j].slice();
                                            this.subStats[key3].values = possibleStacks[key3][k].slice();
                                            return;
                                        }
                                    }
                                    upgradesCnt -= possibleStacks[key3][k].length - 1;
                                }
                            } else {
                                if (upgradesCnt >= minRarityUpdates) {
                                    this.subStats[key1].values = possibleStacks[key1][i].slice();
                                    this.subStats[key2].values = possibleStacks[key2][j].slice();
                                    return;
                                }
                            }
                            upgradesCnt -= possibleStacks[key2][j].length - 1;
                        }
                    } else {
                        if (upgradesCnt >= minRarityUpdates) {
                            this.subStats[key1].values = possibleStacks[key1][i].slice();
                            return;
                        }
                    }
                }
            }
        }
    }

    tryGetSubstatValues(subStat, stat) {
        let data = DB.Artifacts.Substats.get(stat);
        if (subStat.values && subStat.values.length > 0 && subStat.value.toFixed(1) == data.rollsToValue[this.rarity - 1][subStat.values.join('')].toFixed(1))
            return;
        let result = substatCheck(stat, this.rarity, subStat.value, subStat.values, subStat.initialValue);
        if (result.last == 0) {
            subStat.values = result.steps.map(x => x.rarity - 2);
            subStat.initialValue = result.initialValue;
        } else {
            delete subStat.values;
        }
    }

    /**
     * @returns {Stats}
     */
    calcStats() {
        var result = new Stats();

        let mainData = DB.Artifacts.Mainstats.get(this.mainStat);
        if (mainData) {
            let statTable = mainData.values[this.rarity - 1];
            result.add(this.mainStat, statTable.getValue(this.level));
        }

        Object.keys(this.subStats).forEach((i) =>
        {
            let item = this.subStats[i];
            let substatData = DB.Artifacts.Substats.get(i);
            this.tryGetSubstatValues(item, i);
            if (item.values)
                result.add(i, substatData.getPreciseValueByStacks(item.values, this.rarity));
            else
                result.add(i, substatData.getPreciseValue(item.value, this.rarity));
        });

        result.add('crit_value', result.get('crit_rate') * 2 + result.get('crit_dmg'));

        return result;
    }

    calcCache(usedStats) {
        this.calculated = this.calcStats();
        this.calculated.truncate(usedStats);
        this.calculated.processPercent();
    }

    replace(art) {
        this.rarity = art.rarity;
        this.level = art.level;
        this.slot = art.slot;
        this.set = art.set;
        this.mainStat = art.mainStat;
        this.subStats = art.subStats;
        this.groups = art.getGroups();

        this.calculated = null;
    }

    getLevel() {
        return this.level;
    }

    getSet() {
        return this.set;
    }

    getRarity() {
        return this.rarity;
    }

    getMainStat() {
        return ''+ this.mainStat;
    }

    getSetName() {
        return ''+ this.set;
    }

    getSlot() {
        return ''+ this.slot;
    }

    getMainStatValue() {
        let stat = this.getMainStat();
        if (!stat) {
            return 0;
        }

        let data = DB.Artifacts.Mainstats.get(stat);

        return data.values[this.rarity-1].getValue(this.level);
    }

    getSubStats() {
        return this.subStats;
    }

    setGroups(value) {
        let names = value;
        if (!Array.isArray(value)) {
            names = [value];
        }

        let result = [];
        for (let name of names) {
            let newName = Artifact.trimGroupName(name);
            if (!Artifact.inGroups(result, newName)) {
                result.push(newName);
            }
        }

        this.groups = result;
    }

    getGroups() {
        if (!this.groups || this.groups.length == 0) {
            return [''];
        }
        return this.groups;
    }

    hasGroup(group) {
        let id = group.toUpperCase();
        for (let group of this.groups) {
            if (id == group.toUpperCase()) {
                return true;
            }
        }
        return false;
    }

    inGroups(groupList) {
        for (let groupName of groupList) {
            if (this.hasGroup(groupName)) {
                return true;
            }
        }
        return false;
    }

    isValid() {
        return this.getErrors().length == 0;
    }

    setLocked(val) {
        this.locked = !!val;
    }

    isLocked() {
        return this.locked;
    }

    getHash() {
        return Serializer.pack(this);
    }

    getErrors() {
        let errors = [];

        if (! DB.Artifacts.Sets.get(this.set)) {
            errors.push('no_set');
        }

        if (! DB.Artifacts.Mainstats.get(this.mainStat)) {
            errors.push('no_main_stat');
        }

        let rarityData = DB.Artifacts.Rarity[this.rarity-1];

        let statsCnt = Object.keys(this.subStats).length;
        if (statsCnt < rarityData.minSubstats || statsCnt > rarityData.maxSubstats) {
            errors.push('substat_count_mismatch');
        }

        let isStatEqulaMain = false;
        let isSubstatValueRange = false;
        let isSubstatValueRolls = false;
        let isSubstatDuplicate = false;

        let allSubstats = [];
        let upgradesCnt = 0;

        Object.keys(this.subStats).forEach((sub) => {
            if (sub == this.mainStat) {
                isStatEqulaMain = true;
            }

            if (allSubstats.includes(sub)) {
                isSubstatDuplicate = true;
            }
            let statData = DB.Artifacts.Substats.get(sub);
            if (!statData) return;
            allSubstats.push(sub);

            if (substatListValid(sub, this.subStats[sub].value, this.subStats[sub].values, this.rarity)) {
                upgradesCnt += this.subStats[sub].values.length - 1;
            } else {
                let rollData = substatCheck(sub, this.rarity, this.subStats[sub].value);

                if (rollData.last > 0) {
                    if (rollData.steps.length < rollData.maxUpgrades) {
                        isSubstatValueRolls = true;
                    } else {
                        isSubstatValueRange = true;
                    }
                }

                if (rollData.steps.length > 1) {
                    upgradesCnt += rollData.steps.length - 1;
                }
            }
        });

        let maxRarityUpdates = rarityData.maxSubstats - 4 + Math.floor(this.level / 4);
        let minRarityUpdates = Math.max(0, rarityData.minSubstats - 4 + Math.floor(this.level / 4));

        if (upgradesCnt > 0 && Object.keys(this.subStats).length < 4) {
            errors.push('not_full_substats');
        }

        if (upgradesCnt > maxRarityUpdates || upgradesCnt >= rarityData.maxUpgrades) {
            errors.push('too_much_upgrades');
        }

        if (upgradesCnt < minRarityUpdates) {
            errors.push('too_low_upgrades');
        }

        if (isStatEqulaMain) {
            errors.push('substat_equal_main');
        }

        if (isSubstatValueRolls) {
            errors.push('substat_value_rolls');
        }

        if (isSubstatValueRange) {
            errors.push('substat_value_range');
        }

        if (isSubstatDuplicate) {
            errors.push('substat_duplicate');
        }

        return errors;
    }

    getErrorsFormatted() {
        let errors = this.getErrors();

        if (errors.length == 0) return '';

        let result = '';

        for (const text of errors) {
            result += '<p>'+ UI.Lang.get('artifact_error.'+ text) +'</p>';
        }

        return result;
    }

    toGood() {
        let setData = DB.Artifacts.Sets.get(this.set);
        let statData = DB.Artifacts.Mainstats.get(this.mainStat);

        let result = {
            setKey: setData.getGoodId(),
            slotKey: this.slot,
            level: this.level,
            rarity: this.rarity,
            mainStatKey: statData.goodId,
            location: "",
            lock: false,
            substats: [],
            unactivatedSubstats: [],
        };

        this.tryDoRightSubstats();
        Object.keys(this.subStats).forEach((item) => {
            let data = DB.Artifacts.Substats.get(item);
            if (data) {
                let subStat = this.subStats[item];
                if (subStat.unactivated)
                    result.unactivatedSubstats.push({
                        key: data.goodId,
                        value: subStat.value,
                        initialValue: subStat.value,
                    });
                else
                    result.substats.push({
                        key: data.goodId,
                        value: subStat.value,
                        initialValue:
                            subStat.initialValue ? data.rolls[this.rarity - 1][subStat.initialValue - 1] : (
                                subStat.values && subStat.values.length > 0 ? data.rolls[this.rarity - 1][subStat.values[0]] : data.rolls[this.rarity - 1][0]
                            ),
                    });
            }
        });

        return result;
    }

    serialize() {
        let result = [2];

        result.push(DB.Artifacts.Sets.getId(this.set));
        result.push(this.rarity);
        result.push(this.level);
        result.push(DB.Artifacts.Slots.getId(this.slot));
        result.push(DB.Artifacts.Mainstats.getId(this.mainStat) || 0);
        result.push(Object.keys(this.subStats).length);

        this.tryDoRightSubstats();
        Object.keys(this.subStats).forEach((stat) => {
            if (stat.unactivated)
                result.push(25);
            result.push(DB.Artifacts.Substats.getId(stat));

            let substat = DB.Artifacts.Substats.get(stat);
            let statData = this.subStats[stat];
            let value = statData.value;

            if (statData.values && statData.values.length > 0 && value.toFixed(1) == substat.rollsToValue[this.rarity - 1][statData.values.join('')].toFixed(1)) {
                value = statData.values[statData.values.length - 1] + 1;
                for (let i = statData.values.length - 2; i >= 0; i--) {
                    value = (value << 3) + statData.values[i] + 1;
                }
                result.push((value << 1) + 1);
            } else {
                if (substat.type == 'percent') {
                    value = Math.floor(value * 10);
                }
                result.push(value << 1);
            }
        });

        return result;
    }

    clone() {
        return Artifact.deserialize(this.serialize());
    }

    static deserialize(input) {
        let version = input.shift();
        let result = null;

        if (version >= 1) {
            let set = DB.Artifacts.Sets.getKeyId(input.shift());
            if (!set) return null;

            let rarity = input.shift();
            if (rarity < 1 || rarity > 5) return null;

            let level = input.shift();
            if (level < 0 || level > 20) return null;

            let slot = DB.Artifacts.Slots.getKeyId(input.shift());
            if (!slot) return null;

            let mainStat = DB.Artifacts.Mainstats.getKeyId(input.shift()) || '';
            // if (!mainStat) return null;

            let substatCnt = input.shift();
            if (substatCnt < 0 || substatCnt > 4) return null;

            result = new Artifact(rarity, level, slot, set, mainStat);

            if (version >= 2) {
                for (let i = 1; i <= substatCnt; ++i) {
                    let key = input.shift();
                    let unactivated;
                    if (key == 25) {
                        key = input.shift();
                        unactivated = true;
                    }
                    let statKey = DB.Artifacts.Substats.getKeyId(key);
                    if (!statKey) return null;

                    let value = input.shift();
                    if (value < 1) return null;

                    let substat = DB.Artifacts.Substats.get(statKey);
                    if (!substat) return null;

                    let isStacks = value % 2;
                    value = value >> 1;
                    if (isStacks) {
                        let values = [];
                        do {
                            values.push((value % 8) - 1);
                            value = value >> 3;
                        } while (value > 0);

                        result.addStatByProcs(statKey, values, unactivated);
                    } else {
                        if (substat.type == 'percent') {
                            value = parseFloat(value) / 10;
                        } else {
                            value = parseInt(value)
                        }

                        result.addStat(statKey, value, unactivated);
                    }
                }
            } else {
                for (let i = 1; i <= substatCnt; ++i) {
                    let key = input.shift();
                    let unactivated;
                    if (key == 25) {
                        key = input.shift();
                        unactivated = true;
                    }
                    let statKey = DB.Artifacts.Substats.getKeyId(key);
                    if (!statKey) return null;

                    let value = input.shift();
                    if (value < 1) return null;

                    let substat = DB.Artifacts.Substats.get(statKey);
                    if (!substat) return null;

                    if (substat.type == 'percent') {
                        value = parseFloat(value) / 10;
                    } else {
                        value = parseInt(value)
                    }

                    result.addStat(statKey, value, unactivated);
                }
            }
        }

        return result;
    }

    static fromGood(data) {
        let setName = DB.Artifacts.Sets.getKeyIdGood(data.setKey);
        let setData = DB.Artifacts.Sets.get(setName);
        if (!setData) return null;

        let slotData = DB.Artifacts.Slots.get(data.slotKey);
        if (!slotData) return null;

        let mainStat = DB.Artifacts.Mainstats.getKeyIdGood(data.mainStatKey);
        let mainData = DB.Artifacts.Mainstats.get(mainStat);
        if (!mainData) return null;

        if (!mainData.slots.includes(data.slotKey)) return null;

        if (data.rarity < setData.minRarity && data.rarity > setData.maxRarity) return null;

        let rarityData = DB.Artifacts.Rarity[data.rarity - 1];
        if (data.level < 0 && data.level > rarityData.maxLevel) return null;

        let result = new Artifact(data.rarity, data.level, data.slotKey, setName, mainStat);

        let processSubstat = (item, unactivated) => {
            if (!item.key) {
                return;
            }
            let subStat = DB.Artifacts.Substats.getKeyIdGood(item.key);
            if (!subStat) return null;

            let value = item.value;
            let initialValue = 0;
            if (item.initialValue) {
                let fixed = item.initialValue.toFixed(1);
                let ss = DB.Artifacts.Substats.get(subStat);
                for (let i = 0; i < ss.rolls[data.rarity - 1].length; i++)
                    if (fixed == ss.rolls[data.rarity - 1][i].toFixed(1)) {
                        initialValue = i + 1;
                        break;
                    }
            }
            result.addStat(subStat, value, unactivated, initialValue);
        }

        if (Array.isArray(data.substats)) {
            if (data.substats.length > 4) return null;
            data.substats.forEach((item) => processSubstat(item, false));
        }

        if (Array.isArray(data.unactivatedSubstats)) {
            if (data.unactivatedSubstats.length > 4) return null;

            data.unactivatedSubstats.forEach((item) => processSubstat(item, true));
        }

        result.tryDoRightSubstats();
        return result;
    }

    static subStatsIsSimilar(sample, art) {
        if (Object.keys(sample.subStats).length < Object.keys(art.subStats).length) {
            return false;
        }

        for (let i of Object.keys(art.subStats)) {
            if (sample.subStats[i] == undefined || sample.subStats[i].value < art.subStats[i].value) {
                return false;
            }
        }

        return true;
    }

    static inGroups(groups, name) {
        for (let group of groups) {
            if (Artifact.groupsAreEqual(group, name)) {
                return true;
            }
        }
        return false;
    }

    static groupsAreEqual(g1, g2) {
        return g1.toUpperCase() == g2.toUpperCase();
    }

    static trimGroupNames(values) {
        if (!Array.isArray(values)) {
            values = [values]
        }

        let result = [];
        for (let value of values) {
            result.push(Artifact.trimGroupName(value));
        }
        return result;
    }

    static trimGroupName(value) {
        let group = value || '';
        group = group.replace(/[^\w\u0400-\u04ff\d_\-\s]/g, '')
        group = group.replace(/\s+/g, ' ')
        return group.trim();
    }

    static settingName(name) {
        return 'set_pieces.'+ name.toLowerCase();
    }

    static settingNameShort(name) {
        return name.toLowerCase();
    }
}



