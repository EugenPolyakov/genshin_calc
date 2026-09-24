import { ConditionAnd } from "../../../classes/Condition";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { PostEffectStats } from "../../../classes/PostEffect/Stats";
import { StatTable } from "../../../classes/StatTable";
import { ValueTable } from "../../../classes/ValueTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const hymn_of_the_maelstrom = new DbObjectWeapon({
    name: 'hymn_of_the_maelstrom',
    serializeId: 262,
    gameId: weaponDataTable.hymn_of_the_maelstrom.gameId,
    iconClass: "weapon-icon-catalyst-hymn-of-the-maelstrom",
    rarity: weaponDataTable.hymn_of_the_maelstrom.rarity,
    weapon: weaponDataTable.hymn_of_the_maelstrom.weapon,
    statTable: weaponStatTables.hymn_of_the_maelstrom,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_hymn_of_the_maelstrom',
            description: 'talent_descr.weapon_hymn_of_the_maelstrom_1',
            stats: [
                new StatTable('healing', weaponDataTable.hymn_of_the_maelstrom.hymn_of_the_maelstrom.healing_base),
            ],
        }),
        new ConditionStacks({
            name: 'weapon_hymn_of_the_maelstrom_1',
            serializeId: 1,
            title: 'talent_name.weapon_hymn_of_the_maelstrom',
            description: 'talent_descr.weapon_hymn_of_the_maelstrom_2',
            maxStacks: 3,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('hp_percent', weaponDataTable.hymn_of_the_maelstrom.hymn_of_the_maelstrom.param1, 100),
                new StatTable('text_hp_percent', weaponDataTable.hymn_of_the_maelstrom.hymn_of_the_maelstrom.param1, 100),
                new StatTable('text_atk_percent', weaponDataTable.hymn_of_the_maelstrom.hymn_of_the_maelstrom.param3, 100),
                new StatTable('text_percent', weaponDataTable.hymn_of_the_maelstrom.hymn_of_the_maelstrom.param4, 100),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'common.weapon_hymn_of_the_maelstrom',
            serializeId: 2,
            title: 'talent_name.weapon_frozen_or_stellar_swirl',
            description: 'talent_descr.weapon_hymn_of_the_maelstrom_3',
        }),
    ],
    postEffects: [
        new PostEffectStats({
            from: 'hp*',
            stacksSetting: 'weapon_hymn_of_the_maelstrom_1',
            levelSetting: 'weapon_refine',
            percent: new StatTable('atk_percent', weaponDataTable.hymn_of_the_maelstrom.hymn_of_the_maelstrom.param3, 0.1),
            statCap: new ValueTable(weaponDataTable.hymn_of_the_maelstrom.hymn_of_the_maelstrom.param4, 100),
            capUseStacks: true,
            exceed: weaponDataTable.hymn_of_the_maelstrom.hymn_of_the_maelstrom.param2[0],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'weapon_hymn_of_the_maelstrom_1' }),
                new ConditionBoolean({ name: 'common.char_status_off_field', invert: 1 }),
                new ConditionBoolean({ name: 'common.weapon_hymn_of_the_maelstrom', invert: 1 }),
            ]),
        }),
        new PostEffectStats({
            from: 'hp*',
            stacksSetting: 'weapon_hymn_of_the_maelstrom_1',
            levelSetting: 'weapon_refine',
            percent: new StatTable('atk_percent', weaponDataTable.hymn_of_the_maelstrom.hymn_of_the_maelstrom.param3, 0.175),
            statCap: new ValueTable(weaponDataTable.hymn_of_the_maelstrom.hymn_of_the_maelstrom.param4, 175),
            capUseStacks: true,
            exceed: weaponDataTable.hymn_of_the_maelstrom.hymn_of_the_maelstrom.param2[0],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'weapon_hymn_of_the_maelstrom_1' }),
                new ConditionBoolean({ name: 'common.char_status_off_field', invert: 1 }),
                new ConditionBoolean({ name: 'common.weapon_hymn_of_the_maelstrom' }),
            ]),
        }),
    ],
});
