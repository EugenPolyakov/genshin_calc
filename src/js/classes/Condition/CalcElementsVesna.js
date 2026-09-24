import { charTalentTables } from "../../db/generated/CharTalentTables";
import { ConditionStatic } from "./Static";

export class CalcElementsVesna extends ConditionStatic {
    constructor (params) {
        super(params);
        this.params.multy ||= 1;
    }

    getDefaultStats(settings) {
        let atkCount = 0;
        let otherCount = 0;
        for (const name of ['char_element', 'resonance_element_1', 'resonance_element_2', 'resonance_element_3']) {
            const element = settings[name] || '';
            if (!element) continue;

            if (['anemo', 'cryo'].includes(element)) {
                atkCount++;
            } else {
                otherCount++;
            }
        }

        let stats = super.getDefaultStats(settings);

        if (otherCount > 0) {
            stats.add('mastery', otherCount * charTalentTables.Vesna.passsive[1][1] * this.params.multy);
        }
        if (atkCount > 0) {
            stats.add('atk_percent', atkCount * charTalentTables.Vesna.passsive[1][0] * 100 * this.params.multy);
        }


        return stats;
    }
}
