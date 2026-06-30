import { Stats } from "./Stats";

export function substatListValid(stat, value, values, rarity) {
    let statData = DB.Artifacts.Substats.get(stat);

    if (values && values.length > 0) {
        let lst = values.join('');
        let val = statData.rollsToValue[rarity - 1][lst];
        return val && val.toFixed(1) == value.toFixed(1);
    }
    return false;
}

export function substatCheck(stat, rarity, value, values) {
    let statData = DB.Artifacts.Substats.get(stat);
    let rarityData = DB.Artifacts.Rarity[rarity - 1];
    let rolls = statData.rolls[rarity-1];
    let percent = statData.type == 'percent';

    value = parseFloat(value);
    if (Number.isNaN(value))
        value = 0;
    if (substatListValid(stat, value, values, rarity)) {
        let result = [];
        for (let item of values) {
            result.push({
                value: Stats.roundStatValue('', rolls[item], percent),
                rarity: 2 + item,
            });
        }
        return {
            steps: result,
            maxValue: result.length * rolls[rolls.length - 1],
            last: 0,
            maxUpgrades: rarityData.maxUpgrades,
        };
    }
    let resultRolls = [];
    let last = value;
    let result = [];
    if (statData.stacks[rarity - 1][value]) {
        resultRolls = statData.stacks[rarity - 1][value].slice();
        last = 0;
    } else {
        let lst = Object.keys(statData.stacks[rarity - 1]).filter(x => value >= x);
        if (lst.length > 0) {
            let key = Math.max(...lst);
            resultRolls = statData.stacks[rarity - 1][key].slice();
            last = value - key;
        }
    }

    for (let item of resultRolls) {
        result.push({
            value: Stats.roundStatValue('', rolls[item], percent),
            rarity: 2 + item,
        });
    }

    return {
        steps: result,
        maxValue: result.length * rolls[rolls.length - 1],
        last: Stats.roundStatValue('', last, percent),
        maxUpgrades: rarityData.maxUpgrades,
    };
}
