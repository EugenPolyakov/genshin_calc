import { Condition } from "../../classes/Condition";
import { ConditionNot } from "../../classes/Condition/Not";
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
import { FeatureReactionLunarChargedLike } from "../../classes/Feature2/Reaction/Transformative/Lunar/ChargedLike";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { PostEffectStatsAtk } from "../../classes/PostEffect/Stats/Atk";
import { ConditionAnd } from "../../classes/Condition/And";


const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Flins.s1_id,
        title: 'talent_name.flins_pocztowy_demonspear',
        description: 'talent_descr.flins_pocztowy_demonspear',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Flins.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Flins.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Flins.s1.p3),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_4', charTalentTables.Flins.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Flins.s1.p5),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Flins.s1.p6),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Flins.s1.p7),
            },
            {
                table: new StatTable('plunge', charTalentTables.Flins.s1.p8),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Flins.s1.p9),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Flins.s1.p10),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Flins.s2_id,
        title: 'talent_name.flins_arcane_light',
        description: 'talent_descr.flins_arcane_light_1',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Flins.s2.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Flins.s2.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Flins.s2.p3),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_4', charTalentTables.Flins.s2.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Flins.s2.p5),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Flins.s2.p6),
            },
            {
                table: new StatTable('flins_northland_spearstorm_dmg', charTalentTables.Flins.s2.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('flins_northland_spearstorm_cd', charTalentTables.Flins.s2.p8),
            },
            {
                unit: 'sec',
                table: new StatTable('flins_manifest_flame_duration', charTalentTables.Flins.s2.p9),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Flins.s2.p10),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Flins.s3_id,
        title: 'talent_name.flins_cometh_the_night',
        description: 'talent_descr.flins_cometh_the_night',
        items: [
            {
                table: new StatTable('flins_initial_skill_dmg', charTalentTables.Flins.s3.p1),
            },
            {
                table: new StatTable('flins_middle_phase_lunar_charged_dmg', charTalentTables.Flins.s3.p2),
            },
            {
                table: new StatTable('flins_final_phase_lunar_charged_dmg', charTalentTables.Flins.s3.p3),
            },
            {
                unit: 'unit',
                table: new StatTable('energy_cost', charTalentTables.Flins.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Flins.s3.p5),
            },
            {
                table: new StatTable('flins_thunderous_symphony_dmg', charTalentTables.Flins.s3.p6),
            },
            {
                table: new StatTable('flins_thunderous_symphony_additional_dmg', charTalentTables.Flins.s3.p7),
            },
            {
                unit: 'unit',
                table: new StatTable('flins_thunderous_symphony_energy_cost', charTalentTables.Flins.s3.p8),
            },
        ],
    },
    links: [11200001, 11190007],
});

const lunarPost = new PostEffectStatsAtk({
    percent: new StatTable('lunarcharged_multi', [charTalentTables.Flins.passsive[2][0]]),
    statCap: new ValueTable([charTalentTables.Flins.passsive[2][1] * 100]),
});

