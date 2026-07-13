import {Condition} from "../Condition";

export class ConditionConverter extends Condition {
    getType() {
        return 'converter';
    }

    isSerializable() { return false; }

    isActive() { return true; }

    isHidden() { return true; }

    getTitle() { return ''; }

    getDescription() { return ''; }

    doConvert(result, input) {
        if (this.params.oldType == 'checkbox') {
            if (this.params.newType == 'int')
                result[this.getName()] = this.params.value;
        }
    }
}
