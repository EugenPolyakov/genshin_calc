import { ConditionAnd } from "../classes/Condition";
import { ConditionBoolean } from "../classes/Condition/Boolean";

export const conditionDefaultAttack = new ConditionAnd([
    new ConditionBoolean({ name: 'common.enemy_superconduct', invert: 1 }),
    new ConditionBoolean({ name: 'common.radiance_stellar_swirl', invert: 1 }),
]);

export const conditionStellarConductAttack = new ConditionBoolean({ name: 'common.enemy_superconduct' });

export const conditionStellarSwirlAttack = new ConditionAnd([
    new ConditionBoolean({ name: 'common.enemy_superconduct', invert: 1 }),
    new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
]);
