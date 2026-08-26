import { BuildData } from "../../../Build/Data";
import { FeatureReactionExtended } from "../Extended";

export class FeatureReactionStellarGlimmer extends FeatureReactionExtended {
    constructor (params) {
        params.damageType ||= 'stellarglimmerreaction';
        if (!Array.isArray(params.tags))
            params.tags = [];
        params.tags.push('stellar_conduct_glimmer');
        params.cannotReact = true;
        super(params);
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getStatsCritRate(data) {
        let result = this.getDefaultStatsCritRate(data);
        result.push('crit_rate_stellar_glimmer');
        return result;
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getStatsCritDamage(data) {
        let result = this.getDefaultStatsCritDamage(data);
        result.push('crit_dmg_stellar_glimmer');
        return result;
    }
}
