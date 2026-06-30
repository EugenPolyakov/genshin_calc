import { CustomOrigin } from "./CustomOrigin.js";

export class ConditionLithic extends CustomOrigin {
    constructor (params) {
        super(params);
        this.params.origin = 'liyue';
        this.params.name = 'weapon_lithic_stacks';
    }
}
