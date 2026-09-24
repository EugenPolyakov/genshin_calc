import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const beyond_the_chrysalis = new DbObjectWeapon({
    name: 'beyond_the_chrysalis',
    serializeId: 263,
    gameId: weaponDataTable.beyond_the_chrysalis.gameId,
    iconClass: "weapon-icon-sword-beyond-the-chrysalis",
    rarity: weaponDataTable.beyond_the_chrysalis.rarity,
    weapon: weaponDataTable.beyond_the_chrysalis.weapon,
    statTable: weaponStatTables.beyond_the_chrysalis,
    conditions: [
        new ConditionStatic({
            title: 'talent_name.weapon_beyond_the_chrysalis_1',
            description: 'talent_descr.weapon_beyond_the_chrysalis_1',
        }),
        new ConditionBooleanRefine({
            name: 'weapon_beyond_the_chrysalis_1',
            serializeId: 1,
            title: 'talent_name.weapon_beyond_the_chrysalis_2',
            description: 'talent_descr.weapon_beyond_the_chrysalis_2',
            stats: [
                new StatTable('crit_dmg', weaponDataTable.beyond_the_chrysalis.beyond_the_chrysalis.param1, 100),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_beyond_the_chrysalis_2',
            serializeId: 2,
            title: 'talent_name.weapon_beyond_the_chrysalis_3',
            description: 'talent_descr.weapon_beyond_the_chrysalis_3',
            stats: [
                new StatTable('dmg_reaction_stellar_swirl', weaponDataTable.beyond_the_chrysalis.beyond_the_chrysalis.param2, 100),
            ],
        }),
        new ConditionStaticRefine({
            name: 'weapon_beyond_the_chrysalis_3',
            serializeId: 3,
            title: 'talent_name.weapon_beyond_the_chrysalis_4',
            description: 'talent_descr.weapon_beyond_the_chrysalis_4',
            stats: [
                new StatTable('text_energy', weaponDataTable.beyond_the_chrysalis.beyond_the_chrysalis.param3),
            ],
        }),
    ],
});
