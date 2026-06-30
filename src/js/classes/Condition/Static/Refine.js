import { ConditionStatic } from "../Static";
import { Stats } from "../../Stats";

export class ConditionStaticRefine extends ConditionStatic {
    getDefaultStats(settings) {
        let stats = new Stats();

        if (this.params.stats) {
            for (const stat of this.params.stats) {
                stats.add(stat.getName(), stat.getValue(settings.weapon_refine))
            }
        }

        return stats;
    }
}
