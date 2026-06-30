import { Condition } from "../Condition";

export class ConditionOriginCheck extends Condition {
    isActive(settings) {
        let result = super.isActive(settings);
        return result && settings && settings.char_originList.includes(this.params.origin);
    }
}
