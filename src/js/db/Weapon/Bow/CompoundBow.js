import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";
import { weaponDataTable } from "../../generated/WeaponStatTables";

export const CompoundBow = new DbObjectWeapon({
    name: 'compound_bow',
    serializeId: 26,
    gameId: weaponDataTable.CompoundBow.gameId,
    iconClass: "weapon-icon-bow-compound-bow",
    rarity: weaponDataTable.CompoundBow.rarity,
    weapon: weaponDataTable.CompoundBow.weapon,
    statTable: weaponStatTables.CompoundBow,
    conditions: [
        new ConditionStacks({
            name: 'weapon_compound_bow',
            serializeId: 1,
            title: 'talent_name.weapon_infusion_arrow',
            description: 'talent_descr.weapon_infusion_arrow',
            maxStacks: 4,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('atk_percent', weaponDataTable.CompoundBow.Weapon_Bow_AttackGainAKTSPDBuff.param1, 100),
                new StatTable('atk_speed_normal', weaponDataTable.CompoundBow.Weapon_Bow_AttackGainAKTSPDBuff.param2, 100),
            ],
        })
    ],
});

