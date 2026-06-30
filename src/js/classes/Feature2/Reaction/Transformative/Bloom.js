import { makeStatItem } from "../../Compile/Helpers";
import { CMin, CSum } from "../../Compile/Types/Block";
import { CCritDmg } from "../../Compile/Types/Damage";
import { CConst } from "../../Compile/Types/Item";
import { FeatureReactionTransformative } from "../Transformative";

export class FeatureReactionBloom extends FeatureReactionTransformative {
    constructor (params) {
        if (!Array.isArray(params.tags))
            params.tags = [];
        params.tags.push('bloom');
        super(params);
    }

    /**
     * @returns {Array.<string>}
     */
    getStatsReactionBonus() {
        let result = super.getStatsReactionBonus();
        result.push('dmg_reaction_bloom');
        return result;
    }

    /**
     * @returns {Array.<string>}
     */
    getStatsCritRate() {
        let result = super.getStatsCritRate();
        result.push('crit_rate_bloom');
        return result;
    }

    /**
     * @returns {Array.<string>}
     */
    getStatsCritDamage() {
        let result = super.getStatsCritDamage();
        result.push('crit_dmg_bloom');
        return result;
    }

    getCritDmgBlock(data) {
        let items = this.getStatsCritDamage(data).map((stat) => { return makeStatItem(stat, data.stats) });
        if (items.length == 0) {
            return new CCritDmg([new CConst({ value: 0 })]);
        }
        return new CCritDmg([new CMin([new CSum(items), new CConst({ value: 1 })])]);
    }
}
