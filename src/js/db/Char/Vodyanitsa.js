import { Condition, ConditionAnd, ConditionOr } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanLevels } from "../../classes/Condition/Boolean/Levels";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNumber } from "../../classes/Condition/Number";
import { ConditionNumberTalent } from "../../classes/Condition/Number/Talent";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { FeatureMultiplierVodyanitsa } from "../../classes/Feature2/Multiplier/Vodyanitsa";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { CHARACTER_MAX_POSSIBLE_HP } from "../Constants";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Vodyanitsa.s1_id,
        title: 'talent_name.vodyanitsa_psyshkhwe_arietta',
        description: 'talent_descr.vodyanitsa_psyshkhwe_arietta',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Vodyanitsa.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Vodyanitsa.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Vodyanitsa.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Vodyanitsa.s1.p4),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Vodyanitsa.s1.p5),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Vodyanitsa.s1.p6),
            },
            {
                table: new StatTable('plunge', charTalentTables.Vodyanitsa.s1.p7),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Vodyanitsa.s1.p8),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Vodyanitsa.s1.p9),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Vodyanitsa.s2_id,
        title: 'talent_name.vodyanitsa_sonorous_dawn',
        description: 'talent_descr.vodyanitsa_sonorous_dawn',
        items: [
            {
                unit: 'hp',
                table: new StatTable('skill_dmg', charTalentTables.Vodyanitsa.s2.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Vodyanitsa.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('vodyanitsa_horn_of_springs_call_attack_interval', charTalentTables.Vodyanitsa.s2.p3),
            },
            {
                unit: 'hp',
                digits: 2,
                table: new StatTable('vodyanitsa_horn_of_springs_call_dmg', charTalentTables.Vodyanitsa.s2.p4),
            },
            {
                unit: 'hp',
                type: 'shield',
                digits: 2,
                table: [
                    new StatTable('vodyanitsa_song_of_ages_past_healing', charTalentTables.Vodyanitsa.s2.p6),
                    new StatTable('', charTalentTables.Vodyanitsa.s2.p5),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('vodyanitsa_song_of_ages_past_healing_interval', charTalentTables.Vodyanitsa.s2.p7),
            },
            {
                table: new StatTable('vodyanitsa_hydro_cryo_res_reduction', charTalentTables.Vodyanitsa.s2.p8),
            },
            {
                unit: 'sec',
                table: new StatTable('vodyanitsa_res_reduction_duration', charTalentTables.Vodyanitsa.s2.p9),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Vodyanitsa.s2.p10),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Vodyanitsa.s3_id,
        title: 'talent_name.vodyanitsa_sink_with_thee',
        description: 'talent_descr.vodyanitsa_sink_with_thee',
        items: [
            {
                unit: 'hp',
                table: new StatTable('skill_dmg', charTalentTables.Vodyanitsa.s3.p1),
            },
            {
                table: new StatTable('vodyanitsa_song_of_ages_past_dmg_bonus', charTalentTables.Vodyanitsa.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Vodyanitsa.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Vodyanitsa.s3.p4),
            },
        ],
    },
    links: charTalentTables.Vodyanitsa.links,
});

const selfBuffPost = new PostEffectStats({
    from: 'hp*',
    percent: new StatTable('atk', [charTalentTables.Vodyanitsa.cons[0][0]]),
    condition: new ConditionAnd([
        new ConditionBoolean({ name: 'vodyanitsa_waters_in_full_splendor' }),
        new ConditionConstellation({ constellation: 1 }),
    ]),
});

