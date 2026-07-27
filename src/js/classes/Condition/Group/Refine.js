import {Stats} from "../../Stats";
import { ConditionGroup } from "../Group";

export class ConditionGroupRefine extends ConditionGroup {
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
