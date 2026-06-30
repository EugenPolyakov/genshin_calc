import { Condition } from "../../../classes/Condition";
import { ConditionAnd } from "../../../classes/Condition/And";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanMoonPhaseRefine } from "../../../classes/Condition/Boolean/MoonPhaseRefine";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionMoonPhaseSetting } from "../../../classes/Condition/CustomOrigin/MoonPhaseSetting";
import { ConditionHexCheck } from "../../../classes/Condition/HexCheck";
import { ConditionLevelSelect } from "../../../classes/Condition/LevelSelect";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { StatTableConditions } from "../../../classes/StatTable/Condition";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const gest_of_the_mighty_wolf = new DbObjectWeapon({
    name: 'gest_of_the_mighty_wolf',
    serializeId: 241,
    gameId: weaponDataTable.gest_of_the_mighty_wolf.gameId,
    iconClass: "weapon-icon-claymore-gest-of-the-mighty-wolf",
    rarity: weaponDataTable.gest_of_the_mighty_wolf.rarity,
    weapon: weaponDataTable.gest_of_the_mighty_wolf.weapon,
    statTable: weaponStatTables.gest_of_the_mighty_wolf,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_gest_of_the_mighty_wolf',
            description: 'talent_descr.weapon_gest_of_the_mighty_wolf_1',
            stats: [
                new StatTable('atk_speed_normal', weaponDataTable.gest_of_the_mighty_wolf.gest_of_the_mighty_wolf.param1, 100),
            ],
        }),
        new ConditionStacks({
            name: 'weapon_gest_of_the_mighty_wolf',
            serializeId: 1,
            title: 'talent_name.weapon_gest_of_the_mighty_wolf',
            description: 'talent_descr.weapon_gest_of_the_mighty_wolf_2',
            levelSetting: 'weapon_refine',
            maxStacks: 4,
            stats: [
                new StatTable('dmg_all', weaponDataTable.gest_of_the_mighty_wolf.gest_of_the_mighty_wolf.param2, 100),
                new StatTable('text_percent', weaponDataTable.gest_of_the_mighty_wolf.gest_of_the_mighty_wolf.param3, 100),
                new StatTableConditions('text_number_f', [1], new ConditionHexCheck({ hex: 2 })),
                new StatTableConditions('crit_dmg', weaponDataTable.gest_of_the_mighty_wolf.gest_of_the_mighty_wolf.param3, new ConditionHexCheck({ hex: 2 }), 100),
            ],
        }),
    ],
});
