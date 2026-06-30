import { ConditionStacks } from "../Stacks"

export class ConditionStacksHidden extends ConditionStacks {
    isHidden() {
        return true;
    }

    isSerializable() {
        return false;
    }
}
