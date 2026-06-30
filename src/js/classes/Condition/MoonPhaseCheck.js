import { Condition } from "../Condition";

export class ConditionMoonPhaseCheck extends Condition {
    isActive(settings) {
        var val = this.params.moonphase | 0;
        var level = Math.min(2, settings['moon_phase'] | 0);

        return level == val;
    }
}
