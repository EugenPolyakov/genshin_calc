import { FeatureReactionBloom } from "../Bloom";

export class FeatureReactionHyperBloom extends FeatureReactionBloom {
    /**
     * @returns {Array.<string>}
     */
    getStatsReactionBonus() {
        let result = super.getStatsReactionBonus();
        result.push('dmg_reaction_hyperbloom');
        return result;
    }
}
