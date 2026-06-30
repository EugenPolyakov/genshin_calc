import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanDropdownValue } from "../../classes/Condition/Boolean/DropdownValue";
import { ConditionBooleanLevels } from "../../classes/Condition/Boolean/Levels";
import { ConditionBooleanValue } from "../../classes/Condition/Boolean/Value";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionMoonPhaseSetting } from "../../classes/Condition/CustomOrigin/MoonPhaseSetting";
import { ConditionDropdown } from "../../classes/Condition/Dropdown";
import { ConditionDropdownElement } from "../../classes/Condition/Dropdown/Element";
import { ConditionGroup } from "../../classes/Condition/Group";
import { ConditionMoonPhaseCheck } from "../../classes/Condition/MoonPhaseCheck";
import { ConditionNumber } from "../../classes/Condition/Number";
import { ConditionNumberTalent } from "../../classes/Condition/Number/Talent";
import { ConditionOr } from "../../classes/Condition/Or";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { Feature2 } from "../../classes/Feature2";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { FeatureReactionLunarBloomLike } from "../../classes/Feature2/Reaction/Transformative/Lunar/BloomLike";
import { FeatureReactionLunarChargedLike } from "../../classes/Feature2/Reaction/Transformative/Lunar/ChargedLike";
import { FeatureReactionLunarCrystallizeLike } from "../../classes/Feature2/Reaction/Transformative/Lunar/CrystallizeLike";
import { FeatureShield } from "../../classes/Feature2/Shield";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { CHARACTER_MAX_POSSIBLE_HP } from "../Constants";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Columbina.s1_id,
        title: 'talent_name.columbina_moondew_cascade',
        description: 'talent_descr.columbina_moondew_cascade',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Columbina.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Columbina.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Columbina.s1.p3),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Columbina.s1.p4),
            },
            {
                table: new StatTable('stamina_cost', charTalentTables.Columbina.s1.p5),
            },
            {
                unit: 'hp',
                type: 'multihit',
                hits: 3,
                digits: 2,
                table: new StatTable('columbina_moondew_cleanse_dmg', charTalentTables.Columbina.s1.p6),
            },
            {
                table: new StatTable('plunge', charTalentTables.Columbina.s1.p7),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Columbina.s1.p8),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Columbina.s1.p9),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Columbina.s2_id,
        title: 'talent_name.columbina_eternal_tides',
        description: 'talent_descr.columbina_eternal_tides',
        items: [
            {
                unit: 'hp',
                table: new StatTable('skill_dmg', charTalentTables.Columbina.s2.p1),
            },
            {
                unit: 'hp',
                table: new StatTable('columbina_continuous_dmg', charTalentTables.Columbina.s2.p2),
            },
            {
                unit: 'hp',
                digits: 2,
                table: new StatTable('columbina_lunar_charged_dmg', charTalentTables.Columbina.s2.p3),
            },
            {
                unit: 'hp',
                type: 'multihit',
                hits: 5,
                digits: 2,
                table: new StatTable('columbina_lunar_bloom_dmg', charTalentTables.Columbina.s2.p4),
            },
            {
                unit: 'hp',
                digits: 2,
                table: new StatTable('columbina_lunar_crystallize_dmg', charTalentTables.Columbina.s2.p5),
            },
            {
                table: new StatTable('columbina_gravity_limit', charTalentTables.Columbina.s2.p8),
            },
            {
                unit: 'sec',
                table: new StatTable('columbina_gravity_ripple_duration', charTalentTables.Columbina.s2.p9),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Columbina.s2.p10),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Columbina.s3_id,
        title: 'talent_name.columbina_moonlit_melancholy',
        description: 'talent_descr.columbina_moonlit_melancholy',
        items: [
            {
                unit: 'hp',
                table: new StatTable('skill_dmg', charTalentTables.Columbina.s3.p1),
            },
            {
                table: new StatTable('columbina_lunar_reaction_dmg_bonus', charTalentTables.Columbina.s3.p2),
            },
            {
                unit: 'unit',
                table: new StatTable('columbina_lunar_domain_duration', charTalentTables.Columbina.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Columbina.s3.p4),
            },
            {
                unit: 'unit',
                table: new StatTable('energy_cost', charTalentTables.Columbina.s3.p5),
            },
        ],
    },
    links: charTalentTables.Columbina.links,
});

