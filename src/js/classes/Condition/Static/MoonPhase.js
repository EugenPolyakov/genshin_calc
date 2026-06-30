import { ConditionCustomLevelStatic } from "./CustomLevel";

export class ConditionMoonPhaseStatic extends ConditionCustomLevelStatic {
    constructor (params) {
        params.levelSetting = 'moon_phase';
        params.maxLevelSetting = 2;
        super(params);
    }
}
