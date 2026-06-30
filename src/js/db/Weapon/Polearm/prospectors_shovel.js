import { ConditionBooleanMoonPhaseRefine } from "../../../classes/Condition/Boolean/MoonPhaseRefine";
import { ConditionMoonPhaseSetting } from "../../../classes/Condition/CustomOrigin/MoonPhaseSetting";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const prospectors_shovel = new DbObjectWeapon({
    name: 'prospectors_shovel',
    serializeId: 226,
    gameId: weaponDataTable.prospectors_shovel.gameId,
    iconClass: "weapon-icon-polearm-prospectors-shovel",
    rarity: weaponDataTable.prospectors_shovel.rarity,
    weapon: weaponDataTable.prospectors_shovel.weapon,
    statTable: weaponStatTables.prospectors_shovel,
    conditions: [
        new ConditionMoonPhaseSetting(),
        new ConditionBooleanMoonPhaseRefine({
            name: 'weapon_prospectors_shovel',
            serializeId: 1,
            title: 'talent_name.weapon_prospectors_shovel',
            description: 'talent_descr.weapon_prospectors_shovel',
            stats: [
                new StatTable('text_dmg_reaction_lunarcharged_percent_default', weaponDataTable.prospectors_shovel.prospectors_shovel.param2, 100),
                new StatTable('dmg_reaction_electrocharged', weaponDataTable.prospectors_shovel.prospectors_shovel.param1, 100),
                new StatTable('dmg_reaction_lunarcharged', weaponDataTable.prospectors_shovel.prospectors_shovel.param2, 100),
                new StatTable('text_dmg_reaction_lunarcharged_percent', weaponDataTable.prospectors_shovel.prospectors_shovel.param3, 100),
            ],
            realStats: [
                [
                    new StatTable('dmg_reaction_lunarcharged', [0]),
                    new StatTable('dmg_reaction_lunarcharged', [0]),
                    new StatTable('dmg_reaction_lunarcharged', weaponDataTable.prospectors_shovel.prospectors_shovel.param3, 100),
                ],
            ]
        })
    ],
});
