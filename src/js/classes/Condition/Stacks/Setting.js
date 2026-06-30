import { ConditionStacks } from "../Stacks.js"

export class ConditionStacksSetting extends ConditionStacks {
    getType() {
        return 'static';
    }

    getDefaultStats(settings, stacksCnt) {
        let result = super.getDefaultStats(settings, stacksCnt);
        result.add(this.params.name, settings[this.params.name] || 0.001);
        return result;
    }
}
