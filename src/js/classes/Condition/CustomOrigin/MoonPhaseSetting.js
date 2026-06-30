import { CustomOrigin } from "../CustomOrigin.js";

export class ConditionMoonPhaseSetting extends CustomOrigin {
    constructor (params) {
        super(params);
        this.params.origin = 'lunar';
        this.params.name = 'moon_phase';
    }
}
