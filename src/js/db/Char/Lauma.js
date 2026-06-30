import { Condition } from "../../classes/Condition";
import { ConditionOr } from "../../classes/Condition/Or";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionMoonPhaseBuff } from "../../classes/Condition/MoonPhaseBuff";
import { ConditionMoonPhaseBoolean } from "../../classes/Condition/Boolean/MoonPhase";
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
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionBooleanValue } from "../../classes/Condition/Boolean/Value";
import { FeatureStatic } from "../../classes/Feature2/Static";


const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Lauma.s1_id,
        title: 'talent_name.lauma_peregrination_of_linnunrata',
        description: 'talent_descr.lauma_peregrination_of_linnunrata',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Lauma.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Lauma.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Lauma.s1.p3),
            },
            {
                unit: 'per_sec',
                table: new StatTable('lauma_spirit_envoy_form_movement_stamina_cost', charTalentTables.Lauma.s1.p4),
            },
            {
                unit: 'unit',
                table: new StatTable('lauma_spirit_envoy_form_jumping_stamina_cost', charTalentTables.Lauma.s1.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('lauma_spirit_envoy_form_max_duration', charTalentTables.Lauma.s1.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('lauma_spirit_envoy_metamorphosis_cd', charTalentTables.Lauma.s1.p7),
            },
            {
                unit: 'unit',
                table: new StatTable('lauma_spiritcall_prayer_stamina_cost', charTalentTables.Lauma.s1.p8),
            },
            {
                table: new StatTable('lauma_spiritcall_prayer_dmg', charTalentTables.Lauma.s1.p9),
            },
            {
                table: new StatTable('plunge', charTalentTables.Lauma.s1.p10),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Lauma.s1.p11),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Lauma.s1.p12),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Lauma.s2_id,
        title: 'talent_name.lauma_dawnless_rest_of_karsikko',
        description: 'talent_descr.lauma_dawnless_rest_of_karsikko_1',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Lauma.s2.p1),
            },
            {
                table: new StatTable('lauma_1_hit_hold_dmg', charTalentTables.Lauma.s2.p2),
            },
            {
                unit: 'mastery_per_verdant_dew',
                table: new StatTable('lauma_2_hit_hold_dmg', charTalentTables.Lauma.s2.p3),
            },
            {
                type: 'multivalue',
                separator: ' + ',
                units: [
                    'atk',
                    'mastery',
                ],
                table: [
                    new StatTable('lauma_frostgrove_sanctuary_attack_dmg', charTalentTables.Lauma.s2.p4),
                    new StatTable('lauma_frostgrove_sanctuary_attack_dmg_mastery', charTalentTables.Lauma.s2.p5),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('lauma_frostgrove_sanctuary_duration', charTalentTables.Lauma.s2.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('lauma_moon_song_duration', charTalentTables.Lauma.s2.p7),
            },
            {
                table: new StatTable('lauma_elemental_res_decrease', charTalentTables.Lauma.s2.p8),
            },
            {
                unit: 'sec',
                table: new StatTable('lauma_elemental_res_decrease_duration', charTalentTables.Lauma.s2.p9),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Lauma.s2.p10),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Lauma.s3_id,
        title: 'talent_name.lauma_all_hearts_become_the_beating_moon_1',
        description: 'talent_descr.lauma_all_hearts_become_the_beating_moon_1',
        items: [
            {
                unit: 'stack',
                table: new StatTable('lauma_pale_hymn_stacks_gained_from_elemental_burst', charTalentTables.Lauma.s3.p1),
            },
            {
                unit: 'stacks_per_moon_song',
                table: new StatTable('lauma_moon_song_to_pale_hymn_conversion', charTalentTables.Lauma.s3.p2),
            },
            {
                unit: 'mastery',
                table: new StatTable('lauma_bloom_hyperbloom_and_burgeon_dmg_increase', charTalentTables.Lauma.s3.p3),
            },
            {
                unit: 'mastery',
                table: new StatTable('lauma_lunar_bloom_dmg_increase', charTalentTables.Lauma.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('lauma_pale_hymn_duration', charTalentTables.Lauma.s3.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Lauma.s3.p6),
            },
            {
                unit: 'unit',
                table: new StatTable('energy_cost', charTalentTables.Lauma.s3.p7),
            },
        ],
    },
    links: charTalentTables.Lauma.links,
});

