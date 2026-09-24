import { ConditionAnd, ConditionOr } from "../../../classes/Condition";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { StatTableConditions } from "../../../classes/StatTable/Condition";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const new_bough = new DbObjectWeapon({
    name: 'new_bough',
    serializeId: 258,
    gameId: weaponDataTable.new_bough.gameId,
    iconClass: "weapon-icon-sword-new-bough",
    rarity: weaponDataTable.new_bough.rarity,
    weapon: weaponDataTable.new_bough.weapon,
    statTable: weaponStatTables.new_bough,
    conditions: [
        new ConditionStacks({
            name: 'weapon_new_bough',
            serializeId: 1,
            title: 'talent_name.weapon_new_bough',
            description: 'talent_descr.weapon_new_bough',
            maxStacks: 3,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('text_percent_1', weaponDataTable.new_bough.new_bough.param4, 100),
                new StatTable('text_2', weaponDataTable.new_bough.new_bough.param6),
                new StatTable('text_percent_2', weaponDataTable.new_bough.new_bough.param5, 100),
                new StatTable('text_percent_3', weaponDataTable.new_bough.new_bough.param7, 100),
                new StatTableConditions('atk_percent', weaponDataTable.new_bough.new_bough.param4, new ConditionOr([
                    new ConditionAnd([
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                        new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                    ]),
                    new ConditionAnd([
                        new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                        new ConditionBoolean({ name: 'allowed_stellar_swirl' }),
                    ]),
                ], 1), 100),
                new StatTableConditions('mastery', weaponDataTable.new_bough.new_bough.param6, new ConditionOr([
                    new ConditionAnd([
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                        new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                    ]),
                    new ConditionAnd([
                        new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                        new ConditionBoolean({ name: 'allowed_stellar_swirl' }),
                    ]),
                ], 1)),
                new StatTableConditions('atk_percent', weaponDataTable.new_bough.new_bough.param5, new ConditionOr([
                    new ConditionAnd([
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                        new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                    ]),
                    new ConditionAnd([
                        new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                        new ConditionBoolean({ name: 'allowed_stellar_swirl' }),
                    ]),
                ]), 100),
                new StatTableConditions('dmg_reaction_stellar_glimmer', weaponDataTable.new_bough.new_bough.param7, new ConditionOr([
                    new ConditionAnd([
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                        new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                    ]),
                    new ConditionAnd([
                        new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                        new ConditionBoolean({ name: 'allowed_stellar_swirl' }),
                    ]),
                ]), 100),
            ],
        }),
    ],
});
