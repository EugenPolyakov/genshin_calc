import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const breezeborne_refrain = new DbObjectWeapon({
    name: 'breezeborne_refrain',
    serializeId: 261,
    gameId: weaponDataTable.breezeborne_refrain.gameId,
    iconClass: "weapon-icon-bow-breezeborne-refrain",
    rarity: weaponDataTable.breezeborne_refrain.rarity,
    weapon: weaponDataTable.breezeborne_refrain.weapon,
    statTable: weaponStatTables.breezeborne_refrain,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_breezeborne_refrain',
            description: 'talent_descr.weapon_breezeborne_refrain_1',
            stats: [
                new StatTable('recharge', weaponDataTable.breezeborne_refrain.breezeborne_refrain.recharge_base),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_breezeborne_refrain',
            serializeId: 1,
            title: 'talent_name.weapon_breezeborne_refrain',
            description: 'talent_descr.weapon_breezeborne_refrain_2',
            stats: [
                new StatTable('text_percent', weaponDataTable.breezeborne_refrain.breezeborne_refrain.param1, 100),
            ],
        }),
    ],
});
