import { BuildData } from "../../../../Build/Data";
import { CConst } from "../../../Compile/Types/Item";
import { CBaseBonusReaction, CMultiplierAmplifying, CMultiplierCustom, CMultiplierReaction } from "../../../Compile/Types/Block";
import { makeStatItem } from "../../../Compile/Helpers";
import { FeatureReactionLunarCrystallize } from "./Crystallize";

export class FeatureReactionLunarCrystallizeLike extends FeatureReactionLunarCrystallize {
    constructor(params) {
        params.damageType ||= 'lunardirect';
        params.cannotReact = true;
        super(params);
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<CBlock>}
     */
    getMultiplierReaction(data) {
        let result = super.getMultiplierReaction(data);
        result.push(
            new CBaseBonusReaction([
                makeStatItem('lunarcrystallize_multi', data.stats),
            ], { percent: true, comment: 'reaction_bonus' }),
            new CMultiplierCustom([new CConst({ value: 1.6, comment: 'lunarcrystallize', percent: false})]),
        );
        return result;
    }

    /**
     * @param {BuildData} data
     * @returns {CBlock}
     */
    getReactionBaseMultipliers(data) {
        return this.getMultipliers(data);
    }
}
