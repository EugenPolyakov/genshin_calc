import { Stats } from "./Stats";

export function substatListValid(stat, value, values, rarity) {
    if (values && values.length > 0) {
        let statData = DB.Artifacts.Substats.get(stat);

        let lst = values.join('');
        let val = statData.rollsToValue[rarity - 1][lst];
        return val && val.toFixed(1) == value.toFixed(1);
    }
    return false;
}

export function substatCheck(stat, rarity, value, values, initialValue) {
    let statData = DB.Artifacts.Substats.get(stat);
    let rarityData = DB.Artifacts.Rarity[rarity - 1];
    let rolls = statData.rolls[rarity-1];
    let percent = statData.type == 'percent';

    value = parseFloat(value);
    if (Number.isNaN(value))
        value = 0;
    let resultRolls = [];
    let last = value;
    let result = [];
    if (substatListValid(stat, value, values, rarity)) {
        resultRolls = values;
        last = 0;
    } else {
        if (statData.stacks[rarity - 1][value]) {
            if (initialValue && statData.stacks[rarity - 1][value].length > 1)
                for (let arr of statData.stacks[rarity - 1][value])
                    if (arr.includes(initialValue - 1)) {
                        resultRolls = arr.slice();
                        break;
                    }
            if (resultRolls.length == 0)
                resultRolls = statData.stacks[rarity - 1][value][0].slice();
            last = 0;
        } else {
            let lst = Object.keys(statData.stacks[rarity - 1]).filter(x => value >= x);
            if (lst.length > 0) {
                let key = Math.max(...lst);
                resultRolls = statData.stacks[rarity - 1][key][0].slice();
                last = value - key;
            }
        }
    }

    for (let item of resultRolls) {
        result.push({
            value: percent ? rolls[item].toFixed(1) : rolls[item],
            rarity: 2 + item,
        });
    }

    return {
        steps: result,
        maxValue: statData.rollsToValue[rarity - 1]['3'.repeat(result.length)],
        last: Stats.roundStatValue('', last, percent),
        maxUpgrades: rarityData.maxUpgrades,
        initialValue: initialValue && resultRolls.includes(initialValue - 1) ? initialValue : 0,
    };
}
