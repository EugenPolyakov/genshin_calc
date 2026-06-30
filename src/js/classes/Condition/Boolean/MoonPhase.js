import { ConditionCustomLevelBoolean } from "./CustomLevel";

export class ConditionMoonPhaseBoolean extends ConditionCustomLevelBoolean {
    constructor (params) {
        params.levelSetting = 'moon_phase';
        params.maxLevelSetting = 2;
        super(params);
    }
}
