import { ConditionAnd, ConditionOr } from "../../../classes/Condition";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { CalcElementsStellarConduct } from "../../../classes/Condition/CalcElementsStellarConduct";
import { ConditionStacksHidden } from "../../../classes/Condition/Stacks/Hidden";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const winters_heavy_heart = new DbObjectWeapon({
    name: 'winters_heavy_heart',
    serializeId: 260,
    gameId: weaponDataTable.winters_heavy_heart.gameId,
    iconClass: "weapon-icon-catalyst-winters-heavy-heart",
    rarity: weaponDataTable.winters_heavy_heart.rarity,
    weapon: weaponDataTable.winters_heavy_heart.weapon,
    statTable: weaponStatTables.winters_heavy_heart,
    conditions: [
        new CalcElementsStellarConduct(),
        new ConditionStaticRefine({
            title: 'talent_name.weapon_winters_heavy_heart',
            description: 'talent_descr.weapon_winters_heavy_heart_1',
            stats: [
                new StatTable('text_mastery', weaponDataTable.winters_heavy_heart.winters_heavy_heart.param1),
                new StatTable('text_atk_percent', weaponDataTable.winters_heavy_heart.winters_heavy_heart.param2, 100),
            ],
            condition: new ConditionOr([
                new ConditionAnd([
                    new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                    new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                ]),
                new ConditionAnd([
                    new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                    new ConditionBoolean({ name: 'allowed_stellar_swirl' }),
                ]),
            ], 1),
        }),
        new ConditionStaticRefine({
            title: 'talent_name.weapon_winters_heavy_heart',
            description: 'talent_descr.weapon_winters_heavy_heart_2',
            stats: [
                new StatTable('text_mastery', weaponDataTable.winters_heavy_heart.winters_heavy_heart.param3),
                new StatTable('text_percent', weaponDataTable.winters_heavy_heart.winters_heavy_heart.param4, 100),
            ],
            condition: new ConditionOr([
                new ConditionAnd([
                    new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                    new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                ]),
                new ConditionAnd([
                    new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                    new ConditionBoolean({ name: 'allowed_stellar_swirl' }),
                ]),
            ]),
        }),
        new ConditionStacksHidden({
            name: 'party_elements_cryo_count',
            maxStacks: 4,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('mastery', weaponDataTable.winters_heavy_heart.winters_heavy_heart.param1),
            ],
            condition: new ConditionOr([
                new ConditionAnd([
                    new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                    new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                ]),
                new ConditionAnd([
                    new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                    new ConditionBoolean({ name: 'allowed_stellar_swirl' }),
                ]),
            ], 1),
        }),
        new ConditionStacksHidden({
            name: 'party_elements_electro_count',
            maxStacks: 4,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('atk_percent', weaponDataTable.winters_heavy_heart.winters_heavy_heart.param2, 100),
            ],
            condition: new ConditionOr([
                new ConditionAnd([
                    new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                    new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                ]),
                new ConditionAnd([
                    new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                    new ConditionBoolean({ name: 'allowed_stellar_swirl' }),
                ]),
            ], 1),
        }),
        new ConditionStacksHidden({
            name: 'party_elements_conduct',
            maxStacks: 4,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('mastery', weaponDataTable.winters_heavy_heart.winters_heavy_heart.param3),
                new StatTable('dmg_reaction_stellar_glimmer', weaponDataTable.winters_heavy_heart.winters_heavy_heart.param4, 100),
            ],
            condition: new ConditionOr([
                new ConditionAnd([
                    new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                    new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                ]),
                new ConditionAnd([
                    new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                    new ConditionBoolean({ name: 'allowed_stellar_swirl' }),
                ]),
            ]),
        }),
    ],
});
