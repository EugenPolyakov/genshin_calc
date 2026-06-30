import { FillIllugaSettingsStacks, FillIllugaStatsStacksFromSettings } from "../../../db/Char/Illuga";
import { ConditionBoolean } from "../Boolean";

export class ConditionBooleanIlluga extends ConditionBoolean {
    constructor (params) {
        super(params);
        this.getSettings = FillIllugaSettingsStacks;
        this.getDefaultStats = FillIllugaStatsStacksFromSettings;
    }

    isActive(settings) {
        return super.isActive(settings);
    }
}
