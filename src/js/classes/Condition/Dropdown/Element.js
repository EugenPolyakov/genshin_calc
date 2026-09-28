import { ConditionDropdown } from "../Dropdown";

export class ConditionDropdownElement extends ConditionDropdown {
    getDropdownItems(settings) {
        let result = [];

        if (this.params.values) {
            for (let item of this.params.values) {
                result.push({
                    value: item.value,
                    icon: ' gi-stat-element-icon stat-'+ item.value,
                });
            }
        }

        return result;
    }
}
