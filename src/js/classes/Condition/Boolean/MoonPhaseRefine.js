import {Stats} from "../../Stats";
import {ConditionBoolean} from "../Boolean";

export class ConditionBooleanMoonPhaseRefine extends ConditionBoolean {
    getDefaultStats(settings) {
        let stats = new Stats();

        if (this.params.stats) {
            for (let stat of this.params.stats) {
                stats.add(stat.getName(), stat.getValue(settings.weapon_refine))
            }
        }

        let level = Math.min(2, settings['moon_phase']);
        stats.add('text_number_f', level);
        if (!level) {
            return stats;
        }

        if (this.params.realStats) {
            for (var stat of this.params.realStats)
                stats.add(stat[level].getName(), stat[level].getValue(settings.weapon_refine));
        }

        return stats;
    }
}
