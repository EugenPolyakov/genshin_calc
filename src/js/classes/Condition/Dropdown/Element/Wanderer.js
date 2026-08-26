import { ConditionDropdownElement } from "../Element";

export class ConditionDropdownElementWanderer extends ConditionDropdownElement {
    getLimit(settings) {
        let result = super.getLimit(settings);

        if (settings.char_constellation >= 4) {
            result += 1;
        }

        return result;
    }
}
