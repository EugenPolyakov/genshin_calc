import { CalcBuildFastPermutations, FEATURE_TYPE_INDEX } from "../../classes/CalcBuildFastPermutations";
import { debugLog } from "../../classes/Debug";
import { Stats, isPercent } from "../../classes/Stats";
import { DB } from "../../db/DB";

function factor(z, skip) { let r = 1; for (let i = skip + 1; i <= z; i++) r *= i; return r; }

function comb(n, k) {
    return factor(n, k) / factor(n - k, 1);
}
function comb2(n, k) {
    return factor(n + k - 1, k) / factor(n - 1, 1);
}

function calculateCoef(list) {
    let coef = 1;
    let last = list[list.length - 1];
    let l = 1;
    for (let i = list.length - 2; i >= 0; i--) {
        if (last != list[i]) {
            coef *= factor(l, 1);
            l = 1;
            last = list[i];
        } else
            l++;
    }
    coef *= factor(l, 1);
    return coef;
}

function generateCombByIndex(ofs, idx, n, k, result) {
    let remaining = idx;
    let prev = 0;
    for (let i = 1; i <= k; i++) {
        // Перебираем возможные значения для текущей позиции
        // Текущий элемент должен быть >= prev
        for (let x = prev; x < n; x++) {
            // Сколько сочетаний начинаются с x на этой позиции ?
            // Осталось выбрать(k - i) элементов из(n - x) типов
            let count = comb2(n - x, k - i)

            if (remaining < count) {
                result[i - 1] = x + ofs;
                prev = x;
                break;
            } else
                remaining -= count;
        }
    }
}

function generateCombByValue(flatStep, val, k, ofs, tail, otherM) {
    let base = Math.floor(val / k);
    let filler = Math.min(otherM, Math.floor((val % k) / flatStep));
    let result = tail.fill(base + ofs, otherM);
    k += otherM - 1;
    while (filler > 0) {
        result[k--]++;
        filler--;
    }
    return result;
}

function getPermutationsByCombination(ofs, n, k, idx, max, tail, fullPermutations) {
    let permutations = 0;
    let perm = factor(k + tail.length, 1);
    //if (idx < max / 2) {
        //считаем с начала
        let list = new Array(k).fill(ofs).concat(tail);
        for (let i = 0; i < idx; i++) {
            permutations += perm / calculateCoef(list);
            for (let j = k - 1; j >= 0; j--) {
                list[j]++;
                if (list[j] < n) {
                    for (let l = j + 1; l < k; l++)
                        list[l] = list[j];
                    break;
                }
            }
        }
        permutations += perm / calculateCoef(list);
    /*} else {
        //считаем с конца
        let list = new Array(k).fill(n - 1).concat(tail);
        for (let i = max - 1; i > idx; i--) {
            permutations += perm / calculateCoef(list);
            for (let j = k - 1; j >= 0; j--) {
                if (j == 0 || list[j] != list[j - 1]) {
                    list[j]--;
                    for (let l = j + 1; l < k; l++)
                        list[l] = n - 1;
                    break;
                }
            }
        }
        permutations = fullPermutations - permutations;
    }*/

    return permutations;
}

var fastComb = {
    permutations: {
        count: function (procsCount, k) {
            return Math.pow(procsCount, k);
        },
        generateComb: function (idx, k, procsCount) {
            var result = new Array(k);
            for (let i = 0; i < k; i++) {
                result[i] = procsCount - idx % procsCount - 1 + procsCount * i;
                idx = Math.floor(idx / procsCount);
            }
            return result;
        }
    },
    emptyStat: {
        combTable: [[[0], [1]], [[0, 1], [0, 2], [1, 2]]],
        count: function (procsCount, k) {
            //comb(k+1, k) * Math.pow(procsCount, k)
            return (k + 1) * Math.pow(procsCount, k);
        },
        generateComb: function (idx, k, procsCount) {
            var result = new Array(k);
            for (let i = 0; i < k; i++) {
                result[i] = procsCount - idx % procsCount - 1;
                idx = Math.floor(idx / procsCount);
            }
            for (let i = 0; i < k; i++)
                result[i] += procsCount * this.combTable[k - 1][idx][i];
            return result;
        }
    }
};

