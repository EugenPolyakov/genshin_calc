import { StatTable } from "../StatTable";

export class StatTableConditions extends StatTable {
    constructor(stat, values, condition, multi) {
        super(stat, values, multi);
        this.condition = condition;
    }

    isActive(settings) {
        if (this.condition) {
            return this.condition.isActive(settings);
        }

        return true;
    }
}
