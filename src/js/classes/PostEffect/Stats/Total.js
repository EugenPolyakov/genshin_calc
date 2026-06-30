import { makeStatTotalItem } from "../../Feature2/Compile/Helpers";
import { PostEffectStats } from "../Stats";

export class PostEffectStatsTotal extends PostEffectStats {
    getBaseValueTree(data, opts) {
        return makeStatTotalItem(this.params.from, data.stats);
    }
}
