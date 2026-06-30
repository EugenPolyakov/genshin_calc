import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const WhiteTassel = new DbObjectWeapon({
    name: 'white_tassel',
    serializeId: 84,
    gameId: 13301,
    iconClass: "weapon-icon-polearm-white-tassel",
    rarity: 3,
    weapon: 'polearm',
    statTable: weaponStatTables.WhiteTassel,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_sharp',
            description: 'talent_descr.weapon_sharp',
            stats: [
                new StatTable('dmg_normal', [24, 30, 36, 42, 48]),
            ],
        }),
    ],
});

