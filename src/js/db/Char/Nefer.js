import { Condition } from "../../classes/Condition";
import { ConditionOr } from "../../classes/Condition/Or";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionMoonPhaseBuff } from "../../classes/Condition/MoonPhaseBuff";
import { ConditionMoonPhase } from "../../classes/Condition/Boolean/MoonPhase";
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
import { PostEffectStatsAtk } from "../../classes/PostEffect/Stats/Atk";
import { PostEffectStatsMastery } from "../../classes/PostEffect/Stats/Mastery";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionMoonPhaseCheck } from "../../classes/Condition/MoonPhaseCheck";
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { ConditionBooleanLevels } from "../../classes/Condition/Boolean/Levels";
import { ConditionNumberTalent } from "../../classes/Condition/Number/Talent";
import { ConditionNumber } from "../../classes/Condition/Number";
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";


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
                unit: 'unit_per_sec',
                table: new StatTable('nefer_striking_serpent_1', charTalentTables.Nefer.s1.p6),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Nefer.s1.p7),
            },
            {
                unit: 'unit',
                table: new StatTable('nefer_striking_serpent_2', charTalentTables.Nefer.s1.p11),
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
                    new StatTable('nefer_dance_of_a_thousand_nights_1', charTalentTables.Nefer.s2.p5),
                    new StatTable('nefer_dance_of_a_thousand_nights_1_mastery', charTalentTables.Nefer.s2.p6),
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
                    new StatTable('nefer_dance_of_a_thousand_nights_2', charTalentTables.Nefer.s2.p7),
                    new StatTable('nefer_dance_of_a_thousand_nights_2_mastery', charTalentTables.Nefer.s2.p8),
                ],
            },
            {
                unit: 'mastery',
                table: new StatTable('nefer_dance_of_a_thousand_nights_3', charTalentTables.Nefer.s2.p9),
            },
            {
                unit: 'mastery',
                table: new StatTable('nefer_dance_of_a_thousand_nights_4', charTalentTables.Nefer.s2.p10),
            },
            {
                unit: 'mastery',
                table: new StatTable('nefer_dance_of_a_thousand_nights_5', charTalentTables.Nefer.s2.p11),
            },
            {
                unit: '',
                table: new StatTable('nefer_dance_of_a_thousand_nights_6', charTalentTables.Nefer.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('nefer_dance_of_a_thousand_nights_7', charTalentTables.Nefer.s2.p4),
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
                    new StatTable('nefer_true_eyes_phantasm_1', charTalentTables.Nefer.s2.p1),
                    new StatTable('nefer_true_eyes_phantasm_1_mastery', charTalentTables.Nefer.s2.p2),
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
                    new StatTable('nefer_true_eyes_phantasm_2', charTalentTables.Nefer.s2.p3),
                    new StatTable('nefer_true_eyes_phantasm_2_mastery', charTalentTables.Nefer.s2.p4),
                ],
            },
            {
                unit: 'stack_per_veil_of_falsehood',
                table: new StatTable('nefer_true_eyes_phantasm_3', charTalentTables.Nefer.s3.p5),
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
    links: [11190008, 11220001, 11220002, 11220003],
});

const lunarPost = new PostEffectStatsMastery({
    percent: new StatTable('lunarbloom_multi', [charTalentTables.Nefer.passsive[2][0] * 100]),
    statCap: new ValueTable([charTalentTables.Nefer.passsive[2][1] * 100]),
});

const bloomTarget = new FeatureMultiplierTarget({
    options: 'reaction_flat',
    damageTypesExclude: 'nefer_frostgrove_sanctuary',
    tags: 'bloom',
});

