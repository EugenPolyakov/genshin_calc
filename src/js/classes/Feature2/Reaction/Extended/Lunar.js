import { BuildData } from "../../../Build/Data";
import { FeatureReactionExtended } from "../Extended";

export class FeatureReactionLunar extends FeatureReactionExtended {
    constructor(params) {
        params.damageType ||= 'lunarreaction';
        if (!Array.isArray(params.tags))
            params.tags = [];
        params.tags.push('lunarreact');
        super(params);
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getStatsCritRate(data) {
        let result = this.getDefaultStatsCritRate(data);
        result.push('crit_rate_lunar');
        return result;
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getStatsCritDamage(data) {
        let result = this.getDefaultStatsCritDamage(data);
        result.push('crit_dmg_lunar');
        return result;
    }
}
