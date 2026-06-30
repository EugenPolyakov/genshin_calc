import { ConditionBooleanValue } from "../../../classes/Condition/Boolean/Value";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const TomeoftheEternalFlow = new DbObjectWeapon({
    name: 'tome_of_the_eternal_flow',
    serializeId: 164,
    gameId: 14514,
    iconClass: "weapon-icon-catalyst-tome-of-the-eternal-flow",
    rarity: 5,
    weapon: 'catalyst',
    statTable: weaponStatTables.TomeoftheEternalFlow,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_aeon_wave',
            description: 'talent_descr.weapon_aeon_wave_1',
            stats: [
                new StatTable('hp_percent', weaponDataTable.TomeoftheEternalFlow.aeon_wave.hp_percent),
            ],
        }),
        new ConditionStacks({
            name: 'weapon_tome_of_the_eternal_flow',
            serializeId: 1,
            title: 'talent_name.weapon_aeon_wave',
            description: 'talent_descr.weapon_aeon_wave_2',
            maxStacks: 3,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('dmg_charged', weaponDataTable.TomeoftheEternalFlow.aeon_wave.param3, 100),
            ],
        }),
        new ConditionStaticRefine({
            title: 'talent_name.weapon_aeon_wave',
            description: 'talent_descr.weapon_aeon_wave_3',
            stats: [
                new StatTable('text_value', weaponDataTable.TomeoftheEternalFlow.aeon_wave.param4),
            ],
            subConditions: [
                new ConditionBooleanValue({
                    setting: 'weapon_tome_of_the_eternal_flow',
                    cond: 'ge',
                    value: 3,
                }),
            ],
        }),
    ],
});

