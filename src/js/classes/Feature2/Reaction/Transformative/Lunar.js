import { BuildData } from "../../../Build/Data";
import { FeatureMultiplierReactionLunarCharged } from "../../Multiplier/Reaction/LunarCharged";
import { FeatureReactionTransformative } from "../Transformative";
import { makeStatItem } from "../../Compile/Helpers";
import { CElevationReaction, CMultiplierReaction, CSumPlusOne } from "../../Compile/Types/Block";

export class FeatureReactionLunar extends FeatureReactionTransformative {
    constructor(params) {
        params.damageType ||= 'lunarreaction';
        if (!Array.isArray(params.tags))
            params.tags = [];
        params.tags.push('lunarreact');
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

    /**
     * @param {BuildData} data
     * @returns {Array}
     */
    getReactionMultipliers(data) {
        let items = super.getReactionMultipliers(data);

        //для лунных реакций доп. множитель только статический и пока так, т.к. если он через Feature,
        //то для прямых реакций лунных героев он попадёт в базовый множитель
        //если нужен будет меняющийся множитель, то придётся переделывать определение базы для прямых лунных реакций от лунных героев
        items.push(new CElevationReaction(this.getStatsReactionBonus().map(x => makeStatItem(x + '_bonus', data.stats)), { percent: true }));

        return items;
    }
}