export const Vodyanitsa = new DbObjectChar({
    name: 'vodyanitsa',
    serializeId: 128,
    gameId: charTalentTables.Vodyanitsa.char_id,
    iconClass: 'char-icon-vodyanitsa',
    rarity: 5,
    element: 'hydro',
    weapon: charTalentTables.Vodyanitsa.char_weapon,
    origin: 'snezhnaya',
    talents: Talents,
    statTable: charTables.Vodyanitsa,
    features: [
        new FeatureDamageNormal({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.vodyanitsa_horn_of_springs_call_dmg'),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'skill',
            name: 'vodyanitsa_song_of_ages_past_healing',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.vodyanitsa_song_of_ages_past_healing'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplierVodyanitsa({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.skill_dmg'),
                    scalingValues: Talents.get('burst.vodyanitsa_song_of_ages_past_dmg_bonus'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'vodyanitsa_dmg_bonus',
            postEffect: new PostEffectStats({
                from: 'hp*',
                levelSetting: 'char_skill_elemental',
                exceed: charTalentTables.Vodyanitsa.passsive[1][2],
                percent: new StatTable('', [charTalentTables.Vodyanitsa.passsive[1][4] * 0.001]),
                statCap: new ValueTable([charTalentTables.Vodyanitsa.passsive[1][6]]),
            }),
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'dmg_reaction_stellar_swirl_bonus',
            postEffect: new PostEffectStats({
                from: 'hp*',
                levelSetting: 'char_skill_elemental',
                exceed: charTalentTables.Vodyanitsa.passsive[1][2],
                percent: new StatTable('', [charTalentTables.Vodyanitsa.passsive[1][3] * 0.001]),
                statCap: new ValueTable([charTalentTables.Vodyanitsa.passsive[1][5]]),
            }),
        }),
    ],
    conditions: [
        new ConditionBooleanLevels({
            name: 'vodyanitsa_sonorous_dawn',
            serializeId: 1,
            title: 'talent_name.vodyanitsa_sonorous_dawn',
            levelSetting: 'char_skill_elemental',
            stats: [
                Talents.getAlias('skill.vodyanitsa_hydro_cryo_res_reduction', 'enemy_res_hydro', -1),
                Talents.getAlias('skill.vodyanitsa_hydro_cryo_res_reduction', 'enemy_res_cryo', -1),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.vodyanitsa_the_last_djeguako_songstress',
            description: 'talent_descr.vodyanitsa_the_last_djeguako_songstress',
            info: { ascension: 1 },
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'vodyanitsa_sonorous_dawn' }),
                new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                new ConditionAscensionChar({ ascension: 1 }),
            ]),
            stats: {
                enemy_res_anemo: charTalentTables.Vodyanitsa.passsive[0][0] * -100,
            },
        }),
        new ConditionBoolean({
            name: 'vodyanitsa_dirge_of_the_fandyr',
            serializeId: 2,
            title: 'talent_name.vodyanitsa_dirge_of_the_fandyr',
            description: 'talent_descr.vodyanitsa_dirge_of_the_fandyr',
            info: { ascension: 4 },
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'vodyanitsa_sonorous_dawn' }),
                new ConditionAscensionChar({ ascension: 4 }),
            ]),
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'hp*',
            source: 'vodyanitsa',
            exceedStatValue: charTalentTables.Vodyanitsa.passsive[1][2],
            values: new ValueTable([charTalentTables.Vodyanitsa.passsive[1][4]], 0.1),
            capValue: new ValueTable([charTalentTables.Vodyanitsa.passsive[1][6]]),
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'vodyanitsa_dirge_of_the_fandyr' }),
                new ConditionBoolean({ name: 'vodyanitsa_sonorous_dawn' }),
                new ConditionAscensionChar({ ascension: 4 }),
                new ConditionAnd([
                    new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                    new ConditionBoolean({ name: 'allowed_stellar_swirl' }),
                ], 1),
            ]),
            target: new FeatureMultiplierTarget({
                damageElements: ['cryo', 'hydro'],
                damageTypes: ['normal', 'charged', 'plunge', 'skill', 'burst'],
            }),
        }),
        new FeatureMultiplier({
            scaling: 'hp*',
            source: 'vodyanitsa',
            exceedStatValue: charTalentTables.Vodyanitsa.passsive[1][2],
            values: new ValueTable([charTalentTables.Vodyanitsa.passsive[1][3]], 0.1),
            capValue: new ValueTable([charTalentTables.Vodyanitsa.passsive[1][5]]),
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'vodyanitsa_dirge_of_the_fandyr' }),
                new ConditionBoolean({ name: 'vodyanitsa_sonorous_dawn' }),
                new ConditionAscensionChar({ ascension: 4 }),
                new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                new ConditionBoolean({ name: 'allowed_stellar_swirl' }),
            ]),
            target: new FeatureMultiplierTarget({
                isReactionFlatBonus: true,
                tags: 'stellar_swirl_reaction',
            }),
        }),
    ],
    postEffects: [
        selfBuffPost,
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionBoolean({
                    name: 'vodyanitsa_waters_in_full_splendor',
                    serializeId: 3,
                    title: 'talent_name.vodyanitsa_waters_in_full_splendor',
                    description: 'talent_descr.vodyanitsa_waters_in_full_splendor',
                }),
            ],
            features:[
                new FeaturePostEffectValue({
                    category: 'other',
                    name: 'atk_bonus',
                    postEffect: selfBuffPost,
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'vodyanitsa_echoes_that_pierce_the_snow',
                    serializeId: 4,
                    title: 'talent_name.vodyanitsa_echoes_that_pierce_the_snow',
                    description: 'talent_descr.vodyanitsa_echoes_that_pierce_the_snow',
                }),
                new Condition({
                    isHidden: true,
                    condition: new ConditionAnd([
                        new ConditionBoolean({ name: 'vodyanitsa_echoes_that_pierce_the_snow' }),
                        new ConditionAnd([
                            new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                            new ConditionBoolean({ name: 'allowed_stellar_swirl' }),
                        ], 1),
                        new ConditionOr([
                            new ConditionBoolean({ name: 'common.char_status_off_field', invert: 1 }),
                            new ConditionConstellation({ constellation: 6 }),
                        ]),
                    ]),
                    stats: {
                        crit_dmg_cryo: charTalentTables.Vodyanitsa.cons[1][0] * 100,
                        crit_dmg_hydro: charTalentTables.Vodyanitsa.cons[1][0] * 100,
                    }
                }),
                new Condition({
                    isHidden: true,
                    condition: new ConditionAnd([
                        new ConditionBoolean({ name: 'vodyanitsa_echoes_that_pierce_the_snow' }),
                        new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                        new ConditionBoolean({ name: 'allowed_stellar_swirl' }),
                        new ConditionOr([
                            new ConditionBoolean({ name: 'common.char_status_off_field', invert: 1 }),
                            new ConditionConstellation({ constellation: 6 }),
                        ]),
                    ]),
                    stats: {
                        crit_dmg_stellar_swirl: charTalentTables.Vodyanitsa.cons[1][1] * 100,
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
                new ConditionStacks({
                    name: 'vodyanitsa_melancholic_voice_upon_the_gentle_waters',
                    serializeId: 5,
                    title: 'talent_name.vodyanitsa_melancholic_voice_upon_the_gentle_waters',
                    description: 'talent_descr.vodyanitsa_melancholic_voice_upon_the_gentle_waters',
                    maxStacks: 3,
                    stats: [
                        new StatTable('hp_percent', [charTalentTables.Vodyanitsa.cons[3][2] * 100])
                    ]
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
                    name: 'vodyanitsa_neverending_song_of_revelry',
                    title: 'talent_name.vodyanitsa_neverending_song_of_revelry',
                    description: 'talent_descr.vodyanitsa_neverending_song_of_revelry',
                    condition: new ConditionBoolean({ name: 'vodyanitsa_sonorous_dawn' }),
                    stats: {
                        dmg_reaction_stellar_swirl_bonus: charTalentTables.Vodyanitsa.cons[5][0] * 100,
                        dmg_cryo: charTalentTables.Vodyanitsa.cons[5][1] * 100,
                        dmg_hydro: charTalentTables.Vodyanitsa.cons[5][1] * 100,
                    }
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            stats: ['hp_total'],
            settings: ['char_skill_elemental', 'char_skill_burst'],
        },
        conditions: [
            new ConditionNumber({
                name: 'vodyanitsa_hp_total',
                title: 'talent_name.stats_total_hp',
                partyStat: 'hp_total',
                serializeId: 1,
                rotation: 'party',
                max: CHARACTER_MAX_POSSIBLE_HP,
                class: "gi-inputs-5digit",
            }),
            new ConditionNumberTalent({
                name: 'party.vodyanitsa_char_skill_elemental',
                title: 'talent_name.stats_level_skill',
                partySetting: 'char_skill_elemental',
                serializeId: 2,
            }),
            new ConditionBoolean({
                name: 'party.vodyanitsa_constellation_3',
                serializeId: 3,
                title: 'talent_name.vodyanitsa_song_lingering_on_a_spring_morning',
                description: 'talent_descr.char_constellation_skill',
                info: { constellation: 3, },
                settings: {
                    ['party.vodyanitsa_char_skill_elemental_bonus']: 3,
                },
            }),
            new ConditionBooleanLevels({
                name: 'party.vodyanitsa_sonorous_dawn',
                serializeId: 4,
                title: 'talent_name.vodyanitsa_sonorous_dawn',
                levelSetting: 'party.vodyanitsa_char_skill_elemental',
                stats: [
                    Talents.getAlias('skill.vodyanitsa_hydro_cryo_res_reduction', 'enemy_res_hydro', -1),
                    Talents.getAlias('skill.vodyanitsa_hydro_cryo_res_reduction', 'enemy_res_cryo', -1),
                ],
            }),
            new ConditionBoolean({
                name: 'party.vodyanitsa_the_last_djeguako_songstress',
                serializeId: 5,
                title: 'talent_name.vodyanitsa_the_last_djeguako_songstress',
                description: 'talent_descr.vodyanitsa_the_last_djeguako_songstress',
                info: { ascension: 1 },
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'party.vodyanitsa_sonorous_dawn' }),
                    new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                ]),
                stats: {
                    enemy_res_anemo: charTalentTables.Vodyanitsa.passsive[0][0] * -100,
                },
            }),
            new ConditionBoolean({
                name: 'party.vodyanitsa_dirge_of_the_fandyr',
                serializeId: 6,
                title: 'talent_name.vodyanitsa_dirge_of_the_fandyr',
                description: 'talent_descr.vodyanitsa_dirge_of_the_fandyr',
                info: { ascension: 4 },
                condition: new ConditionBoolean({ name: 'party.vodyanitsa_sonorous_dawn' }),
            }),
            new ConditionBoolean({
                name: 'party.vodyanitsa_waters_in_full_splendor',
                serializeId: 7,
                title: 'talent_name.vodyanitsa_waters_in_full_splendor',
                description: 'talent_descr.vodyanitsa_waters_in_full_splendor',
                info: { constellation: 1 },
            }),
            new ConditionBoolean({
                name: 'party.vodyanitsa_echoes_that_pierce_the_snow',
                serializeId: 8,
                title: 'talent_name.vodyanitsa_echoes_that_pierce_the_snow',
                description: 'talent_descr.vodyanitsa_echoes_that_pierce_the_snow',
                info: { constellation: 2 },
            }),
            new ConditionBoolean({
                name: 'party.vodyanitsa_neverending_song_of_revelry',
                serializeId: 9,
                title: 'talent_name.vodyanitsa_neverending_song_of_revelry',
                description: 'talent_descr.vodyanitsa_neverending_song_of_revelry',
            }),
            new Condition({
                isHidden: true,
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'party.vodyanitsa_echoes_that_pierce_the_snow' }),
                    new ConditionAnd([
                        new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                        new ConditionBoolean({ name: 'allowed_stellar_swirl' }),
                    ], 1),
                    new ConditionOr([
                        new ConditionBoolean({ name: 'common.char_status_off_field', invert: 1 }),
                        new ConditionBoolean({ name: 'party.vodyanitsa_neverending_song_of_revelry' }),
                    ]),
                ]),
                stats: {
                    crit_dmg_cryo: charTalentTables.Vodyanitsa.cons[1][0] * 100,
                    crit_dmg_hydro: charTalentTables.Vodyanitsa.cons[1][0] * 100,
                }
            }),
            new Condition({
                isHidden: true,
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'party.vodyanitsa_echoes_that_pierce_the_snow' }),
                    new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                    new ConditionBoolean({ name: 'allowed_stellar_swirl' }),
                    new ConditionOr([
                        new ConditionBoolean({ name: 'common.char_status_off_field', invert: 1 }),
                        new ConditionBoolean({ name: 'party.vodyanitsa_neverending_song_of_revelry' }),
                    ]),
                ]),
                stats: {
                    crit_dmg_stellar_swirl: charTalentTables.Vodyanitsa.cons[1][1] * 100,
                }
            }),
            new Condition({
                isHidden: true,
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'party.vodyanitsa_neverending_song_of_revelry' }),
                    new ConditionBoolean({ name: 'party.vodyanitsa_sonorous_dawn' }),
                ]),
                stats: {
                    dmg_reaction_stellar_swirl_bonus: charTalentTables.Vodyanitsa.cons[5][0] * 100,
                    dmg_cryo: charTalentTables.Vodyanitsa.cons[5][1] * 100,
                    dmg_hydro: charTalentTables.Vodyanitsa.cons[5][1] * 100,
                },
            }),
        ],
        postEffects: [
            new PostEffectStats({
                from: 'vodyanitsa_hp_total',
                percent: new StatTable('atk', [charTalentTables.Vodyanitsa.cons[0][0]]),
                condition: new ConditionBoolean({ name: 'party.vodyanitsa_waters_in_full_splendor' }),
            }),
        ],
        multipliers: [
            new FeatureMultiplier({
                scaling: 'vodyanitsa_hp_total',
                source: 'vodyanitsa',
                exceedStatValue: charTalentTables.Vodyanitsa.passsive[1][2],
                values: new ValueTable([charTalentTables.Vodyanitsa.passsive[1][4]], 0.1),
                capValue: new ValueTable([charTalentTables.Vodyanitsa.passsive[1][6]]),
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'party.vodyanitsa_dirge_of_the_fandyr' }),
                    new ConditionBoolean({ name: 'party.vodyanitsa_sonorous_dawn' }),
                    new ConditionAnd([
                        new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                        new ConditionBoolean({ name: 'allowed_stellar_swirl' }),
                    ], 1),
                ]),
                target: new FeatureMultiplierTarget({
                    damageElements: ['cryo', 'hydro'],
                    damageTypes: ['normal', 'charged', 'plunge', 'skill', 'burst'],
                }),
            }),
            new FeatureMultiplier({
                scaling: 'vodyanitsa_hp_total',
                source: 'vodyanitsa',
                exceedStatValue: charTalentTables.Vodyanitsa.passsive[1][2],
                values: new ValueTable([charTalentTables.Vodyanitsa.passsive[1][3]], 0.1),
                capValue: new ValueTable([charTalentTables.Vodyanitsa.passsive[1][5]]),
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'party.vodyanitsa_dirge_of_the_fandyr' }),
                    new ConditionBoolean({ name: 'party.vodyanitsa_sonorous_dawn' }),
                    new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                    new ConditionBoolean({ name: 'allowed_stellar_swirl' }),
                ]),
                target: new FeatureMultiplierTarget({
                    isReactionFlatBonus: true,
                    tags: 'stellar_swirl_reaction',
                }),
            }),
        ],
    },
});
