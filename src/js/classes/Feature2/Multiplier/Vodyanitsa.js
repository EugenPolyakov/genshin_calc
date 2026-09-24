import { BuildData } from "../../Build/Data";
import { CConst } from "../Compile/Types/Item";
import { FeatureMultiplier } from "../Multiplier";

export class FeatureMultiplierVodyanitsa extends FeatureMultiplier {
    constructor(data) {
        super(data);
        this.scalingValues = data.scalingValues;
    }

    /**
     * @param {BuildData} data
     * @returns {CItem}
     */
    getTreeBonusMultiplier(data) {
        let result = super.getTreeBonusMultiplier(data);
        let bonus;

        if (data.settings.vodyanitsa_sonorous_dawn) {
            let level = data.settings.getLevel('char_skill_burst') || 1;
            bonus = new CConst({
                value: this.scalingValues.getValue(level) / 100 + 1,
                percent: true,
                comment: 'talent_burst',
            });
        }

        if (!bonus) return result;
        if (!result) return bonus;

        return [result, bonus];
    }
}
