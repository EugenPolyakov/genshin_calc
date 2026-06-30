import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const sacrificers_staff = new DbObjectWeapon({
    name: 'sacrificers_staff',
    serializeId: 230,
    gameId: weaponDataTable.sacrificers_staff.gameId,
    iconClass: "weapon-icon-polearm-sacrificers-staff",
    rarity: weaponDataTable.sacrificers_staff.rarity,
    weapon: weaponDataTable.sacrificers_staff.weapon,
    statTable: weaponStatTables.sacrificers_staff,
    conditions: [
        new ConditionStacks({
            name: 'weapon_sacrificers_staff',
            serializeId: 1,
            title: 'talent_name.weapon_sacrificers_staff',
            description: 'talent_descr.weapon_sacrificers_staff',
            maxStacks: weaponDataTable.sacrificers_staff.sacrificers_staff.param4[0],
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('atk_percent', weaponDataTable.sacrificers_staff.sacrificers_staff.param2, 100),
                new StatTable('recharge', weaponDataTable.sacrificers_staff.sacrificers_staff.param3, 100),
            ],
        })
    ],
});
