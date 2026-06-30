import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const PrototypeStarglitter = new DbObjectWeapon({
    name: 'prototype_starglitter',
    serializeId: 89,
    gameId: 13402,
    iconClass: "weapon-icon-polearm-prototype-starglitter",
    rarity: 4,
    weapon: 'polearm',
    statTable: weaponStatTables.PrototypeStarglitter,
    conditions: [
        new ConditionStacks({
            name: 'prototype_starglitter',
            serializeId: 1,
            title: 'talent_name.weapon_magic_affinity',
            description: 'talent_descr.weapon_magic_affinity',
            maxStacks: 2,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('dmg_normal', [8, 10, 12, 14, 16]),
                new StatTable('dmg_charged', [8, 10, 12, 14, 16]),
            ],
        })
    ],
});
