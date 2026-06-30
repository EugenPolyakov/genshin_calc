import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanValue } from "../../classes/Condition/Boolean/Value";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionGroup } from "../../classes/Condition/Group";
import { ConditionHexCheck } from "../../classes/Condition/HexCheck";
import { ConditionHexCurrent } from "../../classes/Condition/HexCurrent";
import { ConditionNumber } from "../../classes/Condition/Number";
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
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
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
        title: 'talent_name.durin_convergence_and_division_1',
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

const durinDmgBuffPost = new PostEffectStats({
    from: 'atk*',
    percent: new StatTable('dmg_primordial_fusion', [charTalentTables.Durin.passsive[1][0]]),
    statCap: new ValueTable([charTalentTables.Durin.passsive[1][1]], 100),
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
            condition: new ConditionBoolean({ name: 'durin_transmutation', invert: 1 }),
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
            condition: new ConditionBoolean({ name: 'durin_transmutation', invert: 1 }),
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
            condition: new ConditionBoolean({ name: 'durin_transmutation', invert: 1 }),
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
            condition: new ConditionBoolean({ name: 'durin_transmutation', invert: 1 }),
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
            condition: new ConditionBoolean({ name: 'durin_transmutation' }),
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
            condition: new ConditionBoolean({ name: 'durin_transmutation' }),
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
            condition: new ConditionBoolean({ name: 'durin_transmutation' }),
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
            condition: new ConditionBoolean({ name: 'durin_transmutation' }),
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.durin_as_the_stars_smolder_dmg_3'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'pyro',
            condition: new ConditionBoolean({ name: 'durin_transmutation', invert: 1 }),
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.durin_dragon_of_white_flame_dmg'),
                    scalingMultiplier: 'dmg_primordial_fusion',
                    scalingSource: 'ascension4',
                    scalingMultiplierCondition: new ConditionAnd([
                        new ConditionBoolean({ name: 'durin_chaos_formed_like_the_night' }),
                        new ConditionAscensionChar({ ascension: 4 }),
                    ]),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'pyro',
            condition: new ConditionBoolean({ name: 'durin_transmutation' }),
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.durin_dragon_of_dark_decay_dmg'),
                    scalingMultiplier: 'dmg_primordial_fusion',
                    scalingSource: 'ascension4',
                    scalingMultiplierCondition: new ConditionAnd([
                        new ConditionBoolean({ name: 'durin_chaos_formed_like_the_night' }),
                        new ConditionAscensionChar({ ascension: 4 }),
                    ]),
                }),
                new FeatureMultiplier({
                    values: new ValueTable([charTalentTables.Durin.cons[0][6]], 100),
                    source: 'constellation1',
                    scalingMultiplier: 'dmg_primordial_fusion',
                    scalingSource: 'ascension4',
                    scalingMultiplierCondition: new ConditionAnd([
                        new ConditionBoolean({ name: 'durin_chaos_formed_like_the_night' }),
                        new ConditionAscensionChar({ ascension: 4 }),
                    ]),
                    condition: new ConditionAnd([
                        new ConditionConstellation({ constellation: 1 }),
                        new ConditionBoolean({ name: 'durin_adamahs_redemption' }),
                        new ConditionBoolean({ name: 'durin_transmutation' }),
                    ]),
                })
            ],
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'durin_dmg_bonus',
            postEffect: durinDmgBuffPost,
            format: 'percent',
            condition: new ConditionAscensionChar({ ascension: 4 }),
        })
    ],
    conditions: [
        new ConditionBoolean({
            name: 'char_hex_durin',
            serializeId: 1,
            title: 'talent_name.durin_ode_to_ascension',
            description: 'talent_descr.durin_ode_to_ascension_1',
        }),
        new ConditionBoolean({
            name: 'durin_transmutation',
            serializeId: 2,
            title: 'talent_name.durin_convergence_and_division_2',
        }),
        new ConditionStatic({
            title: 'talent_name.durin_ode_to_ascension',
            description: 'talent_descr.durin_ode_to_ascension_2',
            condition: new ConditionAnd([
                new ConditionHexCheck({ hex: 2 }),
                new ConditionHexCurrent(),
            ]),
        }),
        new ConditionStatic({
            title: 'talent_name.durin_light_manifest_of_the_divine_calculus',
            description: 'talent_descr.durin_light_manifest_of_the_divine_calculus_1',
            info: { ascension: 1 },
            condition: new ConditionAnd([
                new ConditionAscensionChar({ ascension: 1 }),
                new ConditionBoolean({ name: 'durin_transmutation', invert: 1 }),
            ]),
            stats: {
                enemy_res_pyro: - charTalentTables.Durin.passsive[0][0] * 100,
                enemy_res_electro: - charTalentTables.Durin.passsive[0][0] * 100,
                enemy_res_dendro: - charTalentTables.Durin.passsive[0][0] * 100,
                enemy_res_geo: - charTalentTables.Durin.passsive[0][0] * 100,
                enemy_res_anemo: - charTalentTables.Durin.passsive[0][0] * 100,
            }
        }),
        new Condition({
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'durin_transmutation', invert: 1 }),
                new ConditionAscensionChar({ ascension: 1 }),
                new ConditionHexCheck({ hex: 2 }),
                new ConditionBoolean({ name: 'char_hex_durin' }),
            ]),
            stats: {
                enemy_res_pyro: - charTalentTables.Durin.passsive[0][0] * 75,
                enemy_res_electro: - charTalentTables.Durin.passsive[0][0] * 75,
                enemy_res_dendro: - charTalentTables.Durin.passsive[0][0] * 75,
                enemy_res_geo: - charTalentTables.Durin.passsive[0][0] * 75,
                enemy_res_anemo: - charTalentTables.Durin.passsive[0][0] * 75,
            }
        }),
        new ConditionStatic({
            title: 'talent_name.durin_light_manifest_of_the_divine_calculus',
            description: 'talent_descr.durin_light_manifest_of_the_divine_calculus_2',
            info: { ascension: 1 },
            condition: new ConditionAnd([
                new ConditionAscensionChar({ ascension: 1 }),
                new ConditionBoolean({ name: 'durin_transmutation' }),
            ]),
            stats: {
                dmg_reaction_vaporize: charTalentTables.Durin.passsive[0][2] * 100,
                dmg_reaction_melt: charTalentTables.Durin.passsive[0][3] * 100,
            }
        }),
        new Condition({
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'durin_transmutation' }),
                new ConditionAscensionChar({ ascension: 1 }),
                new ConditionHexCheck({ hex: 2 }),
                new ConditionBoolean({ name: 'char_hex_durin' }),
            ]),
            stats: {
                dmg_reaction_vaporize: charTalentTables.Durin.passsive[0][2] * 75,
                dmg_reaction_melt: charTalentTables.Durin.passsive[0][3] * 75,
            }
        }),
        new ConditionBoolean({
            name: 'durin_chaos_formed_like_the_night',
            serializeId: 3,
            title: 'talent_name.durin_chaos_formed_like_the_night',
            description: 'talent_descr.durin_chaos_formed_like_the_night',
            info: {ascension: 4},
            condition: new ConditionAscensionChar({ ascension: 4 }),
        }),
    ],
    postEffects: [
        durinDmgBuffPost,
    ],
    multipliers: [
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionBoolean({
                    name: 'durin_adamahs_redemption',
                    serializeId: 4,
                    title: 'talent_name.durin_adamahs_redemption',
                    description: 'talent_descr.durin_adamahs_redemption_1',
                    condition: new ConditionBoolean({ name: 'durin_transmutation' }),
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'durin_unground_visions',
                    serializeId: 5,
                    title: 'talent_name.durin_unground_visions',
                    description: 'talent_descr.durin_unground_visions',
                    stats: {
                        dmg_pyro: charTalentTables.Durin.cons[1][2] * 100,
                        dmg_electro: charTalentTables.Durin.cons[1][2] * 100,
                        dmg_dendro: charTalentTables.Durin.cons[1][2] * 100,
                        dmg_geo: charTalentTables.Durin.cons[1][2] * 100,
                        dmg_anemo: charTalentTables.Durin.cons[1][2] * 100,
                        dmg_cryo: charTalentTables.Durin.cons[1][2] * 100,
                        dmg_hydro: charTalentTables.Durin.cons[1][2] * 100,
                    },
                }),
            ],
        },
        {
            conditions: [
                new Condition({
                    settings: {
                        char_skill_burst_bonus: 3,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.durin_emanares_source',
                    description: 'talent_descr.durin_emanares_source',
                    stats: {
                        dmg_burst: charTalentTables.Durin.cons[3][2] * 100,
                    }
                }),
            ],
        },
        {
            conditions: [
                new Condition({
                    settings: {
                        char_skill_elemental_bonus: 3,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    name: 'durin_dual_birth',
                    title: 'talent_name.durin_dual_birth',
                    description: 'talent_descr.durin_dual_birth_1',
                    stats: {
                        enemy_def_ignore_burst: charTalentTables.Durin.cons[5][0] * 100,
                    },
                }),
                new Condition({
                    condition: new ConditionBoolean({ name: 'durin_transmutation', invert: 1 }),
                    stats: {
                        enemy_def_reduce: charTalentTables.Durin.cons[5][1] * 100,
                    }
                }),
                new Condition({
                    condition: new ConditionBoolean({ name: 'durin_transmutation' }),
                    stats: {
                        enemy_def_ignore_burst: charTalentTables.Durin.cons[5][3] * 100,
                    }
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            settings: ['atk_total'],
        },
        conditions: [
            new ConditionNumber({
                name: 'durin_atk_total',
                title: 'talent_name.stats_total_atk',
                partyStat: 'atk_total',
                serializeId: 1,
                rotation: 'party',
                max: 10000,
            }),
            new ConditionBoolean({
                name: 'char_hex_durin',
                serializeId: 2,
                title: 'talent_name.durin_ode_to_ascension',
                description: 'talent_descr.durin_ode_to_ascension_1',
            }),
            new ConditionStatic({
                title: 'talent_name.durin_ode_to_ascension',
                description: 'talent_descr.durin_ode_to_ascension_2',
                condition: new ConditionAnd([
                    new ConditionHexCheck({ hex: 2 }),
                    new ConditionBoolean({ name: 'char_hex_durin' }),
                ]),
            }),
            new ConditionBoolean({
                name: 'party.durin_light_manifest_of_the_divine_calculus',
                serializeId: 3,
                title: 'talent_name.durin_light_manifest_of_the_divine_calculus',
                description: 'talent_descr.durin_light_manifest_of_the_divine_calculus_1',
                info: { ascension: 1 },
                stats: {
                    enemy_res_pyro: - charTalentTables.Durin.passsive[0][0] * 100,
                    enemy_res_electro: - charTalentTables.Durin.passsive[0][0] * 100,
                    enemy_res_dendro: - charTalentTables.Durin.passsive[0][0] * 100,
                    enemy_res_geo: - charTalentTables.Durin.passsive[0][0] * 100,
                    enemy_res_anemo: - charTalentTables.Durin.passsive[0][0] * 100,
                }
            }),
            new Condition({
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'party.durin_light_manifest_of_the_divine_calculus' }),
                    new ConditionHexCheck({ hex: 2 }),
                    new ConditionBoolean({ name: 'char_hex_durin' }),
                ]),
                stats: {
                    enemy_res_pyro: - charTalentTables.Durin.passsive[0][0] * 75,
                    enemy_res_electro: - charTalentTables.Durin.passsive[0][0] * 75,
                    enemy_res_dendro: - charTalentTables.Durin.passsive[0][0] * 75,
                    enemy_res_geo: - charTalentTables.Durin.passsive[0][0] * 75,
                    enemy_res_anemo: - charTalentTables.Durin.passsive[0][0] * 75,
                }
            }),
            new ConditionBoolean({
                name: 'party.durin_adamahs_redemption',
                serializeId: 4,
                title: 'talent_name.durin_adamahs_redemption',
                description: 'talent_descr.durin_adamahs_redemption_2',
                info: { constellation: 1 },
            }),
            new ConditionBoolean({
                name: 'party.durin_unground_visions',
                serializeId: 5,
                title: 'talent_name.durin_unground_visions',
                description: 'talent_descr.durin_unground_visions',
                info: { constellation: 2 },
                stats: {
                    dmg_pyro: charTalentTables.Durin.cons[1][2] * 100,
                    dmg_electro: charTalentTables.Durin.cons[1][2] * 100,
                    dmg_dendro: charTalentTables.Durin.cons[1][2] * 100,
                    dmg_geo: charTalentTables.Durin.cons[1][2] * 100,
                    dmg_anemo: charTalentTables.Durin.cons[1][2] * 100,
                    dmg_cryo: charTalentTables.Durin.cons[1][2] * 100,
                    dmg_hydro: charTalentTables.Durin.cons[1][2] * 100,
                },
            }),
            new ConditionBoolean({
                name: 'party.durin_dual_birth',
                serializeId: 6,
                title: 'talent_name.durin_dual_birth',
                description: 'talent_descr.durin_dual_birth_2',
                info: { constellation: 6 },
                stats: {
                    enemy_def_reduce: charTalentTables.Durin.cons[5][1] * 100,
                },
            }),
        ],
        multipliers: [
            new FeatureMultiplier({
                scaling: 'durin_atk_total',
                source: 'durin',
                values: new ValueTable([charTalentTables.Durin.cons[0][4]], 100),
                target: new FeatureMultiplierTarget({
                    damageTypes: ['normal', 'charged', 'plunge', 'skill', 'burst'],
                }),
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'durin_atk_total' }),
                    new ConditionBoolean({ name: 'party.durin_adamahs_redemption' }),
                ]),
            }),
        ]
    }
});
