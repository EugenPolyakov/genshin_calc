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

export const athame_artis = new DbObjectWeapon({
    name: 'athame_artis',
    serializeId: 234,
    gameId: weaponDataTable.athame_artis.gameId,
    iconClass: "weapon-icon-sword-athame-artis",
    rarity: weaponDataTable.athame_artis.rarity,
    weapon: weaponDataTable.athame_artis.weapon,
    statTable: weaponStatTables.athame_artis,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_athame_artis',
            description: 'talent_descr.weapon_athame_artis_1',
            stats: [
                new StatTable('crit_dmg_burst', weaponDataTable.athame_artis.athame_artis.param1, 100),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_athame_artis',
            serializeId: 1,
            title: 'talent_name.weapon_athame_artis',
            description: 'talent_descr.weapon_athame_artis_2',
            stats: [
                new StatTable('text_percent2', weaponDataTable.athame_artis.athame_artis.param3, 100),
                new StatTable('atk_percent', weaponDataTable.athame_artis.athame_artis.param3, 100),
                new StatTable('text_percent', weaponDataTable.athame_artis.athame_artis.param4, 100),
            ],
        }),
        new ConditionStaticRefine({
            title: 'talent_name.weapon_athame_artis',
            description: 'talent_descr.weapon_athame_artis_3',
            stats: [
                new StatTable('atk_percent', weaponDataTable.athame_artis.athame_artis.param3, 75),
            ],
            condition: new ConditionAnd([
                new ConditionHexCheck({ hex: 2 }),
                new ConditionBoolean({ name: 'weapon_athame_artis' }),
            ]),
        }),
    ],
});
