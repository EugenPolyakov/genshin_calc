import { FillIllugaSettingsStacks, FillIllugaStatsStacksFromSettings } from "../Boolean/Illuga";
import { ConditionStatic } from "../Static";

export class ConditionStaticIlluga extends ConditionStatic {
    constructor (params) {
        super(params);
        this.getSettings = FillIllugaSettingsStacks;
        this.getDefaultStats = FillIllugaStatsStacksFromSettings;
    }
}
