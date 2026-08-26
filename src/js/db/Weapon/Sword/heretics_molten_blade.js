import { ConditionBooleanValue } from "../../../classes/Condition/Boolean/Value";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const heretics_molten_blade = new DbObjectWeapon({
    name: 'heretics_molten_blade',
    serializeId: 254,
    gameId: weaponDataTable.heretics_molten_blade.gameId,
    iconClass: "weapon-icon-sword-heretics-molten-blade",
    rarity: weaponDataTable.heretics_molten_blade.rarity,
    weapon: weaponDataTable.heretics_molten_blade.weapon,
    statTable: weaponStatTables.heretics_molten_blade,
    conditions: [
        new ConditionStacks({
            name: 'heretics_molten_blade',
            serializeId: 1,
            title: 'talent_name.weapon_heretics_molten_blade',
            description: 'talent_descr.weapon_heretics_molten_blade',
            levelSetting: 'weapon_refine',
            maxStacks: 18,
            stats: [
                new StatTable('atk_percent', weaponDataTable.heretics_molten_blade.heretics_molten_blade.param3, 100 / 18),
                new StatTable('min_percent', weaponDataTable.heretics_molten_blade.heretics_molten_blade.param3, 100),
                new StatTable('max_percent', weaponDataTable.heretics_molten_blade.heretics_molten_blade.param4, 100),
            ],
        }),
        new ConditionStaticRefine({
            isHidden: true,
            stats: [
                new StatTable('atk_percent', weaponDataTable.heretics_molten_blade.heretics_molten_blade.param3, 100),
            ],
            condition: new ConditionBooleanValue({
                cond: 'gt',
                value: 0,
                setting: 'heretics_molten_blade',
            })
        })
    ],
});
