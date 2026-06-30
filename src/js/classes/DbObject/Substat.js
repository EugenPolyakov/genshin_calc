export class DbObjectSubstat {
    constructor(data) {
        for (const key of Object.keys(data)) {
            this[key] = data[key];
        }
    }

    getPreciseValue(value, rarity) {
        let values = this.preciseValues[rarity-1];
        if (!value) return value;

        return Math.fround(values[value] || value);
    }

    getPreciseValueByStacks(values, rarity) {
        let rolls = this.rollsReal[rarity - 1];
        if (!values || values.length == 0) return 0;

        //let value = values.reduce((acc, x) => Math.fround(rolls[x]) + acc, 0);
        let value = values.reduce((acc, x) => rolls[x] + acc, 0);
        if (this.type == "percent")
            value *= 100;
        return value;
    }
}