const lunarchargedPost = new PostEffectStats({
    from: 'hp*',
    percent: new StatTable('lunarcharged_multi', [charTalentTables.Columbina.passsive[2][0] / 10]),
    statCap: new ValueTable([charTalentTables.Columbina.passsive[2][1] * 100]),
});

export const Columbina = new DbObjectChar({
    name: 'columbina',
    serializeId: 115,
    gameId: charTalentTables.Columbina.char_id,
    iconClass: 'char-icon-columbina',
    rarity: 5,
    element: 'hydro',
    weapon: charTalentTables.Columbina.char_weapon,
    originList: ['nodkrai', 'lunar'],
    talents: Talents,
    statTable: charTables.Columbina,
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
        new FeatureDamageCharged({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureReactionLunarBloomLike({
            element: 'dendro',
            category: 'attack',
            hits: 3,
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.columbina_moondew_cleanse_dmg'),
                }),
            ],
        }),
        new FeatureReactionLunarBloomLike({
            element: 'dendro',
            category: 'attack',
            name: 'columbina_moondew_cleanse_dmg_1',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.columbina_moondew_cleanse_dmg'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
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
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.columbina_continuous_dmg'),
                }),
            ],
        }),
        new FeatureReactionLunarChargedLike({
            element: 'electro',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.columbina_lunar_charged_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'constellation4',
                    values: new ValueTable([charTalentTables.Columbina.cons[3][1] * 100]),
                    condition: new ConditionAnd([
                        new ConditionBooleanValue({
                            setting: 'columbina_cloudveiled_ridges_in_floral_mists',
                            cond: 'eq',
                            value: 1
                        }),
                        new ConditionConstellation({ constellation: 4 }),
                    ]),
                }),
            ],
        }),
        new FeatureReactionLunarBloomLike({
            element: 'dendro',
            category: 'skill',
            hits: 5,
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.columbina_lunar_bloom_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'constellation4',
                    values: new ValueTable([charTalentTables.Columbina.cons[3][2] * 100]),
                    condition: new ConditionAnd([
                        new ConditionBooleanValue({
                            setting: 'columbina_cloudveiled_ridges_in_floral_mists',
                            cond: 'eq',
                            value: 2
                        }),
                        new ConditionConstellation({ constellation: 4 }),
                    ]),
                }),
            ],
        }),
        new FeatureReactionLunarBloomLike({
            element: 'dendro',
            category: 'skill',
            name: 'columbina_lunar_bloom_dmg_1',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.columbina_lunar_bloom_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'constellation4',
                    values: new ValueTable([charTalentTables.Columbina.cons[3][2] * 100]),
                    condition: new ConditionAnd([
                        new ConditionBooleanValue({
                            setting: 'columbina_cloudveiled_ridges_in_floral_mists',
                            cond: 'eq',
                            value: 2
                        }),
                        new ConditionConstellation({ constellation: 4 }),
                    ]),
                }),
            ],
        }),
        new FeatureReactionLunarCrystallizeLike({
            element: 'geo',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.columbina_lunar_crystallize_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'constellation4',
                    values: new ValueTable([charTalentTables.Columbina.cons[3][3] * 100]),
                    condition: new ConditionAnd([
                        new ConditionBooleanValue({
                            setting: 'columbina_cloudveiled_ridges_in_floral_mists',
                            cond: 'eq',
                            value: 3
                        }),
                        new ConditionConstellation({ constellation: 4 }),
                    ]),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.skill_dmg'),
                }),
            ],
        }),
        new FeatureShield({
            element: 'hydro',
            name: 'columbina_rainsea_shield',
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'columbina_gravity_interference', }),
                new ConditionConstellation({ constellation: 1 }),
            ]),
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'constellation1',
                    values: new ValueTable([charTalentTables.Columbina.cons[0][3] * 100]),
                }),
            ],
        }),
        //new FeaturePostEffectValue({
        //    category: 'other',
        //    fullname: 'burst.columbina_lunar_reaction_dmg_bonus',
        //    postEffect: new PostEffectStats({
        //        levelSetting: 'char_skill_burst',
        //        percent: Talents.get('burst.columbina_lunar_reaction_dmg_bonus'),
        //    })
        //}),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'lunar_base_bonus',
            postEffect: lunarchargedPost,
            format: 'percent',
        }),
    ],
    conditions: [
        new ConditionMoonPhaseSetting(),
        new ConditionBoolean({
            name: 'columbina_gravity_interference',
            title: 'talent_name.columbina_gravity_interference',
            serializeId: 6,
        }),
        new ConditionStacks({
            name: 'columbina_lunacys_lure',
            serializeId: 1,
            title: 'talent_name.columbina_lunacys_lure',
            description: 'talent_descr.columbina_lunacys_lure',
            info: { ascension: 1 },
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'columbina_gravity_interference', }),
                new ConditionAscensionChar({ ascension: 1 }),
            ]),
            maxStacks: 3,
            stats: [
                new StatTable('crit_rate', [charTalentTables.Columbina.passsive[0][0]], 100),
            ],
        }),
        new ConditionStatic({
            name: 'columbina_law_of_the_new_moon',
            title: 'talent_name.columbina_law_of_the_new_moon',
            description: 'talent_descr.columbina_law_of_the_new_moon',
            info: {ascension: 4},
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
        new ConditionStatic({
            title: 'talent_name.columbina_moonlight_lent_unto_you',
            description: 'talent_descr.columbina_moonlight_lent_unto_you',
            settings: {
                allowed_lunarcharged: 1,
                allowed_lunarcrystallize: 1,
                allowed_lunarbloom: 1,
            },
            stats: {
                text_percent: charTalentTables.Columbina.passsive[2][0] * 100,
                text_percent_max: charTalentTables.Columbina.passsive[2][1] * 100,
            },
        }),
        new ConditionBooleanLevels({
            name: 'columbina_moonlit_melancholy',
            serializeId: 2,
            title: 'talent_name.columbina_moonlit_melancholy',
            description: 'talent_descr.columbina_lunar_bonus',
            levelSetting: 'char_skill_burst',
            stats: [
                Talents.getAlias('burst.columbina_lunar_reaction_dmg_bonus', 'dmg_reaction_lunar')
            ],
        }),
    ],
    multipliers: [
    ],
    postEffects: [
        lunarchargedPost,
        new PostEffectStats({
            from: 'hp*',
            percent: new StatTable('lunarbloom_multi', [charTalentTables.Columbina.passsive[2][0] / 10]),
            statCap: new ValueTable([charTalentTables.Columbina.passsive[2][1] * 100]),
        }),
        new PostEffectStats({
            from: 'hp*',
            percent: new StatTable('lunarcrystallize_multi', [charTalentTables.Columbina.passsive[2][0] / 10]),
            statCap: new ValueTable([charTalentTables.Columbina.passsive[2][1] * 100]),
        }),
        new PostEffectStats({
            from: 'hp*',
            percent: new StatTable('atk', [charTalentTables.Columbina.cons[1][3]]),
            condition: new ConditionAnd([
                new ConditionBooleanValue({
                    setting: 'columbina_not_in_lone_splendor',
                    cond: 'eq',
                    value: 1
                }),
                new ConditionBoolean({ name: 'columbina_gravity_interference' }),
            ]),
        }),
        new PostEffectStats({
            from: 'hp*',
            percent: new StatTable('mastery', [charTalentTables.Columbina.cons[1][4]]),
            condition: new ConditionAnd([
                new ConditionBooleanValue({
                    setting: 'columbina_not_in_lone_splendor',
                    cond: 'eq',
                    value: 2
                }),
                new ConditionBoolean({ name: 'columbina_gravity_interference' }),
            ]),
        }),
        new PostEffectStats({
            from: 'hp*',
            percent: new StatTable('def', [charTalentTables.Columbina.cons[1][5]]),
            condition: new ConditionAnd([
                new ConditionBooleanValue({
                    setting: 'columbina_not_in_lone_splendor',
                    cond: 'eq',
                    value: 3
                }),
                new ConditionBoolean({ name: 'columbina_gravity_interference' }),
            ]),
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    name: 'columbina_radiance_over_blossoms_and_peaks',
                    title: 'talent_name.columbina_radiance_over_blossoms_and_peaks',
                    description: 'talent_descr.columbina_radiance_over_blossoms_and_peaks_1',
                    stats: {
                        dmg_reaction_lunar_bonus: charTalentTables.Columbina.cons[0][6] * 100,
                    },
                }),
                new ConditionStatic({
                    name: 'columbina_radiance_over_blossoms_and_peaks',
                    title: 'talent_name.columbina_radiance_over_blossoms_and_peaks',
                    description: 'talent_descr.columbina_radiance_over_blossoms_and_peaks_2',
                    stats: {
                        text_hp_percent: charTalentTables.Columbina.cons[0][3] * 100,
                    },
                    condition: new ConditionAnd([
                        new ConditionBoolean({ name: 'columbina_gravity_interference', }),
                        new ConditionMoonPhaseCheck({ moonphase: 2 }),
                    ]),
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.columbina_not_in_lone_splendor',
                    description: 'talent_descr.columbina_not_in_lone_splendor_1',
                    stats: {
                        dmg_reaction_lunar_bonus: charTalentTables.Columbina.cons[1][6] * 100,
                    },
                }),
                new ConditionStatic({
                    title: 'talent_name.columbina_not_in_lone_splendor',
                    description: 'talent_descr.columbina_not_in_lone_splendor_2',
                    stats: {
                        hp_percent: charTalentTables.Columbina.cons[1][1] * 100,
                    },
                    condition: new ConditionBoolean({ name: 'columbina_gravity_interference', }),
                }),
                new ConditionGroup({
                    name: 'columbina_not_in_lone_splendor',
                    group: 1,
                    title: 'talent_name.columbina_not_in_lone_splendor',
                    description: 'talent_descr.columbina_not_in_lone_splendor_3',
                    serializeId: 3,
                    stats: {
                        text_atk_percent: charTalentTables.Columbina.cons[1][3] * 100,
                    },
                    condition: new ConditionAnd([
                        new ConditionMoonPhaseCheck({ moonphase: 2 }),
                        new ConditionBoolean({ name: 'columbina_gravity_interference' }),
                    ]),
                }),
                new ConditionGroup({
                    name: 'columbina_not_in_lone_splendor',
                    group: 2,
                    title: 'talent_name.columbina_not_in_lone_splendor',
                    description: 'talent_descr.columbina_not_in_lone_splendor_4',
                    serializeId: 7,
                    stats: {
                        text_mastery_percent: charTalentTables.Columbina.cons[1][4] * 100,
                    },
                    condition: new ConditionAnd([
                        new ConditionMoonPhaseCheck({ moonphase: 2 }),
                        new ConditionBoolean({ name: 'columbina_gravity_interference' }),
                    ]),
                }),
                new ConditionGroup({
                    name: 'columbina_not_in_lone_splendor',
                    group: 3,
                    title: 'talent_name.columbina_not_in_lone_splendor',
                    description: 'talent_descr.columbina_not_in_lone_splendor_5',
                    serializeId: 8,
                    stats: {
                        text_def_percent: charTalentTables.Columbina.cons[1][5] * 100,
                    },
                    condition: new ConditionAnd([
                        new ConditionMoonPhaseCheck({ moonphase: 2 }),
                        new ConditionBoolean({ name: 'columbina_gravity_interference' }),
                    ]),
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.columbina_dreamlike_glow_across_tranquil_waters',
                    description: 'talent_descr.columbina_dreamlike_glow_across_tranquil_waters',
                    settings: {
                        char_skill_elemental_bonus: 3,
                    },
                    stats: {
                        dmg_reaction_lunar_bonus: charTalentTables.Columbina.cons[2][0] * 100,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.columbina_cloudveiled_ridges_in_floral_mists',
                    description: 'talent_descr.columbina_cloudveiled_ridges_in_floral_mists_2',
                    stats: {
                        dmg_reaction_lunar_bonus: charTalentTables.Columbina.cons[3][5] * 100,
                    },
                }),
                new ConditionDropdown({
                    name: 'columbina_cloudveiled_ridges_in_floral_mists',
                    serializeId: 4,
                    title: 'talent_name.columbina_cloudveiled_ridges_in_floral_mists',
                    description: 'talent_descr.columbina_cloudveiled_ridges_in_floral_mists_1',
                    dropdownClass: 'medium-text',
                    values: [
                        {
                            title_str: 'feature_reaction.lunarcharged', value: 1, serializeId: 1, title_params: {},
                        },
                        {
                            title_str: 'feature_reaction.lunarbloom', value: 2, serializeId: 2, title_params: {},
                        },
                        {
                            title_str: 'feature_reaction.lunarcrystallize', value: 3, serializeId: 3, title_params: {},
                        },
                    ],
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.columbina_silence_tending_one_lone_song',
                    description: 'talent_descr.columbina_silence_tending_one_lone_song',
                    settings: {
                        char_skill_burst_bonus: 3,
                    },
                    stats: {
                        dmg_reaction_lunar_bonus: charTalentTables.Columbina.cons[4][0] * 100,
                    }
                }),
            ],
        },
        {
            conditions: [
                new ConditionDropdownElement({
                    name: 'columbina_through_darkness_led_by_moonlight_elements',
                    multiple: true,
                    hideEmpty: true,
                    serializeId: 5,
                    dropdownClass: 'small select-element-multiple',
                    title: 'talent_name.columbina_through_darkness_led_by_moonlight',
                    description: 'talent_descr.columbina_through_darkness_led_by_moonlight_1',
                    values: [
                        {
                            value: 'geo',
                            serializeId: 1,
                            conditions: [
                                new Condition({
                                    stats: { crit_dmg_geo: 80, }
                                })
                            ],
                        },
                        {
                            value: 'electro',
                            serializeId: 2,
                            conditions: [
                                new Condition({
                                    stats: { crit_dmg_electro: 80, }
                                })
                            ],
                        },
                        {
                            value: 'dendro',
                            serializeId: 3,
                            conditions: [
                                new Condition({
                                    stats: { crit_dmg_dendro: 80, }
                                })
                            ],
                        },
                    ],
                }),
                new Condition({
                    stats: {
                        crit_dmg_hydro: 80,
                    },
                    condition: new ConditionOr([
                        new ConditionBooleanDropdownValue({ name: 'columbina_through_darkness_led_by_moonlight_elements', value: 'geo' }),
                        new ConditionBooleanDropdownValue({ name: 'columbina_through_darkness_led_by_moonlight_elements', value: 'electro' }),
                        new ConditionBooleanDropdownValue({ name: 'columbina_through_darkness_led_by_moonlight_elements', value: 'dendro' }),
                    ]),
                }),
                new ConditionStatic({
                    title: 'talent_name.columbina_through_darkness_led_by_moonlight',
                    description: 'talent_descr.columbina_through_darkness_led_by_moonlight_2',
                    stats: {
                        dmg_reaction_lunar_bonus: charTalentTables.Columbina.cons[5][2] * 100,
                    }
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            settings: ['char_skill_burst', ],
            stats: ['hp_total', ],
        },
        postEffects: [
            new PostEffectStats({
                from: 'colombina_hp_total',
                percent: new StatTable('lunarcharged_multi', [charTalentTables.Columbina.passsive[2][0] / 10]),
                statCap: new ValueTable([charTalentTables.Columbina.passsive[2][1] * 100]),
            }),
            new PostEffectStats({
                from: 'colombina_hp_total',
                percent: new StatTable('lunarbloom_multi', [charTalentTables.Columbina.passsive[2][0] / 10]),
                statCap: new ValueTable([charTalentTables.Columbina.passsive[2][1] * 100]),
            }),
            new PostEffectStats({
                from: 'colombina_hp_total',
                percent: new StatTable('lunarcrystallize_multi', [charTalentTables.Columbina.passsive[2][0] / 10]),
                statCap: new ValueTable([charTalentTables.Columbina.passsive[2][1] * 100]),
            }),
            new PostEffectStats({
                from: 'colombina_hp_total',
                percent: new StatTable('atk', [charTalentTables.Columbina.cons[1][3]]),
                condition: new ConditionAnd([
                    new ConditionBooleanValue({
                        setting: 'party.columbina_not_in_lone_splendor',
                        cond: 'eq',
                        value: 1
                    }),
                    new ConditionBoolean({ name: 'party.columbina_gravity_interference' }),
                    new ConditionBoolean({ name: 'party.columbina_constellation_2' }),
                ]),
            }),
            new PostEffectStats({
                from: 'colombina_hp_total',
                percent: new StatTable('mastery', [charTalentTables.Columbina.cons[1][4]]),
                condition: new ConditionAnd([
                    new ConditionBooleanValue({
                        setting: 'party.columbina_not_in_lone_splendor',
                        cond: 'eq',
                        value: 2
                    }),
                    new ConditionBoolean({ name: 'party.columbina_gravity_interference' }),
                    new ConditionBoolean({ name: 'party.columbina_constellation_2' }),
                ]),
            }),
            new PostEffectStats({
                from: 'colombina_hp_total',
                percent: new StatTable('def', [charTalentTables.Columbina.cons[1][5]]),
                condition: new ConditionAnd([
                    new ConditionBooleanValue({
                        setting: 'party.columbina_not_in_lone_splendor',
                        cond: 'eq',
                        value: 3
                    }),
                    new ConditionBoolean({ name: 'party.columbina_gravity_interference' }),
                    new ConditionBoolean({ name: 'party.columbina_constellation_2' }),
                ]),
            }),
        ],
        conditions: [
            new ConditionMoonPhaseSetting(),
            new ConditionNumber({
                name: 'colombina_hp_total',
                title: 'talent_name.stats_total_hp',
                partyStat: 'hp_total',
                serializeId: 9,
                rotation: 'party',
                max: CHARACTER_MAX_POSSIBLE_HP,
                class: "gi-inputs-5digit",
            }),
            new ConditionStatic({
                title: 'talent_name.columbina_moonlight_lent_unto_you',
                description: 'talent_descr.columbina_moonlight_lent_unto_you',
                settings: {
                    allowed_lunarcharged: 1,
                    allowed_lunarcrystallize: 1,
                    allowed_lunarbloom: 1,
                },
                stats: {
                    text_percent: charTalentTables.Columbina.passsive[2][0] * 100,
                    text_percent_max: charTalentTables.Columbina.passsive[2][1] * 100,
                },
            }),
            new ConditionNumberTalent({
                name: 'columbina_char_skill_burst',
                title: 'talent_name.stats_level_burst',
                partySetting: 'char_skill_burst',
                serializeId: 1,
            }),
            new ConditionBoolean({
                name: 'party.columbina_gravity_interference',
                title: 'talent_name.columbina_gravity_interference',
                serializeId: 12,
                rotation: 'party',
            }),
            new ConditionBooleanLevels({
                name: 'party.columbina_moonlit_melancholy',
                serializeId: 2,
                title: 'talent_name.columbina_moonlit_melancholy',
                description: 'talent_descr.columbina_lunar_bonus',
                levelSetting: 'columbina_char_skill_burst',
                stats: [
                    Talents.getAlias('burst.columbina_lunar_reaction_dmg_bonus', 'dmg_reaction_lunar')
                ],
            }),
            new ConditionBoolean({
                name: 'party.columbina_constellation_1',
                serializeId: 3,
                title: 'talent_name.columbina_radiance_over_blossoms_and_peaks',
                description: 'talent_descr.columbina_radiance_over_blossoms_and_peaks_3',
                info: {
                    constellation: 1,
                },
                stats: {
                    dmg_reaction_lunar_bonus: charTalentTables.Columbina.cons[0][6] * 100,
                },
            }),
            new ConditionBoolean({
                name: 'party.columbina_constellation_2',
                serializeId: 4,
                title: 'talent_name.columbina_not_in_lone_splendor',
                description: 'talent_descr.columbina_not_in_lone_splendor_6',
                info: {
                    constellation: 2,
                },
                stats: {
                    dmg_reaction_lunar_bonus: charTalentTables.Columbina.cons[1][6] * 100,
                },
            }),
            new ConditionGroup({
                name: 'party.columbina_not_in_lone_splendor',
                group: 1,
                serializeId: 10,
                rotation: 'party',
                title: 'talent_name.columbina_not_in_lone_splendor',
                description: 'talent_descr.columbina_not_in_lone_splendor_3',
                info: {
                    constellation: 2,
                },
                stats: {
                    text_atk_percent: charTalentTables.Columbina.cons[1][3] * 100,
                },
                condition: new ConditionAnd([
                    new ConditionMoonPhaseCheck({ moonphase: 2 }),
                    new ConditionBoolean({ name: 'party.columbina_constellation_2' }),
                    new ConditionBoolean({ name: 'party.columbina_gravity_interference' }),
                ]),
            }),
            new ConditionGroup({
                name: 'party.columbina_not_in_lone_splendor',
                group: 2,
                serializeId: 13,
                rotation: 'party',
                title: 'talent_name.columbina_not_in_lone_splendor',
                description: 'talent_descr.columbina_not_in_lone_splendor_4',
                info: {
                    constellation: 2,
                },
                stats: {
                    text_mastery_percent: charTalentTables.Columbina.cons[1][4] * 100,
                },
                condition: new ConditionAnd([
                    new ConditionMoonPhaseCheck({ moonphase: 2 }),
                    new ConditionBoolean({ name: 'party.columbina_constellation_2' }),
                    new ConditionBoolean({ name: 'party.columbina_gravity_interference' }),
                ]),
            }),
            new ConditionGroup({
                name: 'party.columbina_not_in_lone_splendor',
                group: 3,
                serializeId: 14,
                rotation: 'party',
                title: 'talent_name.columbina_not_in_lone_splendor',
                description: 'talent_descr.columbina_not_in_lone_splendor_5',
                info: {
                    constellation: 2,
                },
                stats: {
                    text_def_percent: charTalentTables.Columbina.cons[1][5] * 100,
                },
                condition: new ConditionAnd([
                    new ConditionMoonPhaseCheck({ moonphase: 2 }),
                    new ConditionBoolean({ name: 'party.columbina_constellation_2' }),
                    new ConditionBoolean({ name: 'party.columbina_gravity_interference' }),
                ]),
            }),
            new ConditionBoolean({
                name: 'party.columbina_constellation_3',
                serializeId: 5,
                title: 'talent_name.columbina_dreamlike_glow_across_tranquil_waters',
                description: 'talent_descr.columbina_dreamlike_glow_across_tranquil_waters',
                info: {
                    constellation: 3,
                },
                stats: {
                    dmg_reaction_lunar_bonus: charTalentTables.Columbina.cons[2][0] * 100,
                },
            }),
            new ConditionBoolean({
                name: 'party.columbina_constellation_4',
                serializeId: 6,
                title: 'talent_name.columbina_cloudveiled_ridges_in_floral_mists',
                description: 'talent_descr.columbina_cloudveiled_ridges_in_floral_mists_2',
                info: {
                    constellation: 4,
                },
                stats: {
                    dmg_reaction_lunar_bonus: charTalentTables.Columbina.cons[3][5] * 100,
                },
            }),
            new ConditionBoolean({
                name: 'party.columbina_constellation_5',
                serializeId: 7,
                title: 'talent_name.columbina_silence_tending_one_lone_song',
                description: 'talent_descr.char_constellation_burst;talent_descr.columbina_silence_tending_one_lone_song',
                info: {
                    constellation: 5,
                },
                settings: {
                    columbina_char_skill_burst_bonus: 3,
                },
                stats: {
                    dmg_reaction_lunar_bonus: charTalentTables.Columbina.cons[4][0] * 100,
                }
            }),
            new ConditionBoolean({
                name: 'party.columbina_constellation_6',
                serializeId: 8,
                title: 'talent_name.columbina_through_darkness_led_by_moonlight',
                description: 'talent_descr.columbina_through_darkness_led_by_moonlight_2',
                info: {
                    constellation: 6,
                },
                stats: {
                    dmg_reaction_lunar_bonus: charTalentTables.Columbina.cons[5][2] * 100,
                },
            }),
            new ConditionDropdownElement({
                name: 'party.columbina_through_darkness_led_by_moonlight_elements',
                multiple: true,
                hideEmpty: true,
                dropdownClass: 'small select-element-multiple',
                serializeId: 11,
                title: 'talent_name.columbina_through_darkness_led_by_moonlight',
                description: 'talent_descr.columbina_through_darkness_led_by_moonlight_1',
                values: [
                    {
                        value: 'geo',
                        serializeId: 1,
                        conditions: [
                            new Condition({
                                stats: { crit_dmg_geo: 80, }
                            })
                        ],
                    },
                    {
                        value: 'electro',
                        serializeId: 2,
                        conditions: [
                            new Condition({
                                stats: { crit_dmg_electro: 80, }
                            })
                        ],
                    },
                    {
                        value: 'dendro',
                        serializeId: 3,
                        conditions: [
                            new Condition({
                                stats: { crit_dmg_dendro: 80, }
                            })
                        ],
                    },
                ],
                condition: new ConditionBoolean({ name: 'party.columbina_constellation_6' }),
            }),
            new Condition({
                stats: {
                    crit_dmg_hydro: 80,
                },
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'party.columbina_constellation_6' }),
                    new ConditionOr([
                        new ConditionBooleanDropdownValue({ name: 'party.columbina_through_darkness_led_by_moonlight_elements', value: 'geo' }),
                        new ConditionBooleanDropdownValue({ name: 'party.columbina_through_darkness_led_by_moonlight_elements', value: 'electro' }),
                        new ConditionBooleanDropdownValue({ name: 'party.columbina_through_darkness_led_by_moonlight_elements', value: 'dendro' }),
                    ]),
                ]),
            }),
        ]
    }
});
