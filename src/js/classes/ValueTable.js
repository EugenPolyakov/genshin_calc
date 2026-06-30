export class ValueTable {
    /**
     * @param {Array.<number>} values
     */
    constructor (values, multi) {
        if (multi != undefined) {
            this.values = values.map(x => x instanceof ValueTable ? x.multiply(multi) : parseFloat((parseFloat(x).toFixed(4) * multi).toFixed(4)));
        } else
            this.values = values.map(x => x instanceof ValueTable ? x : parseFloat(parseFloat(x).toFixed(4)));
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
