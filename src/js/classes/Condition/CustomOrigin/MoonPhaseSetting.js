import { ConditionCustomOrigin } from "../CustomOrigin.js";

export class ConditionMoonPhaseSetting extends ConditionCustomOrigin {
    constructor (params) {
        super(params);
        this.params.origin = 'lunar';
        this.params.result = 'moon_phase';
    }
}
