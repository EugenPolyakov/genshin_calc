import { FeatureReactionLunar } from "../Lunar";

export class FeatureReactionLunarCharged extends FeatureReactionLunar {
    constructor (params) {
        if (!Array.isArray(params.tags))
            params.tags = [];
        params.tags.push('lunarcharged');
        super(params);
    }

    /**
     * @returns {Array.<string>}
     */
    getStatsReactionBonus() {
        let result = super.getStatsReactionBonus();
        result.push('dmg_reaction_lunar');
        result.push('dmg_reaction_lunarcharged');
        return result;
    }
}
