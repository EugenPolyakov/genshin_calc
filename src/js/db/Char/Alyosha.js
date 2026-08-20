import { Condition, ConditionAnd } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanValue } from "../../classes/Condition/Boolean/Value";
import { ConditionNumberTalent } from "../../classes/Condition/Number/Talent";
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
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Alyosha.s1_id,
        title: 'talent_name.alyosha_skirmishing_spear',
        description: 'talent_descr.alyosha_skirmishing_spear',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Alyosha.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Alyosha.s1.p2),
            },
            {
                type: 'hits',
                name: 'normal_hit_3',
                table: [
                    new StatTable('normal_hit_3_1', charTalentTables.Alyosha.s1.p3),
                    new StatTable('normal_hit_3_2', charTalentTables.Alyosha.s1.p4),
                ],
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Alyosha.s1.p5),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Alyosha.s1.p6),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Alyosha.s1.p7),
            },
            {
                table: new StatTable('plunge', charTalentTables.Alyosha.s1.p8),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Alyosha.s1.p9),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Alyosha.s1.p10),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Alyosha.s2_id,
        title: 'talent_name.alyosha_thunderbolt_strike',
        description: 'talent_descr.alyosha_thunderbolt_strike',
        items: [
            {
                table: new StatTable('press_dmg', charTalentTables.Alyosha.s2.p1),
            },
            {
                table: new StatTable('hold_dmg', charTalentTables.Alyosha.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Alyosha.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('alyosha_hunters_mark_duration', charTalentTables.Alyosha.s2.p4),
            },
            {
                table: new StatTable('alyosha_hunters_precision_atk_bonus', charTalentTables.Alyosha.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('alyosha_hunters_precision_duration', charTalentTables.Alyosha.s2.p6),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Alyosha.s3_id,
        title: 'talent_name.alyosha_hunters_advance',
        description: 'talent_descr.alyosha_hunters_advance',
        items: [
            {
                table: new StatTable('alyosha_fulgurite_hunting_field_dmg', charTalentTables.Alyosha.s3.p1),
            },
            {
                table: new StatTable('alyosha_tugarin_dmg', charTalentTables.Alyosha.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Alyosha.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Alyosha.s3.p4),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Alyosha.s3.p5),
            },
        ],
    },
    links: charTalentTables.Alyosha.links,
});

const dmgBurstBonus = new PostEffectStats({
    from: 'recharge*',
    percent: [
        new StatTable('dmg_burst', [charTalentTables.Alyosha.passsive[1][0]], 10000),
        new StatTable('dmg_skill', [charTalentTables.Alyosha.passsive[1][0]], 10000),
    ],
    statCap: new ValueTable([70]),
    condition: new ConditionAscensionChar({ ascension: 4 }),
});

