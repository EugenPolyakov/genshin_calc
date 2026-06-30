import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Durin.s1_id,
        title: 'talent_name.durin_radiant_wingslash',
        description: 'talent_descr.durin_radiant_wingslash',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Durin.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Durin.s1.p2),
            },
            {
                type: 'hits',
                name: 'normal_hit_3',
                table: [
                    new StatTable('normal_hit_3_1', charTalentTables.Durin.s1.p3),
                    new StatTable('normal_hit_3_2', charTalentTables.Durin.s1.p4),
                ],
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Durin.s1.p5),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Durin.s1.p6),
            },
            {
                table: new StatTable('stamina_cost', charTalentTables.Durin.s1.p7),
            },
            {
                table: new StatTable('plunge', charTalentTables.Durin.s1.p8),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Durin.s1.p9),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Durin.s1.p10),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Durin.s2_id,
        title: 'talent_name.durin_convergence_and_division',
        description: 'talent_descr.durin_convergence_and_division',
        items: [
            {
                table: new StatTable('durin_confirmation_of_purity_dmg', charTalentTables.Durin.s2.p1),
            },
            {
                type: 'hits',
                name: 'durin_denial_of_darkness_dmg',
                table: [
                    new StatTable('durin_denial_of_darkness_dmg_1', charTalentTables.Durin.s2.p2),
                    new StatTable('durin_denial_of_darkness_dmg_2', charTalentTables.Durin.s2.p3),
                    new StatTable('durin_denial_of_darkness_dmg_3', charTalentTables.Durin.s2.p4),
                ],
            },
            {
                unit: 'unit',
                table: new StatTable('durin_energy_regeneration', charTalentTables.Durin.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Durin.s2.p6),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Durin.s3_id,
        title: 'talent_name.durin_as_the_light_shifts',
        description: 'talent_descr.durin_as_the_light_shifts',
        items: [
            {
                type: 'hits',
                name: 'durin_as_the_light_shifts_dmg',
                table: [
                    new StatTable('durin_as_the_light_shifts_dmg_1', charTalentTables.Durin.s3.p1),
                    new StatTable('durin_as_the_light_shifts_dmg_2', charTalentTables.Durin.s3.p2),
                    new StatTable('durin_as_the_light_shifts_dmg_3', charTalentTables.Durin.s3.p3),
                ],
            },
            {
                type: 'hits',
                name: 'durin_as_the_stars_smolder_dmg',
                table: [
                    new StatTable('durin_as_the_stars_smolder_dmg_1', charTalentTables.Durin.s3.p4),
                    new StatTable('durin_as_the_stars_smolder_dmg_2', charTalentTables.Durin.s3.p5),
                    new StatTable('durin_as_the_stars_smolder_dmg_3', charTalentTables.Durin.s3.p6),
                ],
            },
            {
                table: new StatTable('durin_dragon_of_white_flame_dmg', charTalentTables.Durin.s3.p7),
            },
            {
                table: new StatTable('durin_dragon_of_dark_decay_dmg', charTalentTables.Durin.s3.p8),
            },
            {
                unit: 'sec',
                table: new StatTable('durin_dragon_of_white_flame_duration', charTalentTables.Durin.s3.p9),
            },
            {
                unit: 'sec',
                table: new StatTable('durin_dragon_of_dark_decay_duration', charTalentTables.Durin.s3.p10),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Durin.s3.p11),
            },
            {
                unit: 'unit',
                table: new StatTable('energy_cost', charTalentTables.Durin.s3.p12),
            },
        ],
    },
    links: charTalentTables.Durin.links,
});

export const Durin = new DbObjectChar({
    name: 'durin',
    serializeId: 113,
    gameId: charTalentTables.Durin.char_id,
    iconClass: 'char-icon-durin',
    rarity: 5,
    element: 'pyro',
    weapon: charTalentTables.Durin.char_weapon,
    origin: 'mondstadt',
    talents: Talents,
    statTable: charTables.Durin,
    features: [
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_3',
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_3_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_3_2'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'durin_confirmation_of_purity_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.durin_confirmation_of_purity_dmg'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            category: 'skill',
            damageType: 'skill',
            name: 'durin_denial_of_darkness_dmg',
            element: 'pyro',
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.durin_denial_of_darkness_dmg_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.durin_denial_of_darkness_dmg_2'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.durin_denial_of_darkness_dmg_3'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageSkill({
            isChild: true,
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.durin_denial_of_darkness_dmg_1'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            isChild: true,
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.durin_denial_of_darkness_dmg_2'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            isChild: true,
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.durin_denial_of_darkness_dmg_3'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            category: 'burst',
            damageType: 'burst',
            name: 'durin_as_the_light_shifts_dmg',
            element: 'pyro',
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_burst',
                            values: Talents.get('burst.durin_as_the_light_shifts_dmg_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_burst',
                            values: Talents.get('burst.durin_as_the_light_shifts_dmg_2'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_burst',
                            values: Talents.get('burst.durin_as_the_light_shifts_dmg_3'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageBurst({
            isChild: true,
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.durin_as_the_light_shifts_dmg_1'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            isChild: true,
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.durin_as_the_light_shifts_dmg_2'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            isChild: true,
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.durin_as_the_light_shifts_dmg_3'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            category: 'burst',
            damageType: 'burst',
            name: 'durin_as_the_stars_smolder_dmg',
            element: 'pyro',
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_burst',
                            values: Talents.get('burst.durin_as_the_stars_smolder_dmg_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_burst',
                            values: Talents.get('burst.durin_as_the_stars_smolder_dmg_2'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_burst',
                            values: Talents.get('burst.durin_as_the_stars_smolder_dmg_3'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageBurst({
            isChild: true,
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.durin_as_the_stars_smolder_dmg_1'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            isChild: true,
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.durin_as_the_stars_smolder_dmg_2'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            isChild: true,
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.durin_as_the_stars_smolder_dmg_3'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.durin_dragon_of_white_flame_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.durin_dragon_of_dark_decay_dmg'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionStatic({
            name: 'durin_light_manifest_of_the_divine_calculus',
            serializeId: 1,
            title: 'talent_name.durin_light_manifest_of_the_divine_calculus',
            description: 'talent_descr.durin_light_manifest_of_the_divine_calculus',
            info: {ascension: 1},
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new ConditionStatic({
            name: 'durin_chaos_formed_like_the_night',
            serializeId: 1,
            title: 'talent_name.durin_chaos_formed_like_the_night',
            description: 'talent_descr.durin_chaos_formed_like_the_night',
            info: {ascension: 4},
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
    ],
    multipliers: [
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    name: 'durin_adamahs_redemption',
                    title: 'talent_name.durin_adamahs_redemption',
                    description: 'talent_descr.durin_adamahs_redemption',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    name: 'durin_unground_visions',
                    title: 'talent_name.durin_unground_visions',
                    description: 'talent_descr.durin_unground_visions',
                }),
            ],
        },
        {
            conditions: [
                new Condition({
                    settings: {
                        char_skill_burst_bonus: 3, char_skill_elemental_bonus: 3,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    name: 'durin_emanares_source',
                    title: 'talent_name.durin_emanares_source',
                    description: 'talent_descr.durin_emanares_source',
                }),
            ],
        },
        {
            conditions: [
                new Condition({
                    settings: {
                        char_skill_burst_bonus: 3, char_skill_elemental_bonus: 3,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    name: 'durin_dual_birth',
                    title: 'talent_name.durin_dual_birth',
                    description: 'talent_descr.durin_dual_birth',
                }),
            ],
        },
    ]),
});
