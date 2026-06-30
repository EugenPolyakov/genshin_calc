import { ConditionStatic } from "../Static";

export class ConditionCustomLevelStatic extends ConditionStatic {
    getDefaultStats(settings) {
        let stats = super.getDefaultStats(settings);
        let level = settings[this.params.levelSetting];
        if (this.params.maxLevelSetting)
            level = Math.min(this.params.maxLevelSetting, level);
        if (typeof level == "undefined") {
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
