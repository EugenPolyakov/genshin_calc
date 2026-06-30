import { Stats } from "../../Stats";
import { ConditionBoolean } from "../Boolean";

export function FillYunJinSettingsStacks(settings) {
    let result = Object.getPrototypeOf(Object.getPrototypeOf(this)).getSettings.call(this, settings);
    if (this.isActive(settings))
        result.yunjin_traditionalist_stacks = (settings.party_elements_count_level || 0) + 1;
    else
        result.yunjin_traditionalist_stacks = 1;

    return result;
}

export function FillYunJinStatsStacksFromSettings(settings) {
    return new Stats({
        yunjin_traditionalist_stacks: settings.party_elements_count_level || 1,
    });
}

export class ConditionBooleanYunJin extends ConditionBoolean {
    constructor (params) {
        super(params);
        this.getSettings = FillYunJinSettingsStacks;
        this.getDefaultStats = FillYunJinStatsStacksFromSettings;
    }
}
