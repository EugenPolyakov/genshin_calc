import { ConditionStatic } from "../Static";
import { Stats } from "../../Stats";
import { getSkillLevelByName } from "../../Build/Settings";

export class ConditionStaticLevel extends ConditionStatic {
    getLevel(settings) {
        let level = getSkillLevelByName(this.params.levelSetting, settings);

        if (this.params.fromZero && settings[this.params.levelSetting])
            ++level;

        return level;
    }

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
