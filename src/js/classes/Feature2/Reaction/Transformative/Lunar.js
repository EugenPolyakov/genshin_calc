import { BuildData } from "../../../Build/Data";
import { FeatureMultiplierReactionLunarCharged } from "../../Multiplier/Reaction/LunarCharged";
import { FeatureReactionTransformative } from "../Transformative";

export class FeatureReactionLunar extends FeatureReactionTransformative {
    constructor(params) {
        params.damageType ||= 'lunarreaction';
        super(params);
        this.penalty = params.penalty || 1;
    }

    getReactionMasteryBonus(data) {
        return FeatureMultiplierReactionLunarCharged.masteryMultiplier(data);
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getStatsCritRate(data) {
        return this.getDefaultStatsCritRate(data);
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getStatsCritDamage(data) {
        return this.getDefaultStatsCritDamage(data);
    }

    /**
     * @returns {Array.<string>}
     */
    getStatsReactionBonus() {
        let result = super.getStatsReactionBonus();
        result.push('dmg_reaction_lunar');
        return result;
    }
}
