import { FeatureReactionTransformative } from "../Transformative";

export class FeatureReactionShattered extends FeatureReactionTransformative {
    /**
     * @returns {Array.<string>}
     */
    getStatsReactionBonus() {
        let result = super.getStatsReactionBonus();
        result.push('dmg_reaction_shatter');
        return result;
    }
}
