import { Condition } from "../Condition";

export class ConditionHexCurrent extends Condition {
    isActive(settings) {
        return this.params.invert ? !settings['char_hex_' + settings.char_name] : !!settings['char_hex_' + settings.char_name];
    }
}
