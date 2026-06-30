import { Stats } from "../Stats";
import { Condition } from "../Condition";

const ALLOWED = ['cryo', 'electro', 'hydro', 'pyro'];

export class ConditionArchaic extends Condition {
    getAllStats(settings) {
        let result = new Stats();
        let element = settings['set_other.archaic_petra_4'] || settings['set_bonus.archaic_petra_4'];
        if (element && ALLOWED.includes(element)) {
            result.add('dmg_' + element, 35);
        }
        return result;
    }
}
