import { Stats } from "../Stats";
import { Condition } from "../Condition";

export class ConditionCalcElementsEscoffier extends Condition {
    getSettings(settings) {
        let chars = 0;
        let onlycryohydro = 1;

        for (const name of ['char_element', 'resonance_element_1', 'resonance_element_2', 'resonance_element_3']) {
            const element = settings[name] || '';
            if (!element) continue;

            if (['hydro', 'cryo'].includes(element)) {
                ++chars;
            } else {
                onlycryohydro = 0;
            }
        }

        return {
            escoffier_chars_count: chars,
            escoffier_chars_only: onlycryohydro,
        };
    }

    getAllConditionsOn(settings) {
        //todo в оригинале в getSettings была проверка на активность, что противоречит нормальному поведению getAllConditionsOn
        //сейчас наоборот getSettings всегда расчитывает
        return this.getSettings(settings);
    }
}
