import { ArtifactGenerator, StatDistributor, StatsObject } from "./Artifacts";

const ALL_SUBSTATS_ROLLS = 2;
const MAX_STATS_PER_ARTIFACT = 4;
const MAX_ROLLS = 40;
const MAX_UNIQ_UPGRADES_PER_ARTIFACT = 1;
const MAX_UPGRADES_PER_ARTIFACT = 4;
const MAX_REALLOCATE_LOOP = 10;

export class ArtifactGeneratorKQM extends ArtifactGenerator {
    makeTestObject(combination, stats) {
        let testObj = new StatsObjectKQM(combination, this.usefulStats, this.usefulStats, this.statRolls, this.settings);

        for (let stat of DB.Artifacts.Substats.getKeys()) {
            for (let i = 1; i <= ALL_SUBSTATS_ROLLS; ++i) {
                let rollValue = testObj.addRoll(stat);
                stats.add(stat, DB.Artifacts.Substats.get(stat).rollsReal[4][rollValue]);
            }
        }

        if (!testObj.satisfyStat('recharge', this.minRecharge, stats) ) {
            return;
        }

        return testObj;
    }

    makeObject(combination, stats) {
        let obj = new StatsObjectKQM(combination, this.usefulStats, this.uselessStats, this.statRolls, this.settings);

        for (let stat of DB.Artifacts.Substats.getKeys()) {
            for (let i = 1; i <= ALL_SUBSTATS_ROLLS; ++i) {
                let rollValue = obj.addRoll(stat);
                stats.add(stat, DB.Artifacts.Substats.get(stat).rollsReal[4][rollValue]);
            }
        }

        return obj;
    }
}

export class StatsObjectKQM extends StatsObject {
    constructor(combination, usefulStats, uselessStats, statValues, settings) {
        settings = Object.assign({}, settings);
        settings.count = 40;
        settings.critRolls = 40;

        super(combination, usefulStats, uselessStats, statValues, settings);
    }

    getStatMaxAllowed(stat) {
        let maxByStat = MAX_ROLLS;
        let maxByMainStat = 2 + (5 - this.getMainStatsCnt(stat)) * (1 + MAX_UNIQ_UPGRADES_PER_ARTIFACT);

        return Math.min(maxByStat, maxByMainStat);
    }

    getStatRollsAllowed(stat) {
        let used = this.rolls[stat] ? this.rolls[stat].length : 0;
        return this.getStatMaxAllowed(stat) - used;
    }

    getDistibutor() {
        return new StatDistributorKQM(this.mainStats, this.rolls);
    }
}

export class StatDistributorKQM extends StatDistributor {
    fillUselessStats() {}

    process() {
        let byNumSlots = {};
        for (let stat of Object.keys(this.rolls)) {
            let avail = Object.values(this.mainStats).reduce((s, i) => {return s + (stat == i ? 0 : 1)}, 0);
            if (!byNumSlots[avail]) byNumSlots[avail] = [];
            byNumSlots[avail].push(stat);
        }


        let byCount = {};
        for (let stat of Object.keys(this.rolls)) {
            byCount[stat] = this.rolls[stat].length;
        }
        for (let num of Object.keys(byNumSlots).sort((a, b) => a - b)) {
            let stats = byNumSlots[num];

            let filtered = Object.entries(byCount).filter(x => stats.includes(x[0])).reduce((acc, x) => { acc[x[0]] = x[1]; return acc; }, {});
            for (let stat of Object.keys(filtered).sort((a, b) => filtered[b] - filtered[a])) {
            //for (let stat of byNumSlots[num]) {
                for (let i = 0, cnt = Math.floor((this.rolls[stat].length + 4) / 5); i < cnt; i++) {
                    let rolls = this.rolls[stat].splice(0, 1);
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

        let loop = 0;
        let isMoved = 1;
        // раскидываем перебор по статам
        mainloop: while (isMoved) {
            if (++loop > MAX_REALLOCATE_LOOP) break;
            isMoved = 0;
            for (let slot of Object.keys(this.mainStats)) {
                if (this.upgradesCount[slot] <= MAX_UPGRADES_PER_ARTIFACT) continue;
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

                        isMoved = 1;
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

                        isMoved = 1;
                        continue mainloop;
                    }
                }
            }
        }
    }
}
