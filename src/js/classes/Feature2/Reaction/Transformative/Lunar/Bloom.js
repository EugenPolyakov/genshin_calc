import { FeatureReactionLunar } from "../Lunar";

export class FeatureReactionLunarBloom extends FeatureReactionLunar {
    getReactionRate() { return 1.8 }
    getReactionPenalty() { return this.penalty }
    getScalingStat(data) { return 'lunarbloom_multi' }

    /**
     * @returns {Array.<string>}
     */
    getStatsReactionBonus() {
        let result = super.getStatsReactionBonus();
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
