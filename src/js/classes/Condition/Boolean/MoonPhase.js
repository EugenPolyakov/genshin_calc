import { ConditionBoolean } from "../Boolean";

export class ConditionMoonPhase extends ConditionBoolean {
    getStats(settings) {
        let stats = super.getStats(settings);
        let level = Math.min(2, settings['moon_phase']);
        if (!level) {
            return stats;
        }

        stats.add('text_number_f', level);

        return stats;
    }
}
