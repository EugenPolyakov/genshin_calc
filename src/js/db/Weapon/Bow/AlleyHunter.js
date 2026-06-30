import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";
import { weaponDataTable } from "../../generated/WeaponStatTables";

export const AlleyHunter = new DbObjectWeapon({
    name: 'alley_hunter',
    serializeId: 23,
    gameId: weaponDataTable.AlleyHunter.gameId,
    iconClass: "weapon-icon-bow-alley-hunter",
    rarity: weaponDataTable.AlleyHunter.rarity,
    weapon: weaponDataTable.AlleyHunter.weapon,
    statTable: weaponStatTables.AlleyHunter,
    conditions: [
        new ConditionStacks({
            name: 'weapon_alley_hunter',
            serializeId: 1,
            title: 'talent_name.weapon_oppidan_ambush',
            description: 'talent_descr.weapon_oppidan_ambush',
            maxStacks: 10,
            levelSetting: 'weapon_refine',
            dropdownClass: 'two-digits',
            stats: [
                new StatTable('dmg_all', weaponDataTable.AlleyHunter.Weapon_Bow_Outlaw.param1, 100),
                new StatTable('text_percent_max', weaponDataTable.AlleyHunter.Weapon_Bow_Outlaw.param1, 1000),
                new StatTable('text_percent_reduce', weaponDataTable.AlleyHunter.Weapon_Bow_Outlaw.param1, 200),
            ],
        })
    ],
});
