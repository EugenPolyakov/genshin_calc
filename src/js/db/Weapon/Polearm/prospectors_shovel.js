import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionMoonPhaseSetting } from "../../../classes/Condition/CustomOrigin/MoonPhaseSetting";
import { ConditionMoonPhaseCheck } from "../../../classes/Condition/MoonPhaseCheck";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
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
        new ConditionBoolean({
            serializeId: 1,
            isHidden: 1,
        }),
        new ConditionStaticRefine({
            title: 'talent_name.weapon_prospectors_shovel',
            description: 'talent_descr.weapon_prospectors_shovel_1',
            stats: [
                new StatTable('dmg_reaction_electrocharged', weaponDataTable.prospectors_shovel.prospectors_shovel.param1, 100),
                new StatTable('dmg_reaction_lunarcharged', weaponDataTable.prospectors_shovel.prospectors_shovel.param2, 100),
            ],
        }),
        new ConditionStaticRefine({
            title: 'talent_name.weapon_prospectors_shovel',
            description: 'talent_descr.weapon_prospectors_shovel_2',
            stats: [
                new StatTable('dmg_reaction_lunarcharged', weaponDataTable.prospectors_shovel.prospectors_shovel.param3, 100),
            ],
            condition: new ConditionMoonPhaseCheck({ moonphase: 2 }),
        }),
    ],
});
