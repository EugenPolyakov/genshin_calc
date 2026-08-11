import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const blade_of_atonement = new DbObjectWeapon({
    name: 'blade_of_atonement',
    serializeId: 253,
    gameId: weaponDataTable.blade_of_atonement.gameId,
    iconClass: "weapon-icon-claymore-blade-of-atonement",
    rarity: weaponDataTable.blade_of_atonement.rarity,
    weapon: weaponDataTable.blade_of_atonement.weapon,
    statTable: weaponStatTables.blade_of_atonement,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_blade_of_atonement_1',
            serializeId: 1,
            title: 'talent_name.weapon_blade_of_atonement',
            description: 'talent_descr.weapon_blade_of_atonement_1',
            stats: [
                new StatTable('mastery', weaponDataTable.blade_of_atonement.blade_of_atonement.param1),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_blade_of_atonement_2',
            serializeId: 2,
            title: 'talent_name.weapon_blade_of_atonement',
            description: 'talent_descr.weapon_blade_of_atonement_2',
            stats: [
                new StatTable('atk_percent', weaponDataTable.blade_of_atonement.blade_of_atonement.param3, 100),
            ],
        }),
    ],
});
