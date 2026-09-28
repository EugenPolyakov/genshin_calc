import { makeStatItem, makeStatTotalItem } from "../Compile/Helpers";
import { CBaseBonusReaction, CMulti, CSumPlusOne } from "../Compile/Types/Block";
import { CConst } from "../Compile/Types/Item";
import { FeatureMultiplier } from "../Multiplier";

export class FeatureMultiplierReaction extends FeatureMultiplier  {
    constructor(params) {
        super(params);
        /**
         * @type {number}
         */
        this.reactionValue = params.reactionValue;
        this.reactionRate = params.reactionRate;
        this.scalingStat = params.scalingStat;
    }

    /**
     * @param {BuildData} data
     * @returns {number}
     */
    getTreeBonusMultiplier(data) {
        let rate = this.reactionRate;
        if (typeof rate == "function")
            rate = rate(data);
        let parts = [
            new CConst({
                value: rate,
                percent: true,
                comment: 'reaction_ratio',
            }),
        ];

        if (this.scalingStat) {
            parts.push(
                new CBaseBonusReaction([
                    makeStatItem(this.scalingStat, data.stats),
                ], {percent: true, comment: 'reaction_bonus'}),
            );
        }

        if (parts.length > 1) {
            return new CMulti(parts, {
                percent: true,
                comment: 'reaction_ratio',
            });
        }
        return parts[0];
    }

    /**
     * @param {BuildData} data
     * @returns {CItem}
     */
    getTreeLevelMultiplier(data) {
        return new CConst({
            value: this.reactionValue.getValue(data.settings.char_level),
            comment: 'reaction_base',
        });
    }

    /**
     * @param {BuildData} data
     * @returns {CBlock}
     */
    getTree(data) {
        return new CMulti([
            this.getTreeLevelMultiplier(data),
            this.getTreeBonusMultiplier(data),
        ]);
    }
}
