import { ConditionBooleanMoonPhaseRefine } from "../../../classes/Condition/Boolean/MoonPhaseRefine";
import { ConditionMoonPhaseSetting } from "../../../classes/Condition/CustomOrigin/MoonPhaseSetting";
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
        new ConditionBooleanMoonPhaseRefine({
            name: 'weapon_blackmarrow_lantern',
            serializeId: 1,
            title: 'talent_name.weapon_blackmarrow_lantern',
            description: 'talent_descr.weapon_blackmarrow_lantern',
            stats: [
                new StatTable('text_dmg_reaction_lunarbloom_percent_default', weaponDataTable.blackmarrow_lantern.blackmarrow_lantern.param2, 100),
                new StatTable('dmg_reaction_rupture', weaponDataTable.blackmarrow_lantern.blackmarrow_lantern.param1, 100),
                new StatTable('dmg_reaction_lunarbloom', weaponDataTable.blackmarrow_lantern.blackmarrow_lantern.param2, 100),
                new StatTable('text_dmg_reaction_lunarbloom_percent', weaponDataTable.blackmarrow_lantern.blackmarrow_lantern.param3, 100),
            ],
            realStats: [
                [
                    new StatTable('dmg_reaction_lunarbloom', [0]),
                    new StatTable('dmg_reaction_lunarbloom', [0]),
                    new StatTable('dmg_reaction_lunarbloom', weaponDataTable.blackmarrow_lantern.blackmarrow_lantern.param3, 100),
                ],
            ]
        })
    ],
});
