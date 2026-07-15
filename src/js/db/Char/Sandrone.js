import { Condition, ConditionAnd } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNumber } from "../../classes/Condition/Number";
import { ConditionStacks } from "../../classes/Condition/Stacks";
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
import { FeatureMultiplierSandroneStellar } from "../../classes/Feature2/Multiplier/SandroneStellar";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { FeatureReactionStellarConduct } from "../../classes/Feature2/Reaction/Extended/StellarConduct";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Sandrone.s1_id,
        title: 'talent_name.sandrone_self_evident_proposition',
        description: 'talent_descr.sandrone_self_evident_proposition',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Sandrone.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Sandrone.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Sandrone.s1.p3),
            },
            {
                table: new StatTable('sandrone_charged_attack_sweeping_fire_dmg', charTalentTables.Sandrone.s1.p4),
            },
            {
                table: new StatTable('sandrone_charged_attack_condensed_beam_dmg', charTalentTables.Sandrone.s1.p5),
            },
            {
                table: new StatTable('sandrone_charged_attack_condensed_beam_stellar_conduct_dmg', charTalentTables.Sandrone.s1.p6),
            },
            {
                table: new StatTable('sandrone_dmg_when_in_power_overdrive', charTalentTables.Sandrone.s1.p7),
            },
            {
                table: new StatTable('plunge', charTalentTables.Sandrone.s1.p8),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Sandrone.s1.p9),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Sandrone.s1.p10),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Sandrone.s2_id,
        title: 'talent_name.sandrone_differential_analysis',
        description: 'talent_descr.sandrone_differential_analysis',
        items: [
            {
                table: new StatTable('sandrone_prism_shot_dmg', charTalentTables.Sandrone.s2.p1),
            },
            {
                table: new StatTable('sandrone_prism_shot_stellar_conduct_dmg', charTalentTables.Sandrone.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Sandrone.s2.p3),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Sandrone.s3_id,
        title: 'talent_name.sandrone_q_e_d',
        description: 'talent_descr.sandrone_q_e_d',
        items: [
            {
                table: new StatTable('sandrone_bombardment_dmg', charTalentTables.Sandrone.s3.p1),
            },
            {
                table: new StatTable('sandrone_convective_inhibition_ray_dmg', charTalentTables.Sandrone.s3.p2),
            },
            {
                table: new StatTable('sandrone_convective_inhibition_ray_stellar_conduct_dmg', charTalentTables.Sandrone.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Sandrone.s3.p4),
            },
            {
                unit: 'unit',
                table: new StatTable('energy_cost', charTalentTables.Sandrone.s3.p5),
            },
        ],
    },
    links: charTalentTables.Sandrone.links,
});

const emBuffPost = new PostEffectStats({
    from: 'atk*',
    percent: new StatTable('mastery', [charTalentTables.Sandrone.passsive[1][0]]),
    statCap: new ValueTable([charTalentTables.Sandrone.passsive[1][1]]),
    condition: new ConditionAscensionChar({ ascension: 4 }),
});

const stellarPost = new PostEffectStats({
    from: 'atk*',
    percent: new StatTable('stellar_conduct_multi', [charTalentTables.Sandrone.passsive[2][0]]),
    statCap: new ValueTable([charTalentTables.Sandrone.passsive[2][1] * 100]),
});

