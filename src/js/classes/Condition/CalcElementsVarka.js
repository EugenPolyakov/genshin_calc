import { Condition } from "../Condition";

export class ConditionCalcElementsVarka extends Condition {
    getSettings(settings) {
        let elements = {
            'anemo': 1,
        };
        for (const name of ['resonance_element_1', 'resonance_element_2', 'resonance_element_3']) {
            const element = settings[name] || '';
            if (!element) continue;

            if (['pyro', 'hydro', 'electro', 'cryo', 'anemo'].includes(element)) {
                elements[element] = (elements[element] || 0) + 1;
            }
        }

        let result = super.getSettings(settings);

        let has_anemo = elements['anemo'] >= 2;
        delete elements['anemo'];

        let has_phec = Object.values(elements).some(x => x >= 2);
        result.varka_has_any = Object.values(elements).some(x => x >= 1);
        result.varka_has_all = (has_anemo && has_phec) ? 1 : 0;
        result.varka_has_one = (has_anemo || has_phec) ? 1: 0;
        return result;
    }
}
