import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";
import { weaponDataTable } from "../../generated/WeaponStatTables";

export const AmosBow = new DbObjectWeapon({
    name: 'amos_bow',
    serializeId: 24,
    gameId: weaponDataTable.AmosBow.gameId,
    iconClass: "weapon-icon-bow-amos-bow",
    rarity: weaponDataTable.AmosBow.rarity,
    weapon: weaponDataTable.AmosBow.weapon,
    statTable: weaponStatTables.AmosBow,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_strong_willed',
            description: 'talent_descr.weapon_strong_willed_2',
            stats: [
                new StatTable('dmg_normal', weaponDataTable.AmosBow.Weapon_Bow_RiseDMGWithTime.param1, 100),
                new StatTable('dmg_charged', weaponDataTable.AmosBow.Weapon_Bow_RiseDMGWithTime.param1, 100),
            ],
        }),
        new ConditionStacks({
            name: 'weapon_amos_bow',
            serializeId: 1,
            title: 'talent_name.weapon_strong_willed',
            description: 'talent_descr.weapon_strong_willed_1',
            maxStacks: 5,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('dmg_normal', weaponDataTable.AmosBow.Weapon_Bow_RiseDMGWithTime.param2, 100),
                new StatTable('dmg_charged', weaponDataTable.AmosBow.Weapon_Bow_RiseDMGWithTime.param2, 100),
            ],
        })
    ],
});
