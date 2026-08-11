import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const clash_of_kings = new DbObjectWeapon({
    name: 'clash_of_kings',
    serializeId: 248,
    gameId: weaponDataTable.clash_of_kings.gameId,
    iconClass: "weapon-icon-catalyst-clash-of-kings",
    rarity: weaponDataTable.clash_of_kings.rarity,
    weapon: weaponDataTable.clash_of_kings.weapon,
    statTable: weaponStatTables.clash_of_kings,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_clash_of_kings',
            serializeId: 1,
            title: 'talent_name.weapon_clash_of_kings',
            description: 'talent_descr.weapon_clash_of_kings',
            stats: [
                new StatTable('atk_percent', weaponDataTable.clash_of_kings.clash_of_kings.param1, 100),
                new StatTable('mastery', weaponDataTable.clash_of_kings.clash_of_kings.param2),
            ],
        }),
    ],
});
