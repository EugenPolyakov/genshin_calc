import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";
import { weaponDataTable } from "../../generated/WeaponStatTables";

export const FavoniusWarbow = new DbObjectWeapon({
    name: 'favonius_warbow',
    serializeId: 28,
    gameId: weaponDataTable.FavoniusWarbow.gameId,
    iconClass: "weapon-icon-bow-favonius-warbow",
    rarity: weaponDataTable.FavoniusWarbow.rarity,
    weapon: weaponDataTable.FavoniusWarbow.weapon,
    statTable: weaponStatTables.FavoniusWarbow,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_windfall',
            description: 'talent_descr.weapon_windfall',
            stats: [
                new StatTable('text_percent', weaponDataTable.FavoniusWarbow.Weapon_Bow_GenerateBallWhenCritic.param1, 100),
                new StatTable('text_cooldown', weaponDataTable.FavoniusWarbow.Weapon_Bow_GenerateBallWhenCritic.param2),
            ],
        }),
    ],
});


