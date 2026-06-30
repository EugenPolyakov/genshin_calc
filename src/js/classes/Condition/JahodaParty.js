import { Condition } from "../Condition";

export class ConditionJahodaParty extends Condition {
    getSettings(settings) {
        let result = {
            jahoda_a1_pyro: 0,
            jahoda_a1_hydro: 0,
            jahoda_a1_electro: 0,
            jahoda_a1_cryo: 0,
        };

        for (const name of ['char_element', 'resonance_element_1', 'resonance_element_2', 'resonance_element_3']) {
            const element = settings[name] || '';
            if (!element) continue;

            if (element == 'pyro') {
                result.jahoda_a1_pyro++;
            } else if (element == 'electro') {
                result.jahoda_a1_electro++;
            } else if (element == 'hydro') {
                result.jahoda_a1_hydro++;
            } else if (element == 'cryo') {
                result.jahoda_a1_cryo++;
            }
        }

        let max = Object.keys(result).reduce((p, c) => result[c] > (result[p] || 0) ? c : p, '');
        let second = Object.keys(result).reduce((p, c) => result[c] > (result[p] || 0) && c != max ? c : p, '');

        result = {};
        if (max)
            result[max] = true;
        if (second)
            result[second] = true;
        return result;
    }
}
