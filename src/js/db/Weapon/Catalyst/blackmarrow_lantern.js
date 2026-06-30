import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionMoonPhaseSetting } from "../../../classes/Condition/CustomOrigin/MoonPhaseSetting";
import { ConditionMoonPhaseCheck } from "../../../classes/Condition/MoonPhaseCheck";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const blackmarrow_lantern = new DbObjectWeapon({
    name: 'blackmarrow_lantern',
    serializeId: 227,
    gameId: weaponDataTable.blackmarrow_lantern.gameId,
    iconClass: "weapon-icon-catalyst-blackmarrow-lantern",
    rarity: weaponDataTable.blackmarrow_lantern.rarity,
    weapon: weaponDataTable.blackmarrow_lantern.weapon,
    statTable: weaponStatTables.blackmarrow_lantern,
    conditions: [
        new ConditionMoonPhaseSetting(),
        new ConditionBoolean({
            serializeId: 1,
            isHidden: 1,
        }),
        new ConditionStaticRefine({
            title: 'talent_name.weapon_blackmarrow_lantern',
            description: 'talent_descr.weapon_blackmarrow_lantern_1',
            stats: [
                new StatTable('dmg_reaction_rupture', weaponDataTable.blackmarrow_lantern.blackmarrow_lantern.param1, 100),
                new StatTable('dmg_reaction_lunarbloom', weaponDataTable.blackmarrow_lantern.blackmarrow_lantern.param2, 100),
            ],
        }),
        new ConditionStaticRefine({
            title: 'talent_name.weapon_blackmarrow_lantern',
            description: 'talent_descr.weapon_blackmarrow_lantern_2',
            stats: [
                new StatTable('dmg_reaction_lunarbloom', weaponDataTable.blackmarrow_lantern.blackmarrow_lantern.param3, 100),
            ],
            condition: new ConditionMoonPhaseCheck({ moonphase: 2 }),
        }),
    ],
});
