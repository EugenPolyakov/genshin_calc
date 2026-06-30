import { Artifact } from "../../classes/Artifact";
import { Stats } from "../../classes/Stats";
import { CalcBuildFastPermutations, FEATURE_TYPE_INDEX } from "../../classes/CalcBuildFastPermutations";

export class ArtifactsSuggest extends CalcBuildFastPermutations {
    constructor (data) {
        super(data);

        this.featureType = data.featureType;
        this.skippedOnPrepare = 0;
        this.limit = data.limit || 20;
    }

    prepare() {
        this.currentArts = this.build.getArtifacts();
        this.build.clearArtifacts();
        // this.addArtifactPostSettings();
        this.build.artifacts.modifySettings(this.settings.sets_settings);

        super.prepare();

        this.prepareArtifacts();
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

        let canEmblem4 = this.setData['EmblemofSeveredFate'] && Math.max(...Object.keys(this.setData['EmblemofSeveredFate'])) >= 4 && this.usedStats.has("dmg_burst");
        for (let art of this.artifacts) {
            art.calcCache(this.usedStatsArray);

            //фильтрация работает пока нет артефакта с пост-эффектами которые увеличивают обычные хар-ки
            //если появится такой набор артефактов, то все эти оптимизации идут нафиг, т.к. любой кусок может зарешать
            //Эмблема всегда добавляется если учитывается урон Взрыва стихии, т.к. на данном этапе невозможно просчитать насколько артефакт будет полезен
            //подобный механизм нужно делать для всех артефактов с постэффектами
            //так же добавляем все артефакты из наборов которые требует пользователь, чтобы можно было хоть что-то подобрать
            if ((canEmblem4 && art.set == "EmblemofSeveredFate") || this.settings.setMinValues[art.set]) {
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
                    curArt.calcCache(this.usedStatsArray);
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
