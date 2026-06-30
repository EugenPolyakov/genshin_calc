import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const the_daybreak_chronicles = new DbObjectWeapon({
    name: 'the_daybreak_chronicles',
    serializeId: 238,
    gameId: weaponDataTable.the_daybreak_chronicles.gameId,
    iconClass: "weapon-icon-bow-the-daybreak-chronicles",
    rarity: weaponDataTable.the_daybreak_chronicles.rarity,
    weapon: weaponDataTable.the_daybreak_chronicles.weapon,
    statTable: weaponStatTables.the_daybreak_chronicles,
    conditions: [
        new ConditionStacks({
            name: 'weapon_the_daybreak_chronicles',
            serializeId: 1,
            title: 'talent_name.weapon_the_daybreak_chronicles',
            description: 'talent_descr.weapon_the_daybreak_chronicles',
            maxStacks: 6,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('text_dmg_percent', weaponDataTable.the_daybreak_chronicles.the_daybreak_chronicles.param2, 100),
                new StatTable('text_lose_percent', weaponDataTable.the_daybreak_chronicles.the_daybreak_chronicles.param3, 100),
                new StatTable('dmg_normal', weaponDataTable.the_daybreak_chronicles.the_daybreak_chronicles.param4, 100),
                new StatTable('dmg_burst', weaponDataTable.the_daybreak_chronicles.the_daybreak_chronicles.param4, 100),
                new StatTable('dmg_skill', weaponDataTable.the_daybreak_chronicles.the_daybreak_chronicles.param4, 100),
                new StatTable('text_restore_percent2', weaponDataTable.the_daybreak_chronicles.the_daybreak_chronicles.param6, 100),
            ],
        }),
    ],
});
