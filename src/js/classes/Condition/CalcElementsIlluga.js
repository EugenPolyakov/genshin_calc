import { Condition } from "../Condition";

export class ConditionCalcElementsIlluga extends Condition {
    getSettings(settings) {
        let chars = 0;

        for (const name of ['char_element', 'resonance_element_1', 'resonance_element_2', 'resonance_element_3']) {
            const element = settings[name] || '';
            if (!element) continue;

            if (['hydro', 'geo'].includes(element))
                ++chars;
        }

        return {
            illuga_chars_count: chars,
        };
    }

    getAllConditionsOn(settings) {
        return this.getSettings(settings);
    }
}