class comparator {
    constructor () {
        this.toZero();
    }

    toZero() {
        this.atk = 0;
        this.atk_percent = 0;
        this.def = 0;
        this.def_percent = 0;
        this.hp = 0;
        this.hp_percent = 0;
        this.crit_rate = 0;
        this.crit_dmg = 0;
        this.mastery = 0;
        this.recharge = 0;
    }

    isActual(cmpVal) {
        let isActual = 0;
        for (let stat in cmpVal) {
            if (cmpVal[stat] < this[stat])
                isActual++;
        }
        return isActual == 0;
    }
}
class lowestComb {
    constructor(){
        this.maxLowCombCount = 0;
        this.list = [];
        this.pull = [];
    }

    clear() {
        this.pull = this.pull.concat(this.list);
        this.list.length = 0;
    }

    getFree() {
        let obj = this.pull.pop();
        if (obj)
            obj.toZero();
        else
            obj = new comparator();
        return obj;
    }

    isActual (cmpVal) {
        let isActual = 1;
        for (let lowStats of this.list) {
            isActual = 0;
            for (let stat in lowStats) {
                if (cmpVal[stat] > lowStats[stat])
                    isActual++;
            }
            if (isActual == 0)
                return false;
        }
        return isActual > 0;
    }

    push(cmpVal) {
        for (let i = this.list.length - 1; i >= 0; i--) {
            let lowStats = this.list[i];
            let isActual = 0;
            let isIdentic = 0;
            for (let stat in cmpVal) {
                if (cmpVal[stat] < lowStats[stat])
                    isActual++;
                else if (cmpVal[stat] == lowStats[stat])
                    isIdentic++;
            }
            if (isActual + isIdentic == 10)
                return;
            if (isActual == 0)
                this.pull.push(this.list.splice(i, 1)[0]);
        }
        this.list.push(cmpVal);
        if (this.maxLowCombCount < this.list.length)
            this.maxLowCombCount = this.list.length;
    }
}

export class chanceCalculator extends CalcBuildFastPermutations {
    constructor (data) {
        super(data);

        this.actualValues = data.actualValues;
        this.slot = data.artifacts[0].slot;
        this.allSubStats = new Set([
            'atk', 'atk_percent', 'def', 'def_percent', 'hp', 'hp_percent',
            'crit_rate', 'crit_dmg', 'mastery', 'recharge'
        ]);

        this.maxVal = {
            normal: 0,
            crit: 0,
            average: 0,
        };
        this.goodCount = {
            normal: 0,
            crit: 0,
            average: 0,
        };
        this.lowComb = new lowestComb();
    }

    initArt(index) {
        this.currentArtifact = this.artifacts[index];
        this.packed = this.currentArtifact.getHash();

        this.maxVal.normal = 0;
        this.maxVal.crit = 0;
        this.maxVal.average = 0;
        this.goodCount.normal = 0;
        this.goodCount.crit = 0;
        this.goodCount.average = 0;
    }

    prepare() {
        this.build.artifacts.artifacts[this.slot] = null;
        let oldArts = Object.assign({}, this.build.artifacts.artifacts);
        let tmpArts = this.artifacts;
        this.artifacts = this.artifacts.concat(Object.values(this.build.artifacts.artifacts).filter(x => x));
        this.build.clearArtifacts();

        super.prepare();

        this.defaultSet = {};
        let stats = new Stats();
        for (let art in oldArts) {
            if (oldArts[art]) {
                oldArts[art].calcCache(this.usedStatsArray);
                stats.concat(oldArts[art].calculated);

                this.defaultSet[oldArts[art].set] = (this.defaultSet[oldArts[art].set] || 0) + 1;
            }
        }

        this.defaultArtStats = stats.getConcatFunc();
        this.artifacts = tmpArts;
        this.initialStatFunc = this.buildData.stats.getSetFunc();
    }

