import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const etherlight_spindlelute = new DbObjectWeapon({
    name: 'etherlight_spindlelute',
    serializeId: 232,
    gameId: weaponDataTable.etherlight_spindlelute.gameId,
    iconClass: "weapon-icon-catalyst-etherlight-spindlelute",
    rarity: weaponDataTable.etherlight_spindlelute.rarity,
    weapon: weaponDataTable.etherlight_spindlelute.weapon,
    statTable: weaponStatTables.etherlight_spindlelute,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_etherlight_spindlelute',
            serializeId: 1,
            title: 'talent_name.weapon_etherlight_spindlelute',
            description: 'talent_descr.weapon_etherlight_spindlelute',
            stats: [
                new StatTable('mastery', weaponDataTable.etherlight_spindlelute.etherlight_spindlelute.param1),
            ],
        }),
    ],
});
