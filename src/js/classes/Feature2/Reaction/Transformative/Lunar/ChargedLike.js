import { BuildData } from "../../../../Build/Data";
import { CConst } from "../../../Compile/Types/Item";
import { CBaseBonusReaction, CMultiplierCustom, CMultiplierReaction } from "../../../Compile/Types/Block";
import { FeatureReactionLunarCharged } from "./Charged";
import { makeStatItem } from "../../../Compile/Helpers";

export class FeatureReactionLunarChargedLike extends FeatureReactionLunarCharged {
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
                makeStatItem('lunarcharged_multi', data.stats),
            ], { percent: true, comment: 'reaction_bonus' }),
            new CMultiplierCustom([new CConst({value: 3, comment: 'lunarcharged', percent: false})]),
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
