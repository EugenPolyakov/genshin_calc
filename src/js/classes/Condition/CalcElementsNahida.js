import { Stats } from "../Stats";
import { Condition } from "../Condition";

export class ConditionCalcElementsNahida extends Condition {
    getSettings(settings) {
        let result = {};

        if (settings.char_constellation >= 1) {
            result = {nahida_elements_electro: 1, nahida_elements_pyro: 1, nahida_elements_hydro: 1};
        }

        for (let name of ['resonance_element_1', 'resonance_element_2', 'resonance_element_3']) {
            let element = settings[name] || '';
            if (!element) continue;

            if (['pyro', 'hydro', 'electro'].includes(element)) {
                result['nahida_elements_' + element] = (result['nahida_elements_' + element] || 0) + 1;
            }
        }

        return result;
    }

    getAllConditionsOn(settings) {
        //todo в оригинале в getSettings была проверка на активность, что противоречит нормальному поведению getAllConditionsOn
        //сейчас наоборот getSettings всегда расчитывает
        return this.getSettings(settings);
    }
}
