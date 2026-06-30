import { ConditionNumber } from "../Number";

export class ConditionNumberPhaseShiftRadiance extends ConditionNumber {
    constructor(params) {
        super(params);

        this.params.class = 'inputs-3digit';
        this.params.format = 'decimal';
    }

    getMinValue() {
        return 0;
    }

    getMaxValue() {
        return 100;
    }

    getDefaultStats(settings) {
        let stats = super.getDefaultStats(settings);

        let value = this.getValue(settings);
        if (!this.params.noStat) {
            let stat = this.params.stat || this.params.name;
            if (stat) {
                stats.set(stat, Math.max(value - 70, 0) * this.params.statScale);
            }
        }

        return stats;
    }
}
