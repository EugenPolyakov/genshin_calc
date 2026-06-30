import { Condition } from "../Condition";
import { Stats } from "../Stats";

export class ConditionDropdown extends Condition {
    isMultiple() {
        return this.params.multiple;
    }

    getType() {
        return this.isMultiple() ? 'dropdown_multiple' : 'dropdown';
    }

    getDropdownItems(settings) {
        if (this.params.values) {
            return this.params.values;
        }

        return [];
    }

    getSelectedValue(settings) {
        return settings[this.getName()] || this.params.defaultValue || '';
    }

    getSelectedValues(settings) {
        let selectedValue = this.getSelectedValue(settings);

        if (!selectedValue) {
            return [];
        }

        let values = [];
        if (this.params.multiple) {
            values = selectedValue.split(';');
        } else {
            values = [''+ selectedValue];
        }

        return values;
    }

    isActive(settings) {
        let result = this.checkSubconditions(settings);
        let value  = this.getSelectedValue(settings);
        result = result && value != '' ? true : false;

        return this.params.invert ? !result : result;
    }

    getSelectedItems(settings) {
        let values = this.getSelectedValues(settings);
        let items = [];
        let limit = this.getLimit(settings)

        for (const item of this.params.values) {
            if (values.includes(''+ item.value)) {
                items.push(item);
                if (limit && items.length >= limit) {
                    break;
                }
            }
        }

        return items;
    }

    getSelectedId(settings) {
        let items = this.getSelectedItems(settings);
        if (items.length == 0) return 0;

        let value = 0;

        if (this.isMultiple()) {
            for (const item of items) {
                if (item.serializeId) {
                    value += Math.pow(2, item.serializeId - 1);
                }
            }
        } else {
            if (items && items[0].serializeId) {
                value = items[0].serializeId;
            }
        }

        return value;
    }

    getValueById(id) {
        let values = [];
        let items = this.params.values;

        if (this.isMultiple()) {
            for (const item of items) {
                let val = Math.pow(2, item.serializeId - 1);
                if (val & id) {
                    values.push(item.value);
                }
            }
        } else {
            for (const item of items) {
                if (item.serializeId == id) {
                    values.push(item.value);
                    break;
                }
            }
        }

        if (values.length == 0) {
            return this.params.defaultValue || '';
        }

        if (this.isMultiple()) {
            return values.join(';');
        } else {
            return values[0];
        }
    }

    getLimit(settings) {
        return this.params.limit || 0;
    }

    getSelectedConditions(settings, defaultItem) {
        let items = this.getSelectedItems(settings);
        if (items.length == 0) {
            if (defaultItem)
                items = [defaultItem];
            else
                return [];
        }

        let conditions = [];

        for (let i = 0; i < items.length; ++i) {
            conditions = conditions.concat(items[i].conditions);
        }

        return conditions;
    }

    getSettings(settings) {
        let result = {};

        if (this.params.settings) {
            Object.assign(result, this.params.settings);
        }

        if (!this.isActive(settings)) {
            return result;
        }

        let conditions = this.getSelectedConditions(settings);

        for (let i = 0; i < conditions.length; ++i) {
            const cond = conditions[i];
            if (cond) {
                let data = cond.getSettings(settings);
                Object.assign(result, data);
            }
        }

        return result;
    }

    getDisplayStats(settings) {
        let result = new Stats();

        let conditions = this.getSelectedConditions(settings, this.params.values && this.params.values[0]);

        for (const cond of conditions) {
            if (!cond) {
                continue;
            }

            let data = cond.getDisplayStats(settings);
            result.concat(data);
        }

        return result;
    }

    getAllStats(settings,) {
        let result = new Stats();

        let conditions = this.getSelectedConditions(settings);

        for (const cond of conditions) {
            if (!cond) {
                continue;
            }

            let data = cond.getActualStats(settings);
            result.concat(data);
        }

        return result;
    }
}
