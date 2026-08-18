import { BuildData } from "../../../../Build/Data";
import { FeatureReactionStellarGlimmer } from "../StellarGlimmer";

export class FeatureReactionStellarSwirl extends FeatureReactionStellarGlimmer {
    constructor (params) {
        if (!Array.isArray(params.tags))
            params.tags = [];
        params.tags.push('stellar_swirl_reaction');
        super(params);
    }

    /**
     * @returns {Array.<string>}
     */
    getStatsReactionBonus() {
        let result = super.getStatsReactionBonus();
        result.push('dmg_reaction_stellar_glimmer');
        result.push('dmg_reaction_stellar_swirl');
        return result;
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getStatsCritRate(data) {
        let result = this.getDefaultStatsCritRate(data);
        result.push('crit_rate_stellar_swirl');
        return result;
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getStatsCritDamage(data) {
        let result = this.getDefaultStatsCritDamage(data);
        result.push('crit_dmg_stellar_swirl');
        return result;
    }
}
