import { makeStatTotalItem } from "./Compile/Helpers";
import { CMulti, CSum } from "./Compile/Types/Block";
import { CStaticValue } from "./Compile/Types/Damage";
import { CConst } from "./Compile/Types/Item";
import { FeaturePostEffectValue } from "./PostEffectValue";

export class FeatureStatCritValue extends FeaturePostEffectValue {
    constructor(params) {
        super(params);
        this.category = 'stats';
        this.name = 'crit_value';
    }

    getActivePostEffectsTree(data) {
        return data.getActivePostEffectsTree();
    }

    /**
     * @param {BuildData} data
     * @returns {Function}
     */
    getTree(data) {
        return new CStaticValue([
            new CSum([
                makeStatTotalItem('crit_dmg', data.stats),
                new CMulti([makeStatTotalItem('crit_rate', data.stats), new CConst({ value: 2 })]),
            ])
        ]);
    }

}
