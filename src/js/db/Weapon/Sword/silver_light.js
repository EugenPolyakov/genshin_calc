import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const silver_light = new DbObjectWeapon({
    name: 'silver_light',
    serializeId: 259,
    gameId: weaponDataTable.silver_light.gameId,
    iconClass: "weapon-icon-sword-silver-light",
    rarity: weaponDataTable.silver_light.rarity,
    weapon: weaponDataTable.silver_light.weapon,
    statTable: weaponStatTables.silver_light,
    conditions: [
        new ConditionStacks({
            name: 'weapon_silver_light',
            serializeId: 1,
            title: 'talent_name.weapon_silver_light',
            description: 'talent_descr.weapon_silver_light',
            maxStacks: 2,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('mastery', weaponDataTable.silver_light.silver_light.param1),
            ],
        }),
    ],
});
