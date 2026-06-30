import { Condition } from "../Condition";
import { Stats } from "../Stats";

export class CustomOrigin extends Condition {
    getType() {
        return '';
    }

    checkOrigin(v) {
        return v == this.params.origin;
    }

    getData(settings) {
        let stacks = 0;
        if (settings.char_originList.some(this.checkOrigin, this)) {
            ++stacks;
        }

        for (let i = 1; i <= 3; ++i) {
            let charId = settings['party_char_'+ i];
            if (!charId) {
                continue;
            }

            const char = DB.Chars.getById(charId);
            if (char.originList.some(this.checkOrigin, this)) {
                ++stacks;
            }
        }

        var result = {
            settings: {},
            stats: new Stats({}),
        };
        result.settings[this.params.name] = stacks;

        return result;
    }
}
