import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const bloodsoaked_ruins = new DbObjectWeapon({
    name: 'bloodsoaked_ruins',
    serializeId: 236,
    gameId: weaponDataTable.bloodsoaked_ruins.gameId,
    iconClass: "weapon-icon-polearm-bloodsoaked-ruins",
    rarity: weaponDataTable.bloodsoaked_ruins.rarity,
    weapon: weaponDataTable.bloodsoaked_ruins.weapon,
    statTable: weaponStatTables.bloodsoaked_ruins,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_bloodsoaked_ruins_1',
            serializeId: 1,
            title: 'talent_name.weapon_bloodsoaked_ruins',
            description: 'talent_descr.weapon_bloodsoaked_ruins_1',
            stats: [
                new StatTable('dmg_reaction_lunarcharged', weaponDataTable.bloodsoaked_ruins.bloodsoaked_ruins.param2, 100),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_bloodsoaked_ruins_2',
            serializeId: 2,
            title: 'talent_name.weapon_bloodsoaked_ruins',
            description: 'talent_descr.weapon_bloodsoaked_ruins_2',
            stats: [
                new StatTable('crit_dmg', weaponDataTable.bloodsoaked_ruins.bloodsoaked_ruins.param4, 100),
                new StatTable('text_energy', weaponDataTable.bloodsoaked_ruins.bloodsoaked_ruins.param5),
            ],
        }),
    ],
});
