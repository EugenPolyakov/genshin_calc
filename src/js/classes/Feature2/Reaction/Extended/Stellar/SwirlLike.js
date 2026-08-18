import { BuildData } from "../../../../Build/Data";
import { CBaseBonusReaction } from "../../../Compile/Types/Block";
import { makeStatItem } from "../../../Compile/Helpers";
import { FeatureReactionStellarSwirl } from "./Swirl";

export class FeatureReactionStellarSwirlLike extends FeatureReactionStellarSwirl {
    constructor (params) {
        params.damageType ||= 'stellardirect';
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
                makeStatItem('stellar_swirl_multi', data.stats),
            ], { percent: true, comment: 'reaction_bonus' }),
        );
        return result;
    }
}
