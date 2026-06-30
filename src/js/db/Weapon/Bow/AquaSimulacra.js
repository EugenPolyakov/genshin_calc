import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";
import { weaponDataTable } from "../../generated/WeaponStatTables";

export const AquaSimulacra = new DbObjectWeapon({
    name: 'aqua_simulacra',
    serializeId: 122,
    gameId: weaponDataTable.AquaSimulacra.gameId,
    iconClass: "weapon-icon-bow-aqua-simulacra",
    rarity: weaponDataTable.AquaSimulacra.rarity,
    weapon: weaponDataTable.AquaSimulacra.weapon,
    statTable: weaponStatTables.AquaSimulacra,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_the_cleansing_form',
            description: 'talent_descr.weapon_the_cleansing_form_1',
            stats: [
                new StatTable('hp_percent', weaponDataTable.AquaSimulacra.the_cleansing_form.param1, 100),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_aqua_simulacra',
            serializeId: 1,
            title: 'talent_name.weapon_the_cleansing_form',
            description: 'talent_descr.weapon_the_cleansing_form_2',
            stats: [
                new StatTable('dmg_all', weaponDataTable.AquaSimulacra.the_cleansing_form.param1, 100),
            ],
        }),
    ],
});
