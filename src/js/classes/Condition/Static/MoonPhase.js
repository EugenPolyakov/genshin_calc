import { ConditionStatic } from "../Static";

export class ConditionMoonPhaseStatic extends ConditionStatic {
    getDefaultStats(settings) {
        let stats = super.getDefaultStats(settings);
        let level = Math.min(2, settings['moon_phase']);
        if (!level) {
            return stats;
        }

        stats.add('text_number_f', level);

        if (this.params.realStats) {
            for (var i in this.params.realStats)
                stats.add(i, this.params.realStats[i][level]);
        }

        return stats;
    }
}