const lunarbloomTarget = new FeatureMultiplierTarget({
    options: 'reaction_flat',
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
            hits: 2,
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
            title: 'skill.nefer_dance_of_a_thousand_nights_1',
            name: 'nefer_dance_of_a_thousand_nights_1',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.nefer_dance_of_a_thousand_nights_1'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.nefer_dance_of_a_thousand_nights_1_mastery'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'nefer_dance_of_a_thousand_nights' }),
        }),
        new FeatureDamageCharged({
            title: 'skill.nefer_dance_of_a_thousand_nights_2',
            name: 'nefer_dance_of_a_thousand_nights_2',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.nefer_dance_of_a_thousand_nights_2'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.nefer_dance_of_a_thousand_nights_2_mastery'),
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
            name: 'nefer_dance_of_a_thousand_nights_3',
            element: 'dendro',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.nefer_dance_of_a_thousand_nights_3'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.nefer_dance_of_a_thousand_nights_3_mastery'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'nefer_dance_of_a_thousand_nights' }),
        }),
        new FeatureReactionLunarBloomLike({
            name: 'nefer_dance_of_a_thousand_nights_4',
            element: 'dendro',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.nefer_dance_of_a_thousand_nights_4'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.nefer_dance_of_a_thousand_nights_4_mastery'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'nefer_dance_of_a_thousand_nights' }),
        }),
        new FeatureReactionLunarBloomLike({
            name: 'nefer_dance_of_a_thousand_nights_5',
            element: 'dendro',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.nefer_dance_of_a_thousand_nights_5'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.nefer_dance_of_a_thousand_nights_5_mastery'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'nefer_dance_of_a_thousand_nights' }),
        }),
        new FeatureDamageBurst({
            name: 'nefer_true_eyes_phantasm_1',
            element: 'dendro',
            category: 'burst',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.nefer_true_eyes_phantasm_1'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.nefer_true_eyes_phantasm_1_mastery'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'nefer_true_eyes_phantasm_2',
            element: 'dendro',
            category: 'burst',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.nefer_true_eyes_phantasm_2'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.nefer_true_eyes_phantasm_2_mastery'),
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
            title: 'talent_name.nefer_a_wager_of_moonlight',
            description: 'talent_descr.nefer_a_wager_of_moonlight',
            info: { ascension: 1 },
            condition: new ConditionAnd([
                new ConditionAscensionChar({ ascension: 1 }),
                new ConditionBoolean({ name: 'nefer_dance_of_a_thousand_nights' }),
            ]),
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
    ],
    postEffects: [
        lunarPost,
        new PostEffectStatsMastery({
            percent: new StatTable('dmg_skill', [charTalentTables.Nefer.passsive[1][0]], 100),
            condition: new ConditionAscensionChar({ ascension: 4 }),
            statCap: new ValueTable([charTalentTables.Nefer.passsive[1][1] * 100]),
        }),
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
                new ConditionStatic({
                    title: 'talent_name.nefer_observation_feeds_strategy',
                    description: 'talent_descr.nefer_observation_feeds_strategy',
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
                    title: 'talent_name.nefer_delusion_ensnares_reason',
                    description: 'talent_descr.nefer_delusion_ensnares_reason',
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
                new ConditionStatic({
                    title: 'talent_name.nefer_victory_flows_from_the_turning_of_tides',
                    description: 'talent_descr.nefer_victory_flows_from_the_turning_of_tides',
                }),
            ]
        },
    ]),
    partyData: {
        loadStats: {
            settings: ['char_skill_burst', 'char_skill_elemental'],
            stats: ['mastery_total'],
        },
        conditions: [
            new Condition({ settings: { allowed_lunarbloom: 1 } }),
            new ConditionMoonPhaseSetting(),
            new ConditionNumberTalent({
                name: 'nefer_char_skill_elemental',
                serializeId: 1,
                title: 'talent_name.stats_level_skill',
                partySetting: 'char_skill_elemental',
            }),
            new ConditionBoolean({
                name: 'party.nefer_if_truth_may_be_subject_to_witness',
                serializeId: 2,
                title: 'talent_name.nefer_if_truth_may_be_subject_to_witness',
                description: 'talent_descr.char_constellation_skill',
                settings: {
                    nefer_char_skill_elemental_bonus: 3,
                },
                info: {
                    constellation: 5,
                },
            }),
            new ConditionBooleanLevels({
                serializeId: 3,
                name: 'party.nefer_dawnless_rest_of_karsikko',
                title: 'talent_name.nefer_dawnless_rest_of_karsikko',
                description: 'talent_descr.nefer_dawnless_rest_of_karsikko_2',
                levelSetting: 'nefer_char_skill_elemental',
                rotation: 'party',
                stats: [
                    Talents.getAlias('skill.nefer_dawnless_rest_of_karsikko_6', 'enemy_res_dendro', -1),
                ],
            }),
            new ConditionNumber({
                name: 'nefer_mastery_total',
                serializeId: 4,
                title: 'talent_name.stats_total_mastery',
                partyStat: 'mastery_total',
                rotation: 'party',
                max: 10000,
            }),
            new ConditionNumberTalent({
                name: 'nefer_char_skill_burst',
                serializeId: 5,
                title: 'talent_name.stats_level_burst',
                partySetting: 'char_skill_burst',
            }),
            new ConditionBoolean({
                name: 'party.nefer_seek_not_to_tread_the_sly_foxs_path',
                serializeId: 6,
                title: 'talent_name.nefer_seek_not_to_tread_the_sly_foxs_path',
                description: 'talent_descr.char_constellation_burst',
                settings: {
                    nefer_char_skill_burst_bonus: 3,
                },
                info: {
                    constellation: 3,
                },
            }),
            new ConditionBoolean({
                serializeId: 7,
                name: 'party.nefer_all_hearts_become_the_beating_moon',
                title: 'talent_name.nefer_all_hearts_become_the_beating_moon_2',
                description: 'talent_descr.nefer_all_hearts_become_the_beating_moon_2',
                rotation: 'party',
            }),
            new ConditionMoonPhase({
                name: 'party.nefer_light_for_the_frosty_night',
                title: 'talent_name.nefer_light_for_the_frosty_night_1',
                description: 'talent_descr.nefer_light_for_the_frosty_night_4',
                serializeId: 8,
                stats: {
                    text_crit_rate_bloom: charTalentTables.Nefer.passsive[0][0] * 100,
                    text_crit_dmg_bloom: charTalentTables.Nefer.passsive[0][1] * 100,
                    text_crit_rate_lunarbloom: charTalentTables.Nefer.passsive[0][2] * 100,
                    text_crit_dmg_lunarbloom: charTalentTables.Nefer.passsive[0][3] * 100,
                },
                realStats: {
                    crit_rate_bloom: [0, charTalentTables.Nefer.passsive[0][0] * 100, 0],
                    crit_dmg_bloom: [0, charTalentTables.Nefer.passsive[0][1] * 100, 0],
                    crit_rate_lunarbloom: [0, 0, charTalentTables.Nefer.passsive[0][2] * 100],
                    crit_dmg_lunarbloom: [0, 0, charTalentTables.Nefer.passsive[0][3] * 100],
                },
                info: { ascension: 1 },
            }),
            new ConditionBoolean({
                name: 'party.nefer_twine_warnings_and_tales_from_the_north',
                serializeId: 9,
                title: 'talent_name.nefer_twine_warnings_and_tales_from_the_north',
                description: 'talent_descr.nefer_twine_warnings_and_tales_from_the_north',
                info: {
                    constellation: 2,
                },
            }),
            new ConditionMoonPhaseBuff({
                realStats: {
                    dmg_reaction_lunarbloom: [0, 0, charTalentTables.Nefer.cons[1][2] * 100],
                },
                condition: new ConditionBoolean({ name: 'party.nefer_twine_warnings_and_tales_from_the_north' }),
            }),
            new ConditionMoonPhase({
                name: 'party.nefer_i_offer_blood_and_tears_to_the_moonlight',
                serializeId: 10,
                title: 'talent_name.nefer_i_offer_blood_and_tears_to_the_moonlight',
                description: 'talent_descr.nefer_i_offer_blood_and_tears_to_the_moonlight_2',
                stats: {
                    text_percent_lunarbloom_bonus: charTalentTables.Nefer.cons[5][5] * 100,
                },
                info: {
                    constellation: 6,
                },
            }),
            new ConditionMoonPhaseBuff({
                realStats: {
                    dmg_reaction_lunarbloom_bonus: [0, 0, charTalentTables.Nefer.cons[5][5] * 100],
                },
                condition: new ConditionBoolean({ name: 'party.nefer_i_offer_blood_and_tears_to_the_moonlight' }),
            }),
        ],
        multipliers: [
            new FeatureMultiplier({
                scaling: 'nefer_mastery_total',
                leveling: 'nefer_char_skill_burst',
                values: Talents.get('burst.nefer_all_hearts_become_the_beating_moon_3'),
                target: bloomTarget,
                condition: new ConditionBoolean({ name: 'party.nefer_all_hearts_become_the_beating_moon' }),
            }),
            new FeatureMultiplier({
                scaling: 'nefer_mastery_total',
                leveling: 'nefer_char_skill_burst',
                values: Talents.get('burst.nefer_all_hearts_become_the_beating_moon_4'),
                target: lunarbloomTarget,
                condition: new ConditionBoolean({ name: 'party.nefer_all_hearts_become_the_beating_moon' }),
            }),
            new FeatureMultiplier({
                scaling: 'nefer_mastery_total',
                values: new StatTable('', [charTalentTables.Nefer.cons[1][0]], 100),
                target: bloomTarget,
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'party.nefer_all_hearts_become_the_beating_moon' }),
                    new ConditionBoolean({ name: 'party.nefer_twine_warnings_and_tales_from_the_north' }),
                ]),
            }),
            new FeatureMultiplier({
                scaling: 'nefer_mastery_total',
                values: new StatTable('', [charTalentTables.Nefer.cons[1][1]], 100),
                target: lunarbloomTarget,
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'party.nefer_all_hearts_become_the_beating_moon' }),
                    new ConditionBoolean({ name: 'party.nefer_twine_warnings_and_tales_from_the_north' }),
                ]),
            }),
        ],
    }
});

