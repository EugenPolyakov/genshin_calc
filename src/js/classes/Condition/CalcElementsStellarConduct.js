import { Condition } from "../Condition";

export class CalcElementsStellarConduct extends Condition {
    getSettings(settings) {
        let elements_count = {
            party_elements_cryo_count: 0,
            party_elements_electro_count: 0,
            party_elements_conduct: 0,
        }

        for (let name of ['char_element', 'resonance_element_1', 'resonance_element_2', 'resonance_element_3']) {
            let element = settings[name] || '';
            if (!element) continue;

            if (element == "electro") {
                elements_count.party_elements_conduct++;
                elements_count.party_elements_electro_count++;
            } else if (element == "cryo") {
                elements_count.party_elements_conduct++;
                elements_count.party_elements_cryo_count++;
            }
        }

        return elements_count;
    }

    getAllConditionsOn(settings) {
        //todo в оригинале в getSettings была проверка на активность, что противоречит нормальному поведению getAllConditionsOn
        //сейчас наоборот getSettings всегда расчитывает
        return this.getSettings(settings);
    }
}
