import { Condition } from "../Condition";
import { Stats } from "../Stats";

export class ConditionBoLStat extends Condition {
    getDefaultStats(settings) {
        return new Stats({bond_of_life: settings['common.bond_of_life'] || 0});
    }
}
