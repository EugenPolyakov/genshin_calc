import { BuildData } from "../../Build/Data";
import { FeatureDamage } from "../Damage";

export function getVarkaActiveElement(settings, defaultElem) {
    let actualElement = 5;
    let priolity = {
        'pyro': 1,
        'hydro': 2,
        'electro': 3,
        'cryo': 4,
    }
    for (const name of ['resonance_element_1', 'resonance_element_2', 'resonance_element_3']) {
        const element = settings[name] || '';
        if (!element) continue;

        actualElement = Math.min(actualElement, priolity[element] || 5);
    }
    return [defaultElem, 'pyro', 'hydro', 'electro', 'cryo', defaultElem][actualElement];
}

export class FeatureDamageVarka extends FeatureDamage {
    /**
     * @param {BuildData} data
     * @returns {string}
     */
    getElement(data) {
        let element = getVarkaActiveElement(data.settings, 'phys');

        if (this.allowInfusion && element == 'phys') {
            element = this.getInfusionElement(data);
        }

        return element;
    }
}
