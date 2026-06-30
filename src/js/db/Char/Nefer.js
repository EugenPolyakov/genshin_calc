import { Condition } from "../../classes/Condition";
import { ConditionOr } from "../../classes/Condition/Or";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionMoonPhaseSetting } from "../../classes/Condition/CustomOrigin/MoonPhaseSetting";
import { ConditionMoonPhaseStatic } from "../../classes/Condition/Static/MoonPhase";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { FeatureReactionLunarBloomLike } from "../../classes/Feature2/Reaction/Transformative/Lunar/BloomLike";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { PostEffectStatsMastery } from "../../classes/PostEffect/Stats/Mastery";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionMoonPhaseCheck } from "../../classes/Condition/MoonPhaseCheck";
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { ConditionBooleanLevels } from "../../classes/Condition/Boolean/Levels";
import { ConditionNumberTalent } from "../../classes/Condition/Number/Talent";
import { ConditionNumber } from "../../classes/Condition/Number";
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { ConditionStacks } from "../../classes/Condition/Stacks";


const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Nefer.s1_id,
        title: 'talent_name.nefer_striking_serpent',
        description: 'talent_descr.nefer_striking_serpent',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Nefer.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Nefer.s1.p2),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_3', charTalentTables.Nefer.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Nefer.s1.p4),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Nefer.s1.p5),
            },
            {
                unit: 'per_sec',
                table: new StatTable('nefer_charged_attack_charging_stamina_drain', charTalentTables.Nefer.s1.p6),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Nefer.s1.p7),
            },
            {
                unit: 'unit',
                table: new StatTable('nefer_shadow_dance_charged_attack_stamina_cost', charTalentTables.Nefer.s1.p11),
            },
            {
                table: new StatTable('plunge', charTalentTables.Nefer.s1.p8),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Nefer.s1.p9),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Nefer.s1.p10),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Nefer.s2_id,
        title: 'talent_name.nefer_dance_of_a_thousand_nights',
        description: 'talent_descr.nefer_dance_of_a_thousand_nights',
        items: [
            {
                type: 'multivalue',
                separator: ' + ',
                units: [
                    'atk',
                    'mastery',
                ],
                table: [
                    new StatTable('skill_dmg', charTalentTables.Nefer.s2.p1),
                    new StatTable('skill_dmg_mastery', charTalentTables.Nefer.s2.p2),
                ],
            },
            {
                type: 'multivalue',
                separator: ' + ',
                units: [
                    'atk',
                    'mastery',
                ],
                table: [
                    new StatTable('nefer_phantasm_performance_1_hit_dmg_nefer', charTalentTables.Nefer.s2.p5),
                    new StatTable('nefer_phantasm_performance_1_hit_dmg_nefer_mastery', charTalentTables.Nefer.s2.p6),
                ],
            },
            {
                type: 'multivalue',
                separator: ' + ',
                units: [
                    'atk',
                    'mastery',
                ],
                table: [
                    new StatTable('nefer_phantasm_performance_2_hit_dmg_nefer', charTalentTables.Nefer.s2.p7),
                    new StatTable('nefer_phantasm_performance_2_hit_dmg_nefer_mastery', charTalentTables.Nefer.s2.p8),
                ],
            },
            {
                unit: 'mastery',
                table: new StatTable('nefer_phantasm_performance_1_hit_dmg_shades', charTalentTables.Nefer.s2.p9),
            },
            {
                unit: 'mastery',
                table: new StatTable('nefer_phantasm_performance_2_hit_dmg_shades', charTalentTables.Nefer.s2.p10),
            },
            {
                unit: 'mastery',
                table: new StatTable('nefer_phantasm_performance_3_hit_dmg_shades', charTalentTables.Nefer.s2.p11),
            },
            {
                unit: '',
                table: new StatTable('nefer_phantasm_performance_charges', charTalentTables.Nefer.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('nefer_shadow_dance_duration', charTalentTables.Nefer.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Nefer.s2.p12),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Nefer.s3_id,
        title: 'talent_name.nefer_true_eyes_phantasm',
        description: 'talent_descr.nefer_true_eyes_phantasm',
        items: [
            {
                type: 'multivalue',
                separator: ' + ',
                units: [
                    'atk',
                    'mastery',
                ],
                table: [
                    new StatTable('normal_hit_1', charTalentTables.Nefer.s3.p1),
                    new StatTable('normal_hit_1_mastery', charTalentTables.Nefer.s3.p2),
                ],
            },
            {
                type: 'multivalue',
                separator: ' + ',
                units: [
                    'atk',
                    'mastery',
                ],
                table: [
                    new StatTable('normal_hit_2', charTalentTables.Nefer.s3.p3),
                    new StatTable('normal_hit_2_mastery', charTalentTables.Nefer.s3.p4),
                ],
            },
            {
                unit: 'stack_per_veil_of_falsehood',
                table: new StatTable('nefer_dmg_bonus', charTalentTables.Nefer.s3.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Nefer.s3.p6),
            },
            {
                unit: 'unit',
                table: new StatTable('energy_cost', charTalentTables.Nefer.s3.p7),
            },
        ],
    },
    links: charTalentTables.Nefer.links,
});