export const Flins = new DbObjectChar({
    name: 'flins',
    serializeId: 110,
    gameId: charTalentTables.Flins.char_id,
    iconClass: "char-icon-flins",
    rarity: 5,
    element: 'electro',
    weapon: charTalentTables.Flins.char_weapon,
    originList: ['nodkrai', 'lunar'],
    talents: Talents,
    statTable: charTables.Flins,
    features: [
        new FeatureDamageNormal({
            name: 'normal_hit_1',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'flins_arcane_light', invert: true, }),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_2',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'flins_arcane_light', invert: true, }),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'flins_arcane_light', invert: true, }),
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_4',
            allowInfusion: true,
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_4'),
                        }),
                    ],
                },
            ],
            condition: new ConditionBoolean({ name: 'flins_arcane_light', invert: true, }),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4_1',
            isChild: true,
            hits: 2,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'flins_arcane_light', invert: true, }),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_5',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'flins_arcane_light', invert: true, }),
        }),
        new FeatureDamageCharged({
            name: 'charged_hit',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'flins_arcane_light', invert: true, }),
        }),
        new FeatureDamagePlungeCollision({
            name: 'plunge',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'flins_arcane_light', invert: true, }),
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_low',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'flins_arcane_light', invert: true, }),
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_high',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'flins_arcane_light', invert: true, }),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_1',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.normal_hit_1'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'flins_arcane_light' }),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_2',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.normal_hit_2'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'flins_arcane_light' }),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.normal_hit_3'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'flins_arcane_light' }),
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_4',
            allowInfusion: true,
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.normal_hit_4'),
                        }),
                    ],
                },
            ],
            condition: new ConditionBoolean({ name: 'flins_arcane_light' }),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4_1',
            isChild: true,
            hits: 2,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.normal_hit_4'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'flins_arcane_light' }),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_5',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.normal_hit_5'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'flins_arcane_light' }),
        }),
        new FeatureDamageCharged({
            name: 'charged_hit',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.charged_hit'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'flins_arcane_light' }),
        }),
        new FeatureDamageSkill({
            name: 'flins_northland_spearstorm_dmg',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.flins_northland_spearstorm_dmg'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'flins_arcane_light' }),
        }),
        new FeatureDamageBurst({
            name: 'flins_initial_skill_dmg',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.flins_initial_skill_dmg'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'flins_arcane_light', invert: true, }),
        }),
        new FeatureReactionLunarChargedLike({
            name: 'flins_middle_phase_lunar_charged_dmg',
            element: 'electro',
            category: 'burst',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.flins_middle_phase_lunar_charged_dmg'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'flins_arcane_light', invert: true, }),
        }),
        new FeatureReactionLunarChargedLike({
            name: 'flins_final_phase_lunar_charged_dmg',
            element: 'electro',
            category: 'burst',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.flins_final_phase_lunar_charged_dmg'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'flins_arcane_light', invert: true, }),
        }),
        new FeatureReactionLunarChargedLike({
            name: 'flins_thunderous_symphony_dmg',
            element: 'electro',
            category: 'burst',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.flins_thunderous_symphony_dmg'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'flins_arcane_light' }),
        }),
        new FeatureReactionLunarChargedLike({
            name: 'flins_thunderous_symphony_additional_dmg',
            element: 'electro',
            category: 'burst',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.flins_thunderous_symphony_additional_dmg'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'flins_arcane_light' }),
        }),
        new FeatureReactionLunarChargedLike({
            name: 'flins_addition_burst_dmg',
            element: 'electro',
            category: 'other',
            multipliers: [
                new FeatureMultiplier({
                    values: new StatTable('', [charTalentTables.Flins.cons[1][0] * 100]),
                }),
            ],
            condition: new ConditionConstellation({ constellation: 2 }),
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'lunarcharged_base_bonus',
            postEffect: lunarPost,
            format: 'percent',
        }),
    ],
    conditions: [
        new ConditionMoonPhaseSetting(),
        new ConditionBoolean({
            name: 'flins_arcane_light',
            serializeId: 1,
            title: 'talent_name.flins_arcane_light',
            description: 'talent_descr.flins_arcane_light_2',
            settings: {
                attack_infusion: 'electro',
            },
        }),
        new ConditionMoonPhaseStatic({
            title: 'talent_name.flins_symphony_of_winter',
            description: 'talent_descr.flins_symphony_of_winter',
            stats: {
                text_percent_value: charTalentTables.Flins.passsive[0][0] * 100,
            },
            realStats: {
                dmg_reaction_lunarcharged: [0, 0, charTalentTables.Flins.passsive[0][0] * 100],
            },
            info: { ascension: 1 },
            condition: new ConditionAscensionChar({ ascension: 1 }),
        }),
        new ConditionStatic({
            title: 'talent_name.flins_whispering_flame',
            description: 'talent_descr.flins_whispering_flame',
            info: {ascension: 4},
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
        new ConditionStatic({
            title: 'talent_name.flins_old_world_secrets',
            description: 'talent_descr.flins_old_world_secrets',
            settings: {
                allowed_lunarcharged: 1,
            },
        }),
    ],
    multipliers: [
    ],
    postEffects: [
        lunarPost,
        new PostEffectStatsAtk({
            percent: new StatTable('mastery', [charTalentTables.Flins.passsive[1][0]]),
            condition: new ConditionAnd([
                new ConditionAscensionChar({ ascension: 4 }),
                new ConditionConstellation({ constellation: 2, invert: true }),
            ]),
            statCap: new ValueTable([charTalentTables.Flins.passsive[1][1]]),
        }),
        new PostEffectStatsAtk({
            percent: new StatTable('mastery', [charTalentTables.Flins.cons[3][1]]),
            condition: new ConditionAnd([
                new ConditionAscensionChar({ ascension: 4 }),
                new ConditionConstellation({ constellation: 2 }),
            ]),
            statCap: new ValueTable([charTalentTables.Flins.cons[3][2]]),
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionBoolean({
                    title: 'talent_name.flins_part_the_veil_of_snow',
                    description: 'talent_descr.flins_part_the_veil_of_snow',
                })
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.flins_the_devils_wall',
                    description: 'talent_descr.flins_the_devils_wall',
                    stats: {
                        dmg_atk: charTalentTables.Flins.cons[1][0] * 100,
                        dmg_mastery: charTalentTables.Flins.cons[1][2] * 100,
                    },
                })
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
                    title: 'talent_name.flins_night_on_bald_mountain',
                    description: 'talent_descr.flins_night_on_bald_mountain',
                    stats: {
                        atk_percent: charTalentTables.Flins.cons[3][0] * 100,
                    }
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
                new ConditionStatic({
                    title: 'talent_name.flins_songs_and_dances_of_death',
                    description: 'talent_descr.flins_songs_and_dances_of_death',
                    stats: {
                        dmg_reaction_lunarcharged_bonus: charTalentTables.Flins.cons[5][0] * 100,
                    },
                }),
                new ConditionMoonPhaseBuff({
                    realStats: {
                        dmg_reaction_lunarcharged_bonus: [0, 0, charTalentTables.Flins.cons[5][1] * 100],
                    },
                    condition: new ConditionConstellation({ constellation: 6 }),
                }),
            ]
        },
    ]),
    partyData: {
        conditions: [
            new Condition({ settings: { allowed_lunarcharged: 1 } }),
            new ConditionMoonPhaseSetting(),
            new ConditionMoonPhase({
                name: 'party.flins_songs_and_dances_of_death',
                serializeId: 1,
                title: 'talent_name.flins_songs_and_dances_of_death',
                description: 'talent_descr.flins_songs_and_dances_of_death',
                info: {
                    constellation: 6,
                },
            }),
            new ConditionMoonPhaseBuff({
                realStats: {
                    dmg_reaction_lunarcharged_bonus: [0, 0, charTalentTables.Flins.cons[5][1] * 100],
                },
                condition: new ConditionBoolean({ name: 'party.flins_songs_and_dances_of_death' }),
            }),
        ],
    }
});

