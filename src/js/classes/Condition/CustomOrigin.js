import { Condition } from "../Condition";
import { Stats } from "../Stats";

export class ConditionCustomOrigin extends Condition {
    getType() {
        return '';
    }

    checkOrigin(v) {
        return v == this.params.origin;
    }

    getSettings(settings) {
        let stacks = 0;
        if (settings.char_originList.some(this.checkOrigin, this)) {
            ++stacks;
        }

        for (let name of ['party_char_1', 'party_char_2', 'party_char_3']) {
            let charId = settings[name];
            if (!charId) {
                continue;
            }

            const char = DB.Chars.getById(charId);
            if (char.originList.some(this.checkOrigin, this)) {
                ++stacks;
            }
        }

        var result = super.getSettings(settings);
        result[this.params.name] = stacks;

        return result;
    }
}