const lunarPost = new PostEffectStatsMastery({
    percent: new StatTable('lunarbloom_multi', [charTalentTables.Lauma.passsive[2][0] * 100]),
    statCap: new ValueTable([charTalentTables.Lauma.passsive[2][1] * 100]),
    //condition: new ConditionBoolean({ name: 'lauma_dawnless_rest_of_karsikko' }),
});

const bloomTarget = new FeatureMultiplierTarget({
    isReactionFlatBonus: true,
    tagsExclude: 'lauma_frostgrove_sanctuary',
    tags: 'bloom',
});

const lunarbloomTarget = new FeatureMultiplierTarget({
    isReactionFlatBonus: true,
    tagsExclude: 'lauma_frostgrove_sanctuary',
    tags: 'lunarbloom',
});

export const Lauma = new DbObjectChar({
    name: 'lauma',
    serializeId: 109,
    gameId: charTalentTables.Lauma.char_id,
    iconClass: "char-icon-lauma",
    rarity: 5,
    element: 'dendro',
    weapon: charTalentTables.Lauma.char_weapon,
    originList: ['nodkrai', 'lunar'],
    talents: Talents,
    statTable: charTables.Lauma,
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
        new FeatureDamageNormal({
            name: 'normal_hit_3',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'lauma_spiritcall_prayer_dmg',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.lauma_spiritcall_prayer_dmg'),
                }),
            ],
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
        new FeatureReactionLunarBloomLike({
            name: 'additional_dmg',
            element: 'dendro',
            category: 'attack',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    values: new StatTable('', [charTalentTables.Lauma.cons[5][4]], 100),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'lauma_all_hearts_become_the_beating_moon' }),
                new ConditionConstellation({ constellation: 6 }),
            ]),
        }),
        new FeatureDamageSkill({
            name: 'skill_dmg',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'lauma_1_hit_hold_dmg',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.lauma_1_hit_hold_dmg'),
                }),
            ],
        }),
        new FeatureReactionLunarBloomLike({
            name: 'lauma_2_hit_hold_dmg',
            element: 'dendro',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_elemental',
                    stacksLeveling: 'n11190008',
                    values: Talents.get('skill.lauma_2_hit_hold_dmg'),
                }),
            ],
            condition: new ConditionBooleanValue({
                setting: 'n11190008',
                cond: 'gt',
                value: 0
            }),
        }),
        new FeatureDamageSkill({
            name: 'lauma_frostgrove_sanctuary_attack_dmg',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.lauma_frostgrove_sanctuary_attack_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.lauma_frostgrove_sanctuary_attack_dmg_mastery'),
                }),
            ],
        }),
        new FeatureReactionLunarBloomLike({
            name: 'lauma_frostgrove_sanctuary_additional_dmg',
            element: 'dendro',
            category: 'skill',
            tags: ['lauma_frostgrove_sanctuary'],
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    values: new StatTable('', [charTalentTables.Lauma.cons[5][0]], 100),
                }),
            ],
            condition: new ConditionConstellation({ constellation: 6 }),
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'lunarbloom_base_bonus',
            postEffect: lunarPost,
            format: 'percent',
        }),
        new FeatureStatic({
            category: 'other',
            name: 'lauma_bloom_flat_bonus',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.lauma_bloom_hyperbloom_and_burgeon_dmg_increase'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    values: new StatTable('', [charTalentTables.Lauma.cons[1][0]], 100),
                    condition: new ConditionConstellation({ constellation: 2 }),
                }),
            ],
        }),
        new FeatureStatic({
            category: 'other',
            name: 'lauma_lunarbloom_flat_bonus',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.lauma_lunar_bloom_dmg_increase'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    values: new StatTable('', [charTalentTables.Lauma.cons[1][1]], 100),
                    condition: new ConditionConstellation({ constellation: 2 }),
                }),
            ],
        }),
        new FeatureHeal({
            name: 'heal',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    source: 'constellation1',
                    values: new StatTable('', [charTalentTables.Lauma.cons[0][1]], 100),
                }),
            ],
            condition: new ConditionConstellation({ constellation: 1 }),
        }),
    ],
    conditions: [
        new ConditionMoonPhaseSetting(),
        new ConditionStacks({
            name: 'n11190008',
            serializeId: 4,
            title: 'talent_name.n11190008',
            description: 'talent_descr.n11190008',
            maxStacks: 3,
        }),
        new ConditionBooleanLevels({
            serializeId: 1,
            name: 'lauma_dawnless_rest_of_karsikko',
            title: 'talent_name.lauma_dawnless_rest_of_karsikko',
            description: 'talent_descr.lauma_dawnless_rest_of_karsikko_2',
            levelSetting: 'char_skill_elemental',
            stats: [
                Talents.getAlias('skill.lauma_elemental_res_decrease', 'enemy_res_dendro', -1),
                Talents.getAlias('skill.lauma_elemental_res_decrease', 'enemy_res_hydro', -1),
            ],
        }),
        new ConditionBoolean({
            serializeId: 2,
            name: 'lauma_all_hearts_become_the_beating_moon',
            title: 'talent_name.lauma_all_hearts_become_the_beating_moon_2',
            description: 'talent_descr.lauma_all_hearts_become_the_beating_moon_2',
        }),
        new ConditionBoolean({
            serializeId: 3,
            name: 'lauma_light_for_the_frosty_night_1',
            title: 'talent_name.lauma_light_for_the_frosty_night_1',
            description: 'talent_descr.lauma_light_for_the_frosty_night_1',
            info: { ascension: 1 },
            condition: new ConditionAscensionChar({ ascension: 1 }),
        }),
        new ConditionStatic({
            title: 'talent_name.lauma_light_for_the_frosty_night_2',
            description: 'talent_descr.lauma_light_for_the_frosty_night_2',
            stats: {
                text_number_f: 1,
                crit_rate_bloom: charTalentTables.Lauma.passsive[0][0] * 100,
                crit_dmg_bloom: charTalentTables.Lauma.passsive[0][1] * 100,
            },
            info: { ascension: 1 },
            condition: new ConditionAnd([
                new ConditionAscensionChar({ ascension: 1 }),
                new ConditionMoonPhaseCheck({ moonphase: 1 }),
                new ConditionBoolean({ name: 'lauma_light_for_the_frosty_night_1' }),
            ]),
        }),
        new ConditionStatic({
            title: 'talent_name.lauma_light_for_the_frosty_night_3',
            description: 'talent_descr.lauma_light_for_the_frosty_night_3',
            stats: {
                text_number_f: 2,
                crit_rate_lunarbloom: charTalentTables.Lauma.passsive[0][2] * 100,
                crit_dmg_lunarbloom: charTalentTables.Lauma.passsive[0][3] * 100,
            },
            info: { ascension: 1 },
            condition: new ConditionAnd([
                new ConditionAscensionChar({ ascension: 1 }),
                new ConditionMoonPhaseCheck({ moonphase: 2 }),
                new ConditionBoolean({ name: 'lauma_light_for_the_frosty_night_1' }),
            ]),
        }),
        new ConditionStatic({
            title: 'talent_name.lauma_cleansing_for_the_spring',
            description: 'talent_descr.lauma_cleansing_for_the_spring',
            info: {ascension: 4},
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
        new ConditionStatic({
            title: 'talent_name.lauma_natures_chorus',
            description: 'talent_descr.lauma_natures_chorus',
            settings: {
                allowed_lunarbloom: 1,
            },
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'mastery',
            leveling: 'char_skill_burst',
            values: Talents.get('burst.lauma_bloom_hyperbloom_and_burgeon_dmg_increase'),
            target: bloomTarget,
            condition: new ConditionBoolean({ name: 'lauma_all_hearts_become_the_beating_moon' }),
        }),
        new FeatureMultiplier({
            scaling: 'mastery',
            leveling: 'char_skill_burst',
            values: Talents.get('burst.lauma_lunar_bloom_dmg_increase'),
            target: lunarbloomTarget,
            condition: new ConditionBoolean({ name: 'lauma_all_hearts_become_the_beating_moon' }),
        }),
        new FeatureMultiplier({
            scaling: 'mastery',
            source: 'constellation2',
            values: new ValueTable([charTalentTables.Lauma.cons[1][0]], 100),
            target: bloomTarget,
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'lauma_all_hearts_become_the_beating_moon' }),
                new ConditionConstellation({ constellation: 2 }),
            ]),
        }),
        new FeatureMultiplier({
            scaling: 'mastery',
            source: 'constellation2',
            values: new ValueTable([charTalentTables.Lauma.cons[1][1]], 100),
            target: lunarbloomTarget,
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'lauma_all_hearts_become_the_beating_moon' }),
                new ConditionConstellation({ constellation: 2 }),
            ]),
        }),
    ],
    postEffects: [
        lunarPost,
        new PostEffectStatsMastery({
            percent: new StatTable('dmg_skill', [charTalentTables.Lauma.passsive[1][0]], 100),
            condition: new ConditionAscensionChar({ ascension: 4 }),
            statCap: new ValueTable([charTalentTables.Lauma.passsive[1][1] * 100]),
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.lauma_o_lips_weave_me_songs_and_psalms',
                    description: 'talent_descr.lauma_o_lips_weave_me_songs_and_psalms',
                })
            ],
        },
        {
            conditions: [
                new ConditionMoonPhaseSetting(),
                new ConditionMoonPhaseStatic({
                    title: 'talent_name.lauma_twine_warnings_and_tales_from_the_north',
                    description: 'talent_descr.lauma_twine_warnings_and_tales_from_the_north',
                    realStats: {
                        dmg_reaction_lunarbloom: [0, 0, charTalentTables.Lauma.cons[1][2] * 100],
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
                    title: 'talent_name.lauma_nor_yearn_for_the_great_bears_might',
                    description: 'talent_descr.lauma_nor_yearn_for_the_great_bears_might',
                }),
            ]
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
                new ConditionMoonPhaseSetting(),
                new ConditionMoonPhaseStatic({
                    title: 'talent_name.lauma_i_offer_blood_and_tears_to_the_moonlight',
                    description: 'talent_descr.lauma_i_offer_blood_and_tears_to_the_moonlight_1',
                    realStats: {
                        dmg_reaction_lunarbloom_bonus: [0, 0, charTalentTables.Lauma.cons[5][5] * 100],
                    },
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
            new ConditionMoonPhaseSetting(),
            new ConditionNumber({
                name: 'lauma_mastery_total',
                serializeId: 4,
                title: 'talent_name.stats_total_mastery',
                partyStat: 'mastery_total',
                rotation: 'party',
                max: 10000,
            }),
            new ConditionStatic({
                title: 'talent_name.lauma_natures_chorus',
                description: 'talent_descr.lauma_natures_chorus',
                stats: {
                    text_percent: charTalentTables.Lauma.passsive[2][0] * 100,
                    text_percent_max: charTalentTables.Lauma.passsive[2][1] * 100,
                },
                settings: { allowed_lunarbloom: 1 }
            }),
            new ConditionNumberTalent({
                name: 'lauma_char_skill_elemental',
                serializeId: 1,
                title: 'talent_name.stats_level_skill',
                partySetting: 'char_skill_elemental',
            }),
            new ConditionBoolean({
                name: 'party.lauma_if_truth_may_be_subject_to_witness',
                serializeId: 2,
                title: 'talent_name.lauma_if_truth_may_be_subject_to_witness',
                description: 'talent_descr.char_constellation_skill',
                settings: {
                    lauma_char_skill_elemental_bonus: 3,
                },
                info: {
                    constellation: 5,
                },
            }),
            new ConditionBooleanLevels({
                serializeId: 3,
                name: 'party.lauma_dawnless_rest_of_karsikko',
                title: 'talent_name.lauma_dawnless_rest_of_karsikko',
                description: 'talent_descr.lauma_dawnless_rest_of_karsikko_2',
                levelSetting: 'lauma_char_skill_elemental',
                rotation: 'party',
                stats: [
                    Talents.getAlias('skill.lauma_elemental_res_decrease', 'enemy_res_dendro', -1),
                    Talents.getAlias('skill.lauma_elemental_res_decrease', 'enemy_res_hydro', -1),
                ],
            }),
            new ConditionNumberTalent({
                name: 'lauma_char_skill_burst',
                serializeId: 5,
                title: 'talent_name.stats_level_burst',
                partySetting: 'char_skill_burst',
            }),
            new ConditionBoolean({
                name: 'party.lauma_seek_not_to_tread_the_sly_foxs_path',
                serializeId: 6,
                title: 'talent_name.lauma_seek_not_to_tread_the_sly_foxs_path',
                description: 'talent_descr.char_constellation_burst',
                settings: {
                    lauma_char_skill_burst_bonus: 3,
                },
                info: {
                    constellation: 3,
                },
            }),
            new ConditionBoolean({
                serializeId: 7,
                name: 'party.lauma_all_hearts_become_the_beating_moon',
                title: 'talent_name.lauma_all_hearts_become_the_beating_moon_2',
                description: 'talent_descr.lauma_all_hearts_become_the_beating_moon_2',
                rotation: 'party',
            }),
            new ConditionMoonPhaseBoolean({
                name: 'party.lauma_light_for_the_frosty_night',
                title: 'talent_name.lauma_light_for_the_frosty_night_1',
                description: 'talent_descr.lauma_light_for_the_frosty_night_4',
                serializeId: 8,
                realStats: {
                    crit_rate_bloom: [0, charTalentTables.Lauma.passsive[0][0] * 100, 0],
                    crit_dmg_bloom: [0, charTalentTables.Lauma.passsive[0][1] * 100, 0],
                    crit_rate_lunarbloom: [0, 0, charTalentTables.Lauma.passsive[0][2] * 100],
                    crit_dmg_lunarbloom: [0, 0, charTalentTables.Lauma.passsive[0][3] * 100],
                },
                info: { ascension: 1 },
            }),
            new ConditionMoonPhaseBoolean({
                name: 'party.lauma_twine_warnings_and_tales_from_the_north',
                serializeId: 9,
                title: 'talent_name.lauma_twine_warnings_and_tales_from_the_north',
                description: 'talent_descr.lauma_twine_warnings_and_tales_from_the_north',
                realStats: {
                    dmg_reaction_lunarbloom: [0, 0, charTalentTables.Lauma.cons[1][2] * 100],
                },
                info: {
                    constellation: 2,
                },
            }),
            new ConditionMoonPhaseBoolean({
                name: 'party.lauma_i_offer_blood_and_tears_to_the_moonlight',
                serializeId: 10,
                title: 'talent_name.lauma_i_offer_blood_and_tears_to_the_moonlight',
                description: 'talent_descr.lauma_i_offer_blood_and_tears_to_the_moonlight_2',
                realStats: {
                    dmg_reaction_lunarbloom_bonus: [0, 0, charTalentTables.Lauma.cons[5][5] * 100],
                },
                info: {
                    constellation: 6,
                },
            }),
        ],
        multipliers: [
            new FeatureMultiplier({
                scaling: 'lauma_mastery_total',
                leveling: 'lauma_char_skill_burst',
                source: 'lauma',
                values: Talents.get('burst.lauma_bloom_hyperbloom_and_burgeon_dmg_increase'),
                target: bloomTarget,
                condition: new ConditionBoolean({ name: 'party.lauma_all_hearts_become_the_beating_moon' }),
            }),
            new FeatureMultiplier({
                scaling: 'lauma_mastery_total',
                leveling: 'lauma_char_skill_burst',
                source: 'lauma',
                values: Talents.get('burst.lauma_lunar_bloom_dmg_increase'),
                target: lunarbloomTarget,
                condition: new ConditionBoolean({ name: 'party.lauma_all_hearts_become_the_beating_moon' }),
            }),
            new FeatureMultiplier({
                scaling: 'lauma_mastery_total',
                source: 'lauma',
                values: new StatTable('', [charTalentTables.Lauma.cons[1][0]], 100),
                target: bloomTarget,
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'party.lauma_all_hearts_become_the_beating_moon' }),
                    new ConditionBoolean({ name: 'party.lauma_twine_warnings_and_tales_from_the_north' }),
                ]),
            }),
            new FeatureMultiplier({
                scaling: 'lauma_mastery_total',
                source: 'lauma',
                values: new StatTable('', [charTalentTables.Lauma.cons[1][1]], 100),
                target: lunarbloomTarget,
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'party.lauma_all_hearts_become_the_beating_moon' }),
                    new ConditionBoolean({ name: 'party.lauma_twine_warnings_and_tales_from_the_north' }),
                ]),
            }),
        ],
        postEffects: [
            new PostEffectStats({
                from: 'lauma_mastery_total',
                percent: new StatTable('lunarbloom_multi', [charTalentTables.Lauma.passsive[2][0] * 100]),
                statCap: new ValueTable([charTalentTables.Lauma.passsive[2][1] * 100]),
            })
        ]
    }
});

