import { BuildData } from "../../../../Build/Data";
import { CConst } from "../../../Compile/Types/Item";
import { CBaseBonusReaction } from "../../../Compile/Types/Block";
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
            ], { percent: true }),
            new CConst({ value: 1.6, comment: 'direct_reaction' }),
        );
        return result;
    }
}