const lunarPost = new PostEffectStatsMastery({
    percent: new StatTable('lunarbloom_multi', [charTalentTables.Nefer.passsive[2][0] * 100]),
    statCap: new ValueTable([charTalentTables.Nefer.passsive[2][1] * 100]),
});

const bloomTarget = new FeatureMultiplierTarget({
    isReactionFlatBonus: true,
    damageTypesExclude: 'nefer_frostgrove_sanctuary',
    tags: 'bloom',
});

const lunarbloomTarget = new FeatureMultiplierTarget({
    isReactionFlatBonus: true,
    damageTypesExclude: 'nefer_frostgrove_sanctuary',
    tags: 'lunarbloom',
});

export const Nefer = new DbObjectChar({
    name: 'nefer',
    serializeId: 112,
    gameId: charTalentTables.Nefer.char_id,
    iconClass: "char-icon-nefer",
    rarity: 5,
    element: 'dendro',
    weapon: charTalentTables.Nefer.char_weapon,
    originList: ['nodkrai', 'lunar'],
    talents: Talents,
    statTable: charTables.Nefer,
    beta: true,
    features: [
        new FeatureDamageNormal({
            name: 'normal_hit_1',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_2',
            element: 'dendro',
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
            element: 'dendro',
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_3'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3_1',
            element: 'dendro',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_hit',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            fullName: 'skill.nefer_phantasm_performance_1_hit_dmg_nefer',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.nefer_phantasm_performance_1_hit_dmg_nefer'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.nefer_phantasm_performance_1_hit_dmg_nefer_mastery'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'nefer_dance_of_a_thousand_nights' }),
        }),
        new FeatureDamageCharged({
            fullName: 'skill.nefer_phantasm_performance_2_hit_dmg_nefer',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.nefer_phantasm_performance_2_hit_dmg_nefer'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.nefer_phantasm_performance_2_hit_dmg_nefer_mastery'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    values: new ValueTable([charTalentTables.Nefer.cons[5][0]]),
                    condition: new ConditionConstellation({ constellation: 6 }),
                }),
            ],
            condition: new ConditionBoolean({ name: 'nefer_dance_of_a_thousand_nights' }),
        }),
        new FeatureDamagePlungeCollision({
            name: 'plunge',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_low',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_high',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'skill_dmg',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg_mastery'),
                }),
            ],
        }),
        new FeatureReactionLunarBloomLike({
            name: 'nefer_phantasm_performance_1_hit_dmg_shades',
            element: 'dendro',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.nefer_phantasm_performance_1_hit_dmg_shades'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'nefer_dance_of_a_thousand_nights' }),
        }),
        new FeatureReactionLunarBloomLike({
            name: 'nefer_phantasm_performance_2_hit_dmg_shades',
            element: 'dendro',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.nefer_phantasm_performance_2_hit_dmg_shades'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'nefer_dance_of_a_thousand_nights' }),
        }),
        new FeatureReactionLunarBloomLike({
            name: 'nefer_phantasm_performance_3_hit_dmg_shades',
            element: 'dendro',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.nefer_phantasm_performance_3_hit_dmg_shades'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'nefer_dance_of_a_thousand_nights' }),
        }),
        new FeatureReactionLunarBloomLike({
            name: 'nefer_phantasm_performance_final_dmg_shades',
            element: 'dendro',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    values: new ValueTable([charTalentTables.Nefer.cons[5][2]]),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'nefer_dance_of_a_thousand_nights' }),
                new ConditionConstellation({ constellation: 6 }),
            ]),
        }),
        new FeatureDamageBurst({
            name: 'normal_hit_1',
            element: 'dendro',
            category: 'burst',
            tags: ['nefer_burst'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.normal_hit_1'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.normal_hit_1_mastery'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'normal_hit_2',
            element: 'dendro',
            category: 'burst',
            tags: ['nefer_burst'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.normal_hit_2'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.normal_hit_2_mastery'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'lunarbloom_base_bonus',
            postEffect: lunarPost,
            format: 'percent',
        }),
    ],
    conditions: [
        new ConditionMoonPhaseSetting(),
        new ConditionBoolean({
            serializeId: 1,
            name: 'nefer_dance_of_a_thousand_nights',
            title: 'talent_name.n11220001',
            description: 'talent_descr.n11220001',
        }),
        new ConditionBoolean({
            serializeId: 2,
            name: 'nefer_a_wager_of_moonlight',
            title: 'talent_name.nefer_a_wager_of_moonlight',
            description: 'talent_descr.nefer_a_wager_of_moonlight',
            info: { ascension: 1 },
            stats: {
                mastery: charTalentTables.Nefer.passsive[0][2],
            },
            condition: new ConditionAnd([
                new ConditionAscensionChar({ ascension: 1 }),
                new ConditionMoonPhaseCheck({ moonphase: 2 }),
                new ConditionBoolean({ name: 'nefer_dance_of_a_thousand_nights' }),
            ]),
        }),
        new ConditionStacks({
            name: 'nefer_n11220003',
            serializeId: 3,
            title: 'talent_name.n11220003',
            description: 'talent_descr.n11220003',
            levelSetting: 'char_skill_burst',
            info: { ascension: 1 },
            maxStacks: function (settings) {
                if (settings.char_constellation >= 2) { return 5 }
                return 3;
            },
            stats: [
                Talents.getAlias('burst.nefer_dmg_bonus', 'dmg_burst'),
            ],
            condition: new ConditionAscensionChar({ ascension: 1 }),
        }),
        new ConditionStatic({
            title: 'talent_name.nefer_daughter_of_the_dust_and_sand',
            description: 'talent_descr.nefer_daughter_of_the_dust_and_sand',
            info: {ascension: 4},
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
        new ConditionStatic({
            title: 'talent_name.nefer_dusklit_eaves',
            description: 'talent_descr.nefer_dusklit_eaves',
            settings: {
                allowed_lunarbloom: 1,
            },
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'mastery*',
            leveling: 'char_skill_burst',
            values: Talents.get('burst.nefer_all_hearts_become_the_beating_moon_3'),
            target: bloomTarget,
            condition: new ConditionBoolean({ name: 'nefer_all_hearts_become_the_beating_moon' }),
        }),
        new FeatureMultiplier({
            scaling: 'mastery*',
            leveling: 'char_skill_burst',
            values: Talents.get('burst.nefer_all_hearts_become_the_beating_moon_4'),
            target: lunarbloomTarget,
            condition: new ConditionBoolean({ name: 'nefer_all_hearts_become_the_beating_moon' }),
        }),
        new FeatureMultiplier({
            scaling: 'mastery*',
            values: new StatTable('', [charTalentTables.Nefer.cons[1][0]], 100),
            target: bloomTarget,
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'nefer_all_hearts_become_the_beating_moon' }),
                new ConditionAnd([
                    new ConditionBoolean({ name: 'nefer_twine_warnings_and_tales_from_the_north' }),
                    new ConditionConstellation({ constellation: 2 }),
                ]),
            ]),
        }),
        new FeatureMultiplier({
            scaling: 'mastery*',
            values: new StatTable('', [charTalentTables.Nefer.cons[1][1]], 100),
            target: lunarbloomTarget,
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'nefer_all_hearts_become_the_beating_moon' }),
                new ConditionAnd([
                    new ConditionBoolean({ name: 'nefer_twine_warnings_and_tales_from_the_north' }),
                    new ConditionConstellation({ constellation: 2 }),
                ]),
            ]),
        }),
        new FeatureMultiplier({
            scaling: 'hp*',
            leveling: 'char_skill_burst',
            stacksLeveling: 'nefer_n11220003',
            values: Talents.get('burst.nefer_dmg_bonus'),
            target: new FeatureMultiplierTarget({
                tags: ['nefer_dance_of_a_thousand_nights'],
            }),
        }),
    ],
    postEffects: [
        lunarPost,
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.nefer_planning_breeds_success',
                    description: 'talent_descr.nefer_planning_breeds_success',
                })
            ],
        },
        {
            conditions: [
                new ConditionMoonPhaseSetting(),
                new ConditionBoolean({
                    name: 'nefer_observation_feeds_strategy',
                    serializeId: 4,
                    title: 'talent_name.nefer_observation_feeds_strategy',
                    description: 'talent_descr.nefer_observation_feeds_strategy',
                    stats: {
                        mastery: charTalentTables.Nefer.cons[1][2],
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
                new ConditionBoolean({
                    name: 'nefer_delusion_ensnares_reason',
                    serializeId: 5,
                    title: 'talent_name.nefer_delusion_ensnares_reason',
                    description: 'talent_descr.nefer_delusion_ensnares_reason',
                    stats: {
                        enemy_res_dendro: -charTalentTables.Nefer.cons[3][2]*100,
                    },
                    //считаем отдельно от танца теней т.к. эффект сохраняется после выхода
                    //condition: new ConditionBoolean({ name: 'nefer_dance_of_a_thousand_nights' }),
                }),
            ]
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
                new ConditionMoonPhaseSetting(),
                new ConditionMoonPhaseStatic({
                    title: 'talent_name.nefer_victory_flows_from_the_turning_of_tides',
                    description: 'talent_descr.nefer_victory_flows_from_the_turning_of_tides',
                    realStats: {
                        dmg_reaction_lunarbloom_bonus: [0, 0, charTalentTables.Nefer.cons[5][2] * 100],
                    },
                }),
            ]
        },
    ]),
    partyData: {
        loadStats: {
            stats: ['mastery_total'],
        },
        conditions: [
            new Condition({ settings: { allowed_lunarbloom: 1 } }),
            new ConditionMoonPhaseSetting(),
            new ConditionNumber({
                name: 'nefer_mastery_total',
                serializeId: 1,
                title: 'talent_name.stats_total_mastery',
                partyStat: 'mastery_total',
                rotation: 'party',
                max: 10000,
            }),
            new ConditionStatic({
                title: 'talent_name.nefer_dusklit_eaves',
                description: 'talent_descr.nefer_dusklit_eaves',
                stats: {
                    text_percent: charTalentTables.Nefer.passsive[2][0] * 100,
                    text_percent_max: charTalentTables.Nefer.passsive[2][1] * 100,
                },
            }),
            new ConditionBoolean({
                name: 'nefer_delusion_ensnares_reason',
                serializeId: 2,
                title: 'talent_name.nefer_delusion_ensnares_reason',
                description: 'talent_descr.nefer_delusion_ensnares_reason',
                stats: {
                    enemy_res_dendro: -charTalentTables.Nefer.cons[3][2] * 100,
                },
                //считаем отдельно от танца теней т.к. эффект сохраняется после выхода
                //condition: new ConditionBoolean({ name: 'nefer_dance_of_a_thousand_nights' }),
                info: {
                    constellation: 4,
                },
            }),
        ],
        postEffects: [
            new PostEffectStats({
                from: 'nefer_mastery_total',
                percent: new StatTable('lunarbloom_multi', [charTalentTables.Nefer.passsive[2][0] * 100]),
                statCap: new ValueTable([charTalentTables.Nefer.passsive[2][1] * 100]),
            }),
        ]
    }
});

