import { FillYunJinSettingsStacks, FillYunJinStatsStacksFromSettings } from "../Boolean/YunJin";
import { ConditionStatic } from "../Static";

export class ConditionStaticYunJin extends ConditionStatic {
    constructor (params) {
        super(params);
        this.getSettings = FillYunJinSettingsStacks;
        this.getDefaultStats = FillYunJinStatsStacksFromSettings;
    }
}
