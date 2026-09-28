import { BuildData } from "../../../../Build/Data";
import { CConst } from "../../../Compile/Types/Item";
import { CBaseBonusReaction } from "../../../Compile/Types/Block";
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
            ], { percent: true }),
            new CConst({ value: 3, comment: 'direct_reaction' }),
        );
        return result;
    }
}
