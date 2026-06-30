import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanIlluga } from "../../classes/Condition/Boolean/Illuga";
import { ConditionCalcElementsIlluga } from "../../classes/Condition/CalcElementsIlluga";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionMoonPhaseSetting } from "../../classes/Condition/CustomOrigin/MoonPhaseSetting";
import { ConditionMoonPhaseCheck } from "../../classes/Condition/MoonPhaseCheck";
import { ConditionNumber } from "../../classes/Condition/Number";
import { ConditionNumberTalent } from "../../classes/Condition/Number/Talent";
import { ConditionStatic } from "../../classes/Condition/Static";
import { ConditionStaticIlluga } from "../../classes/Condition/Static/Illuga";
import { ConditionMoonPhaseStatic } from "../../classes/Condition/Static/MoonPhase";
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
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { FeatureStatic } from "../../classes/Feature2/Static";
import { StatTable } from "../../classes/StatTable";
import { Stats } from "../../classes/Stats";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Illuga.s1_id,
        title: 'talent_name.illuga_oathkeepers_spear',
        description: 'talent_descr.illuga_oathkeepers_spear',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Illuga.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Illuga.s1.p2),
            },
            {
                type: 'hits',
                name: 'normal_hit_3',
                table: [
                    new StatTable('normal_hit_3_1', charTalentTables.Illuga.s1.p3),
                    new StatTable('normal_hit_3_2', charTalentTables.Illuga.s1.p4),
                ],
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Illuga.s1.p5),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Illuga.s1.p6),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Illuga.s1.p7),
            },
            {
                table: new StatTable('plunge', charTalentTables.Illuga.s1.p8),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Illuga.s1.p9),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Illuga.s1.p10),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Illuga.s2_id,
        title: 'talent_name.illuga_dawnbearing_songbird',
        description: 'talent_descr.illuga_dawnbearing_songbird',
        items: [
            {
                type: 'multivalue',
                separator: ' + ',
                units: [
                    'mastery',
                    'def'
                ],
                table: [
                    new StatTable('press_dmg', charTalentTables.Illuga.s2.p1),
                    new StatTable('press_dmg_2', charTalentTables.Illuga.s2.p2),
                ],
            },
            {
                type: 'multivalue',
                separator: ' + ',
                units: [
                    'mastery',
                    'def'
                ],
                table: [
                    new StatTable('hold_dmg', charTalentTables.Illuga.s2.p3),
                    new StatTable('hold_dmg_2', charTalentTables.Illuga.s2.p4),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Illuga.s2.p5),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Illuga.s3_id,
        title: 'talent_name.illuga_shadowless_reflection',
        description: 'talent_descr.illuga_shadowless_reflection',
        items: [
            {
                type: 'multivalue',
                separator: ' + ',
                units: [
                    'mastery',
                    'def'
                ],
                table: [
                    new StatTable('skill_dmg', charTalentTables.Illuga.s3.p1),
                    new StatTable('skill_dmg_2', charTalentTables.Illuga.s3.p2),
                ],
            },
            {
                unit: 'mastery',
                table: new StatTable('illuga_geo_dmg_bonus', charTalentTables.Illuga.s3.p3),
            },
            {
                unit: 'mastery',
                table: new StatTable('illuga_lunar_crystallize_reaction_dmg_bonus', charTalentTables.Illuga.s3.p4),
            },
            {
                unit: 'stack',
                table: new StatTable('illuga_nightingales_song_stacks_gained_from_elemental_burst', charTalentTables.Illuga.s3.p5),
            },
            {
                unit: 'stack_per_geo_construct',
                table: new StatTable('illuga_nightingales_song_stacks_gained_from_geo_constructs', charTalentTables.Illuga.s3.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Illuga.s3.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Illuga.s3.p8),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Illuga.s3.p9),
            },
        ],
    },
    links: charTalentTables.Illuga.links,
});

