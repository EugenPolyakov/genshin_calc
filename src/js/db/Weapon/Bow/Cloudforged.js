import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";
import { weaponDataTable } from "../../generated/WeaponStatTables";

export const Cloudforged = new DbObjectWeapon({
    name: 'cloudforged',
    serializeId: 174,
    gameId: weaponDataTable.Cloudforged.gameId,
    iconClass: "weapon-icon-bow-cloudforged",
    rarity: weaponDataTable.Cloudforged.rarity,
    weapon: weaponDataTable.Cloudforged.weapon,
    statTable: weaponStatTables.Cloudforged,
    conditions: [
        new ConditionStacks({
            name: 'weapon_cloudforged',
            serializeId: 1,
            title: 'talent_name.weapon_crag_chiseled_forge',
            description: 'talent_descr.weapon_crag_chiseled_forge',
            maxStacks: 2,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('mastery', weaponDataTable.Cloudforged.crag_chiseled_forge.param1),
            ],
        }),
    ],
});
