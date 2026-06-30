import { Stats } from "../Stats";
import { Condition } from "../Condition";

export class ConditionCalcElementsNavia extends Condition {
    getSettings(settings) {
        let chars = 0;

        for (let name of ['resonance_element_1', 'resonance_element_2', 'resonance_element_3']) {
            let element = settings[name] || '';
            if (!element) continue;

            if (['pyro', 'hydro', 'electro', 'cryo'].includes(element)) {
                ++chars;
            }
        }

        return {
            navia_chars_count: chars,
        };
    }

    getAllConditionsOn(settings) {
        //todo в оригинале в getSettings была проверка на активность, что противоречит нормальному поведению getAllConditionsOn
        //сейчас наоборот getSettings всегда расчитывает
        return this.getSettings(settings);
    }
}
