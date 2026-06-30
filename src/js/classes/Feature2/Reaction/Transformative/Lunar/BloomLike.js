import { BuildData } from "../../../../Build/Data";
import { CBaseBonusReaction } from "../../../Compile/Types/Block";
import { FeatureReactionLunarBloom } from "./Bloom";
import { makeStatItem } from "../../../Compile/Helpers";

export class FeatureReactionLunarBloomLike extends FeatureReactionLunarBloom {
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
            new CBaseBonusReaction([makeStatItem('lunarbloom_multi', data.stats)], { percent: true, comment: 'reaction_bonus' })
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
