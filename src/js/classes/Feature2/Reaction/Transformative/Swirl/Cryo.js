import { reactionDamageValues } from "../../../../../db/generated/ElementScale";
import { FeatureMultiplierReaction } from "../../../Multiplier/Reaction";
import { FeatureReactionSwirl } from "../Swirl";

export class FeatureReactionSwirlCryo extends FeatureReactionSwirl {
    constructor (params) {
        params.element = 'cryo';
        params.multipliers = [
            new FeatureMultiplierReaction({
                reactionRate: 0.6,
                reactionValue: reactionDamageValues,
            })
        ];
        super(params);
    }
    /**
     * @returns {Array.<string>}
     */
    getStatsReactionBonus() {
        let result = super.getStatsReactionBonus();
        result.push('dmg_reaction_swirl_cryo');
        return result;
    }
}
