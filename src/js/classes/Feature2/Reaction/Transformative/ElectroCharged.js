import { FeatureReactionTransformative } from "../Transformative";

export class FeatureReactionElectroCharged extends FeatureReactionTransformative {
    /**
     * @returns {Array.<string>}
     */
    getStatsReactionBonus() {
        let result = super.getStatsReactionBonus();
        result.push('dmg_reaction_electrocharged');
        return result;
    }
}
