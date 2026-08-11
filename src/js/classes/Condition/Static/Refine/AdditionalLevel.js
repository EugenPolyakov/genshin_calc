import { ConditionStaticRefine } from "../Refine";

export class ConditionStaticRefineAdditionalLevel extends ConditionStaticRefine {
    getDefaultStats(settings) {
        let stats = super.getDefaultStats(settings);
        let level = this.params.maxLevel ? Math.min(this.params.maxLevel, settings[this.params.effectLevelSetting]) : settings[this.params.effectLevelSetting];
        if (!level) {
            return stats;
        }

        stats.add('text_number_f', level);

        if (this.params.realStats) {
            for (const tables of this.params.realStats) {
                let stat = tables.getValue(level);
                stats.add(stat.getName(), stat.getValue(settings.weapon_refine))
            }
        }

        return stats;
    }
}
