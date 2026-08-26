import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const frostbreath = new DbObjectWeapon({
    name: 'frostbreath',
    serializeId: 250,
    gameId: weaponDataTable.frostbreath.gameId,
    iconClass: "weapon-icon-polearm-frostbreath",
    rarity: weaponDataTable.frostbreath.rarity,
    weapon: weaponDataTable.frostbreath.weapon,
    statTable: weaponStatTables.frostbreath,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_frostbreath',
            serializeId: 1,
            title: 'talent_name.weapon_frostbreath',
            description: 'talent_descr.weapon_frostbreath',
            stats: [
                new StatTable('atk_percent', weaponDataTable.frostbreath.frostbreath.param1, 100),
                new StatTable('text', weaponDataTable.frostbreath.frostbreath.param3),
            ],
        }),
    ],
});
