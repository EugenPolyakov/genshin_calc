import { ConditionNumber } from "../Number";

export class ConditionNumberShenhe extends ConditionNumber {
    getDefaultStats(settings) {
        let stats = super.getDefaultStats(settings);
        let value = this.getValue(settings);

        if (value) {
            stats.add('dmg_skill_shenhe', value * 5);
        }

        return stats;
    }
}
