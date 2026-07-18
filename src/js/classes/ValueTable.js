export class ValueTable {
    /**
     * @param {Array.<number>} values
     */
    constructor (values, multi) {
        if (multi != undefined && multi != 1) {
            this.values = values.map(x => x instanceof ValueTable ? x.multiply(multi) : multi * Math.fround(x));
        } else
            this.values = values.map(x => x instanceof ValueTable ? x : Math.fround(x));
    }

     /**
     * @param {number} level
     * @returns {number}
     */
    getValue(level) {
        if (level > 0) {
            if (level > this.values.length) {
                level = this.values.length;
            }
            return this.values[level - 1];
        }

        return 0;
    }

    multiply(multi) {
        return new ValueTable(this.values, multi)
    }
}
