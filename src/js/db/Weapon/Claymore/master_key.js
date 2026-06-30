import { ConditionBooleanMoonPhaseRefine } from "../../../classes/Condition/Boolean/MoonPhaseRefine";
import { ConditionMoonPhaseSetting } from "../../../classes/Condition/CustomOrigin/MoonPhaseSetting";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const master_key = new DbObjectWeapon({
    name: 'master_key',
    serializeId: 225,
    gameId: weaponDataTable.master_key.gameId,
    iconClass: "weapon-icon-claymore-master-key",
    rarity: weaponDataTable.master_key.rarity,
    weapon: weaponDataTable.master_key.weapon,
    statTable: weaponStatTables.master_key,
    conditions: [
        new ConditionMoonPhaseSetting(),
        new ConditionBooleanMoonPhaseRefine({
            name: 'weapon_master_key',
            serializeId: 1,
            title: 'talent_name.weapon_master_key',
            description: 'talent_descr.weapon_master_key',
            stats: [
                new StatTable('text_mastery_default', weaponDataTable.master_key.master_key.param1),
                new StatTable('mastery', weaponDataTable.master_key.master_key.param1),
                new StatTable('text_mastery', weaponDataTable.master_key.master_key.param3),
            ],
            realStats: [
                [
                    new StatTable('mastery', [0]),
                    new StatTable('mastery', [0]),
                    new StatTable('mastery', weaponDataTable.master_key.master_key.param3),
                ],
            ]
        })
    ],
});
