import { Condition } from "../Condition";

export class ConditionCalcElementsZibai extends Condition {
    getSettings(settings) {
        let geo_count = 0;
        let hydro_count = 0;

        for (let name of ['resonance_element_1', 'resonance_element_2', 'resonance_element_3']) {
            let element = settings[name] || '';

            if (element == 'geo')
                geo_count++;
            else if (element == 'hydro')
                hydro_count++;
        }

        return {
            zibai_other_geo: geo_count,
            zibai_hydro: hydro_count,
        };
    }

    getAllConditionsOn(settings) {
        //todo в оригинале в getSettings была проверка на активность, что противоречит нормальному поведению getAllConditionsOn
        //сейчас наоборот getSettings всегда расчитывает
        return this.getSettings(settings);
    }
}
