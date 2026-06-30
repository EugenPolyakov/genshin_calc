import { FeatureReactionLunar } from "../Lunar";
import { CSumPlusOne } from "../../../Compile/Types/Block";
import { makeStatItem } from "../../../Compile/Helpers";

export class FeatureReactionLunarCharged extends FeatureReactionLunar {
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

    /**
     * @param {BuildData} data
     * @returns {Array}
     */
    getReactionMultipliers(data) {
        let items = super.getReactionBonusMultipliers(data);

        items.push(new CSumPlusOne([makeStatItem('dmg_raction_lunarcharged_bonus', data.stats)]));

        return items;
    }
}
