import { BuildData } from "../../../../Build/Data";
import { CBaseBonusReaction, CMultiplierCustom } from "../../../Compile/Types/Block";
import { makeStatItem } from "../../../Compile/Helpers";
import { CConst } from "../../../Compile/Types/Item";
import { FeatureReactionStellarGlimmer } from "../StellarGlimmer";

export class FeatureReactionStellarConduct extends FeatureReactionStellarGlimmer {
    constructor (params) {
        if (!Array.isArray(params.tags))
            params.tags = [];
        params.tags.push('stellar_conduct_reaction');
        params.cannotReact = true;
        super(params);
    }

    /**
     * @returns {Array.<string>}
     */
    getStatsReactionBonus() {
        let result = super.getStatsReactionBonus();
        result.push('dmg_reaction_stellar_glimmer');
        result.push('dmg_reaction_stellar_conduct');
        return result;
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getStatsCritRate(data) {
        let result = this.getDefaultStatsCritRate(data);
        result.push('crit_rate_stellar_conduct');
        return result;
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getStatsCritDamage(data) {
        let result = this.getDefaultStatsCritDamage(data);
        result.push('crit_dmg_stellar_conduct');
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
                makeStatItem('stellar_conduct_multi', data.stats),
            ], { percent: true, comment: 'reaction_bonus' }),
        );
        if (data.settings.allowed_stellar_conduct && data.settings['common.enemy_superconduct'] && data.settings['common.polestar_field_stacks'])
            result.push(new CMultiplierCustom([new CConst({ value: 1, comment: 'base_bonus', percent: true }), makeStatItem('polestar_field', data.stats)]));
        return result;
    }
}
