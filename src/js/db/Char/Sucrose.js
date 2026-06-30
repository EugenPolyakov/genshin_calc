import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanCharElement } from "../../classes/Condition/Boolean/CharElement";
import { ConditionBooleanValue } from "../../classes/Condition/Boolean/Value";
import { ConditionDropdownElement } from "../../classes/Condition/Dropdown/Element";
import { ConditionHexCheck } from "../../classes/Condition/HexCheck";
import { ConditionHexCurrent } from "../../classes/Condition/HexCurrent";
import { ConditionNumber } from "../../classes/Condition/Number";
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
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { PostEffectStatsMastery } from "../../classes/PostEffect/Stats/Mastery";
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Sucrose.s1_id,
        title: 'talent_name.sucrose_wind_spirit_creation',
        description: 'talent_descr.sucrose_wind_spirit_creation',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Sucrose.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Sucrose.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Sucrose.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Sucrose.s1.p4),
            },
            {
                table:  new StatTable('charged_hit', charTalentTables.Sucrose.s1.p5),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Sucrose.s1.p6),
            },
            {
                table: new StatTable('plunge', charTalentTables.Sucrose.s1.p7),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Sucrose.s1.p8),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Sucrose.s1.p9),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Sucrose.s2_id,
        title: 'talent_name.sucrose_astable_anemohypostasis_creation_6308',
        description: 'talent_descr.sucrose_astable_anemohypostasis_creation_6308',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Sucrose.s2.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Sucrose.s2.p2),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Sucrose.s3_id,
        title: 'talent_name.sucrose_forbidden_creation_isomer_75_type_ii',
        description: 'talent_descr.sucrose_forbidden_creation_isomer_75_type_ii',
        items: [
            {
                table: new StatTable('dot_dmg', charTalentTables.Sucrose.s3.p1),
            },
            {
                table: new StatTable('anemoskill_dmg', charTalentTables.Sucrose.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Sucrose.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Sucrose.s3.p4),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Sucrose.s3.p5),
            },
        ],
    },
});

