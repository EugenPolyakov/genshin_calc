import { Condition } from "../Condition";
import { Stats } from "../Stats";

export class ConditionCustomBuffs extends Condition {
    getType() {
        return 'custom_buffs';
    }

    getDefaultStats(settings) {
        let result = new Stats();

        for (let key of Object.keys(settings)) {
            let m = key.match(/custom_buffs.(.*)+/);
            if (m && settings[key]) {
                result.add(m[1], settings[key]);
            }
        }

        return result;
    }
}
