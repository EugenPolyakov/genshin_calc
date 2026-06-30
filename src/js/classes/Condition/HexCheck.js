import { Condition } from "../Condition";

export class ConditionHexCheck extends Condition {
    isActive(settings) {
        var val = this.params.hex | 0;
        let stacks = 0;

        for (let key of Object.keys(settings).filter(x => x.startsWith('char_hex_'))) {

            if (settings[key])
                ++stacks;
        }

        return stacks >= val;
    }
}