export function FillIllugaSettingsStacks(settings) {
    let result = Object.getPrototypeOf(Object.getPrototypeOf(this)).getSettings.call(this, settings);
    if (this.isActive(settings))
        result.illuga_stacks = (settings.illuga_chars_count || 0) + 1;
    else
        result.illuga_stacks = 1;

    return result;
}

export function FillIllugaStatsStacksFromSettings(settings) {
    let result = Object.getPrototypeOf(Object.getPrototypeOf(this)).getDefaultStats.call(this, settings);
    result.add('illuga_stacks', Math.min(3, settings.illuga_chars_count || 1));
    return result;
}

export const Illuga = new DbObjectChar({
    name: 'illuga',
    serializeId: 116,
    gameId: charTalentTables.Illuga.char_id,
    iconClass: 'char-icon-illuga',
    rarity: 4,
    element: 'geo',
    weapon: charTalentTables.Illuga.char_weapon,
    originList: ['nodkrai', 'lunar'],
    talents: Talents,
    statTable: charTables.Illuga,
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
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_3_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_3_2'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3_2'),
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
        new FeatureDamageCharged({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
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
        new FeatureDamageSkill({
            element: 'geo',
            name: 'press_dmg',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.press_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.press_dmg_2'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'geo',
            name: 'hold_dmg',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.hold_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.hold_dmg_2'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'geo',
            name: 'skill_dmg',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.skill_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.skill_dmg_2'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'geo',
            name: 'illuga_aedon',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_burst',
                    values: new ValueTable([charTalentTables.Illuga.cons[1][0]], 100),
                }),
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_burst',
                    values: new ValueTable([charTalentTables.Illuga.cons[1][1]], 100),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'illuga_flag' }),
                new ConditionConstellation({ constellation: 2 }),
            ]),
        }),
        new FeatureStatic({
            category: 'burst',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'mastery',
                    leveling: 'char_skill_burst',
                    source: 'talent_burst',
                    values: Talents.get('burst.illuga_geo_dmg_bonus'),
                    bonusLeveling: 'illuga_stacks',
                    bonusValues: new ValueTable([0, charTalentTables.Illuga.passsive[1][0], charTalentTables.Illuga.passsive[1][1], charTalentTables.Illuga.passsive[1][2]], 100),
                }),
            ],
        }),
        new FeatureStatic({
            category: 'burst',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'mastery',
                    leveling: 'char_skill_burst',
                    source: 'talent_burst',
                    values: Talents.get('burst.illuga_lunar_crystallize_reaction_dmg_bonus'),
                    bonusLeveling: 'illuga_stacks',
                    bonusValues: new ValueTable([0, charTalentTables.Illuga.passsive[1][3], charTalentTables.Illuga.passsive[1][4], charTalentTables.Illuga.passsive[1][5]], 100),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionMoonPhaseSetting(),
        new ConditionCalcElementsIlluga(),
        new ConditionBoolean({
            name: 'illuga_flag',
            serializeId: 1,
            title: 'talent_name.n11270001',
            description: 'talent_descr.n11270001',
        }),
        new ConditionBoolean({
            name: 'illuga_torchforgers_covenant',
            serializeId: 2,
            title: 'talent_name.illuga_torchforgers_covenant',
            description: 'talent_descr.illuga_torchforgers_covenant_1',
            info: { ascension: 1 },
            condition: new ConditionAscensionChar({ ascension: 1 }),
            stats: {
                crit_rate_geo: charTalentTables.Illuga.passsive[0][0] * 100,
                crit_dmg_geo: charTalentTables.Illuga.passsive[0][1] * 100,
            }
        }),
        new ConditionStatic({
            title: 'talent_name.illuga_torchforgers_covenant',
            description: 'talent_descr.illuga_torchforgers_covenant_2',
            info: { ascension: 1 },
            condition: new ConditionAnd([
                new ConditionAscensionChar({ ascension: 1 }),
                new ConditionBoolean({ name: 'illuga_torchforgers_covenant' }),
                new ConditionMoonPhaseCheck({ moonphase: 2 }),
            ]),
            stats: {
                mastery: charTalentTables.Illuga.passsive[0][4],
                text_mastery: charTalentTables.Illuga.passsive[0][4],
                text_number_f: 2,
            }
        }),
        new ConditionStaticIlluga({
            name: 'illuga_demonhunters_dusk',
            title: 'talent_name.illuga_demonhunters_dusk',
            description: 'talent_descr.illuga_demonhunters_dusk',
            info: { ascension: 4 },
            condition: new ConditionAscensionChar({ ascension: 4 }),
            stats: {
                text_geo1_percent: charTalentTables.Illuga.passsive[1][0] * 100,
                text_geo2_percent: charTalentTables.Illuga.passsive[1][1] * 100,
                text_geo3_percent: charTalentTables.Illuga.passsive[1][2] * 100,
                text_react1_percent: charTalentTables.Illuga.passsive[1][3] * 100,
                text_react2_percent: charTalentTables.Illuga.passsive[1][4] * 100,
                text_react3_percent: charTalentTables.Illuga.passsive[1][5] * 100,
            }
        }),
        new ConditionStatic({
            name: 'illuga_unwithering_in_winter',
            serializeId: 1,
            title: 'talent_name.illuga_unwithering_in_winter',
            description: 'talent_descr.illuga_unwithering_in_winter',
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'mastery',
            leveling: 'char_skill_burst',
            source: 'talent_burst',
            values: Talents.get('burst.illuga_geo_dmg_bonus'),
            bonusLeveling: 'illuga_stacks',
            bonusValues: new ValueTable([0, charTalentTables.Illuga.passsive[1][0], charTalentTables.Illuga.passsive[1][1], charTalentTables.Illuga.passsive[1][2]], 100),
            target: new FeatureMultiplierTarget({
                damageTypes: ['normal', 'charged', 'plunge', 'burst', 'skill'],
                damageElements: ['geo'],
            }),
            condition: new ConditionBoolean({ name: 'illuga_flag' }),
        }),
        new FeatureMultiplier({
            scaling: 'mastery',
            leveling: 'char_skill_burst',
            source: 'talent_burst',
            values: Talents.get('burst.illuga_lunar_crystallize_reaction_dmg_bonus'),
            bonusLeveling: 'illuga_stacks',
            bonusValues: new ValueTable([0, charTalentTables.Illuga.passsive[1][3], charTalentTables.Illuga.passsive[1][4], charTalentTables.Illuga.passsive[1][5]], 100),
            target: new FeatureMultiplierTarget({
                isReactionFlatBonus: true,
                damageTypes: ['lunardirect'],
                damageElements: ['geo'],
            }),
            condition: new ConditionBoolean({ name: 'illuga_flag' }),
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.illuga_vigilant_sentinel',
                    description: 'talent_descr.illuga_vigilant_sentinel',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.illuga_elk_with_fanged_antlers',
                    description: 'talent_descr.illuga_elk_with_fanged_antlers',
                    condition: new ConditionBoolean({ name: 'illuga_flag' }),
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
                    title: 'talent_name.illuga_solarhunting_wolf',
                    description: 'talent_descr.illuga_solarhunting_wolf',
                    condition: new ConditionBoolean({ name: 'illuga_flag' }),
                    stats: {
                        def: charTalentTables.Illuga.cons[3][0],
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
                new ConditionMoonPhaseSetting(),
                new ConditionStatic({
                    title: 'talent_name.illuga_nightmare_orioles',
                    description: 'talent_descr.illuga_nightmare_orioles_1',
                    stats: {
                        text_crit_rate: charTalentTables.Illuga.cons[5][0] * 100,
                        text_crit_dmg: charTalentTables.Illuga.cons[5][1] * 100,
                    },
                }),
                new Condition({
                    condition: new ConditionAnd([
                        new ConditionBoolean({ name: 'illuga_torchforgers_covenant' }),
                        new ConditionAscensionChar({ ascension: 1 }),
                    ]),
                    stats: {
                        crit_rate_geo: charTalentTables.Illuga.cons[5][0] * 100 - charTalentTables.Illuga.passsive[0][0] * 100,
                        crit_dmg_geo: charTalentTables.Illuga.cons[5][1] * 100 - charTalentTables.Illuga.passsive[0][1] * 100,
                    }
                }),
                new ConditionStatic({
                    title: 'talent_name.illuga_nightmare_orioles',
                    description: 'talent_descr.illuga_nightmare_orioles_2',
                    condition: new ConditionAnd([
                        new ConditionBoolean({ name: 'illuga_torchforgers_covenant' }),
                        new ConditionAscensionChar({ ascension: 1 }),
                    ]),
                    stats: {
                        text_mastery: charTalentTables.Illuga.cons[5][4],
                    },
                }),
                new Condition({
                    condition: new ConditionAnd([
                        new ConditionBoolean({ name: 'illuga_torchforgers_covenant' }),
                        new ConditionAscensionChar({ ascension: 1 }),
                        new ConditionMoonPhaseCheck({ moonphase: 2 }),
                    ]),
                    stats: {
                        mastery: charTalentTables.Illuga.cons[5][4] - charTalentTables.Illuga.passsive[0][4],
                    }
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            stats: ['mastery_total'],
            settings: ['char_skill_burst'],
        },
        conditions: [
            new ConditionMoonPhaseSetting(),
            new ConditionCalcElementsIlluga(),
            new ConditionNumber({
                name: 'illuga_mastery_total',
                title: 'talent_name.stats_total_mastery',
                partyStat: 'mastery_total',
                serializeId: 1,
                rotation: 'party',
                max: 5000,
            }),
            new ConditionNumberTalent({
                name: 'illuga_char_skill_burst',
                title: 'talent_name.stats_level_burst',
                partySetting: 'char_skill_burst',
                serializeId: 2,
            }),
            new ConditionBoolean({
                name: 'party.illuga_flag',
                serializeId: 3,
                rotation: 'party',
                title: 'talent_name.n11270001',
                description: 'talent_descr.n11270001',
            }),
            new ConditionBoolean({
                name: 'party.illuga_torchforgers_covenant',
                serializeId: 4,
                title: 'talent_name.illuga_torchforgers_covenant',
                description: 'talent_descr.illuga_torchforgers_covenant_1',
                rotation: 'party',
                info: { ascension: 1 },
                stats: {
                    crit_rate_geo: charTalentTables.Illuga.passsive[0][0] * 100,
                    crit_dmg_geo: charTalentTables.Illuga.passsive[0][1] * 100,
                }
            }),
            new ConditionStatic({
                title: 'talent_name.illuga_torchforgers_covenant',
                description: 'talent_descr.illuga_torchforgers_covenant_2',
                info: { ascension: 1 },
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'party.illuga_torchforgers_covenant' }),
                    new ConditionMoonPhaseCheck({ moonphase: 2 }),
                ]),
                stats: {
                    mastery: charTalentTables.Illuga.passsive[0][4],
                    text_mastery: charTalentTables.Illuga.passsive[0][4],
                    text_number_f: 2,
                }
            }),
            new ConditionBooleanIlluga({
                name: 'party.illuga_demonhunters_dusk',
                serializeId: 5,
                title: 'talent_name.illuga_demonhunters_dusk',
                description: 'talent_descr.illuga_demonhunters_dusk',
                info: { ascension: 4 },
                stats: {
                    text_geo1_percent: charTalentTables.Illuga.passsive[1][0] * 100,
                    text_geo2_percent: charTalentTables.Illuga.passsive[1][1] * 100,
                    text_geo3_percent: charTalentTables.Illuga.passsive[1][2] * 100,
                    text_react1_percent: charTalentTables.Illuga.passsive[1][3] * 100,
                    text_react2_percent: charTalentTables.Illuga.passsive[1][4] * 100,
                    text_react3_percent: charTalentTables.Illuga.passsive[1][5] * 100,
                }
            }),
            new ConditionBoolean({
                name: 'party.illuga_constellation_3',
                serializeId: 6,
                title: 'talent_name.illuga_earthshaking_maw',
                description: 'talent_descr.char_constellation_burst',
                settings: {
                    illuga_char_skill_burst_bonus: 3,
                },
                info: { constellation: 3 },
            }),
            new ConditionBoolean({
                name: 'party.illuga_constellation_4',
                serializeId: 7,
                title: 'talent_name.illuga_solarhunting_wolf',
                description: 'talent_descr.illuga_solarhunting_wolf',
                condition: new ConditionBoolean({ name: 'party.illuga_flag' }),
                stats: {
                    def: charTalentTables.Illuga.cons[3][0],
                },
                info: { constellation: 4 },
            }),
            new ConditionBoolean({
                name: 'party.illuga_constellation_6',
                serializeId: 8,
                title: 'talent_name.illuga_nightmare_orioles',
                description: 'talent_descr.illuga_nightmare_orioles_1',
                info: { constellation: 6 },
                stats: {
                    text_crit_rate: charTalentTables.Illuga.cons[5][0] * 100,
                    text_crit_dmg: charTalentTables.Illuga.cons[5][1] * 100,
                    crit_rate_geo: charTalentTables.Illuga.cons[5][0] * 100 - charTalentTables.Illuga.passsive[0][0] * 100,
                    crit_dmg_geo: charTalentTables.Illuga.cons[5][1] * 100 - charTalentTables.Illuga.passsive[0][1] * 100,
                },
                condition: new ConditionBoolean({ name: 'party.illuga_torchforgers_covenant' }),
            }),
            new ConditionStatic({
                title: 'talent_name.illuga_nightmare_orioles',
                description: 'talent_descr.illuga_nightmare_orioles_2',
                info: { constellation: 6 },
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'party.illuga_torchforgers_covenant' }),
                    new ConditionBoolean({ name: 'party.illuga_constellation_6' }),
                    new ConditionMoonPhaseCheck({ moonphase: 2 }),
                ]),
                stats: {
                    text_mastery: charTalentTables.Illuga.cons[5][4],
                    mastery: charTalentTables.Illuga.cons[5][4] - charTalentTables.Illuga.passsive[0][4],
                },
            }),
        ],
        multipliers: [
            new FeatureMultiplier({
                scaling: 'illuga_mastery_total',
                leveling: 'illuga_char_skill_burst',
                source: 'illuga',
                values: Talents.get('burst.illuga_geo_dmg_bonus'),
                bonusLeveling: 'illuga_stacks',
                bonusValues: new ValueTable([0, charTalentTables.Illuga.passsive[1][0], charTalentTables.Illuga.passsive[1][1], charTalentTables.Illuga.passsive[1][2]], 100),
                target: new FeatureMultiplierTarget({
                    damageTypes: ['normal', 'charged', 'plunge', 'burst', 'skill'],
                    damageElements: ['geo'],
                }),
                condition: new ConditionBoolean({ name: 'party.illuga_flag' }),
            }),
            new FeatureMultiplier({
                scaling: 'illuga_mastery_total',
                leveling: 'illuga_char_skill_burst',
                source: 'illuga',
                values: Talents.get('burst.illuga_lunar_crystallize_reaction_dmg_bonus'),
                bonusLeveling: 'illuga_stacks',
                bonusValues: new ValueTable([0, charTalentTables.Illuga.passsive[1][3], charTalentTables.Illuga.passsive[1][4], charTalentTables.Illuga.passsive[1][5]], 100),
                target: new FeatureMultiplierTarget({
                    isReactionFlatBonus: true,
                    damageTypes: ['lunardirect'],
                    damageElements: ['geo'],
                }),
                condition: new ConditionBoolean({ name: 'party.illuga_flag' }),
            }),
        ],
    }
});
