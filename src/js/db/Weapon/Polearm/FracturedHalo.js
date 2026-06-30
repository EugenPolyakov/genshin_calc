import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const FracturedHalo = new DbObjectWeapon({
    name: 'fractured_halo',
    serializeId: 222,
    gameId: 13515,
    iconClass: "weapon-icon-polearm-fractured-halo",
    rarity: 5,
    weapon: 'polearm',
    statTable: weaponStatTables.FracturedHalo,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_fractured_halo_1',
            serializeId: 1,
            title: 'talent_name.weapon_purifying_crown',
            description: 'talent_descr.weapon_purifying_crown_1',
            stats: [
                new StatTable('atk_percent', [24, 30, 36, 42, 48]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_fractured_halo_2',
            serializeId: 2,
            title: 'talent_name.weapon_purifying_crown',
            description: 'talent_descr.weapon_purifying_crown_2',
            stats: [
                new StatTable('dmg_reaction_lunarcharged', [40, 50, 60, 70, 80]),
            ],
        }),
    ],
});
