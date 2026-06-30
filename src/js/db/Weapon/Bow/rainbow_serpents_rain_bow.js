import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const rainbow_serpents_rain_bow = new DbObjectWeapon({
    name: 'rainbow_serpents_rain_bow',
    serializeId: 233,
    gameId: weaponDataTable.rainbow_serpents_rain_bow.gameId,
    iconClass: "weapon-icon-bow-rainbow-serpents-rain-bow",
    rarity: weaponDataTable.rainbow_serpents_rain_bow.rarity,
    weapon: weaponDataTable.rainbow_serpents_rain_bow.weapon,
    statTable: weaponStatTables.rainbow_serpents_rain_bow,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_rainbow_serpents_rain_bow',
            serializeId: 1,
            title: 'talent_name.weapon_rainbow_serpents_rain_bow',
            description: 'talent_descr.weapon_rainbow_serpents_rain_bow',
            stats: [
                new StatTable('atk_percent', weaponDataTable.rainbow_serpents_rain_bow.rainbow_serpents_rain_bow.param2, 100),
            ],
        }),
    ],
});
