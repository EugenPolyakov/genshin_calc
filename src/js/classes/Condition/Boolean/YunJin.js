import { FillYunJinSettingsStacks, FillYunJinStatsStacksFromSettings } from "../../../db/Char/YunJin";
import { Stats } from "../../Stats";
import { ConditionBoolean } from "../Boolean";

export class ConditionBooleanYunJin extends ConditionBoolean {
    constructor (params) {
        super(params);
        this.getSettings = FillYunJinSettingsStacks;
        this.getDefaultStats = FillYunJinStatsStacksFromSettings;
    }
}
