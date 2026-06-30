import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureDamage } from "../../../classes/Feature2/Damage";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";
import { weaponDataTable } from "../../generated/WeaponStatTables";

export const EndOfTheLine = new DbObjectWeapon({
    name: 'end_of_the_line',
    serializeId: 130,
    gameId: weaponDataTable.EndOfTheLine.gameId,
    iconClass: "weapon-icon-bow-end-of-the-line",
    rarity: weaponDataTable.EndOfTheLine.rarity,
    weapon: weaponDataTable.EndOfTheLine.weapon,
    statTable: weaponStatTables.EndOfTheLine,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_net_snapper',
            description: 'talent_descr.weapon_net_snapper',
            stats: [
                new StatTable('text_percent_dmg', weaponDataTable.EndOfTheLine.Weapon_Bow_Fin.param1, 100),
            ]
        }),
    ],
    features: [
        new FeatureDamage({
            category: 'weapon',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'weapon_refine',
                    values: new StatTable('trawler_dmg', weaponDataTable.EndOfTheLine.Weapon_Bow_Fin.param1, 100),
                }),
            ],
        }),
    ],
});
