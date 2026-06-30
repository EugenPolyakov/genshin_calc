import { makeStatTotalItem } from "../../Feature2/Compile/Helpers";
import { PostEffectStats } from "../Stats";

export class PostEffectStatsAtk extends PostEffectStats {
    getBaseValueTree(data, opts) {
        return makeStatTotalItem('atk', data.stats);
    }
}
