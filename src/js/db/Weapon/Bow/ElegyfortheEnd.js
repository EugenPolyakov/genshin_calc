import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";
import { weaponDataTable } from "../../generated/WeaponStatTables";

export const ElegyfortheEnd = new DbObjectWeapon({
    name: 'elegy_for_the_end',
    serializeId: 27,
    gameId: weaponDataTable.ElegyfortheEnd.gameId,
    iconClass: "weapon-icon-bow-elegy-for-the-end",
    rarity: weaponDataTable.ElegyfortheEnd.rarity,
    weapon: weaponDataTable.ElegyfortheEnd.weapon,
    statTable: weaponStatTables.ElegyfortheEnd,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_the_parting_refrain_1',
            description: 'talent_descr.weapon_the_parting_refrain_2',
            stats: [
                new StatTable('mastery', weaponDataTable.ElegyfortheEnd.Weapon_Bow_Widsith.param1),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_elegy_for_the_end',
            serializeId: 1,
            title: 'talent_name.weapon_the_parting_refrain_2',
            description: 'talent_descr.weapon_the_parting_refrain_1',
            stats: [
                new StatTable('text_value', weaponDataTable.ElegyfortheEnd.Weapon_Bow_Widsith.param4),
                new StatTable('text_percent', weaponDataTable.ElegyfortheEnd.Weapon_Bow_Widsith.param5, 100),
            ],
        }),
    ],
});

