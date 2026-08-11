import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const covenant_of_frost_and_snow = new DbObjectWeapon({
    name: 'covenant_of_frost_and_snow',
    serializeId: 247,
    gameId: weaponDataTable.covenant_of_frost_and_snow.gameId,
    iconClass: "weapon-icon-bow-covenant-of-frost-and-snow",
    rarity: weaponDataTable.covenant_of_frost_and_snow.rarity,
    weapon: weaponDataTable.covenant_of_frost_and_snow.weapon,
    statTable: weaponStatTables.covenant_of_frost_and_snow,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_covenant_of_frost_and_snow',
            description: 'talent_descr.weapon_covenant_of_frost_and_snow',
            stats: [
                new StatTable('mastery', weaponDataTable.covenant_of_frost_and_snow.covenant_of_frost_and_snow.param1),
            ],
        }),
    ],
});
