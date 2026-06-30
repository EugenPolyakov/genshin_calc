import { Condition } from "../Condition";

export class ConditionMoonPhaseBuff extends Condition {
    getStats(settings) {
        let stats = super.getStats(settings);
        let level = Math.min(2, settings['moon_phase']);
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
