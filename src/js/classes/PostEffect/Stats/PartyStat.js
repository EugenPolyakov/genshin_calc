import { makeStatItem } from "../../Feature2/Compile/Helpers";
import { PostEffectStats } from "../Stats";

export class PostEffectStatsPartyStat extends PostEffectStats {
    getBaseValueTree(data, opts) {
        return makeStatItem(this.params.partyStat, data.stats);
    }
}
