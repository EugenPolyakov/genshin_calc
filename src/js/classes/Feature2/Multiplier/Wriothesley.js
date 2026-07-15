import { BuildData } from "../../Build/Data";
import { CSum } from "../Compile/Types/Block";
import { CConst } from "../Compile/Types/Item";
import { FeatureMultiplier } from "../Multiplier";

export class FeatureMultiplierWriothesley extends FeatureMultiplier {
    constructor(data) {
        super(data);
        this.scalingValues = data.scalingValues;
        this.customScalingCondition = data.customScalingCondition;
        this.customScalingValue = data.customScalingValue;
    }

    /**
     * @param {BuildData} data
     * @returns {CItem}
     */
    getTreeBonusMultiplier(data) {
        let bonuses = [];
        let mult = super.getTreeBonusMultiplier(data);
        if (mult) {
            if (this.customScalingCondition && this.customScalingCondition.isActive(data.settings)) {
                mult = new CSum([mult, new CConst({
                    value: this.customScalingValue,
                    percent: true,
                    comment: 'constellation2',
                })], { percent: true, comment: 'constellation2' });
            }
            bonuses.push(mult);
        }

        if (data.settings.wriothesley_chilling_penalty) {
            let level = data.settings.getLevel('char_skill_elemental') || 1;
            bonuses.push(new CConst({
                value: this.scalingValues.getValue(level) / 100,
                percent: true,
                comment: 'talent_elemental',
            }));
        }

        return bonuses;
    }
}
