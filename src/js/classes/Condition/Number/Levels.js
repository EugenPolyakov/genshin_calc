import { Stats } from "../../Stats";
import { ConditionNumber } from "../Number";

export class ConditionNumberLevels extends ConditionNumber {
    getDefaultStats(settings) {
        let stats = new Stats();
        let level = this.getLevel(settings);

        if (this.params.stats) {
            for (const stat of this.params.stats) {
                stats.add(stat.getName(), stat.getValue(level))
            }
        }

        return stats;
    }
}
