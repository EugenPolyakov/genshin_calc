import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const a_teaspoon_of_transcendence = new DbObjectWeapon({
    name: 'a_teaspoon_of_transcendence',
    serializeId: 245,
    gameId: weaponDataTable.a_teaspoon_of_transcendence.gameId,
    iconClass: "weapon-icon-claymore-a-teaspoon-of-transcendence",
    rarity: weaponDataTable.a_teaspoon_of_transcendence.rarity,
    weapon: weaponDataTable.a_teaspoon_of_transcendence.weapon,
    statTable: weaponStatTables.a_teaspoon_of_transcendence,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_a_teaspoon_of_transcendence_1',
            description: 'talent_descr.weapon_a_teaspoon_of_transcendence_1',
            stats: [
                new StatTable('atk_percent', weaponDataTable.a_teaspoon_of_transcendence.a_teaspoon_of_transcendence.param1, 100),
            ],
        }),
        new ConditionStacks({
            name: 'weapon_a_teaspoon_of_transcendence',
            serializeId: 1,
            title: 'talent_name.weapon_a_teaspoon_of_transcendence_2',
            description: 'talent_descr.weapon_a_teaspoon_of_transcendence_2',
            levelSetting: 'weapon_refine',
            maxStacks: 3,
            stats: [
                new StatTable('dmg_reaction_stellar_conduct', weaponDataTable.a_teaspoon_of_transcendence.a_teaspoon_of_transcendence.param2, 100),
            ],
        }),
    ],
});
