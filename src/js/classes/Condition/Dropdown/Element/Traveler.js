import { ConditionDropdownElement } from "../Element";

export class ConditionDropdownElementTraveler extends ConditionDropdownElement {
    getDisplayStats(settings) {
        return this.getAllStats(settings);
    }
}
