import { ConditionStacks } from "../Stacks"

export class ConditionStacksHidden extends ConditionStacks {
    getType() {
        return '';
    }

    isSerializable() {
        return false;
    }
}
