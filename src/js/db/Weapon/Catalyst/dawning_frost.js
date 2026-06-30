import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const dawning_frost = new DbObjectWeapon({
    name: 'dawning_frost',
    serializeId: 231,
    gameId: weaponDataTable.dawning_frost.gameId,
    iconClass: "weapon-icon-catalyst-dawning-frost",
    rarity: weaponDataTable.dawning_frost.rarity,
    weapon: weaponDataTable.dawning_frost.weapon,
    statTable: weaponStatTables.dawning_frost,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_dawning_frost_1',
            serializeId: 1,
            title: 'talent_name.weapon_dawning_frost',
            description: 'talent_descr.weapon_dawning_frost_1',
            stats: [
                new StatTable('mastery', weaponDataTable.dawning_frost.dawning_frost.param1),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_dawning_frost_2',
            serializeId: 2,
            title: 'talent_name.weapon_dawning_frost',
            description: 'talent_descr.weapon_dawning_frost_2',
            stats: [
                new StatTable('mastery', weaponDataTable.dawning_frost.dawning_frost.param3),
            ],
        })
    ],
});
