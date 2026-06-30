import { ConditionBoolean } from "../Boolean";

export function FillIllugaSettingsStacks(settings) {
    let result = Object.getPrototypeOf(Object.getPrototypeOf(this)).getSettings.call(this, settings);
    if (this.isActive(settings))
        result.illuga_stacks = (settings.illuga_chars_count || 0) + 1;
    else
        result.illuga_stacks = 1;

    return result;
}

export function FillIllugaStatsStacksFromSettings(settings) {
    let result = Object.getPrototypeOf(Object.getPrototypeOf(this)).getDefaultStats.call(this, settings);
    result.add('illuga_stacks', Math.min(3, settings.illuga_chars_count || 1));
    return result;
}

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
