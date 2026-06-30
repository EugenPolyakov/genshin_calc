import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanLevels } from "../../classes/Condition/Boolean/Levels";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionHexCheck } from "../../classes/Condition/HexCheck";
import { ConditionHexCurrent } from "../../classes/Condition/HexCurrent";
import { ConditionNumberTalent } from "../../classes/Condition/Number/Talent";
import { ConditionStacks } from "../../classes/Condition/Stacks";
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
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { PostEffectStatsRecharge } from "../../classes/PostEffect/Stats/Recharge";
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Mona.s1_id,
        title: 'talent_name.mona_ripple_of_fate',
        description: 'talent_descr.mona_ripple_of_fate',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Mona.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Mona.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Mona.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Mona.s1.p4),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Mona.s1.p5),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Mona.s1.p6),
            },
            {
                table: new StatTable('plunge', charTalentTables.Mona.s1.p7),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Mona.s1.p8),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Mona.s1.p9),

            },
        ],
    },
    skill: {
        gameId: charTalentTables.Mona.s2_id,
        title: 'talent_name.mona_mirror_reflection_of_doom',
        description: 'talent_descr.mona_mirror_reflection_of_doom',
        items: [
            {
                table: new StatTable('dot_dmg', charTalentTables.Mona.s2.p1),
            },
            {
                table: new StatTable('explosion_dmg', charTalentTables.Mona.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Mona.s2.p5),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Mona.s4_id,
        title: 'talent_name.mona_stellaris_phantasm',
        description: 'talent_descr.mona_stellaris_phantasm',
        items: [
            {
                unit: 'sec',
                table: new StatTable('mona_buble_duration', charTalentTables.Mona.s4.p1),
            },
            {
                table: new StatTable('mona_buble_dmg', charTalentTables.Mona.s4.p2),
            },
            {
                table: new StatTable('mona_dmg_bonus', charTalentTables.Mona.s4.p10),
            },
            {
                unit: 'sec',
                table: new StatTable('mona_omen_duration', charTalentTables.Mona.s4.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Mona.s4.p5),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Mona.s4.p6),
            },
        ],
    },
    other: {
        maxLevel: 1,
        title: 'talent_name.mona_illusory_torrent',
        description: 'talent_descr.mona_illusory_torrent',
        items: [
            {
                unit: 'sec',
                table: new StatTable('sprint_activation_cost', charTalentTables.Mona.s3.p1),
            },
            {
                unit: 'per_sec',
                table: new StatTable('sprint_stamina_drain', charTalentTables.Mona.s3.p2),
            },
        ],
    },
});

const A1SkillDmg = 50;
const A4HydroDmgRatio = 20;
const C1ReactionBonus = 15;
const C2ChargedProb = 20;
const C4CritRate = 15;
const C6ChargedDmg = 60;

const hydroDmgPost = new PostEffectStatsRecharge({
    percent: new StatTable('dmg_hydro', [A4HydroDmgRatio]),
    condition: new ConditionAscensionChar({ascension: 4}),
});

