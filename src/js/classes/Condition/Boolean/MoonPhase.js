import { ConditionBoolean } from "../Boolean";

export class ConditionMoonPhase extends ConditionBoolean {
    getDefaultStats(settings) {
        let stats = super.getDefaultStats(settings);
        let level = Math.min(2, settings['moon_phase']);
        stats.add('text_number_f', level);
        if (!level) {
            return stats;
        }


        if (this.params.realStats) {
            for (var i in this.params.realStats)
                stats.add(i, this.params.realStats[i][level]);
        }

        return stats;
    }
}
