import { getSkillLevelByName } from "./Build/Settings";
import {Stats} from "./Stats";

export class Condition {
    constructor(params) {
        this.params = params || {};
        this.entityId = 0;
    }

    getId() {
        return this.params.serializeId || 0;
    }

    getEntityId() {
        return this.entityId;
    }

    getName() {
        return this.params.name;
    }

    getNamesList() {
        if (!this.params.customStats)
            return [this.getName()];
        else
            return [this.getName()].concat(this.params.customStats.flatMap(x => x.getNamesList()));
    }

    getType() {
        return '';
    }

    getTitle(stats) {
        if (!this.params.title) {
            return '';
        }

        let val = this.params.title.split(';');
        if (val.length > 1) {
            let result = val.map(x => UI.Lang.getTalent(x, stats)).join(' ');
            return result;
        } else
            return UI.Lang.getTalent(this.params.title, stats);
    }

    getIcon() {
        if (this.params.icon) {
            return this.params.icon.name;
        }
        return '';
    }

    getDescription(stats) {
        if (!this.params.description) {
            return '';
        }

        let val = this.params.description.split(';');
        if (val.length > 1) {
            let result = val.map(x => UI.Lang.getTalent(x, stats)).join('<br><br>');
            return result;
        } else
            return UI.Lang.getTalent(this.params.description, stats);
    }

    getInfo() {
        return this.params.info;
    }

    getLevel(settings) {
        return getSkillLevelByName(this.params.levelSetting, settings);
    }

    isHidden(settings) {
        if (this.params.isHidden) {
            return true;
        }

        let subcond = this.params.hideCondition;
        if (subcond)
            return subcond.isActive(settings);

        return false;
    }

    isActive(settings) {
        return this.checkSubconditions(settings);
    }

    isSerializable() {
        let name = this.getName();
        let type = this.getType();

        if (!name && !type || type == 'static') {
            return false;
        }

        return true;
    }

    getMaxStacks(settings) {
        return this.params.maxStacks || 0;
    }

    checkSubconditions(settings) {
        if (this.params.condition) {
            return this.params.condition.isActive(settings);
        } else {
            // deprecated
            let subcond = this.params.subConditions;
            if (subcond) {
                for (let i = 0; i < subcond.length; ++i) {
                    const cond = subcond[i];
                    if (!cond.isActive(settings)) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    getSettings(settings) {
        if (this.isActive(settings))
            return this.params.settings || {};
        return {};
    }

    getDefaultStats(settings) {
        let stat = new Stats(this.params.stats || new Stats());
        let list = this.getSubConditions();
        if (list)
            for (let c of list)
                stat.concat(c.getActualStats(settings));
        return stat;
    }

    getAllStats(settings) {
        return this.getDefaultStats(settings);
    }

    getDisplayStats(settings) {
        let result = this.getDefaultStats(settings);

        //result.add('global_settings', this.params.settings || {});
        return result;
    }

    getActualStats(settings) {
        if (this.isActive(settings))
            return this.getAllStats(settings);
        return new Stats();
    }

    getBuffRotationSection(settings) {
        return this.params.rotation || '';
    }

    getSubConditions() {
        return this.params.customStats || [];
    }

    getCondtitionList() {
        if (!this.params.customStats)
            return null;

        if (this.cachedItems) {
            return this.cachedItems;
        }

        let main = this.createMainCond();
        let result;
        if (main)
            result = [main].concat(this.params.customStats.map(x => this.createSubcondition(x)));
        else
            result = this.params.customStats.map(x => this.createSubcondition(x));

        this.cachedItems = result;
        return result;
    }

    createSubcondition(parent) {
        let params = Object.assign({}, parent.params);
        if (this.params.hideCondition) {
            if (params.hideCondition)
                params.hideCondition = new ConditionOr([this.params.hideCondition, params.hideCondition]);
            else
                params.hideCondition = this.params.hideCondition;
        }
        if (this.params.condition) {
            if (params.condition)
                params.condition = new ConditionAnd([this.params.condition, params.condition]);
            else
                params.condition = this.params.condition;
        }
        if (params.hideInactive == null)
            params.hideInactive = this.params.hideInactive;
        params.title = this.params.title + ';' + params.title;
        params.rotation = this.params.rotation;
        let constructor = Object.getPrototypeOf(parent).constructor;
        return new constructor(params);
    }

    createMainCond() {
        let params = Object.assign({}, this.params);
        delete params.customStats;
        let constructor = Object.getPrototypeOf(this).constructor;
        return new constructor(params);
    }

    static allConditionsOn(conditions, buildSettings) {
        let settings = {};

        for (let i = 0; i < conditions.length; ++i) {
            const cond = conditions[i];

            let type = cond.getType();
            if (type == 'stacks') {
                settings[cond.getName()] = cond.getMaxStacks();
            } else if (type == 'groupbox') {
                settings[cond.getName()] = cond.getGroupIndex();
            } else if (type == 'checkbox') {
                settings[cond.getName()] = true;
            } else if (type == 'dropdown') {
                settings[cond.getName()] = cond.params.suggesterValue || 0;
            } else if (type == 'number') {
                settings[cond.getName()] = cond.getMinValue();
            } else if (cond.getAllConditionsOn) {
                Object.assign(settings, cond.getAllConditionsOn(buildSettings || {}));
            }
        }

        return settings;
    }

    static allConditionsOff(conditions) {
        let settings = {};

        for (let i = 0; i < conditions.length; ++i) {
            const cond = conditions[i];

            let type = cond.getType();
            if (type == 'stacks') {
                settings[cond.getName()] = 0;
            } else if (type == 'checkbox') {
                settings[cond.getName()] = false;
            }
        }

        return settings;
    }

    static setCommonValues(settings, conditions) {
        let result = {};

        for (let i = 0; i < conditions.length; ++i) {
            const name = conditions[i].getName();

            if (/^common\./.test(name)) {
                settings[name] ||= 0;
                result[name] = settings[name];
            }
        }

        return result;
    }

    static unwrap(items, settings) {
        let result = [];

        for (let item of items) {
            let list = item.getCondtitionList();
            if (list) {
                for (let subItem of list) {
                    if (!settings || subItem.isActive(settings)) {
                        result.push(subItem);
                    }
                }
            } else
                result.push(item);
        }

        return result;
    }
}

export class ConditionAnd extends Condition {
    constructor (items) {
        super({})
        this.items = items;
    }

    isActive(settings) {
        let result = true;

        for (let cond of this.items) {
            result = result && cond.isActive(settings);
        }

        return this.params.invert ? !result : result;
    }
}

export class ConditionOr extends Condition {
    constructor (items) {
        super({})
        this.items = items;
    }

    isActive(settings) {
        let result = false;
        for (let cond of this.items) {
            result ||= cond.isActive(settings)
            if (result) {
                break;
            }
        }

        return this.params.invert ? !result : result;
    }
}
