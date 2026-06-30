import { FeatureReactionLunar } from "../Lunar";
import { CSumPlusOne } from "../../../Compile/Types/Block";
import { makeStatItem } from "../../../Compile/Helpers";

export class FeatureReactionLunarCharged extends FeatureReactionLunar {
    constructor (params) {
        if (!Array.isArray(params.tags))
            params.tags = [];
        params.tags.push('lunarcharged');
        super(params);
    }
    getReactionRate() { return 1.8 }
    getReactionPenalty() { return this.penalty }
    getScalingStat(data) { return 'lunarcharged_multi' }

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
