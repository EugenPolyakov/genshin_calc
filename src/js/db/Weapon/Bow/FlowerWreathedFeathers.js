import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";
import { weaponDataTable } from "../../generated/WeaponStatTables";

export const FlowerWreathedFeathers = new DbObjectWeapon({
    name: 'flower_wreathed_feathers',
    serializeId: 189,
    gameId: weaponDataTable.FlowerWreathedFeathers.gameId,
    iconClass: "weapon-icon-bow-flower-wreathed-feathers",
    rarity: weaponDataTable.FlowerWreathedFeathers.rarity,
    weapon: weaponDataTable.FlowerWreathedFeathers.weapon,
    statTable: weaponStatTables.FlowerWreathedFeathers,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_inflorescence_unattainable',
            description: 'talent_descr.weapon_inflorescence_unattainable_1',
            stats: [
                new StatTable('text_percent', weaponDataTable.FlowerWreathedFeathers.Weapon_Bow_Umpakati.param1, 100),
            ],
        }),
        new ConditionStacks({
            name: 'flower_wreathed_feathers',
            serializeId: 1,
            title: 'talent_name.weapon_inflorescence_unattainable',
            description: 'talent_descr.weapon_inflorescence_unattainable_2',
            maxStacks: 6,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('dmg_charged', weaponDataTable.FlowerWreathedFeathers.Weapon_Bow_Umpakati.param3, 100),
            ],
        }),
    ],
});

