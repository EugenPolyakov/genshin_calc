import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const echoes_of_the_heart = new DbObjectWeapon({
    name: 'echoes_of_the_heart',
    serializeId: 249,
    gameId: weaponDataTable.echoes_of_the_heart.gameId,
    iconClass: "weapon-icon-catalyst-echoes-of-the-heart",
    rarity: weaponDataTable.echoes_of_the_heart.rarity,
    weapon: weaponDataTable.echoes_of_the_heart.weapon,
    statTable: weaponStatTables.echoes_of_the_heart,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_echoes_of_the_heart_1',
            serializeId: 1,
            title: 'talent_name.weapon_echoes_of_the_heart',
            description: 'talent_descr.weapon_echoes_of_the_heart_1',
            stats: [
                new StatTable('mastery', weaponDataTable.echoes_of_the_heart.echoes_of_the_heart.param1),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_echoes_of_the_heart_2',
            serializeId: 2,
            title: 'talent_name.weapon_echoes_of_the_heart',
            description: 'talent_descr.weapon_echoes_of_the_heart_2',
            stats: [
                new StatTable('dmg_reaction_stellar_glimmer', weaponDataTable.echoes_of_the_heart.echoes_of_the_heart.param2, 100),
            ],
        }),
    ],
});
