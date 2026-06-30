import { ConditionNumber } from "../Number";

export class ConditionNumberCitlali extends ConditionNumber {
    getDefaultStats(settings) {
        let stats = super.getDefaultStats(settings);
        let value = this.getValue(settings);

        if (value > 0) {
            if (this.params.selfBonus) {
                stats.add('dmg_all', value * this.params.selfBonus)
            }
            if (this.params.otherBonus) {
                stats.add('dmg_pyro', value * this.params.otherBonus)
                stats.add('dmg_hydro', value * this.params.otherBonus)
            }
        }

        return stats;
    }
}
