import { ConditionAnd } from "../../../classes/Condition/And";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanMoonPhaseRefine } from "../../../classes/Condition/Boolean/MoonPhaseRefine";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionMoonPhaseSetting } from "../../../classes/Condition/CustomOrigin/MoonPhaseSetting";
import { ConditionHexCheck } from "../../../classes/Condition/HexCheck";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const lightbearing_moonshard = new DbObjectWeapon({
    name: 'lightbearing_moonshard',
    serializeId: 235,
    gameId: weaponDataTable.lightbearing_moonshard.gameId,
    iconClass: "weapon-icon-sword-lightbearing-moonshard",
    rarity: weaponDataTable.lightbearing_moonshard.rarity,
    weapon: weaponDataTable.lightbearing_moonshard.weapon,
    statTable: weaponStatTables.lightbearing_moonshard,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_lightbearing_moonshard',
            description: 'talent_descr.weapon_lightbearing_moonshard_1',
            stats: [
                new StatTable('def_percent', weaponDataTable.lightbearing_moonshard.lightbearing_moonshard.def_percent),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_lightbearing_moonshard',
            serializeId: 1,
            title: 'talent_name.weapon_lightbearing_moonshard',
            description: 'talent_descr.weapon_lightbearing_moonshard_2',
            stats: [
                new StatTable('dmg_reaction_lunarcrystallize', weaponDataTable.lightbearing_moonshard.lightbearing_moonshard.param1, 100),
            ],
        }),
    ],
});
