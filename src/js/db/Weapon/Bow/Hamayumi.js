import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";
import { weaponDataTable } from "../../generated/WeaponStatTables";

export const Hamayumi = new DbObjectWeapon({
    name: 'hamayumi',
    serializeId: 106,
    gameId: weaponDataTable.Hamayumi.gameId,
    iconClass: "weapon-icon-bow-hamayumi",
    rarity: weaponDataTable.Hamayumi.rarity,
    weapon: weaponDataTable.Hamayumi.weapon,
    statTable: weaponStatTables.Hamayumi,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_full_draw',
            description: 'talent_descr.weapon_full_draw_1',
            stats: [
                new StatTable('dmg_normal', weaponDataTable.Hamayumi.Weapon_Bow_Bakufu.param1, 100),
                new StatTable('dmg_charged', weaponDataTable.Hamayumi.Weapon_Bow_Bakufu.param2, 100),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_demon_slayer_bow',
            serializeId: 1,
            title: 'talent_name.weapon_full_draw',
            description: 'talent_descr.weapon_full_draw_2',
            stats: [
                new StatTable('dmg_normal', weaponDataTable.Hamayumi.Weapon_Bow_Bakufu.param1, 100),
                new StatTable('dmg_charged', weaponDataTable.Hamayumi.Weapon_Bow_Bakufu.param2, 100),
            ],
        }),
    ],
});