    prepareOne() {
        this.progress = 0;
        this.lastProcess = -200;
        this.fullProgressCount = 0;
        this.fullCombCount = 0;

        this.rarity = this.currentArtifact.getRarity() - 1;
        let rarity = DB.Artifacts.Rarity[this.rarity];

        this.maxLevel = rarity.maxLevel;
        this.maxSubstats = rarity.maxSubstats;
        this.subStatsRollsCount = DB.Artifacts.Substats.get('hp').rolls[this.rarity].length;
        this.customStats = Math.floor((rarity.maxLevel - this.currentArtifact.getLevel() + 3) / 4);
        let combCount = 0;
        let mainStat = this.currentArtifact.getMainStat();

        let mainData = DB.Artifacts.Mainstats.get(mainStat);
        let statTable = mainData.values[this.rarity];
        if (isPercent(mainStat))
            this.addMainStat = Function('stats', `stats.${ this.currentArtifact.mainStat } += ${ statTable.getValue(this.maxLevel) / 100 }`);
        else
            this.addMainStat = Function('stats', `stats.${ this.currentArtifact.mainStat } += ${ statTable.getValue(this.maxLevel) }`);

        this.supportedStats = Array.from(this.allSubStats.delete(mainStat));
        this.newStatsCount = rarity.maxSubstats - Object.keys(this.currentArtifact.getSubStats()).length;
        this.customStats -= this.newStatsCount + (this.currentArtifact.getLevel() < 4 ? Object.entries(this.currentArtifact.getSubStats()).reduce((a, x) => x[1].unactivated ? a + 1 : a, 0) : 0);
        this.newStatsCombCount = factor(this.supportedStats.length, this.supportedStats.length - this.newStatsCount) * Math.pow(this.subStatsRollsCount, this.newStatsCount);
        if (this.rarity == 4 && Object.values(this.currentArtifact.getSubStats()).some(x => x.unactivated)) {
            combCount = factor(this.customStats + 16 - 1, 16 - 1) / factor(this.customStats, 1);
        } else {
            combCount = factor(this.customStats + this.subStatsRollsCount * rarity.maxSubstats - 1, this.subStatsRollsCount * rarity.maxSubstats - 1) /
                factor(this.customStats, 1);
        }
        this.fullProgressCount = this.newStatsCombCount * combCount;
        this.currentComb = new Array(this.customStats);
        this.factorFull = factor(this.customStats, 1);

        if (this.subStatsRollsCount == 4) {
            this.flatStatValues = [7, 8, 9, 10];
            this.flatStep = 1;
        } else if (this.subStatsRollsCount == 3) {
            this.flatStatValues = [14, 17, 20];
            this.flatStep = 3;
        } else if (this.subStatsRollsCount == 2) {
            this.flatStatValues = [8, 10];
            this.flatStep = 2;
        }
    }

