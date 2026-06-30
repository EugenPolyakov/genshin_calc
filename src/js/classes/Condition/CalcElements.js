import { Stats } from "../Stats";
import { Condition } from "../Condition";

export class ConditionCalcElements extends Condition {
    getSettings(settings) {
        let elements = {};
        let same_elements = 0;
        let different_elements = 0;
        let different_chars = 0;

        for (let name of ['char_element', 'resonance_element_1', 'resonance_element_2', 'resonance_element_3']) {
            let element = settings[name] || '';
            if (!element) continue;

            elements[element] = 1;

            if (name == 'char_element') {
                continue;
            }

            ++different_chars;

            if (settings.char_element == element) {
                ++same_elements;
            } else {
                ++different_elements;
            }
        }

        return {
            party_elements_count_level: Object.keys(elements).length,
            party_elements_same: same_elements,
            party_elements_same_inc: same_elements + 1,
            party_elements_different: different_elements,
            party_elements_different_total: different_chars,
        };
    }

    getAllConditionsOn(settings) {
        //todo в оригинале в getSettings была проверка на активность, что противоречит нормальному поведению getAllConditionsOn
        //сейчас наоборот getSettings всегда расчитывает
        return this.getSettings(settings);
    }
}
