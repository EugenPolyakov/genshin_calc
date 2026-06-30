import { FeatureReactionTransformative } from "../Transformative";

export class FeatureReactionOverloaded extends FeatureReactionTransformative {
    /**
     * @returns {Array.<string>}
     */
    getStatsReactionBonus() {
        let result = super.getStatsReactionBonus();
        result.push('dmg_reaction_overloaded');
        return result;
    }
}
