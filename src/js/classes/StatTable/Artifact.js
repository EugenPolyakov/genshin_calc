import { ValueTable } from "../ValueTable";

export class StatTableArtifact extends ValueTable {
    /**
     * @param {Array.<number>} values
     */
    constructor (values, multi) {
        super(values.map(x => Math.fround(x) * multi));
    }

    getValue(level) {
    if (level < this.values.length) {
        return this.values[level];
    }

    return 0;
    }
}