export const Mona = new DbObjectChar({
    name: 'mona',
    serializeId: 17,
    gameId: 10000041,
    iconClass: "char-icon-mona",
    rarity: 5,
    element: 'hydro',
    weapon: 'catalyst',
    origin: 'mondstadt',
    talents: Talents,
    statTable: charTables.Mona,
    features: [
        new FeatureDamageNormal({
            name: 'normal_hit_1',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_2',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_hit',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    scalingMultiplier: 2,
                    scalingMultiplierCondition: new ConditionAnd([
                        new ConditionHexCurrent(),
                        new ConditionConstellation({ constellation: 6 }),
                        new ConditionBoolean({ name: 'mona_omen' }),
                    ]),
                    scalingSource: 'constellation6',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'mona_charged_hit',
            element: 'hydro',
            rotationHitCount: C2ChargedProb / 100,
            rotationHitDescription: 'talent_activation_chance',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    scalingMultiplier: 2,
                    scalingMultiplierCondition: new ConditionAnd([
                        new ConditionHexCurrent(),
                        new ConditionConstellation({ constellation: 6 }),
                        new ConditionBoolean({ name: 'mona_omen' }),
                    ]),
                    scalingSource: 'constellation6',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
            condition: new ConditionConstellation({constellation: 2}),
        }),
        new FeatureDamagePlungeCollision({
            name: 'plunge',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_low',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_high',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'dot_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.dot_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'explosion_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.explosion_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'mona_phantom_explosion_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    scalingSource: 'ascension1',
                    scalingMultiplier: A1SkillDmg / 100,
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.explosion_dmg'),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.mona_buble_dmg'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'hydro_dmg_bonus',
            postEffect: hydroDmgPost,
            format: 'percent',
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'char_hex_mona',
            serializeId: 5,
            title: 'talent_name.mona_genesis_of_starsigns_1',
            description: 'talent_descr.mona_genesis_of_starsigns_1',
        }),
        new ConditionStatic({
            title: 'talent_name.mona_genesis_of_starsigns_1',
            description: 'talent_descr.mona_genesis_of_starsigns_3',
            condition: new ConditionAnd([
                new ConditionHexCurrent(),
                new ConditionHexCheck({ hex: 2 }),
            ]),
        }),
        new ConditionStacks({
            name: 'astral_glow_of_mercury',
            serializeId: 6,
            title: 'talent_name.mona_genesis_of_starsigns_2',
            description: 'talent_descr.mona_genesis_of_starsigns_2',
            maxStacks: 3,
            stats: [
                new StatTable('dmg_reaction_vaporize', [charTalentTables.Mona.passsive[2][2]], 100),
            ],
            condition: new ConditionAnd([
                new ConditionHexCurrent(),
                new ConditionHexCheck({ hex: 2 }),
            ]),
        }),
        new ConditionBooleanLevels({
            name: 'mona_omen',
            serializeId: 1,
            title: 'talent_name.mona_omen',
            description: 'talent_descr.mona_omen',
            levelSetting: 'char_skill_burst',
            stats: [
                Talents.getAlias('burst.mona_dmg_bonus', 'dmg_all'),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.mona_come_n_get_me_hag',
            description: 'talent_descr.mona_come_n_get_me_hag',
            stats: {
                text_percent_dmg: A1SkillDmg,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.mona_waterborne_destiny',
            description: 'talent_descr.mona_waterborne_destiny',
            stats: {
                text_percent: A4HydroDmgRatio,
            },
            info: {ascension: 4},
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    postEffects: [
        hydroDmgPost,
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionBoolean({
                    name: 'mona_prophecy_of_submersion',
                    serializeId: 4,
                    title: 'talent_name.mona_prophecy_of_submersion',
                    description: 'talent_descr.mona_prophecy_of_submersion',
                    hideCondition: new ConditionHexCurrent(),
                    condition: new ConditionHexCurrent({ invert: 1 }),
                    stats: {
                        dmg_reaction_electrocharged: C1ReactionBonus,
                        dmg_reaction_vaporize: C1ReactionBonus,
                        dmg_reaction_swirl_hydro: C1ReactionBonus,
                        duration_frozen: C1ReactionBonus,
                        dmg_reaction_lunarcharged: C1ReactionBonus,
                        dmg_reaction_lunarcrystallize: C1ReactionBonus,
                    },
                }),
                new ConditionBoolean({
                    name: 'mona_prophecy_of_submersion',
                    serializeId: 4,
                    title: 'talent_name.mona_prophecy_of_submersion',
                    description: 'talent_descr.mona_prophecy_of_submersion_hex_1',
                    hideCondition: new ConditionHexCurrent({ invert: 1 }),
                    condition: new ConditionHexCurrent(),
                    stats: {
                        dmg_reaction_electrocharged: C1ReactionBonus,
                        dmg_reaction_vaporize: C1ReactionBonus,
                        dmg_reaction_swirl_hydro: C1ReactionBonus,
                        duration_frozen: C1ReactionBonus,
                        dmg_reaction_lunarcharged: C1ReactionBonus,
                        dmg_reaction_lunarcrystallize: C1ReactionBonus,
                    },
                }),
                new ConditionBoolean({
                    name: 'mona_prophecy_of_submersion_offield',
                    serializeId: 7,
                    title: 'talent_name.mona_prophecy_of_submersion',
                    description: 'talent_descr.mona_prophecy_of_submersion_hex_2',
                    hideCondition: new ConditionHexCurrent({ invert: 1 }),
                    condition: new ConditionAnd([
                        new ConditionBoolean({ name: 'mona_prophecy_of_submersion' }),
                        new ConditionHexCurrent(),
                    ]),
                    stats: {
                        text_percent: charTalentTables.Mona.cons[0][6] * 100 + 100,
                        dmg_reaction_electrocharged: C1ReactionBonus * charTalentTables.Mona.cons[0][6],
                        dmg_reaction_vaporize: C1ReactionBonus * charTalentTables.Mona.cons[0][6],
                        dmg_reaction_swirl_hydro: C1ReactionBonus * charTalentTables.Mona.cons[0][6],
                        duration_frozen: C1ReactionBonus * charTalentTables.Mona.cons[0][6],
                        dmg_reaction_lunarcharged: C1ReactionBonus * charTalentTables.Mona.cons[0][6],
                        dmg_reaction_lunarcrystallize: C1ReactionBonus * charTalentTables.Mona.cons[0][6],
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.mona_lunar_chain',
                    description: 'talent_descr.mona_lunar_chain',
                    hideCondition: new ConditionHexCurrent(),
                    condition: new ConditionHexCurrent({ invert: 1 }),
                    stats: {
                        text_percent_chance: C2ChargedProb,
                    },
                }),
                new ConditionStatic({
                    title: 'talent_name.mona_lunar_chain',
                    description: 'talent_descr.mona_lunar_chain_hex_1',
                    hideCondition: new ConditionHexCurrent({ invert: 1 }),
                    condition: new ConditionHexCurrent(),
                    stats: {
                        text_percent_chance: C2ChargedProb,
                    },
                }),
                new ConditionBoolean({
                    name: 'mona_charged',
                    serializeId: 8,
                    title: 'talent_name.mona_lunar_chain',
                    description: 'talent_descr.mona_lunar_chain_hex_2',
                    hideCondition: new ConditionHexCurrent({ invert: 1 }),
                    condition: new ConditionHexCurrent(),
                    stats: {
                        mastery: charTalentTables.Mona.cons[1][4],
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
                    title: 'talent_name.mona_prophecy_of_oblivion',
                    description: 'talent_descr.mona_prophecy_of_oblivion',
                    hideCondition: new ConditionHexCurrent(),
                    condition: new ConditionAnd([
                        new ConditionHexCurrent({ invert: 1 }),
                        new ConditionBoolean({ name: 'mona_omen' }),
                    ]),
                    stats: {
                        crit_rate: C4CritRate,
                    },
                }),
                new ConditionStatic({
                    title: 'talent_name.mona_prophecy_of_oblivion',
                    description: 'talent_descr.mona_prophecy_of_oblivion_hex_1',
                    hideCondition: new ConditionHexCurrent({ invert: 1 }),
                    condition: new ConditionAnd([
                        new ConditionHexCurrent(),
                        new ConditionBoolean({ name: 'mona_omen' }),
                    ]),
                    stats: {
                        crit_rate: C4CritRate,
                        crit_dmg: C4CritRate,
                    },
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
                new ConditionStacks({
                    name: 'mona_rhetorics_of_calamitas',
                    serializeId: 3,
                    title: 'talent_name.mona_rhetorics_of_calamitas',
                    description: 'talent_descr.mona_rhetorics_of_calamitas',
                    hideCondition: new ConditionHexCurrent(),
                    condition: new ConditionHexCurrent({ invert: 1 }),
                    maxStacks: 3,
                    stats: [
                        new StatTable('dmg_charged', [C6ChargedDmg]),
                    ],
                }),
                new ConditionStacks({
                    name: 'mona_rhetorics_of_calamitas',
                    serializeId: 3,
                    title: 'talent_name.mona_rhetorics_of_calamitas',
                    description: 'talent_descr.mona_rhetorics_of_calamitas_hex_1',
                    hideCondition: new ConditionHexCurrent({ invert: 1 }),
                    condition: new ConditionHexCurrent(),
                    maxStacks: 3,
                    stats: [
                        new StatTable('dmg_charged', [C6ChargedDmg]),
                    ],
                }),
                new ConditionStatic({
                    title: 'talent_name.mona_rhetorics_of_calamitas',
                    description: 'talent_descr.mona_rhetorics_of_calamitas_hex_2',
                    hideCondition: new ConditionHexCurrent({ invert: 1 }),
                    condition: new ConditionAnd([
                        new ConditionHexCurrent(),
                        new ConditionBoolean({ name: 'mona_omen' }),
                    ]),
                })
            ],
        },
    ]),
    partyData: {
        loadStats: {
            settings: ['char_skill_burst'],
        },
        conditions: [
            new ConditionNumberTalent({
                name: 'mona_char_skill_burst',
                serializeId: 1,
                title: 'talent_name.stats_level_burst',
                partySetting: 'char_skill_burst',
            }),
            new ConditionBoolean({
                name: 'party.mona_constellation_5',
                serializeId: 2,
                title: 'talent_name.mona_restless_revolution',
                description: 'talent_descr.char_constellation_burst',
                info: {constellation: 3},
                settings: {
                    mona_char_skill_burst_bonus: 3,
                },
            }),
            new ConditionBoolean({
                name: 'char_hex_mona',
                serializeId: 7,
                title: 'talent_name.mona_genesis_of_starsigns_1',
                description: 'talent_descr.mona_genesis_of_starsigns_1',
            }),
            new ConditionStacks({
                name: 'party.mona_astral_glow_of_mercury',
                serializeId: 8,
                title: 'talent_name.mona_genesis_of_starsigns_2',
                description: 'talent_descr.mona_genesis_of_starsigns_2',
                rotation: 'party',
                maxStacks: 3,
                stats: [
                    new StatTable('dmg_reaction_vaporize', [charTalentTables.Mona.passsive[2][2]], 100),
                ],
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'char_hex_mona' }),
                    new ConditionHexCheck({ hex: 2 }),
                ]),
            }),
            new ConditionBooleanLevels({
                name: 'party.mona_omen',
                serializeId: 3,
                rotation: 'party',
                title: 'talent_name.mona_omen',
                description: 'talent_descr.mona_omen',
                levelSetting: 'mona_char_skill_burst',
                stats: [
                    Talents.getAlias('burst.mona_dmg_bonus', 'dmg_all'),
                ],
            }),
            new ConditionBoolean({
                name: 'party.mona_prophecy_of_submersion',
                serializeId: 4,
                title: 'talent_name.mona_prophecy_of_submersion',
                description: 'talent_descr.mona_prophecy_of_submersion',
                hideCondition: new ConditionBoolean({ name: 'char_hex_mona' }),
                condition: new ConditionBoolean({ name: 'char_hex_mona', invert: 1 }),
                rotation: 'party',
                info: { constellation: 1 },
                stats: {
                    dmg_reaction_electrocharged: C1ReactionBonus,
                    dmg_reaction_vaporize: C1ReactionBonus,
                    dmg_reaction_swirl_hydro: C1ReactionBonus,
                    dmg_reaction_lunarcharged: C1ReactionBonus,
                    dmg_reaction_lunarcrystallize: C1ReactionBonus,
                    duration_frozen: C1ReactionBonus,
                },
            }),
            new ConditionBoolean({
                name: 'party.mona_prophecy_of_submersion',
                serializeId: 4,
                title: 'talent_name.mona_prophecy_of_submersion',
                description: 'talent_descr.mona_prophecy_of_submersion_hex_1',
                hideCondition: new ConditionBoolean({ name: 'char_hex_mona', invert: 1 }),
                condition: new ConditionBoolean({ name: 'char_hex_mona' }),
                rotation: 'party',
                info: { constellation: 1 },
                stats: {
                    dmg_reaction_electrocharged: C1ReactionBonus,
                    dmg_reaction_vaporize: C1ReactionBonus,
                    dmg_reaction_swirl_hydro: C1ReactionBonus,
                    dmg_reaction_lunarcharged: C1ReactionBonus,
                    dmg_reaction_lunarcrystallize: C1ReactionBonus,
                    duration_frozen: C1ReactionBonus,
                },
            }),
            new ConditionBoolean({
                name: 'common.char_status_shield_off_field',
                serializeId: 6,
                title: 'talent_name.mona_prophecy_of_submersion',
                description: 'talent_descr.mona_prophecy_of_submersion_hex_2',
                hideCondition: new ConditionBoolean({ name: 'char_hex_mona', invert: 1 }),
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'char_hex_mona' }),
                    new ConditionBoolean({ name: 'party.mona_prophecy_of_submersion' }),
                ]),
                info: { constellation: 1 },
                stats: {
                    text_percent: charTalentTables.Mona.cons[0][6] * 100 + 100,
                    dmg_reaction_electrocharged: C1ReactionBonus * charTalentTables.Mona.cons[0][6],
                    dmg_reaction_vaporize: C1ReactionBonus * charTalentTables.Mona.cons[0][6],
                    dmg_reaction_swirl_hydro: C1ReactionBonus * charTalentTables.Mona.cons[0][6],
                    dmg_reaction_lunarcharged: C1ReactionBonus * charTalentTables.Mona.cons[0][6],
                    dmg_reaction_lunarcrystallize: C1ReactionBonus * charTalentTables.Mona.cons[0][6],
                    duration_frozen: C1ReactionBonus * charTalentTables.Mona.cons[0][6],
                },
            }),
            new ConditionBoolean({
                name: 'party.mona_charged',
                serializeId: 9,
                title: 'talent_name.mona_lunar_chain',
                description: 'talent_descr.mona_lunar_chain_hex_2',
                condition: new ConditionBoolean({ name: 'char_hex_mona' }),
                rotation: 'party',
                info: { constellation: 2 },
                stats: {
                    mastery: charTalentTables.Mona.cons[1][4],
                },
            }),
            new ConditionBoolean({
                name: 'party.mona_prophecy_of_oblivion',
                serializeId: 5,
                title: 'talent_name.mona_prophecy_of_oblivion',
                description: 'talent_descr.mona_prophecy_of_oblivion',
                stats: {
                    crit_rate: C4CritRate,
                },
                info: { constellation: 4 },
                hideCondition: new ConditionBoolean({ name: 'char_hex_mona' }),
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'char_hex_mona', invert: 1 }),
                    new ConditionBoolean({ name: 'party.mona_omen' }),
                ]),
            }),
            new ConditionBoolean({
                name: 'party.mona_prophecy_of_oblivion',
                serializeId: 5,
                title: 'talent_name.mona_prophecy_of_oblivion',
                description: 'talent_descr.mona_prophecy_of_oblivion_hex_2',
                stats: {
                    crit_rate: C4CritRate,
                },
                info: { constellation: 4 },
                hideCondition: new ConditionBoolean({ name: 'char_hex_mona', invert: 1 }),
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'char_hex_mona' }),
                    new ConditionBoolean({ name: 'party.mona_omen' }),
                ]),
            }),
            new ConditionStatic({
                title: 'talent_name.mona_prophecy_of_oblivion',
                description: 'talent_descr.mona_prophecy_of_oblivion_hex_3',
                stats: {
                    crit_dmg: C4CritRate,
                },
                info: { constellation: 4 },
                hideCondition: new ConditionBoolean({ name: 'char_hex_mona', invert: 1 }),
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'char_hex_mona' }),
                    new ConditionBoolean({ name: 'party.mona_prophecy_of_oblivion' }),
                    new ConditionHexCurrent(),
                    new ConditionBoolean({ name: 'party.mona_omen' }),
                ]),
            }),
        ],
    },
});
