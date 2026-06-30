import { ConditionCustomOrigin } from "../CustomOrigin.js";

export class ConditionLithic extends ConditionCustomOrigin {
    constructor (params) {
        super(params);
        this.params.origin = 'liyue';
        this.params.result = 'weapon_lithic_stacks';
    }
}
