import { Artifact } from "../classes/Artifact";
import { CalcSet } from "../classes/CalcSet";
import { Serializer } from "../classes/Serializer";
import { DB } from "../db/DB";

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

function generateCombByIndex(ofs, idx, n, k) {
    let result = [];
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
                result.push(x + ofs);
                prev = x;
                break;
            } else
                remaining -= count;
        }
    }

    return result;
}

function generateCombByValue(flatStep, val, k, ofs) {
    let base = Math.floor(val / k);
    let filler = Math.floor((val % k) / flatStep);
    let result = new Array(k).fill(base + ofs);
    k--;
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

self.onmessage = function (input) {
    let data = input.data;
    let maxVal = {
        normal: 0,
        crit: 0,
        average: 0,
    };
    let goodCount = {
        normal: 0,
        crit: 0,
        average: 0,
    };
    let build = CalcSet.deserialize(data.build);
    let fullProgressCount = data.newStatsCombCount * data.combCount;
    let currentArtifact = Serializer.unpack(data.currentArtifact);
    let rarity = DB.Artifacts.Rarity[data.rarity - 1];
    let progress = 0;
    let fullCombCount = 0;
    let lastProcess = -200;
    let flatStatValues;
    let flatStep;
    if (data.subStatsRollsCount == 4) {
        flatStatValues = [7, 8, 9, 10];
        flatStep = 1;
    } else if (data.subStatsRollsCount == 3) {
        flatStatValues = [14, 17, 20];
        flatStep = 3;
    } else if (data.subStatsRollsCount == 2) {
        flatStatValues = [8, 10];
        flatStep = 2;
    }
    for (let ns = 0; ns < data.newStatsCombCount; ns++) {
        let newArt2 = Artifact.deserialize(currentArtifact.slice());
        newArt2.level = rarity.maxLevel;
        let ofs = ns;
        for (let i = 0; i < data.newStatsCount; i++) {
            newArt2.addStatByProcs(data.supportedStats[ofs % data.supportedStats.length], Math.floor(ofs / data.supportedStats.length % data.subStatsRollsCount).toString());
            ofs = Math.floor(ofs / data.supportedStats.length / data.subStatsRollsCount);
        }
        let valList = [];
        let atrKeys = Object.keys(newArt2.getSubStats());
        let lowComb = {
            maxLowCombCount: 0,
            list: [],
            isActual: function (cmpVal) {
                let isActual = atrKeys.length;
                for (let lowStats of this.list) {
                    isActual = 0;
                    for (let stat of atrKeys) {
                        if (cmpVal[stat] > lowStats[stat])
                            isActual++;
                    }
                    if (isActual == 0)
                        return false;
                }
                return isActual > 0;
            },
            push: function (cmpVal) {
                for (let i = this.list.length - 1; i >= 0; i--) {
                    let lowStats = this.list[i];
                    let isActual = 0;
                    let isIdentic = 0;
                    for (let stat of atrKeys) {
                        if (cmpVal[stat] < lowStats[stat])
                            isActual++;
                        else if (cmpVal[stat] == lowStats[stat])
                            isIdentic++;
                    }
                    if (isActual + isIdentic == atrKeys.length)
                        return;
                    if (isActual == 0)
                        this.list.splice(i, 1);
                }
                this.list.push(Object.assign({}, cmpVal));
                if (this.maxLowCombCount < this.list.length)
                    this.maxLowCombCount = this.list.length;
            }
        };
        let skipped = 0;
        let badComb = 0;
        let calcCount = 0;
        let fastIterations = 0;

        var justCheckArtifact = function (cur, inverted, coef) {
            let newArt = newArt2.clone();
            let stats = newArt.getSubStats();
            let dbgVal = Object.fromEntries(atrKeys.map(x => [x, []]));
            let evrVal = Object.fromEntries(atrKeys.map(x => [x, 0]));
            //получаем реальные статы c проками
            for (let v of cur) {
                let stat = atrKeys[Math.floor(v / data.subStatsRollsCount)];
                var m;
                if (inverted)
                    m = data.subStatsRollsCount - v % data.subStatsRollsCount - 1;//сила прока
                else
                    m = v % data.subStatsRollsCount;//сила прока
                stats[stat].values.push(m);
                //dbgVal[stat].push(m);
                evrVal[stat] += flatStatValues[m];
            }
            let dbgStr = "";
            for (let k of atrKeys) {
                stats[k].values = stats[k].values.sort((a, b) => a - b);
                //dbgVal[k] = dbgVal[k].sort();
                //dbgStr += k + ": " + JSON.stringify(dbgVal[k]) + ";";
                let statData = DB.Artifacts.Substats.get(k);

                let lst = stats[k].values.join('');
                stats[k].value = statData.rollsToValue[data.rarity - 1][lst];
            }

            let realCombCount = factor(cur.length, 1) / coef;
            //dbgStr += realCombCount + ";";
            let isGood = new Set();
            if (lowComb.isActual(evrVal)) {
                build.setArtifact(newArt);
                build.setArtifactsSettings(data.artSettings);
                build.artifacts.removeInvalidSettings();

                let feat2 = build.calcFeatures(1)[data.feature];

                for (let key of ['normal', 'crit', 'average']) {
                    let val1 = data.actualValues[key];
                    let val2 = feat2[key];
                    let diff = Math.round(val2 / val1 * 1000) / 10 - 100;
                    if (diff > 0) {
                        if (val2 > maxVal[key])
                            maxVal[key] = val2;
                        isGood.add(key);
                    }
                }
                calcCount++;
                if (isGood.size == 0) {
                    lowComb.push(evrVal);
                    //dbgStr += " bad";
                    badComb++;
                } //else dbgStr += Array.from(isGood).toString();
            } else {
                skipped++;
                //dbgStr += " skipped";
            }

            //valList.push(dbgStr);

            return isGood;
        };

        var checkArtifact = function (cur, coef, inverted) {
            let result = justCheckArtifact(cur, inverted, coef);
            progress++;
            let realCombCount = factor(cur.length, 1) / coef;
            fullCombCount += realCombCount;
            for (let v of result)
                goodCount[v] += realCombCount;

            if (progress - lastProcess > 200) {
                self.postMessage({
                    calculating: true,
                    currentArtifact: data.currentArtifact,
                    progress: progress / fullProgressCount * 100,
                });
                lastProcess = progress;
            }

            return result;
        };

        var calcChance = function (procs, cur, k, coef, maxProcs) {
            var j = Math.floor(k / data.subStatsRollsCount); //номер атрибута
            //var m = data.subStatsRollsCount - k % data.subStatsRollsCount - 1;//сила прока
            if (j >= rarity.maxSubstats) return;
            for (var i = Math.min(maxProcs, procs); i > 0; i--) {
                var tmpArt = new Array(i).fill(k + data.subStatsRollsCount - 1);
                if (procs - i > 0)
                    calcChance(procs - i, cur.concat(tmpArt), k + data.subStatsRollsCount, coef * calculateCoef(tmpArt), maxProcs);
                else
                    checkArtifact(cur.concat(tmpArt), coef * calculateCoef(tmpArt), 0);

                let ofs = i;
                while (ofs > 0) {
                    for (let j = i - 1; j >= 0; j--) {
                        if (j == 0 || tmpArt[j] != tmpArt[j - 1]) {
                            tmpArt[j]--;
                            if (tmpArt[j] == k)
                                ofs--;
                            let n = k + data.subStatsRollsCount - 1;
                            for (let l = j + 1; l < i; l++)
                                tmpArt[l] = n;
                            break;
                        }
                    }
                    if (procs - i > 0)
                        calcChance(procs - i, cur.concat(tmpArt), k + data.subStatsRollsCount, coef * calculateCoef(tmpArt), maxProcs);
                    else
                        checkArtifact(cur.concat(tmpArt), coef * calculateCoef(tmpArt), 0);
                }
            }
            calcChance(procs, cur, k + data.subStatsRollsCount, coef, maxProcs);
        };

        var calcAllLinePermutations = function (n, k, max, tail, comp, ofs) {
            let permutations = 0;
            let perm = factor(k + tail.length, 1);
            let list = new Array(k).fill(ofs).concat(tail);

            let val = {};

            for (let i = 1; i < max; i++) {
                val = {};
                //получаем реальные статы c проками
                for (let v of list) {
                    let stat = atrKeys[Math.floor(v / data.subStatsRollsCount)];
                    var m = v % data.subStatsRollsCount;//сила прока
                    if (!val[stat]) val[stat] = 0;
                    val[stat] += flatStatValues[m];
                }
                if (comp.isActual(val))
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

            //получаем реальные статы c проками
            for (let v of list) {
                let stat = atrKeys[Math.floor(v / data.subStatsRollsCount)];
                var m = v % data.subStatsRollsCount;//сила прока
                if (!val[stat]) val[stat] = 0;
                val[stat] += flatStatValues[m];
            }
            if (comp.isActual(val))
                permutations += perm / calculateCoef(list);

            return permutations;
        }

        var findStat = function (ofs, min, max, maxCombVal, filterParams, linePermutations, tail) {
            let combLength = data.customStats - tail.length;
            var addHalf = function (params, combList) {
                //добавить границу для всех значений из filterParams
                let comp = {
                    isActual: function (cmpVal) {
                        let isActual = 0;
                        for (let stat of atrKeys) {
                            if (cmpVal[stat] < this[stat])
                                isActual++;
                        }
                        return isActual == 0;
                    },
                };
                //получаем реальные статы c проками
                for (let v of combList) {
                    let stat = atrKeys[Math.floor(v / data.subStatsRollsCount)];
                    var m = v % data.subStatsRollsCount;//сила прока
                    if (!comp[stat]) comp[stat] = 0;
                    comp[stat] += flatStatValues[m];
                }
                let realCombination = calcAllLinePermutations(data.subStatsRollsCount + ofs, combLength, maxCombVal, tail, comp, ofs);
                for (let stat of params)
                    goodCount[stat] += realCombination;

                valList.push(Array.from(params).toString() + " " + realCombination);
            }
            while (min <= max) {
                let half = Math.floor((max + min) / 2);
                let combList = generateCombByValue(flatStep, half, combLength, ofs - flatStatValues[0]).concat(tail);
                let topBorder = justCheckArtifact(combList, 0, calculateCoef(combList)).intersection(filterParams);
                if (topBorder.size == 0)
                    min = half + flatStep;
                else {
                    if (min == half) {
                        addHalf(topBorder, combList);
                        return;
                    }

                    let lowCombList = generateCombByValue(flatStep, half - flatStep, combLength, ofs - flatStatValues[0]).concat(tail);

                    let prevBorder = justCheckArtifact(lowCombList, 0, calculateCoef(lowCombList)).intersection(filterParams);
                    let realBorder = topBorder.difference(prevBorder);
                    if (realBorder.size > 0)
                        addHalf(realBorder, combList);
                    let newBorder = filterParams.difference(topBorder);
                    //значение которое отвалилось придётся искать в отдельной ветке
                    if (newBorder.size > 0)
                        findStat(ofs, half, max, maxCombVal, newBorder, linePermutations, tail);

                    if (prevBorder.size == 0) //нашли все границы
                        return;

                    filterParams = prevBorder;
                    max = half - flatStep;
                }
            }
        };

        (() => {
            let halfProcs = Math.floor(data.customStats / 2);
            let maxProcs = halfProcs;
            if (maxProcs == data.customStats - halfProcs)
                maxProcs--;
            let factorFull = factor(data.customStats, 1);
            var calculate = function (otherCombList, procs, ofs, headLineCombinations, headLinePermutations) {
                //если самые большие проки дали какой-то результат, то есть смысл что-то дальше проверять
                let topBorder = otherCombList.concat(new Array(procs).fill(ofs + data.subStatsRollsCount - 1));
                let fullLinePermutations = headLinePermutations * factorFull / calculateCoef(topBorder);
                let maxParams = justCheckArtifact(topBorder, 0, calculateCoef(topBorder));
                if (maxParams.size > 0) {
                    let lowBorder = otherCombList.concat(new Array(procs).fill(ofs));
                    let minParams = justCheckArtifact(lowBorder, 0, calculateCoef(lowBorder));
                    //сразу зачислим если подошли все значения
                    for (let stat of minParams.intersection(maxParams))
                        goodCount[stat] += fullLinePermutations;
                    //найти конец неудачных комбинаций
                    minParams = maxParams.difference(minParams);
                    if (minParams.size > 0)
                        findStat(ofs, flatStatValues[0] * procs + flatStep, flatStatValues[flatStatValues.length - 1] * procs,
                            headLineCombinations, minParams, fullLinePermutations, otherCombList);
                }
                //записываем общее число комбинаций
                fullCombCount += fullLinePermutations;
                progress += headLineCombinations;
                fastIterations++;
            }
            for (let procs = data.customStats; procs > 2; procs--) {
                let headLinePermutations = Math.pow(data.subStatsRollsCount, procs);
                let headLineCombinations = comb2(data.subStatsRollsCount, procs);
                for (let i = 0, cnt = atrKeys.length; i < cnt; i++) {
                    let ofs = i * data.subStatsRollsCount;

                    let otherN = (cnt - 1) * data.subStatsRollsCount;
                    let otherM = data.customStats - procs;
                    let otherLineCombinations = comb2(otherN, otherM);
                    for (let otherCombinations = otherLineCombinations - 1; otherCombinations >= 0; otherCombinations--) {
                        let otherCombList = generateCombByIndex(0, otherCombinations, otherN, otherM);
                        for (let j = otherCombList.length - 1; j >= 0; j--)
                            if (otherCombList[j] >= ofs)
                                otherCombList[j] += data.subStatsRollsCount;
                            else
                                break;
                        calculate(otherCombList, procs, ofs, headLineCombinations, headLinePermutations);
                    }

                    if (progress - lastProcess > 200) {
                        self.postMessage({
                            calculating: true,
                            currentArtifact: data.currentArtifact,
                            progress: progress / fullProgressCount * 100,
                        });
                        lastProcess = progress;
                    }
                }
            }

            //отдельный блок для 2+
            valList.push("custom");
            let procs = 2;
            let headLinePermutations = Math.pow(data.subStatsRollsCount, procs);
            let headLineCombinations = comb2(data.subStatsRollsCount, procs);
            for (let i = 0, cnt = atrKeys.length; i < cnt; i++) {
                let ofs = i * data.subStatsRollsCount;

                let otherN = (cnt - 1) * data.subStatsRollsCount;
                let otherM = data.customStats - procs;
                let otherLineCombinations = comb2(otherN, otherM);
                for (let otherCombinations = otherLineCombinations - 1; otherCombinations >= 0; otherCombinations--) {
                    let otherCombList = generateCombByIndex(0, otherCombinations, otherN, otherM);
                    for (let j = otherCombList.length - 1; j >= 0; j--)
                        if (otherCombList[j] >= ofs)
                            otherCombList[j] += data.subStatsRollsCount;
                        else
                            break;
                    let skip = new Array(atrKeys.length).fill(0);
                    for (let j = otherCombList.length - 1; j >= 0; j--)
                       skip[Math.floor(otherCombList[j] / data.subStatsRollsCount)]++;
                    //пропускаем уже обработанную ранее комбинацию с 2 проками в прошлые статы или 3 прока в один стат
                    if (skip.some((x, idx) => x >= 3 || (x >= 2 && idx < i)))
                        continue;
                    calculate(otherCombList, procs, ofs, headLineCombinations, headLinePermutations);

                    if (progress - lastProcess > 200) {
                        self.postMessage({
                            calculating: true,
                            currentArtifact: data.currentArtifact,
                            progress: progress / fullProgressCount * 100,
                        });
                        lastProcess = progress;
                    }
                }
            }

            if (data.customStats <= atrKeys.length)
                calcChance(data.customStats, [], 0, 1, 1);
        })();
        //calcChance(data.customStats, [], 0, 1, data.customStats);

        console.log("calculated: " + calcCount + " fast iterations: " + fastIterations);
    }

    self.postMessage({
        currentArtifact: data.currentArtifact,
        actualValues: data.actualValues,
        profitValues: maxVal,
        goodCount,
        combCount: fullCombCount,
    });
}
