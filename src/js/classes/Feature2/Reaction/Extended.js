import { BuildData } from "../../Build/Data";
import { FeatureMultiplierReactionExtended } from "../Multiplier/Reaction/Extended";
import { makeStatItem } from "../Compile/Helpers";
import { CElevationReaction } from "../Compile/Types/Block";
import { FeatureReaction } from "../Reaction";
import { CConst } from "../Compile/Types/Item";

export class FeatureReactionExtended extends FeatureReaction {
    constructor (params) {
        super(params);

        this.reactionPenalty = params.reactionPenalty || 1;
    }
    getReactionMasteryBonus(data) {
        return FeatureMultiplierReactionExtended.masteryMultiplier(data);
    }

    /**
     * @param {BuildData} data
     * @returns {Array}
     */
    getReactionMultipliers(data) {
        let items = super.getReactionMultipliers(data);

        if (this.reactionPenalty && this.reactionPenalty != 1) {
            items.push(
                new CConst({ value: this.reactionPenalty, percent: true, comment: 'reaction_penalty' })
            );
        }

        //для лунных реакций множитель возвышения только статический и пока так, т.к. если он через Feature,
        //то для прямых реакций лунных героев он попадёт в базовый множитель
        //если нужен будет меняющийся множитель, то делать через PostEffectStats
        items.push(new CElevationReaction(this.getStatsReactionBonus().map(x => makeStatItem(x + '_bonus', data.stats)), { percent: true }));

        return items;
    }
}