export const Alyosha = new DbObjectChar({
    name: 'alyosha',
    serializeId: 125,
    gameId: charTalentTables.Alyosha.char_id,
    iconClass: 'char-icon-alyosha',
    rarity: 4,
    element: 'electro',
    weapon: charTalentTables.Alyosha.char_weapon,
    origin: 'snezhnaya',
    talents: Talents,
    statTable: charTables.Alyosha,
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
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.press_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.hold_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.alyosha_fulgurite_hunting_field_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.alyosha_tugarin_dmg'),
                }),
            ],
        }),
        new FeatureHeal({
            name: 'heal',
            multipliers: [
                new FeatureMultiplier({
                    source: 'ascension1',
                    values: new ValueTable([charTalentTables.Alyosha.passsive[0][0]], 100),
                }),
            ],
            condition: new ConditionAscensionChar({ ascension: 1 }),
        }),
        new FeaturePostEffectValue({
            name: 'burst_dmg_bonus',
            format: 'percent',
            postEffect: dmgBurstBonus,
        })
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.alyosha_awakened_by_the_baying_hounds',
            description: 'talent_descr.alyosha_awakened_by_the_baying_hounds',
            info: { ascension: 1 },
            condition: new ConditionAscensionChar({ ascension: 1 }),
        }),
        new ConditionStatic({
            title: 'talent_name.alyosha_suffer_the_winter_wheat_will',
            description: 'talent_descr.alyosha_suffer_the_winter_wheat_will',
            info: { ascension: 4 },
            condition: new ConditionAscensionChar({ ascension: 4 }),
        }),
        new ConditionStacks({
            name: 'alyosha_hunters_precision',
            serializeId: 1,
            title: 'talent_name.alyosha_hunters_precision',
            description: 'talent_descr.alyosha_hunters_precision',
            maxStacks(settings) { return settings.char_constellation >= 6 ? 2 : 1; },
            levelSetting: 'char_skill_elemental',
            stats: [
                Talents.getAlias('skill.alyosha_hunters_precision_atk_bonus', 'atk_percent'),
                Talents.getAlias('skill.alyosha_hunters_precision_duration', 'text'),
            ],
            condition: new ConditionBoolean({ name: 'common.char_status_off_field', invert: 1 }),
        }),
    ],
    multipliers: [
    ],
    postEffects: [
        dmgBurstBonus,
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.alyosha_frostvale_thunderclap',
                    description: 'talent_descr.alyosha_frostvale_thunderclap',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.alyosha_howl_from_afar',
                    description: 'talent_descr.alyosha_howl_from_afar',
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
                    title: 'talent_name.alyosha_harvest_the_spoils',
                    description: 'talent_descr.alyosha_harvest_the_spoils',
                }),
            ],
            features: [
                new FeatureHeal({
                    name: 'alyosha_heal',
                    multipliers: [
                        new FeatureMultiplier({
                            source: 'constellation4',
                            values: new ValueTable([charTalentTables.Alyosha.cons[3][0]], 100),
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
                    title: 'talent_name.alyosha_standard_reclaimed',
                    description: 'talent_descr.alyosha_standard_reclaimed',
                    stats: {
                        mastery: charTalentTables.Alyosha.cons[5][0],
                    },
                    condition: new ConditionAnd([
                        new ConditionBooleanValue({
                            setting: 'alyosha_hunters_precision',
                            value: 2,
                            cond: 'ge'
                        }),
                        new ConditionBoolean({ name: 'common.char_status_off_field', invert: 1 }),
                    ])
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            settings: ['alyosha_hunters_precision', 'char_skill_burst'],
        },
        conditions: [
            new ConditionNumberTalent({
                name: 'alyosha_char_skill_burst',
                title: 'talent_name.stats_level_burst',
                partySetting: 'char_skill_burst',
                serializeId: 2,
            }),
            new ConditionBoolean({
                name: 'party.alyosha_constellation_3',
                serializeId: 5,
                title: 'talent_name.alyosha_friendly_call',
                description: 'talent_descr.char_constellation_burst',
                settings: {
                    alyosha_char_skill_burst_bonus: 3,
                },
                info: {
                    constellation: 3,
                },
            }),
            new ConditionStacks({
                name: 'party.alyosha_hunters_precision',
                serializeId: 1,
                partySetting: 'alyosha_hunters_precision',
                title: 'talent_name.alyosha_hunters_precision',
                description: 'talent_descr.alyosha_hunters_precision',
                maxStacks: 2,
                levelSetting: 'alyosha_char_skill_burst',
                stats: [
                    Talents.getAlias('skill.alyosha_hunters_precision_atk_bonus', 'atk_percent'),
                    Talents.getAlias('skill.alyosha_hunters_precision_duration', 'text'),
                ],
                condition: new ConditionBoolean({ name: 'common.char_status_off_field', invert: 1 }),
            }),
            new ConditionStatic({
                title: 'talent_name.alyosha_standard_reclaimed',
                description: 'talent_descr.alyosha_standard_reclaimed',
                info: { constellation: 6 },
                stats: {
                    mastery: charTalentTables.Alyosha.cons[5][0],
                },
                condition: new ConditionAnd([
                    new ConditionBooleanValue({
                        setting: 'party.alyosha_hunters_precision',
                        value: 2,
                        cond: 'ge'
                    }),
                    new ConditionBoolean({ name: 'common.char_status_off_field', invert: 1 }),
                ])
            }),
        ],
    },
});
