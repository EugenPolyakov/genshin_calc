export class StatTable {
    constructor (stat, values, multi) {
        this.stat = stat;
        if (multi != undefined) {
            this.values = [];
            for (var val of values) {
                this.values.push(val * multi);
            }
        } else
            this.values = values;
    }

    getName() {
        return this.stat;
    }

    getValue(level) {
        if (level > 0) {
            if (level > this.values.length) {
                level = this.values.length;
            }
            return this.values[level - 1];
        }

        return 0;
    }

    getValues() {
        return this.values;
    }

    multiply(multi) {
        return new StatTable(this.stat, this.values, multi)
    }
}
