import {Condition} from "../Condition";

export class ConditionGroup extends Condition {
    getType() {
        return 'groupbox';
    }

    getGroupIndex() {
        return this.params.group;
    }

    isActive(settings) {
        let result = super.isActive(settings);

        result = result && (settings[this.params.name] == this.getGroupIndex());

        return this.params.invert ? !result : result;
    }
}
