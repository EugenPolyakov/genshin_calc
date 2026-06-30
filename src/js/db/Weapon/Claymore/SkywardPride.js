import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureDamage } from "../../../classes/Feature2/Damage";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const SkywardPride = new DbObjectWeapon({
    name: 'skyward_pride',
    serializeId: 62,
    gameId: 12501,
    iconClass: "weapon-icon-claymore-skyward-pride",
    rarity: 5,
    weapon: 'claymore',
    statTable: weaponStatTables.SkywardPride,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_sky_ripping_dragon_spine',
            description: 'talent_descr.weapon_sky_ripping_dragon_spine_1',
            stats: [
                new StatTable('dmg_all', [8, 10, 12, 14, 16]),
            ],
        }),

        new ConditionStaticRefine({
            title: 'talent_name.weapon_sky_ripping_dragon_spine',
            description: 'talent_descr.weapon_sky_ripping_dragon_spine_2',
            stats: [
                new StatTable('text_percent', [40, 55, 70, 85, 100]),
            ],
        }),
    ],
    features: [
        new FeatureDamage({
            category: 'weapon',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'weapon_refine',
                    values: new StatTable('skyward_pride_vacuum_blade', [80, 100, 120, 140, 160]),
                }),
            ],
        }),
    ],
});

