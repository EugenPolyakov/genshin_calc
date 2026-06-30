import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionHexCheck } from "../../classes/Condition/HexCheck";
import { ConditionNumber } from "../../classes/Condition/Number";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamage } from "../../classes/Feature2/Damage";
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
import { FeatureStatic } from "../../classes/Feature2/Static";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { PostEffectStatsStatic } from "../../classes/PostEffect/Stats/Static";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Prune.s1_id,
        title: 'talent_name.prune_badaboom_hexbuster_hammer',
        description: 'talent_descr.prune_badaboom_hexbuster_hammer',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Prune.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Prune.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Prune.s1.p3),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Prune.s1.p4),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Prune.s1.p5),
            },
            {
                table: new StatTable('plunge', charTalentTables.Prune.s1.p6),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Prune.s1.p7),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Prune.s1.p8),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Prune.s2_id,
        title: 'talent_name.prune_ring_a_ding_ding_hexhunter_chime',
        description: 'talent_descr.prune_ring_a_ding_ding_hexhunter_chime',
        items: [
            {
                table: new StatTable('prune_ring_a_ding_ding_hexhunter_chime_dmg', charTalentTables.Prune.s2.p1),
            },
            {
                table: new StatTable('prune_clang_clang_witch_tribution_comes_dmg', charTalentTables.Prune.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Prune.s2.p3),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Prune.s3_id,
        title: 'talent_name.prune_the_bell_tolls_the_hunt_is_on',
        description: 'talent_descr.prune_the_bell_tolls_the_hunt_is_on',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Prune.s3.p1),
            },
            {
                table: new StatTable('prune_witchlure_bell_dmg', charTalentTables.Prune.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('prune_hunter_seeker_mode_duration', charTalentTables.Prune.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Prune.s3.p4),
            },
            {
                unit: 'unit',
                table: new StatTable('energy_cost', charTalentTables.Prune.s3.p5),
            },
        ],
    },
    links: charTalentTables.Prune.links,
});