    justCheckArtifact(otherCombList, inverted, coef) {
        let newArt = this.processedArt;
        let stats = {};
        for (let stat of this.atrKeys) {
            stats[stat] = {
                values: newArt.subStats[stat].values.slice(),
            };
        }
        let dbgVal = Object.fromEntries(this.atrKeys.map(x => [x, []]));
        let evrVal = this.lowComb.getFree();
        //получаем реальные статы c проками
        for (let v of otherCombList) {
            let stat = this.atrKeys[Math.floor(v / this.subStatsRollsCount)];
            var m;
            if (inverted)
                m = this.subStatsRollsCount - v % this.subStatsRollsCount - 1;//сила прока
            else
                m = v % this.subStatsRollsCount;//сила прока
            stats[stat].values.push(m);
            //dbgVal[stat].push(m);
            evrVal[stat] += this.flatStatValues[m];
        }
        let dbgStr = "";
        for (let k of this.atrKeys) {
            stats[k].values = stats[k].values.sort((a, b) => a - b);
            //dbgVal[k] = dbgVal[k].sort();
            //dbgStr += k + ": " + JSON.stringify(dbgVal[k]) + ";";
            let statData = DB.Artifacts.Substats.get(k);

            let lst = stats[k].values.join('');
            if (statData.type == "percent")
                stats[k].value = statData.rollsToValue[this.rarity][lst] / 100;
            else
                stats[k].value = statData.rollsToValue[this.rarity][lst];
        }

        let realCombCount = factor(this.customStats, 1) / coef;
        //dbgStr += realCombCount + ";";
        let isGood = new Set();
        if (this.lowComb.isActual(evrVal)) {
            let artSets = Object.assign({}, this.defaultSet);
            artSets[this.processedArt.set] = (artSets[this.processedArt.set] || 0) + 1;
            let artStats = new Stats();
            this.initialStatFunc(artStats);
            this.defaultArtStats(artStats);
            this.addMainStat(artStats);

            for (let stat of this.atrKeys) {
                artStats.add(stat, stats[stat].value);
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
            this.buildData.stats = artStats;
            let feat2 = compiler.execute(this.buildData);

            for (let key of ['normal', 'crit', 'average']) {
                let val1 = this.actualValues[key];
                let val2 = feat2[FEATURE_TYPE_INDEX[key]];
                let diff = Math.round(val2 / val1 * 1000) / 10 - 100;
                if (diff > 0) {
                    if (val2 > this.maxVal[key])
                        this.maxVal[key] = val2;
                    isGood.add(key);
                }
            }
            this.calcCount++;
            if (isGood.size == 0) {
                this.lowComb.push(evrVal);
                //dbgStr += " bad";
                this.badComb++;
            } //else dbgStr += Array.from(isGood).toString();
        } else {
            this.skipped++;
            //dbgStr += " skipped";
        }

        //valList.push(dbgStr);

        return isGood;
    }

    checkArtifact(inverted) {
        let coef = calculateCoef(this.currentComb);
        let result = this.justCheckArtifact(this.currentComb, inverted, coef);
        this.progress++;
        let realCombCount = factor(this.customStats, 1) / coef;
        this.fullCombCount += realCombCount;
        for (let v of result)
            this.goodCount[v] += realCombCount;

        this.sendProgress();

        return result;
    }

    calcChance(procs, curOfs, k, maxProcs) {
        var j = Math.floor(k / this.subStatsRollsCount); //номер атрибута
        //var m = this.subStatsRollsCount - k % this.subStatsRollsCount - 1;//сила прока
        if (j >= this.maxSubstats) return;
        for (var i = Math.min(maxProcs, procs); i > 0; i--) {
            this.currentComb.fill(k + this.subStatsRollsCount - 1, curOfs);
            if (procs - i > 0)
                this.calcChance(procs - i, curOfs + i, k + this.subStatsRollsCount, maxProcs);
            else
                this.checkArtifact(0);

            let ofs = i;
            while (ofs > 0) {
                for (let j = i - 1; j >= 0; j--) {
                    if (j == 0 || this.currentComb[j + curOfs] != this.currentComb[j - 1 + curOfs]) {
                        this.currentComb[j + curOfs]--;
                        if (this.currentComb[j + curOfs] == k)
                            ofs--;
                        let n = k + this.subStatsRollsCount - 1;
                        for (let l = j + 1; l < i; l++)
                            this.currentComb[l + curOfs] = n;
                        break;
                    }
                }
                if (procs - i > 0)
                    this.calcChance(procs - i, curOfs + i, k + this.subStatsRollsCount, maxProcs);
                else
                    this.checkArtifact(0);
            }
        }
        this.calcChance(procs, curOfs, k + this.subStatsRollsCount, maxProcs);
    }

    calcAllLinePermutations(n, k, max, tail, comp, ofs, otherM) {
        let permutations = 0;
        let perm = factor(tail.length, 1);
        let list = tail.fill(ofs, otherM);

        let val = {};

        for (let i = 1; i < max; i++) {
            val = {};
            //получаем реальные статы c проками
            for (let v of list) {
                let stat = this.atrKeys[Math.floor(v / this.subStatsRollsCount)];
                var m = v % this.subStatsRollsCount;//сила прока
                if (!val[stat]) val[stat] = 0;
                val[stat] += this.flatStatValues[m];
            }
            if (comp.isActual(val))
                permutations += perm / calculateCoef(list);
            for (let j = k - 1 + otherM; j >= otherM; j--) {
                list[j]++;
                if (list[j] < n) {
                    for (let l = j + 1; l < k + otherM; l++)
                        list[l] = list[j];
                    break;
                }
            }

        }

        //получаем реальные статы c проками
        for (let v of list) {
            let stat = this.atrKeys[Math.floor(v / this.subStatsRollsCount)];
            var m = v % this.subStatsRollsCount;//сила прока
            if (!val[stat]) val[stat] = 0;
            val[stat] += this.flatStatValues[m];
        }
        if (comp.isActual(val))
            permutations += perm / calculateCoef(list);

        return permutations;
    }

    addHalf(params, combList, ofs, combLength, maxCombVal, otherM) {
        //добавить границу для всех значений из filterParams
        let comp = new comparator();
        //получаем реальные статы c проками
        for (let v of combList) {
            let stat = this.atrKeys[Math.floor(v / this.subStatsRollsCount)];
            var m = v % this.subStatsRollsCount;//сила прока
            if (!comp[stat]) comp[stat] = 0;
            comp[stat] += this.flatStatValues[m];
        }
        let realCombination = this.calcAllLinePermutations(this.subStatsRollsCount + ofs, combLength, maxCombVal, combList, comp, ofs, otherM);
        for (let stat of params)
            this.goodCount[stat] += realCombination;

        //valList.push(Array.from(params).toString() + " " + realCombination);
    }

    findStat(ofs, min, max, maxCombVal, filterParams, linePermutations, tail, otherM) {
        let combLength = this.customStats - otherM;
        while (min <= max) {
            let half = Math.floor((max + min) / 2);
            let combList = generateCombByValue(this.flatStep, half, combLength, ofs - this.flatStatValues[0], tail, otherM);
            let topBorder = this.justCheckArtifact(combList, 0, calculateCoef(combList)).intersection(filterParams);
            if (topBorder.size == 0)
                min = half + this.flatStep;
            else {
                if (min == half) {
                    this.addHalf(topBorder, combList, ofs, combLength, maxCombVal, otherM);
                    return;
                }

                let lowCombList = generateCombByValue(this.flatStep, half - this.flatStep, combLength, ofs - this.flatStatValues[0], tail.slice(), otherM);

                let prevBorder = this.justCheckArtifact(lowCombList, 0, calculateCoef(lowCombList)).intersection(filterParams);
                let realBorder = topBorder.difference(prevBorder);
                if (realBorder.size > 0)
                    this.addHalf(realBorder, combList, ofs, combLength, maxCombVal, otherM);
                let newBorder = filterParams.difference(topBorder);
                //значение которое отвалилось придётся искать в отдельной ветке
                if (newBorder.size > 0)
                    this.findStat(ofs, half, max, maxCombVal, newBorder, linePermutations, lowCombList, otherM);

                if (prevBorder.size == 0) //нашли все границы
                    return;

                filterParams = prevBorder;
                max = half - this.flatStep;
            }
        }
    }

    calculate(otherCombList, procs, ofs, headLineCombinations, headLinePermutations, otherM) {
        //если самые большие проки дали какой-то результат, то есть смысл что-то дальше проверять
        otherCombList.fill(ofs + this.subStatsRollsCount - 1, otherM);
        let fullLinePermutations = headLinePermutations * this.factorFull / calculateCoef(otherCombList);
        let maxParams = this.justCheckArtifact(otherCombList, 0, calculateCoef(otherCombList));
        if (maxParams.size > 0) {
            otherCombList.fill(ofs, otherM);
            let minParams = this.justCheckArtifact(otherCombList, 0, calculateCoef(otherCombList));
            //сразу зачислим если подошли все значения
            for (let stat of minParams.intersection(maxParams))
                this.goodCount[stat] += fullLinePermutations;
            //найти конец неудачных комбинаций
            minParams = maxParams.difference(minParams);
            if (minParams.size > 0)
                this.findStat(ofs, this.flatStatValues[0] * procs + this.flatStep, this.flatStatValues[this.flatStatValues.length - 1] * procs,
                    headLineCombinations, minParams, fullLinePermutations, otherCombList, otherM);
        }
        //записываем общее число комбинаций
        this.fullCombCount += fullLinePermutations;
        this.progress += headLineCombinations;
        this.fastIterations++;
    }

    doCalculate() {
        this.prepareOne();

        for (let ns = 0; ns < this.newStatsCombCount; ns++) {
            this.processedArt = this.currentArtifact.clone();
            this.processedArt.level = this.maxLevel;
            let ofs = ns;
            for (let i = 0; i < this.newStatsCount; i++) {
                this.processedArt.addStatByProcs(this.supportedStats[ofs % this.supportedStats.length], Math.floor(ofs / this.supportedStats.length % this.subStatsRollsCount).toString());
                ofs = Math.floor(ofs / this.supportedStats.length / this.subStatsRollsCount);
            }
            this.atrKeys = Object.keys(this.processedArt.getSubStats());
            this.lowComb.clear();
            this.skipped = 0;
            this.badComb = 0;
            this.calcCount = 0;
            this.fastIterations = 0;

            let halfProcs = Math.floor(this.customStats / 2);
            let maxProcs = halfProcs;
            if (maxProcs == this.customStats - halfProcs)
                maxProcs--;

            for (let procs = this.customStats; procs > 2; procs--) {
                let headLinePermutations = Math.pow(this.subStatsRollsCount, procs);
                let headLineCombinations = comb2(this.subStatsRollsCount, procs);
                for (let i = 0, cnt = this.atrKeys.length; i < cnt; i++) {
                    let ofs = i * this.subStatsRollsCount;

                    let otherN = (cnt - 1) * this.subStatsRollsCount;
                    let otherM = this.customStats - procs;
                    let otherLineCombinations = comb2(otherN, otherM);
                    for (let otherCombinations = otherLineCombinations - 1; otherCombinations >= 0; otherCombinations--) {
                        generateCombByIndex(0, otherCombinations, otherN, otherM, this.currentComb);
                        for (let j = otherM - 1; j >= 0; j--)
                            if (this.currentComb[j] >= ofs)
                                this.currentComb[j] += this.subStatsRollsCount;
                            else
                                break;
                        this.calculate(this.currentComb, procs, ofs, headLineCombinations, headLinePermutations, otherM);
                    }

                    this.sendProgress();
                }
            }

            //отдельный блок для 2+
            //valList.push("custom");
            let procs = 2;
            let headLinePermutations = Math.pow(this.subStatsRollsCount, procs);
            let headLineCombinations = comb2(this.subStatsRollsCount, procs);
            let skip = new Array(this.atrKeys.length).fill(0);
            for (let i = 0, cnt = this.atrKeys.length; i < cnt; i++) {
                let ofs = i * this.subStatsRollsCount;

                let otherN = (cnt - 1) * this.subStatsRollsCount;
                let otherM = this.customStats - procs;
                let otherLineCombinations = comb2(otherN, otherM);
                for (let otherCombinations = otherLineCombinations - 1; otherCombinations >= 0; otherCombinations--) {
                    generateCombByIndex(0, otherCombinations, otherN, otherM, this.currentComb);
                    for (let j = otherM - 1; j >= 0; j--)
                        if (this.currentComb[j] >= ofs)
                            this.currentComb[j] += this.subStatsRollsCount;
                        else
                            break;
                    for (let j = otherM - 1; j >= 0; j--)
                        skip[Math.floor(this.currentComb[j] / this.subStatsRollsCount)]++;
                    //пропускаем уже обработанную ранее комбинацию с 2 проками в прошлые статы или 3 прока в один стат
                    if (skip.some((x, idx) => x >= 3 || (x >= 2 && idx < i)))
                        continue;
                    this.calculate(this.currentComb, procs, ofs, headLineCombinations, headLinePermutations, otherM);
                }

                this.sendProgress();
            }

            if (this.customStats <= this.atrKeys.length)
                this.calcChance(this.customStats, 0, 0, 1);
            //this.calcChance(customStats, 0, 0, customStats);

            debugLog("calculated: " + this.calcCount + " fast iterations: " + this.fastIterations);
        }

        return {
            currentArtifact: this.packed,
            values: Object.assign({}, this.maxVal),
            goodCount: Object.assign({}, this.goodCount),
            combCount: this.fullCombCount,
        };
    }
}
