import { Condition, ConditionAnd } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { CalcElementsVesna } from "../../classes/Condition/CalcElementsVesna";
import { ConditionNumber } from "../../classes/Condition/Number";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { FeatureReactionStellarSwirlLike } from "../../classes/Feature2/Reaction/Extended/Stellar/SwirlLike";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";
import { stellarSwirlCondition } from "./Sandrone";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Vesna.s1_id,
        title: 'talent_name.vesna_vila_blade_dance',
        description: 'talent_descr.vesna_vila_blade_dance',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Vesna.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Vesna.s1.p2),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_3', charTalentTables.Vesna.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Vesna.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Vesna.s1.p5),
            },
            {
                table: new StatTable('normal_hit_6', charTalentTables.Vesna.s1.p6),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Vesna.s1.p7),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Vesna.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Vesna.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Vesna.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Vesna.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Vesna.s2_id,
        title: 'talent_name.vesna_the_art_of_victory_1',
        description: 'talent_descr.vesna_the_art_of_victory',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Vesna.s2.p1),
            },
            {
                table: new StatTable('vesna_windborne_sword_lv_1_dmg', charTalentTables.Vesna.s2.p2),
            },
            {
                table: new StatTable('vesna_windborne_sword_lv_2_dmg', charTalentTables.Vesna.s2.p3),
            },
            {
                table: new StatTable('vesna_windborne_sword_lv_2_spirit_blade_dmg', charTalentTables.Vesna.s2.p4),
            },
            {
                type: 'multihit',
                hits: 4,
                table: new StatTable('vesna_windborne_sword_lv_3_spirit_blade_dmg', charTalentTables.Vesna.s2.p6),
            },
            {
                table: new StatTable('vesna_windborne_sword_lv_3_spirit_blade_final_hit_dmg', charTalentTables.Vesna.s2.p8),
            },
            {
                table: new StatTable('vesna_windborne_sword_lv_2_spirit_blade_stellar_swirl_dmg', charTalentTables.Vesna.s2.p5),
            },
            {
                type: 'multihit',
                hits: 4,
                table: new StatTable('vesna_windborne_sword_lv_3_spirit_blade_stellar_swirl_dmg', charTalentTables.Vesna.s2.p7),
            },
            {
                table: new StatTable('vesna_windborne_sword_lv_3_spirit_blade_final_hit_stellar_swirl_dmg', charTalentTables.Vesna.s2.p9),
            },
            {
                table: new StatTable('vesna_wind_pinion_dmg', charTalentTables.Vesna.s2.p10),
            },
            {
                unit: 'sec',
                table: new StatTable('vesna_armed_for_action_duration', charTalentTables.Vesna.s2.p12),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Vesna.s2.p14),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Vesna.s3_id,
        title: 'talent_name.vesna_for_the_tsaritsa',
        description: 'talent_descr.vesna_for_the_tsaritsa',
        items: [
            {
                table: new StatTable('vesna_spirit_blade_dmg', charTalentTables.Vesna.s3.p1),
            },
            {
                table: new StatTable('vesna_spirit_blade_stellar_swirl_dmg', charTalentTables.Vesna.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Vesna.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Vesna.s3.p4),
            },
        ],
    },
    links: charTalentTables.Vesna.links,
});

const stellarSwirlPost = new PostEffectStats({
    from: 'atk*',
    percent: new StatTable('stellar_swirl_multi', [charTalentTables.Vesna.passsive[2][0]]),
    statCap: new ValueTable([charTalentTables.Vesna.passsive[2][1] * 100]),
});