export const Prune = new DbObjectChar({
    name: 'prune',
    serializeId: 120,
    gameId: charTalentTables.Prune.char_id,
    iconClass: 'char-icon-prune',
    rarity: 4,
    element: 'anemo',
    weapon: charTalentTables.Prune.char_weapon,
    origin: 'mondstadt',
    talents: Talents,
    statTable: charTables.Prune,
    features: [
        new FeatureDamageNormal({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'anemo',
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
                    values: Talents.get('skill.prune_ring_a_ding_ding_hexhunter_chime_dmg'),
                }),
            ],
        }),
        ...['pyro', 'hydro', 'cryo', 'electro'].map((elem) => 
            new FeatureDamageSkill({
                name: 'prune_clang_clang_witch_tribution_comes_dmg_' + elem,
                element: elem,
                multipliers: [
                    new FeatureMultiplier({
                        leveling: 'char_skill_elemental',
                        values: Talents.get('skill.prune_clang_clang_witch_tribution_comes_dmg'),
                    }),
                ],
            })
        ),
        new FeatureDamageBurst({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.prune_witchlure_bell_dmg'),
                }),
            ],
        }),
        ...['pyro', 'hydro', 'cryo', 'electro'].map((elem) =>
            new FeatureDamageBurst({
                name: 'prune_verdict_and_punishment_' + elem,
                element: elem,
                multipliers: [
                    new FeatureMultiplier({
                        leveling: 'char_skill_elemental',
                        values: new ValueTable([charTalentTables.Prune.passsive[0][0]], 100),
                    }),
                ],
                condition: new ConditionAscensionChar({ ascension: 1 }),
            })
        ),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'prune_tolling_synchronicity',
            digits: 1,
            postEffect: new PostEffectStats({
                from: 'atk*',
                percent: new StatTable('', [charTalentTables.Prune.passsive[1][0]], 100),
                exceed: charTalentTables.Prune.passsive[1][3],
                statCap: new ValueTable([charTalentTables.Prune.passsive[1][2]], 100),
            }),
            condition: new ConditionAscensionChar({ ascension: 4 }),
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'char_hex_prune',
            serializeId: 1,
            title: 'talent_name.prune_witchseekers_vow',
            description: 'talent_descr.prune_witchseekers_vow_1',
        }),
        new ConditionBoolean({
            name: 'prune_witchseekers_vow',
            serializeId: 2,
            title: 'talent_name.prune_witchseekers_vow',
            description: 'talent_descr.prune_witchseekers_vow_2',
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'char_hex_prune' }),
                new ConditionHexCheck({ hex: 2 }),
            ]),
            stats: {
                atk_percent: charTalentTables.Prune.passsive[2][0] * 100,
            },
        }),
        new ConditionStatic({
            title: 'talent_name.prune_verdict_and_punishment',
            description: 'talent_descr.prune_verdict_and_punishment',
            info: {ascension: 1},
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new ConditionStatic({
            title: 'talent_name.prune_tolling_synchronicity',
            description: 'talent_descr.prune_tolling_synchronicity',
            info: {ascension: 4},
            condition: new ConditionAscensionChar({ ascension: 4 }),
        }),
    ],
    multipliers: [
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.prune_with_a_vow_to_rescue_the_journey_begins',
                    description: 'talent_descr.prune_with_a_vow_to_rescue_the_journey_begins',
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'prune_useful_for_cleaning_messy_baggage_elemental_powers_are_indeed_flag',
                    serializeId: 3,
                    title: 'talent_name.prune_useful_for_cleaning_messy_baggage_elemental_powers_are_indeed',
                    description: 'talent_descr.prune_useful_for_cleaning_messy_baggage_elemental_powers_are_indeed_1',
                    stats: {
                        atk_percent: charTalentTables.Prune.cons[1][0] * 100,
                    }
                }),
                new ConditionStacks({
                    name: 'prune_useful_for_cleaning_messy_baggage_elemental_powers_are_indeed',
                    serializeId: 4,
                    maxStacks: 6,
                    title: 'talent_name.prune_useful_for_cleaning_messy_baggage_elemental_powers_are_indeed',
                    description: 'talent_descr.prune_useful_for_cleaning_messy_baggage_elemental_powers_are_indeed_2',
                    condition: new ConditionBoolean({ name: 'prune_useful_for_cleaning_messy_baggage_elemental_powers_are_indeed_flag' }),
                    stats: [
                        new StatTable('atk_percent', [charTalentTables.Prune.cons[1][1]], 100),
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
                    title: 'talent_name.prune_looking_back_following_the_wind_ones_shadow_still_halved',
                    description: 'talent_descr.prune_looking_back_following_the_wind_ones_shadow_still_halved',
                }),
            ],
            features: [
                ...['pyro', 'hydro', 'cryo', 'electro'].map((elem) =>
                    new FeatureDamageSkill({
                        name: 'prune_banehunter_oathhammer_' + elem,
                        element: elem,
                        multipliers: [
                            new FeatureMultiplier({
                                values: new ValueTable([charTalentTables.Prune.cons[3][0]], 100),
                            }),
                        ],
                    })
                ),
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
                    title: 'talent_name.prune_and_thats_the_story_share_it_with_your_friends',
                    description: 'talent_descr.prune_and_thats_the_story_share_it_with_your_friends_1',
                }),
                new ConditionBoolean({
                    name: 'prune_and_thats_the_story_share_it_with_your_friends',
                    serializeId: 5,
                    title: 'talent_name.prune_and_thats_the_story_share_it_with_your_friends',
                    description: 'talent_descr.prune_and_thats_the_story_share_it_with_your_friends_2',
                }),
            ],
        },
    ]),
    postEffects: [
        new PostEffectStatsStatic({
            percent: new StatTable('atk', [charTalentTables.Prune.cons[5][1]]),
            condition: new ConditionBoolean({ name: 'prune_and_thats_the_story_share_it_with_your_friends' }),
        }),
    ],
    partyData: {
        loadStats: {
            stats: ['atk_total'],
        },
        conditions: [
            new ConditionNumber({
                name: 'prune_atk_total',
                serializeId: 1,
                title: 'talent_name.stats_total_atk',
                partyStat: 'atk_total',
                rotation: 'party',
                max: 10000,
            }),
            new ConditionBoolean({
                name: 'char_hex_prune',
                serializeId: 2,
                title: 'talent_name.prune_witchseekers_vow',
                description: 'talent_descr.prune_witchseekers_vow_1',
            }),
            new ConditionBoolean({
                name: 'party.prune_witchseekers_vow',
                serializeId: 3,
                title: 'talent_name.prune_witchseekers_vow',
                description: 'talent_descr.prune_witchseekers_vow_2',
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'char_hex_prune' }),
                    new ConditionHexCheck({ hex: 2 }),
                ]),
                stats: {
                    atk_percent: charTalentTables.Prune.passsive[2][2] * 100,
                },
            }),
            new ConditionBoolean({
                name: 'party.prune_tolling_synchronicity',
                serializeId: 4,
                title: 'talent_name.prune_tolling_synchronicity',
                description: 'talent_descr.prune_tolling_synchronicity',
                info: { ascension: 4 },
            }),
            new ConditionBoolean({
                name: 'party.prune_and_thats_the_story_share_it_with_your_friends',
                serializeId: 5,
                title: 'talent_name.prune_and_thats_the_story_share_it_with_your_friends',
                description: 'talent_descr.prune_and_thats_the_story_share_it_with_your_friends_2',
                info: { constellation: 6 },
            }),
        ],
        postEffects: [
            ...['normal', 'charged', 'plunge', 'skill', 'burst'].map((dmg) =>
                new PostEffectStats({
                    from: 'prune_atk_total',
                    percent: new StatTable('dmg_' + dmg, [charTalentTables.Prune.passsive[1][0]], 100),
                    exceed: charTalentTables.Prune.passsive[1][3],
                    statCap: new ValueTable([charTalentTables.Prune.passsive[1][2]], 100),
                    condition: new ConditionBoolean({ name: 'party.prune_tolling_synchronicity' }),
                })
            ),
            new PostEffectStatsStatic({
                percent: new StatTable('atk', [charTalentTables.Prune.cons[5][1]]),
                condition: new ConditionBoolean({ name: 'party.prune_and_thats_the_story_share_it_with_your_friends' }),
            }),
        ],
    },
});
