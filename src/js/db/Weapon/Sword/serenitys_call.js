import { ConditionBooleanMoonPhaseRefine } from "../../../classes/Condition/Boolean/MoonPhaseRefine";
import { ConditionMoonPhaseSetting } from "../../../classes/Condition/CustomOrigin/MoonPhaseSetting";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const serenitys_call = new DbObjectWeapon({
    name: 'serenitys_call',
    serializeId: 224,
    gameId: weaponDataTable.serenitys_call.gameId,
    iconClass: "weapon-icon-sword-serenitys-call",
    rarity: weaponDataTable.serenitys_call.rarity,
    weapon: weaponDataTable.serenitys_call.weapon,
    statTable: weaponStatTables.serenitys_call,
    conditions: [
        new ConditionMoonPhaseSetting(),
        new ConditionBooleanMoonPhaseRefine({
            name: 'weapon_serenitys_call',
            serializeId: 1,
            title: 'talent_name.weapon_serenitys_call',
            description: 'talent_descr.weapon_serenitys_call',
            stats: [
                new StatTable('text_hp_percent_default', weaponDataTable.serenitys_call.serenitys_call.param1, 100),
                new StatTable('hp_percent', weaponDataTable.serenitys_call.serenitys_call.param1, 100),
                new StatTable('text_hp_percent', weaponDataTable.serenitys_call.serenitys_call.param3, 100),
            ],
            realStats: [
                [
                    new StatTable('hp_percent', [0]),
                    new StatTable('hp_percent', [0]),
                    new StatTable('hp_percent', weaponDataTable.serenitys_call.serenitys_call.param3, 100),
                ],
            ]
        })
    ],
});
