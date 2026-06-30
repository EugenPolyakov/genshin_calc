import { FeatureReactionBloom } from "../Bloom";

export class FeatureReactionHyperBurgeon extends FeatureReactionBloom {
    /**
     * @returns {Array.<string>}
     */
    getStatsReactionBonus() {
        let result = super.getStatsReactionBonus();
        result.push('dmg_reaction_burgeon');
        return result;
    }
}