export const Sucrose = new DbObjectChar({
    name: 'sucrose',
    serializeId: 22,
    gameId: 10000043,
    iconClass: "char-icon-sucrose",
    rarity: 4,
    element: 'anemo',
    weapon: 'catalyst',
    origin: 'mondstadt',
    talents: Talents,
    statTable: charTables.Sucrose,
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
        new FeatureDamageNormal({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
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
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.dot_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'anemoskill_pyro_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.anemoskill_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'anemoskill_hydro_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.anemoskill_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'anemoskill_cryo_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.anemoskill_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'anemoskill_electro_dmg',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.anemoskill_dmg'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'sucrose_mastery_bonus',
            postEffect: new PostEffectStatsMastery({
                percent: new StatTable('mastery', [0.2]),
            }),
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'char_hex_sucrose',
            serializeId: 2,
            title: 'talent_name.sucrose_sevenfold_transmutation',
            description: 'talent_descr.sucrose_sevenfold_transmutation_1',
        }),
        new ConditionBoolean({
            name: 'sucrose_astable_anemohypostasis_creation_6308',
            serializeId: 3,
            title: 'talent_name.sucrose_astable_anemohypostasis_creation_6308',
            description: 'talent_descr.sucrose_sevenfold_transmutation_2',
            condition: new ConditionAnd([
                new ConditionHexCurrent(),
                new ConditionHexCheck({ hex: 2 }),
            ]),
            stats: {
                dmg_normal: charTalentTables.Sucrose.passsive[2][1] * 100,
                dmg_charged: charTalentTables.Sucrose.passsive[2][1] * 100,
                dmg_plunge: charTalentTables.Sucrose.passsive[2][1] * 100,
                dmg_skill: charTalentTables.Sucrose.passsive[2][1] * 100,
                dmg_burst: charTalentTables.Sucrose.passsive[2][1] * 100,
            },
        }),
        new ConditionBoolean({
            name: 'sucrose_forbidden_creation_isomer_75_type_ii',
            serializeId: 4,
            title: 'talent_name.sucrose_forbidden_creation_isomer_75_type_ii',
            description: 'talent_descr.sucrose_sevenfold_transmutation_3',
            condition: new ConditionAnd([
                new ConditionHexCurrent(),
                new ConditionHexCheck({ hex: 2 }),
            ]),
            stats: {
                dmg_normal: charTalentTables.Sucrose.passsive[2][3] * 100,
                dmg_charged: charTalentTables.Sucrose.passsive[2][3] * 100,
                dmg_plunge: charTalentTables.Sucrose.passsive[2][3] * 100,
                dmg_skill: charTalentTables.Sucrose.passsive[2][3] * 100,
                dmg_burst: charTalentTables.Sucrose.passsive[2][3] * 100,
            },
        }),
        new ConditionStatic({
            title: 'talent_name.sucrose_catalyst_conversion',
            description: 'talent_descr.sucrose_catalyst_conversion',
            stats: {
                text_value: 50,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.sucrose_mollis_favonius',
            description: 'talent_descr.sucrose_mollis_favonius',
            stats: {
                text_percent: 20,
            },
            info: {ascension: 4},
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.sucrose_clustered_vacuum_field',
                    description: 'talent_descr.sucrose_clustered_vacuum_field',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.sucrose_unbound_form',
                    description: 'talent_descr.sucrose_unbound_form',
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
                    title: 'talent_name.sucrose_alchemania',
                    description: 'talent_descr.sucrose_alchemania',
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
                new ConditionDropdownElement({
                    name: 'sucrose_chaotic_entropy',
                    serializeId: 1,
                    title: 'talent_name.sucrose_chaotic_entropy',
                    description: 'talent_descr.sucrose_chaotic_entropy',
                    hideCondition: new ConditionHexCurrent(),
                    condition: new ConditionHexCurrent({ invert: 1 }),
                    values: [
                        {
                            value: 'cryo',
                            serializeId: 1,
                            conditions: [
                                new Condition({stats: {dmg_cryo: 20}}),
                            ],
                        },
                        {
                            value: 'electro',
                            serializeId: 2,
                            conditions: [
                                new Condition({stats: {dmg_electro: 20}}),
                            ],
                        },
                        {
                            value: 'hydro',
                            serializeId: 3,
                            conditions: [
                                new Condition({stats: {dmg_hydro: 20}}),
                            ],
                        },
                        {
                            value: 'pyro',
                            serializeId: 4,
                            conditions: [
                                new Condition({stats: {dmg_pyro: 20}}),
                            ],
                        },
                    ],
                }),
                new ConditionDropdownElement({
                    name: 'sucrose_chaotic_entropy',
                    serializeId: 1,
                    title: 'talent_name.sucrose_chaotic_entropy',
                    description: 'talent_descr.sucrose_chaotic_entropy_hex',
                    hideCondition: new ConditionHexCurrent({ invert: 1 }),
                    condition: new ConditionHexCurrent(),
                    values: [
                        {
                            value: 'cryo',
                            serializeId: 1,
                            conditions: [
                                new Condition({ stats: { dmg_cryo: 20 + charTalentTables.Sucrose.cons[5][1] * 100 } }),
                            ],
                        },
                        {
                            value: 'electro',
                            serializeId: 2,
                            conditions: [
                                new Condition({ stats: { dmg_electro: 20 + charTalentTables.Sucrose.cons[5][1] * 100 } }),
                            ],
                        },
                        {
                            value: 'hydro',
                            serializeId: 3,
                            conditions: [
                                new Condition({ stats: { dmg_hydro: 20 + charTalentTables.Sucrose.cons[5][1] * 100 } }),
                            ],
                        },
                        {
                            value: 'pyro',
                            serializeId: 4,
                            conditions: [
                                new Condition({ stats: { dmg_pyro: 20 + charTalentTables.Sucrose.cons[5][1] * 100 } }),
                            ],
                        },
                    ],
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            stats: ['mastery_total'],
        },
        conditions: [
            new ConditionNumber({
                name: 'sucrose_mastery',
                title: 'stat.mastery',
                partyStat: 'mastery_total',
                serializeId: 1,
                rotation: 'party',
                max: 10000,
            }),
            new ConditionBoolean({
                name: 'char_hex_sucrose',
                serializeId: 5,
                title: 'talent_name.sucrose_sevenfold_transmutation',
                description: 'talent_descr.sucrose_sevenfold_transmutation_1',
            }),
            new ConditionBoolean({
                name: 'sucrose_astable_anemohypostasis_creation_6308',
                serializeId: 6,
                rotation: 'party',
                title: 'talent_name.sucrose_astable_anemohypostasis_creation_6308',
                description: 'talent_descr.sucrose_sevenfold_transmutation_2',
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'char_hex_sucrose' }),
                    new ConditionHexCheck({ hex: 2 }),
                ]),
                stats: {
                    dmg_normal: charTalentTables.Sucrose.passsive[2][1] * 100,
                    dmg_charged: charTalentTables.Sucrose.passsive[2][1] * 100,
                    dmg_plunge: charTalentTables.Sucrose.passsive[2][1] * 100,
                    dmg_skill: charTalentTables.Sucrose.passsive[2][1] * 100,
                    dmg_burst: charTalentTables.Sucrose.passsive[2][1] * 100,
                },
            }),
            new ConditionBoolean({
                name: 'sucrose_forbidden_creation_isomer_75_type_ii',
                serializeId: 7,
                rotation: 'party',
                title: 'talent_name.sucrose_forbidden_creation_isomer_75_type_ii',
                description: 'talent_descr.sucrose_sevenfold_transmutation_3',
                condition: new ConditionAnd([
                    new ConditionHexCurrent(),
                    new ConditionBoolean({ name: 'char_hex_sucrose' }),
                    new ConditionHexCheck({ hex: 2 }),
                ]),
                stats: {
                    dmg_normal: charTalentTables.Sucrose.passsive[2][3] * 100,
                    dmg_charged: charTalentTables.Sucrose.passsive[2][3] * 100,
                    dmg_plunge: charTalentTables.Sucrose.passsive[2][3] * 100,
                    dmg_skill: charTalentTables.Sucrose.passsive[2][3] * 100,
                    dmg_burst: charTalentTables.Sucrose.passsive[2][3] * 100,
                },
            }),
            new ConditionBoolean({
                name: 'party.sucrose_catalyst_conversion',
                serializeId: 2,
                rotation: 'party',
                title: 'talent_name.sucrose_catalyst_conversion',
                description: 'talent_descr.sucrose_catalyst_conversion',
                info: {ascension: 1},
                stats: {
                    text_value: 50,
                    mastery: 50,
                },
                subConditions: [
                    new ConditionBooleanCharElement({
                        element: ['pyro', 'hydro', 'cryo', 'electro'],
                    }),
                ],
            }),
            new ConditionBoolean({
                name: 'party.sucrose_mollis_favonius',
                serializeId: 3,
                rotation: 'party',
                title: 'talent_name.sucrose_mollis_favonius',
                description: 'talent_descr.sucrose_mollis_favonius',
                info: {ascension: 4},
                stats: {
                    text_percent: 20,
                },
            }),
            new ConditionDropdownElement({
                name: 'party.sucrose_chaotic_entropy',
                serializeId: 4,
                rotation: 'party',
                title: 'talent_name.sucrose_chaotic_entropy',
                description: 'talent_descr.sucrose_chaotic_entropy',
                hideCondition: new ConditionBoolean({ name: 'char_hex_sucrose' }),
                condition: new ConditionBoolean({ name: 'char_hex_sucrose', invert: 1 }),
                info: {constellation: 6},
                values: [
                    {
                        value: 'cryo',
                        serializeId: 1,
                        conditions: [
                            new Condition({stats: {dmg_cryo: 20}}),
                        ],
                    },
                    {
                        value: 'electro',
                        serializeId: 2,
                        conditions: [
                            new Condition({stats: {dmg_electro: 20}}),
                        ],
                    },
                    {
                        value: 'hydro',
                        serializeId: 3,
                        conditions: [
                            new Condition({stats: {dmg_hydro: 20}}),
                        ],
                    },
                    {
                        value: 'pyro',
                        serializeId: 4,
                        conditions: [
                            new Condition({stats: {dmg_pyro: 20}}),
                        ],
                    },
                ],
            }),
            new ConditionDropdownElement({
                name: 'party.sucrose_chaotic_entropy',
                serializeId: 4,
                rotation: 'party',
                title: 'talent_name.sucrose_chaotic_entropy',
                description: 'talent_descr.sucrose_chaotic_entropy_hex',
                hideCondition: new ConditionBoolean({ name: 'char_hex_sucrose', invert: 1 }),
                condition: new ConditionBoolean({ name: 'char_hex_sucrose' }),
                info: { constellation: 6 },
                values: [
                    {
                        value: 'cryo',
                        serializeId: 1,
                        conditions: [
                            new Condition({ stats: { dmg_cryo: 20 } }),
                        ],
                    },
                    {
                        value: 'electro',
                        serializeId: 2,
                        conditions: [
                            new Condition({ stats: { dmg_electro: 20 } }),
                        ],
                    },
                    {
                        value: 'hydro',
                        serializeId: 3,
                        conditions: [
                            new Condition({ stats: { dmg_hydro: 20 } }),
                        ],
                    },
                    {
                        value: 'pyro',
                        serializeId: 4,
                        conditions: [
                            new Condition({ stats: { dmg_pyro: 20 } }),
                        ],
                    },
                ],
            }),
            new Condition({
                stats: {
                    dmg_cryo: charTalentTables.Sucrose.cons[5][1] * 100,
                },
                condition: new ConditionAnd([
                    new ConditionBooleanValue({ setting: 'party.sucrose_chaotic_entropy', value: 'cryo', cond: 'eq' }),
                    //new ConditionBooleanCharElement({ element: ['cryo'] }),
                    new ConditionHexCurrent(),
                    new ConditionBoolean({ name: 'char_hex_sucrose' }),
                ]),
            }),
            new Condition({
                stats: {
                    dmg_electro: charTalentTables.Sucrose.cons[5][1] * 100,
                },
                condition: new ConditionAnd([
                    new ConditionBooleanValue({ setting: 'party.sucrose_chaotic_entropy', value: 'electro', cond: 'eq' }),
                    //new ConditionBooleanCharElement({ element: ['electro'] }),
                    new ConditionHexCurrent(),
                    new ConditionBoolean({ name: 'char_hex_sucrose' }),
                ]),
            }),
            new Condition({
                stats: {
                    dmg_hydro: charTalentTables.Sucrose.cons[5][1] * 100,
                },
                condition: new ConditionAnd([
                    new ConditionBooleanValue({ setting: 'party.sucrose_chaotic_entropy', value: 'hydro', cond: 'eq' }),
                    //new ConditionBooleanCharElement({ element: ['hydro'] }),
                    new ConditionHexCurrent(),
                    new ConditionBoolean({ name: 'char_hex_sucrose' }),
                ]),
            }),
            new Condition({
                stats: {
                    dmg_pyro: charTalentTables.Sucrose.cons[5][1] * 100,
                },
                condition: new ConditionAnd([
                    new ConditionBooleanValue({ setting: 'party.sucrose_chaotic_entropy', value: 'pyro', cond: 'eq' }),
                    //new ConditionBooleanCharElement({ element: ['pyro'] }),
                    new ConditionHexCurrent(),
                    new ConditionBoolean({ name: 'char_hex_sucrose' }),
                ]),
            }),
        ],
        postEffects: [
            new PostEffectStats({
                from: 'sucrose_mastery',
                percent: new StatTable('mastery', [0.2]),
                condition: new ConditionBoolean({name: 'party.sucrose_mollis_favonius'}),
            }),
        ],
    },
});
