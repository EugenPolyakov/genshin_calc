import { BuildData } from "../../../../Build/Data";
import { CBaseBonusReaction } from "../../../Compile/Types/Block";
import { makeStatItem } from "../../../Compile/Helpers";
import { FeatureReactionStellarGlimmer } from "../StellarGlimmer";

export class FeatureReactionStellarSwirl extends FeatureReactionStellarGlimmer {
    constructor (params) {
        if (!Array.isArray(params.tags))
            params.tags = [];
        params.tags.push('stellar_swirl_reaction');
        params.cannotReact = true;
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
        result.push('crit_rate_stellar_swir');
        return result;
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getStatsCritDamage(data) {
        let result = this.getDefaultStatsCritDamage(data);
        result.push('crit_dmg_stellar_swir');
        return result;
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<CBlock>}
     */
    getMultiplierReaction(data) {
        let result = super.getMultiplierReaction(data);
        result.push(
            new CBaseBonusReaction([
                makeStatItem('stellar_swir_multi', data.stats),
            ], { percent: true, comment: 'reaction_bonus' }),
        );
        return result;
    }
}
