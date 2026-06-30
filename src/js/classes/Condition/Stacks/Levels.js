import { ConditionStacks } from "../Stacks"

export class ConditionStacksLevels extends ConditionStacks {
    getDefaultStats(settings, stacksCnt) {
        let result = super.getDefaultStats(settings, stacksCnt);

        if (stacksCnt) {
            let real = this.params.realStats;
            result.add(real.getName(), real.getValue(stacksCnt));
        }

        return result;
    }
}
