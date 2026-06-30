import { getSkillLevelByName } from "../Build/Settings";
import { Condition } from "../Condition";
import { Stats } from "../Stats";
import { StatTableConditions } from "../StatTable/Condition";

export class ConditionStacks extends Condition {
    getType() {
        return 'stacks';
    }

    isActive(settings) {
        let result = super.isActive(settings);
        return result && (settings[this.params.name] > 0 ? true : false);
    }

    getMaxStacks(settings) {
        let stacks = this.params.maxStacks;

        if (typeof stacks === 'function') {
            return stacks(settings || {});
        } else if (Array.isArray(stacks)) {
            // deprecated
            let value = 0;

            for (let i = 0; i < stacks.length; ++i) {
                let item = stacks[i];

                let conds = item.condition;
                if (conds) {
                    let is_ok = true;

                    if (settings) {
                        for (let i = 0; i < conds.length; ++i) {
                            is_ok = is_ok && conds[i].isActive(settings);
                        }
                    }

                    if (is_ok) {
                        value = Math.max(value, item.value);
                    }
                }
            }

            return value;
        } else {
            return stacks;
        }
    }

    getStacksCnt(settings) {
        if (!this.params.name) {
            return 0;
        }

        if (!this.isActive(settings)) {
            return 0;
        }

        let max = this.getMaxStacks(settings);
        let val = settings[this.params.name] || 0;

        if (val > max) {
            val = max;
            settings[this.params.name] = max; // TODO fix this side-effect in some way
        }

        return val;
    }

    getStacksLevel(settings) {
        if (!this.params.levelSetting) {
            return 1;
        }

        return getSkillLevelByName(this.params.levelSetting, settings);
    }

    getSettings(settings) {
        let result = {};

        let stacksCnt = this.getStacksCnt(settings);

        if (stacksCnt > 0) {
            result = this.params.settings;
        }

        return result;
    }

    getDisplayStats(settings) {
        let result = this.getDefaultStats(settings, 1);

        //result['global_settings'] = settings;
        return result;
    }

    getDefaultStats(settings, stacksCnt) {
        let stats = new Stats();

        if (stacksCnt > 0) {
            let level = this.getStacksLevel(settings);

            if (this.params.stats) {
                for (const stat of this.params.stats) {
                    if (stat instanceof StatTableConditions) {
                        if (!stat.isActive(settings)) {
                            continue;
                        }
                    }

                    stats.add(stat.getName(), stat.getValue(level) * stacksCnt);
                }
            }
        }

        return stats;
    }

    getAllStats(settings) {
        return this.getDefaultStats(settings, this.getStacksCnt(settings));
    }
}