export const Vesna = new DbObjectChar({
    name: 'vesna',
    serializeId: 127,
    gameId: charTalentTables.Vesna.char_id,
    iconClass: 'char-icon-vesna',
    rarity: 5,
    element: 'anemo',
    weapon: charTalentTables.Vesna.char_weapon,
    origin: 'snezhnaya',
    talents: Talents,
    statTable: charTables.Vesna,
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
            allowInfusion: true,
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
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_6'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.vesna_windborne_sword_lv_1_dmg'),
                    scalingSource: 'ascension1',
                    scalingMultiplier: 'vesna_disciplinary_action_percent',
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.vesna_windborne_sword_lv_2_dmg'),
                    scalingSource: 'ascension1',
                    scalingMultiplier: 'vesna_disciplinary_action_percent',
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.vesna_windborne_sword_lv_2_spirit_blade_dmg'),
                    scalingSource: 'ascension1',
                    scalingMultiplier: 'vesna_disciplinary_action_percent',
                }),
            ],
            condition: new ConditionBoolean({ name: 'common.radiance_stellar_swirl', invert: 1 }),
        }),
        new FeatureDamageMultihit({
            element: 'anemo',
            category: 'skill',
            damageType: 'skill',
            name: 'vesna_windborne_sword_lv_3_spirit_blade_dmg',
            items: [
                {
                    hits: 4,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.vesna_windborne_sword_lv_3_spirit_blade_dmg'),
                            scalingSource: 'ascension1',
                            scalingMultiplier: 'vesna_disciplinary_action_percent',
                        }),
                    ],
                },
            ],
            condition: new ConditionBoolean({ name: 'common.radiance_stellar_swirl', invert: 1 }),
        }),
        new FeatureDamageSkill({
            element: 'anemo',
            hits: 4,
            isChild: true,
            name: 'vesna_windborne_sword_lv_3_spirit_blade_dmg_1',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.vesna_windborne_sword_lv_3_spirit_blade_dmg'),
                    scalingSource: 'ascension1',
                    scalingMultiplier: 'vesna_disciplinary_action_percent',
                }),
            ],
            condition: new ConditionBoolean({ name: 'common.radiance_stellar_swirl', invert: 1 }),
        }),
        new FeatureDamageSkill({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.vesna_windborne_sword_lv_3_spirit_blade_final_hit_dmg'),
                    scalingSource: 'ascension1',
                    scalingMultiplier: 'vesna_disciplinary_action_percent',
                }),
            ],
            condition: new ConditionBoolean({ name: 'common.radiance_stellar_swirl', invert: 1 }),
        }),
        new FeatureReactionStellarSwirlLike({
            category: 'skill',
            element: 'anemo',
            name: 'vesna_windborne_sword_lv_2_spirit_blade_dmg',
            fullName: 'skill.vesna_windborne_sword_lv_2_spirit_blade_stellar_swirl_dmg',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.vesna_windborne_sword_lv_2_spirit_blade_stellar_swirl_dmg'),
                    scalingSource: 'ascension1',
                    scalingMultiplier: 'vesna_disciplinary_action_percent',
                }),
            ],
            condition: new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
        }),
        new FeatureReactionStellarSwirlLike({
            category: 'skill',
            element: 'anemo',
            hitsCount: 4,
            name: 'vesna_windborne_sword_lv_3_spirit_blade_dmg',
            fullName: 'skill.vesna_windborne_sword_lv_3_spirit_blade_stellar_swirl_dmg',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.vesna_windborne_sword_lv_3_spirit_blade_stellar_swirl_dmg'),
                    scalingSource: 'ascension1',
                    scalingMultiplier: 'vesna_disciplinary_action_percent',
                }),
            ],
            condition: new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
        }),
        new FeatureReactionStellarSwirlLike({
            category: 'skill',
            element: 'anemo',
            hits: 4,
            isChild: true,
            name: 'vesna_windborne_sword_lv_3_spirit_blade_dmg_1',
            fullName: 'skill.vesna_windborne_sword_lv_3_spirit_blade_stellar_swirl_dmg_1',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.vesna_windborne_sword_lv_3_spirit_blade_stellar_swirl_dmg'),
                    scalingSource: 'ascension1',
                    scalingMultiplier: 'vesna_disciplinary_action_percent',
                }),
            ],
            condition: new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
        }),
        new FeatureReactionStellarSwirlLike({
            category: 'skill',
            element: 'anemo',
            name: 'vesna_windborne_sword_lv_3_spirit_blade_final_hit_dmg',
            fullName: 'skill.vesna_windborne_sword_lv_3_spirit_blade_final_hit_stellar_swirl_dmg',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.vesna_windborne_sword_lv_3_spirit_blade_final_hit_stellar_swirl_dmg'),
                    scalingSource: 'ascension1',
                    scalingMultiplier: 'vesna_disciplinary_action_percent',
                }),
            ],
            condition: new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
        }),
        new FeatureDamageSkill({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.vesna_wind_pinion_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.vesna_spirit_blade_dmg'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'common.radiance_stellar_swirl', invert: 1 }),
        }),
        new FeatureReactionStellarSwirlLike({
            category: 'burst',
            element: 'anemo',
            name: 'vesna_spirit_blade_dmg',
            fullName: 'burst.vesna_spirit_blade_stellar_swirl_dmg',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.vesna_spirit_blade_stellar_swirl_dmg'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'stellar_swirl_base_bonus',
            format: 'percent',
            postEffect: stellarSwirlPost,
        }),
    ],
    conditions: [
        stellarSwirlCondition,
        new ConditionBoolean({
            name: 'vesna_armed_for_action',
            serializeId: 1,
            title: 'talent_name.vesna_the_art_of_victory_2',
            settings: {
                attack_infusion: 'anemo',
            },
        }),
        new ConditionStacks({
            name: 'vesna_rite_of_springs_procession',
            serializeId: 3,
            title: 'talent_name.vesna_rite_of_springs_procession',
            description: 'talent_descr.vesna_rite_of_springs_procession',
            maxStacks: 6,
            info: { ascension: 1 },
            stats: [
                new StatTable('vesna_disciplinary_action_percent', [10]),
            ],
            condition: new ConditionAscensionChar({ ascension: 1 }),
        }),
        new CalcElementsVesna({
            title: 'talent_name.vesna_truth_prevails',
            description: 'talent_descr.vesna_truth_prevails',
            info: { ascension: 4 },
            condition: new ConditionAnd([
                new ConditionAscensionChar({ ascension: 4 }),
                new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
            ]),
        }),
        new ConditionStatic({
            title: 'talent_name.vesna_splendid_prelude',
            description: 'talent_descr.vesna_splendid_prelude',
            settings: {
                allowed_stellar_swirl: true,
            }
        }),
    ],
    multipliers: [
    ],
    postEffects: [
        stellarSwirlPost,
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.vesna_winters_farewell_feast',
                    description: 'talent_descr.vesna_winters_farewell_feast',
                    condition: new ConditionBoolean({ name: 'vesna_armed_for_action' }),
                    stats: {
                        dmg_reaction_stellar_swirl: charTalentTables.Vesna.cons[0][1] * 100,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.vesna_kolo_of_springs_arrival',
                    description: 'talent_descr.vesna_kolo_of_springs_arrival',
                    condition: new ConditionAscensionChar({ ascension: 1 }),
                    settings: {
                        vesna_rite_of_springs_procession: 6,
                    },
                    stats: {
                        vesna_disciplinary_action_percent: charTalentTables.Vesna.cons[1][1] * 100,
                    },
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
                new CalcElementsVesna({
                    title: 'talent_name.vesna_glory_to_our_forebears',
                    description: 'talent_descr.vesna_glory_to_our_forebears',
                    multy: 2,
                    condition: new ConditionAnd([
                        new ConditionAscensionChar({ ascension: 4 }),
                        new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                    ]),
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
                    name: 'vesna_unwavering_ardor',
                    title: 'talent_name.vesna_unwavering_ardor',
                    description: 'talent_descr.vesna_unwavering_ardor',
                    stats: {
                        dmg_reaction_stellar_swirl_bonus: charTalentTables.Vesna.cons[5][3] * 100,
                    },
                }),
            ],
            features: [
                new FeatureDamageSkill({
                    element: 'anemo',
                    name: 'vesna_windborne_sword_transpose_dmg',
                    multipliers: [
                        new FeatureMultiplier({
                            source: 'constellation6',
                            values: new ValueTable([charTalentTables.Vesna.cons[5][1]], 100),
                            scalingSource: 'ascension1',
                            scalingMultiplier: 'vesna_disciplinary_action_percent',
                        }),
                    ],
                    condition: new ConditionBoolean({ name: 'common.radiance_stellar_swirl', invert: 1 }),
                }),
                new FeatureDamageSkill({
                    element: 'anemo',
                    name: 'vesna_windborne_sword_transpose_spirit_blade_dmg',
                    multipliers: [
                        new FeatureMultiplier({
                            source: 'constellation6',
                            values: new ValueTable([charTalentTables.Vesna.cons[5][2]], 100),
                            scalingSource: 'ascension1',
                            scalingMultiplier: 'vesna_disciplinary_action_percent',
                        }),
                    ],
                    condition: new ConditionBoolean({ name: 'common.radiance_stellar_swirl', invert: 1 }),
                }),
                new FeatureReactionStellarSwirlLike({
                    category: 'skill',
                    element: 'anemo',
                    name: 'vesna_windborne_sword_transpose_spirit_blade_dmg',
                    multipliers: [
                        new FeatureMultiplier({
                            source: 'constellation6',
                            values: new ValueTable([charTalentTables.Vesna.cons[5][2]], 100),
                            scalingSource: 'ascension1',
                            scalingMultiplier: 'vesna_disciplinary_action_percent',
                        }),
                    ],
                    condition: new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            stats: ['atk_total'],
        },
        conditions: [
            new ConditionNumber({
                name: 'vesna_atk_total',
                title: 'talent_name.stats_total_atk',
                partyStat: 'atk_total',
                serializeId: 1,
                max: 10000,
            }),
            new ConditionStatic({
                title: 'talent_name.vesna_splendid_prelude',
                description: 'talent_descr.vesna_splendid_prelude',
                settings: {
                    allowed_stellar_swirl: true,
                },
            }),
        ],
        postEffects: [
            new PostEffectStats({
                from: 'vesna_atk_total',
                percent: [
                    new StatTable('stellar_swirl_multi', [charTalentTables.Vesna.passsive[2][0]]),
                ],
                statCap: new ValueTable([charTalentTables.Vesna.passsive[2][1] * 100]),
            }),
        ],
    },
});
