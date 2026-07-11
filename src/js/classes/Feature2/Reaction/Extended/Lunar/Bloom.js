import { FeatureReactionLunar } from "../Lunar";

export class FeatureReactionLunarBloom extends FeatureReactionLunar {
    constructor (params) {
        if (!Array.isArray(params.tags))
            params.tags = [];
        params.tags.push('lunarbloom');
        super(params);
    }

    /**
     * @returns {Array.<string>}
     */
    getStatsReactionBonus() {
        let result = super.getStatsReactionBonus();
        result.push('dmg_reaction_lunar');
        result.push('dmg_reaction_lunarbloom');
        return result;
    }

    /**
     * @returns {Array.<string>}
     */
    getStatsCritRate() {
        let result = super.getStatsCritRate();
        result.push('crit_rate_lunarbloom');
        return result;
    }

    /**
     * @returns {Array.<string>}
     */
    getStatsCritDamage() {
        let result = super.getStatsCritDamage();
        result.push('crit_dmg_lunarbloom');
        return result;
    }
}
