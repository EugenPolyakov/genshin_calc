import { BuildData } from "../../Build/Data";
import { FeatureMultiplierReactionExtended } from "../Multiplier/Reaction/Extended";
import { makeStatItem } from "../Compile/Helpers";
import { CElevationReaction } from "../Compile/Types/Block";
import { FeatureReaction } from "../Reaction";

export class FeatureReactionExtended extends FeatureReaction {
    constructor (params) {
        super(params);
        this.penalty = params.penalty || 1;
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

        //для лунных реакций множитель возвышения только статический и пока так, т.к. если он через Feature,
        //то для прямых реакций лунных героев он попадёт в базовый множитель
        //если нужен будет меняющийся множитель, то придётся переделывать определение базы для прямых лунных реакций от лунных героев
        items.push(new CElevationReaction(this.getStatsReactionBonus().map(x => makeStatItem(x + '_bonus', data.stats)), { percent: true }));

        return items;
    }
}
