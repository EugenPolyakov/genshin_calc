import { Condition } from "../Condition";
import { Stats } from "../Stats";

export class ConditionPartyWeaponSelect extends Condition {
    getDefaultStats(settings) {
        let maxLevel = Math.max(this.params.activeWeaponCondition.isActive(settings) ? settings.weapon_refine : 0, settings[this.params.partyWeaponCondition] || 0);

        let result = new Stats();

        if (maxLevel == 0) {
            return result;
        }

        for (let i = 0; i < this.params.stats.length; ++i) {
            let stat = this.params.stats[i];
            result.add(stat.getName(), stat.getValue(maxLevel));
        }

        return result;
    }
}
