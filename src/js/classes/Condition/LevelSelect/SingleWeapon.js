import { ConditionLevelSelect } from "../LevelSelect";

export class ConditionLevelSelectSingleWeapon extends ConditionLevelSelect {
    constructor (params) {
        params.rotation = params.rotation || 'buffs';
        params.maxStacks = params.maxStacks || 5;
        super(params);
    }

    getType() {
        return this.params.description ? 'stacks' : '';
    }

    getLevel(settings) {
        return Math.max(this.params.weaponCondition.isActive(settings) ? settings.weapon_refine : 0, settings[this.params.name] || 0);
    }
}
