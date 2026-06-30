import { Condition } from "../Condition";

export class ConditionNumber extends Condition {
    getType() {
        return 'number';
    }

    isActive(settings) {
        let result = super.isActive(settings);
        return result && settings[this.params.name] > 0;
    }

    getMinValue(settings) {
        if (this.params.allowMinZero && settings && settings[this.params.name] == 0) {
            return 0;
        }

        return this.params.min || 0;
    }

    getMaxValue(settings) {
        return this.params.max;
    }

    getValue(settings) {
        let min = this.getMinValue(settings);
        let max = this.getMaxValue(settings);
        let value = (settings && settings[this.params.name]) || 0;

        if (this.params.format == 'decimal') {
            value = parseFloat(value).toFixed(1);
        } else {
            value = parseInt(value)
        }

        value = Math.max(min, value);

        if (max) {
            value = Math.min(max, value);
        }

        return value;
    }

    getSettings(settings) {
        let result = {};

        //очень странный флаг используется в ConditionNumberSkirk, зачем понадобилось установить значение раньше чем это сделается автоматически???
        if (this.params.forceSettings) {
            result = {[this.params.name]: this.getValue(settings)};
        }

        return result;
    }

    getDefaultStats(settings) {
        let stats = super.getDefaultStats(settings);

        let value = this.getValue(settings);
        if (!this.params.noStat) {
            let stat  = this.params.stat || this.params.name;
            if (stat) {
                stats.add(stat, value);
            }
        }

        return stats;
    }
}
