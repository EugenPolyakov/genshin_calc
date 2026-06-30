import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanCharElement } from "../../classes/Condition/Boolean/CharElement";
import { ConditionBooleanValue } from "../../classes/Condition/Boolean/Value";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionMoonPhaseSetting } from "../../classes/Condition/CustomOrigin/MoonPhaseSetting";
import { ConditionMoonPhaseCheck } from "../../classes/Condition/MoonPhaseCheck";
import { ConditionNumber } from "../../classes/Condition/Number";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { FeatureReactionLunarCrystallizeLike } from "../../classes/Feature2/Reaction/Transformative/Lunar/CrystallizeLike";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Linnea.s1_id,
        title: 'talent_name.linnea_capture_protocol',
        description: 'talent_descr.linnea_capture_protocol',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Linnea.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Linnea.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Linnea.s1.p3),
            },
            {
                table: new StatTable('aimed', charTalentTables.Linnea.s1.p4),
            },
            {
                table: new StatTable('charged_aimed', charTalentTables.Linnea.s1.p5),
            },
            {
                table: new StatTable('plunge', charTalentTables.Linnea.s1.p6),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Linnea.s1.p7),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Linnea.s1.p8),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Linnea.s2_id,
        title: 'talent_name.linnea_lumis_battle_cry',
        description: 'talent_descr.linnea_lumis_battle_cry',
        items: [
            {
                type: 'multihit',
                hits: 2,
                unit: 'def',
                table: new StatTable('linnea_lumi_pound_pound_pummeler_dmg', charTalentTables.Linnea.s2.p1),
            },
            {
                unit: 'def',
                table: new StatTable('linnea_lumi_heavy_overdrive_hammer_dmg', charTalentTables.Linnea.s2.p2),
            },
            {
                unit: 'def',
                table: new StatTable('linnea_lumi_million_ton_crush_dmg', charTalentTables.Linnea.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('linnea_lumi_duration', charTalentTables.Linnea.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Linnea.s2.p5),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Linnea.s3_id,
        title: 'talent_name.linnea_survival_guide_in_extreme_conditions',
        description: 'talent_descr.linnea_survival_guide_in_extreme_conditions',
        items: [
            {
                type: 'shield',
                unit: 'def',
                table: [
                    new StatTable('linnea_initial_healing_amount', charTalentTables.Linnea.s3.p2),
                    new StatTable('', charTalentTables.Linnea.s3.p1),
                ],
            },
            {
                type: 'shield',
                unit: 'def',
                table: [
                    new StatTable('heal_dot', charTalentTables.Linnea.s3.p4),
                    new StatTable('', charTalentTables.Linnea.s3.p3),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('linnea_healing_duration', charTalentTables.Linnea.s3.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Linnea.s3.p6),
            },
            {
                unit: 'unit',
                table: new StatTable('energy_cost', charTalentTables.Linnea.s3.p7),
            },
        ],
    },
    links: charTalentTables.Linnea.links,
});

const lunarPost = new PostEffectStats({
    from: 'def*',
    percent: new StatTable('lunarcrystallize_multi', [charTalentTables.Linnea.passsive[2][0]]),
    statCap: new ValueTable([charTalentTables.Linnea.passsive[2][1] * 100]),
});

export const Linnea = new DbObjectChar({
    name: 'linnea',
    serializeId: 119,
    gameId: charTalentTables.Linnea.char_id,
    iconClass: 'char-icon-linnea',
    rarity: 5,
    element: 'geo',
    weapon: charTalentTables.Linnea.char_weapon,
    originList: ['liyue', 'lunar'],
    talents: Talents,
    statTable: charTables.Linnea,
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
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.aimed'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_aimed'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            category: 'skill',
            name: 'linnea_lumi_pound_pound_pummeler_dmg',
            damageType: 'skill',
            element: 'geo',
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.linnea_lumi_pound_pound_pummeler_dmg'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageSkill({
            element: 'geo',
            name: 'linnea_lumi_pound_pound_pummeler_dmg_1',
            isChild: true,
            hits: 2,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.linnea_lumi_pound_pound_pummeler_dmg'),
                }),
            ],
        }),
        new FeatureReactionLunarCrystallizeLike({
            element: 'geo',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.linnea_lumi_heavy_overdrive_hammer_dmg'),
                }),
            ],
        }),
        new FeatureReactionLunarCrystallizeLike({
            element: 'geo',
            category: 'skill',
            tags: ['linnea_lumi_million_ton_crush_dmg'],
            critDamageBonuses: ['crit_dmg_c2_lumi'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.linnea_lumi_million_ton_crush_dmg'),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'burst',
            multipliers: [
                new FeatureMultiplierList({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.linnea_initial_healing_amount'),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'burst',
            multipliers: [
                new FeatureMultiplierList({
                    leveling: 'char_skill_burst',
                    values: Talents.getList('burst.heal_dot'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'mastery_bonus',
            postEffect: new PostEffectStats({
                    from: 'def*',
                    percent: new StatTable('mastery', [charTalentTables.Linnea.passsive[1][0]]),
                }),
            condition: new ConditionAscensionChar({ ascension: 4 }),
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'lunarcrystallize_base_bonus',
            postEffect: lunarPost,
            format: 'percent',
        }),
    ],
    conditions: [
        new ConditionMoonPhaseSetting(),
        new ConditionBoolean({
            name: 'linnea_field_observation_notes',
            serializeId: 1,
            title: 'talent_name.linnea_field_observation_notes',
            description: 'talent_descr.linnea_field_observation_notes_1',
            info: {ascension: 1},
            condition: new ConditionAscensionChar({ ascension: 1 }),
            stats: {
                enemy_res_geo: -charTalentTables.Linnea.passsive[0][0] * 100,
            }
        }),
        new ConditionStatic({
            title: 'talent_name.linnea_field_observation_notes',
            description: 'talent_descr.linnea_field_observation_notes_2',
            info: { ascension: 1 },
            condition: new ConditionAnd([
                new ConditionAscensionChar({ ascension: 1 }),
                new ConditionMoonPhaseCheck({ moonphase: 2 }),
                new ConditionBoolean({ name: 'linnea_field_observation_notes' }),
            ]),
            stats: {
                enemy_res_geo: -charTalentTables.Linnea.passsive[0][0] * 100,
            }
        }),
        new ConditionBoolean({
            name: 'linnea_universal_naturalist_archive',
            serializeId: 2,
            title: 'talent_name.linnea_universal_naturalist_archive',
            description: 'talent_descr.linnea_universal_naturalist_archive_1',
            info: {ascension: 4},
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
        new ConditionStatic({
            title: 'talent_name.linnea_habitat_survey',
            description: 'talent_descr.linnea_habitat_survey',
            settings: {
                allowed_lunarcrystallize: 1,
            },
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'def*',
            source: 'constellation1',
            values: new ValueTable([charTalentTables.Linnea.cons[0][3]], 100),
            scalingMultiplier: 3,
            scalingMultiplierCondition: new ConditionConstellation({ constellation: 6 }),
            scalingSource: 'constellation6',
            target: new FeatureMultiplierTarget({
                isReactionFlatBonus: true,
                tagsExclude: 'linnea_lumi_million_ton_crush_dmg',
                tags: 'lunarcrystallize',
            }),
            condition: new ConditionAnd([
                new ConditionConstellation({ constellation: 1 }),
                new ConditionBooleanValue({ setting: 'linnea_provisional_classification', cond: 'ge', value: 1 }),
            ]),
        }),
        new FeatureMultiplier({
            scaling: 'def*',
            stacksLeveling: 'linnea_provisional_classification',
            source: 'constellation1',
            values: new ValueTable([charTalentTables.Linnea.cons[0][3]], 100),
            scalingMultiplier: 3,
            scalingMultiplierCondition: new ConditionConstellation({ constellation: 6 }),
            scalingSource: 'constellation6',
            target: new FeatureMultiplierTarget({
                isReactionFlatBonus: true,
                tags: 'linnea_lumi_million_ton_crush_dmg',
            }),
            condition: new ConditionAnd([
                new ConditionConstellation({ constellation: 1 }),
                new ConditionBooleanValue({ setting: 'linnea_provisional_classification', cond: 'ge', value: 1 }),
            ]),
        }),
    ],
    postEffects: [
        new PostEffectStats({
            from: 'def*',
            percent: new StatTable('mastery', [charTalentTables.Linnea.passsive[1][0]]),
            condition: new ConditionAnd([
                new ConditionAscensionChar({ ascension: 4 }),
                new ConditionBoolean({ name: 'linnea_universal_naturalist_archive' }),
            ]),
        }),
        lunarPost,
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStacks({
                    name: 'linnea_provisional_classification',
                    serializeId: 3,
                    title: 'talent_name.linnea_provisional_classification',
                    description: 'talent_descr.linnea_provisional_classification_1',
                    maxStacks: 5,
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'linnea_tidings_of_joy_and_sorrow',
                    serializeId: 4,
                    title: 'talent_name.linnea_tidings_of_joy_and_sorrow',
                    description: 'talent_descr.linnea_tidings_of_joy_and_sorrow_1',
                    stats: {
                        crit_dmg: charTalentTables.Linnea.cons[1][0] * 100,
                        crit_dmg_c2_lumi: charTalentTables.Linnea.cons[1][2] * 100,
                    },
                }),
                new ConditionStatic({
                    title: 'talent_name.linnea_tidings_of_joy_and_sorrow',
                    description: 'talent_descr.linnea_tidings_of_joy_and_sorrow_2',
                    condition: new ConditionMoonPhaseCheck({ moonphase: 2 }),
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
                    name: 'linnea_expert_instinct',
                    serializeId: 5,
                    title: 'talent_name.linnea_expert_instinct',
                    description: 'talent_descr.linnea_expert_instinct_1',
                    stats: {
                        def_percent: charTalentTables.Linnea.cons[3][1] * 100,
                    }
                }),
                new ConditionBoolean({
                    name: 'common.char_on_field',
                    serializeId: 6,
                    title: 'weapon_settings.on_field',
                    stats: {
                        def_percent: charTalentTables.Linnea.cons[3][2] * 100,
                    }
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
                    name: 'linnea_golden_beagles_dream',
                    title: 'talent_name.linnea_golden_beagles_dream',
                    description: 'talent_descr.linnea_golden_beagles_dream_1',
                }),
                new ConditionStatic({
                    name: 'linnea_golden_beagles_dream',
                    title: 'talent_name.linnea_golden_beagles_dream',
                    description: 'talent_descr.linnea_golden_beagles_dream_2',
                    stats: {
                        dmg_reaction_lunarcrystallize_bonus: charTalentTables.Linnea.cons[5][0] * 100,
                    },
                    condition: new ConditionMoonPhaseCheck({ moonphase: 2 }),
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            stats: ['def_total'],
        },
        conditions: [
            new ConditionMoonPhaseSetting(),
            new ConditionNumber({
                name: 'linnea_def_total',
                serializeId: 6,
                title: 'talent_name.stats_total_def',
                partyStat: 'def_total',
                rotation: 'party',
                max: 10000,
            }),
            new ConditionStatic({
                title: 'talent_name.linnea_habitat_survey',
                description: 'talent_descr.linnea_habitat_survey',
                settings: {
                    allowed_lunarcrystallize: 1,
                },
            }),
            new ConditionBoolean({
                name: 'party.linnea_field_observation_notes',
                serializeId: 1,
                title: 'talent_name.linnea_field_observation_notes',
                description: 'talent_descr.linnea_field_observation_notes_1',
                rotation: 'party',
                info: { ascension: 1 },
                stats: {
                    enemy_res_geo: -charTalentTables.Linnea.passsive[0][0] * 100,
                },
            }),
            new ConditionStatic({
                title: 'talent_name.linnea_field_observation_notes',
                description: 'talent_descr.linnea_field_observation_notes_2',
                info: { ascension: 1 },
                condition: new ConditionAnd([
                    new ConditionMoonPhaseCheck({ moonphase: 2 }),
                    new ConditionBoolean({ name: 'party.linnea_field_observation_notes' }),
                ]),
                stats: {
                    enemy_res_geo: -charTalentTables.Linnea.passsive[0][0] * 100,
                }
            }),
            new ConditionBoolean({
                name: 'party.linnea_universal_naturalist_archive',
                serializeId: 2,
                title: 'talent_name.linnea_universal_naturalist_archive',
                description: 'talent_descr.linnea_universal_naturalist_archive_2',
                info: { ascension: 4 },
                rotation: 'party',
            }),
            new ConditionBoolean({
                name: 'party.linnea_constellation1',
                serializeId: 3,
                title: 'talent_name.linnea_provisional_classification',
                description: 'talent_descr.linnea_provisional_classification_2',
                info: { constellation: 1 },
                rotation: 'party',
            }),
            new ConditionBoolean({
                name: 'party.linnea_tidings_of_joy_and_sorrow',
                serializeId: 4,
                title: 'talent_name.linnea_tidings_of_joy_and_sorrow',
                description: 'talent_descr.linnea_tidings_of_joy_and_sorrow_1',
                info: { constellation: 2 },
                rotation: 'party',
                stats: {
                    crit_dmg: charTalentTables.Linnea.cons[1][0] * 100,
                },
                condition: new ConditionBooleanCharElement({ element: ['hydro', 'geo'] }),
            }),
            new ConditionBoolean({
                name: 'party.linnea_expert_instinct',
                serializeId: 5,
                title: 'talent_name.linnea_expert_instinct',
                description: 'talent_descr.linnea_expert_instinct_2',
                info: { constellation: 4 },
                stats: {
                    def_percent: charTalentTables.Linnea.cons[3][1] * 100,
                },
            }),
            new ConditionBoolean({
                name: 'party.linnea_constellation6',
                title: 'talent_name.linnea_golden_beagles_dream',
                description: 'talent_descr.linnea_golden_beagles_dream_1',
                info: { constellation: 6 },
            }),
            new ConditionStatic({
                name: 'linnea_golden_beagles_dream',
                title: 'talent_name.linnea_golden_beagles_dream',
                description: 'talent_descr.linnea_golden_beagles_dream_2',
                info: { constellation: 6 },
                stats: {
                    dmg_reaction_lunarcrystallize_bonus: charTalentTables.Linnea.cons[5][0] * 100,
                },
                condition: new ConditionAnd([
                    new ConditionMoonPhaseCheck({ moonphase: 2 }),
                    new ConditionBoolean({ name: 'party.linnea_constellation6' }),
                ]),
            }),
        ],
        postEffects: [
            new PostEffectStats({
                from: 'linnea_def_total',
                percent: new StatTable('mastery', [charTalentTables.Linnea.passsive[1][0]]),
                condition: new ConditionBoolean({ name: 'party.linnea_universal_naturalist_archive' }),
            }),
            new PostEffectStats({
                from: 'linnea_def_total',
                percent: new StatTable('lunarcrystallize_multi', [charTalentTables.Linnea.passsive[2][0]]),
                statCap: new ValueTable([charTalentTables.Linnea.passsive[2][1] * 100]),
            }),
        ],
        multipliers: [
            new FeatureMultiplier({
                scaling: 'linnea_def_total',
                source: 'linnea',
                values: new ValueTable([charTalentTables.Linnea.cons[0][3]], 100),
                scalingMultiplier: 3,
                scalingMultiplierCondition: new ConditionBoolean({ name: 'party.linnea_constellation6' }),
                scalingSource: 'linnea',
                target: new FeatureMultiplierTarget({
                    isReactionFlatBonus: true,
                    tagsExclude: 'linnea_lumi_million_ton_crush_dmg',
                    tags: 'lunarcrystallize',
                }),
                condition: new ConditionBoolean({ name: 'party.linnea_constellation1' }),
            }),
        ],
    },
});
