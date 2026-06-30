import { ValueTable } from "./ValueTable";

export class StatTable extends ValueTable {
    constructor (stat, values, multi) {
        super(values, multi);
        this.stat = stat;
    }

    getName() {
        return this.stat;
    }

    getValues() {
        return this.values;
    }

    multiply(multi) {
        return new StatTable(this.stat, this.values, multi)
    }
}
