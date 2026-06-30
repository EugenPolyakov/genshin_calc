import { FillYunJinSettingsStacks, FillYunJinStatsStacksFromSettings } from "../../../db/Char/YunJin";
import { Stats } from "../../Stats";
import { ConditionStatic } from "../Static";

export class ConditionStaticYunJin extends ConditionStatic {
    constructor (params) {
        super(params);
        this.getSettings = FillYunJinSettingsStacks;
        this.getDefaultStats = FillYunJinStatsStacksFromSettings;
    }
}