export const Sandrone = new DbObjectChar({
    name: 'sandrone',
    serializeId: 123,
    gameId: charTalentTables.Sandrone.char_id,
    iconClass: 'char-icon-sandrone',
    rarity: 5,
    element: 'cryo',
    weapon: charTalentTables.Sandrone.char_weapon,
    origin: 'snezhnaya',
    talents: Talents,
    statTable: charTables.Sandrone,
    features: [
        new FeatureDamageNormal({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.sandrone_charged_attack_sweeping_fire_dmg'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            element: 'cryo',
            name: 'sandrone_charged_attack_condensed_beam_dmg',
            fullName: 'attack.sandrone_charged_attack_condensed_beam_dmg',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.sandrone_charged_attack_condensed_beam_dmg'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'common.enemy_superconduct', invert: 1 }),
        }),
        new FeatureReactionStellarConduct({
            category: 'attack',
            element: 'cryo',
            name: 'sandrone_charged_attack_condensed_beam_dmg',
            fullName: 'attack.sandrone_charged_attack_condensed_beam_stellar_conduct_dmg',
            critDamageBonuses: ['crit_dmg_condensed_beam'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.sandrone_charged_attack_condensed_beam_stellar_conduct_dmg'),
                }),
            ],
            rotationAfterItems: (item, opts) => {
                if (item.count > 1 || opts.insideBlock) {
                    return [];
                }

                return [{
                    type: 'condition',
                    object: 'char',
                    static: true,
                    getSettings: (settings) => {
                        if (settings.char_constellation >= 2)
                            return {
                                sandrone_an_heiress_gazed_into_the_looking_glass: (settings.sandrone_an_heiress_gazed_into_the_looking_glass | 0) + 1,
                            };
                        else
                            return {};
                    },
                }];
            },
            condition: new ConditionBoolean({ name: 'common.enemy_superconduct' }),
        }),
        new FeatureDamageCharged({
            element: 'cryo',
            name: 'sandrone_charged_attack_enhanced_condensed_beam_dmg',
            fullName: 'attack.sandrone_charged_attack_enhanced_condensed_beam_dmg',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation6',
                    values: new ValueTable([charTalentTables.Sandrone.cons[5][0]], 100),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'common.enemy_superconduct', invert: 1 }),
                new ConditionConstellation({ constellation: 6 }),
            ]),
        }),
        new FeatureReactionStellarConduct({
            category: 'attack',
            element: 'cryo',
            name: 'sandrone_charged_attack_enhanced_condensed_beam_dmg',
            fullName: 'attack.sandrone_charged_attack_enhanced_condensed_beam_stellar_conduct_dmg',
            critDamageBonuses: ['crit_dmg_condensed_beam'],
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation6',
                    values: new ValueTable([charTalentTables.Sandrone.cons[5][1]], 100),
                }),
            ],
            rotationAfterItems: (item, opts) => {
                if (item.count > 1 || opts.insideBlock) {
                    return [];
                }

                return [{
                    type: 'condition',
                    object: 'char',
                    static: true,
                    getSettings: (settings) => {
                        if (settings.char_constellation >= 2)
                            return {
                                sandrone_an_heiress_gazed_into_the_looking_glass: (settings.sandrone_an_heiress_gazed_into_the_looking_glass | 0) + 1,
                            };
                        else
                            return {};
                    },
                }];
            },
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                new ConditionConstellation({ constellation: 6 }),
            ]),
        }),
        new FeatureDamageCharged({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.sandrone_dmg_when_in_power_overdrive'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.sandrone_prism_shot_dmg'),
                }),
            ],
        }),
        new FeatureReactionStellarConduct({
            category: 'skill',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    scalingMultiplier: 4,
                    scalingSource: 'ascension1',
                    scalingMultiplierCondition: new ConditionAnd([
                        new ConditionAscensionChar({ ascension: 1 }),
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                        new ConditionBoolean({ name: 'sandrone_eternal_speculation_engine' }),
                    ]),
                    values: Talents.get('skill.sandrone_prism_shot_stellar_conduct_dmg'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'common.enemy_superconduct' }),
        }),
        new FeatureDamageBurst({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.sandrone_bombardment_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'cryo',
            name: 'sandrone_convective_inhibition_ray_dmg',
            fullName: 'burst.sandrone_convective_inhibition_ray_dmg',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.sandrone_convective_inhibition_ray_dmg'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'common.enemy_superconduct', invert: 1 }),
        }),
        new FeatureReactionStellarConduct({
            category: 'burst',
            element: 'cryo',
            name: 'sandrone_convective_inhibition_ray_dmg',
            fullName: 'burst.sandrone_convective_inhibition_ray_stellar_conduct_dmg',
            rotationAfterItems: (item, opts) => {
                if (item.count > 1 || opts.insideBlock) {
                    return [];
                }

                return [{
                    type: 'condition',
                    object: 'char',
                    static: true,
                    getSettings: (settings) => {
                        return {
                            sandrone_refined_tactics: 0,
                        };
                    },
                }];
            },
            multipliers: [
                new FeatureMultiplierSandroneStellar({
                    leveling: 'char_skill_burst',
                    scalingSource: 'sandrone_refined_tactics',
                    values: Talents.get('burst.sandrone_convective_inhibition_ray_stellar_conduct_dmg'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'common.enemy_superconduct' }),
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'mastery_bonus',
            postEffect: emBuffPost,
            condition: new ConditionAscensionChar({ ascension: 4 }),
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'stellarconduct_base_bonus',
            format: 'percent',
            postEffect: stellarPost,
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'common.enemy_superconduct',
            serializeId: 3,
            title: 'talent_name.n11330003',
        }),
        new ConditionBoolean({
            name: 'sandrone_eternal_speculation_engine',
            serializeId: 4,
            title: 'talent_name.sandrone_eternal_speculation_engine',
            description: 'talent_descr.sandrone_eternal_speculation_engine',
            info: { ascension: 1 },
            condition: new ConditionAnd([
                new ConditionAscensionChar({ ascension: 1 }),
                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
            ]),
        }),
        new ConditionStacks({
            name: 'sandrone_refined_tactics',
            serializeId: 1,
            title: 'talent_name.sandrone_refined_tactics',
            info: { ascension: 1 },
            maxStacks: 10,
            condition: new ConditionAnd([
                new ConditionAscensionChar({ ascension: 1 }),
                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
            ]),
        }),
        new ConditionStatic({
            name: 'sandrone_a_ladys_code_of_conduct',
            title: 'talent_name.sandrone_a_ladys_code_of_conduct',
            description: 'talent_descr.sandrone_a_ladys_code_of_conduct',
            info: { ascension: 4 },
            condition: new ConditionAscensionChar({ ascension: 4 }),
        }),
        new ConditionStatic({
            name: 'sandrone_light_of_rationalisme',
            title: 'talent_name.sandrone_light_of_rationalisme',
            description: 'talent_descr.sandrone_light_of_rationalisme_1',
            settings: {
                allowed_stellar_conduct: true,
            }
        }),
    ],
    postEffects: [
        emBuffPost,
        stellarPost,
    ],
    multipliers: [
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.sandrone_morrow_after_the_golden_dusk',
                    description: 'talent_descr.sandrone_morrow_after_the_golden_dusk',
                    stats: {
                        dmg_reaction_stellar_conduct: charTalentTables.Sandrone.cons[0][0] * 100,
                    }
                }),
            ],
        },
        {
            conditions: [
                new ConditionStacks({
                    name: 'sandrone_an_heiress_gazed_into_the_looking_glass',
                    serializeId: 2,
                    title: 'talent_name.sandrone_an_heiress_gazed_into_the_looking_glass',
                    description: 'talent_descr.sandrone_an_heiress_gazed_into_the_looking_glass',
                    maxStacks: 3,
                    stats: [
                        new StatTable('crit_dmg_condensed_beam', [charTalentTables.Sandrone.cons[1][1]], 100)
                    ],
                    condition: new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                }),
                new Condition({
                    isHidden: true,
                    stats: {
                        crit_dmg_condensed_beam: charTalentTables.Sandrone.cons[1][0] * 100,
                    },
                    condition: new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                }),
            ],
        },
        {
            conditions: [
                new Condition({
                    settings: {
                        char_skill_attack_bonus: 3,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    name: 'sandrone_in_knowledge_lies_the_worlds_true_ground',
                    title: 'talent_name.sandrone_in_knowledge_lies_the_worlds_true_ground',
                    description: 'talent_descr.sandrone_in_knowledge_lies_the_worlds_true_ground',
                    features: [
                        new FeatureReactionStellarConduct({
                            category: 'other',
                            name: 'sandrone_additional_condensed_beam_dmg',
                            element: 'cryo',
                            multipliers: [
                                new FeatureMultiplier({
                                    source: 'constellation4',
                                    values: new ValueTable([charTalentTables.Sandrone.cons[3][0]], 100),
                                }),
                            ],
                        }),
                    ],
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
                    name: 'sandrone_narcissus_wakes_her_eyes_upon_the_dawn',
                    title: 'talent_name.sandrone_narcissus_wakes_her_eyes_upon_the_dawn',
                    description: 'talent_descr.sandrone_narcissus_wakes_her_eyes_upon_the_dawn',
                    stats: {
                        dmg_reaction_stellar_conduct_bonus: charTalentTables.Sandrone.cons[5][2] * 100,
                    },
                    features: [
                    ],
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
                name: 'sandrone_atk_total',
                title: 'talent_name.stats_total_atk',
                partyStat: 'atk_total',
                serializeId: 1,
                max: 10000,
            }),
            new ConditionStatic({
                name: 'sandrone_light_of_rationalisme',
                title: 'talent_name.sandrone_light_of_rationalisme',
                description: 'talent_descr.sandrone_light_of_rationalisme_2',
                settings: {
                    allowed_stellar_conduct: true,
                }
            }),
            new ConditionBoolean({
                name: 'party.sandrone_morrow_after_the_golden_dusk',
                serializeId: 2,
                title: 'talent_name.sandrone_morrow_after_the_golden_dusk',
                description: 'talent_descr.sandrone_morrow_after_the_golden_dusk',
                info: { constellation: 1 },
                stats: {
                    dmg_reaction_stellar_conduct: charTalentTables.Sandrone.cons[0][0] * 100,
                }
            }),
        ],
        postEffects: [
            new PostEffectStats({
                from: 'sandrone_atk_total',
                percent: new StatTable('stellar_conduct_multi', [charTalentTables.Sandrone.passsive[2][0]]),
                statCap: new ValueTable([charTalentTables.Sandrone.passsive[2][1] * 100]),
            }),
        ],
    },
});
