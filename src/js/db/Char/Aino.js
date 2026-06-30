import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionMoonPhaseBuff } from "../../classes/Condition/MoonPhaseBuff";
import { ConditionMoonPhaseBoolean } from "../../classes/Condition/Boolean/MoonPhase";
import { ConditionMoonPhaseSetting } from "../../classes/Condition/CustomOrigin/MoonPhaseSetting";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";


const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Aino.s1_id,
        title: 'talent_name.aino_bish_bash_bosh_repair',
        description: 'talent_descr.aino_bish_bash_bosh_repair',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Aino.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Aino.s1.p2),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_3', charTalentTables.Aino.s1.p3),
            },
            {
                table: new StatTable('charged_spin', charTalentTables.Aino.s1.p4),
            },
            {
                table: new StatTable('charged_final', charTalentTables.Aino.s1.p5),
            },
            {
                unit: 'per_sec',
                table: new StatTable('stamina_cost', charTalentTables.Aino.s1.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('max_duration', charTalentTables.Aino.s1.p7),
            },
            {
                table: new StatTable('plunge', charTalentTables.Aino.s1.p8),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Aino.s1.p9),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Aino.s1.p10),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Aino.s2_id,
        title: 'talent_name.aino_musecatcher',
        description: 'talent_descr.aino_musecatcher',
        items: [
            {
                table: new StatTable('aino_stage_1_dmg', charTalentTables.Aino.s2.p1),
            },
            {
                table: new StatTable('aino_stage_2_dmg', charTalentTables.Aino.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Aino.s2.p3),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Aino.s3_id,
        title: 'talent_name.aino_precision_hydronic_cooler',
        description: 'talent_descr.aino_precision_hydronic_cooler',
        items: [
            {
                table: new StatTable('aino_water_ball_dmg', charTalentTables.Aino.s3.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Aino.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Aino.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Aino.s3.p4),
            },
        ],
    },
});

export const Aino = new DbObjectChar({
    name: 'aino',
    serializeId: 111,
    gameId: charTalentTables.Aino.char_id,
    iconClass: "char-icon-aino",
    rarity: 4,
    element: 'hydro',
    weapon: charTalentTables.Aino.char_weapon,
    originList: ['nodkrai', 'lunar'],
    talents: Talents,
    statTable: charTables.Aino,
    features: [
        new FeatureDamageNormal({
            name: 'normal_hit_1',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_2',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            name: 'normal_hit_3',
            category: 'attack',
            damageType: 'normal',
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
                }
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
        new FeatureDamageCharged({
            name: 'charged_spin',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_spin'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_final',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_final'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            name: 'plunge',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_low',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_high',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'aino_stage_1_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.aino_stage_1_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'aino_stage_2_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.aino_stage_2_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'aino_water_ball_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.aino_water_ball_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    scalingSource: 'ascension4',
                    values: new ValueTable([charTalentTables.Aino.passsive[1][0] * 100]),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'aino_addition_burst_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'atk*',
                    scalingSource: 'constellation1',
                    values: new ValueTable([charTalentTables.Aino.cons[1][0] * 100]),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    scalingSource: 'constellation1',
                    values: new ValueTable([charTalentTables.Aino.cons[1][1] * 100]),
                }),
            ],
            condition: new ConditionConstellation({ constellation: 2 }),
        }),
    ],
    conditions: [
        new ConditionStatic({
            name: 'aino_modular_efficiency_protocol',
            serializeId: 1,
            title: 'talent_name.aino_modular_efficiency_protocol',
            description: 'talent_descr.aino_modular_efficiency_protocol',
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            name: 'aino_structured_power_booster',
            serializeId: 2,
            title: 'talent_name.aino_structured_power_booster',
            description: 'talent_descr.aino_structured_power_booster',
            stats: {
                dmg_burst_bonus_percent: charTalentTables.Aino.passsive[1][0] * 100,
            },
            info: {ascension: 4},
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    multipliers: [
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionBoolean({
                    name: 'aino_the_theory_of_ashfield_equilibrium',
                    serializeId: 3,
                    title: 'talent_name.aino_the_theory_of_ashfield_equilibrium',
                    description: 'talent_descr.aino_the_theory_of_ashfield_equilibrium',
                    stats: {
                        mastery: charTalentTables.Aino.cons[0][0],
                    },
                })
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.aino_the_principle_of_transference_in_gear_differentials',
                    description: 'talent_descr.aino_the_principle_of_transference_in_gear_differentials',
                    stats: {
                        dmg_atk: charTalentTables.Aino.cons[1][0] * 100,
                        dmg_mastery: charTalentTables.Aino.cons[1][1] * 100,
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
                    name: 'aino_butter_and_cats_and_the_law_of_energy_supply',
                    title: 'talent_name.aino_butter_and_cats_and_the_law_of_energy_supply',
                    description: 'talent_descr.aino_butter_and_cats_and_the_law_of_energy_supply',
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
                new ConditionMoonPhaseBoolean({
                    name: 'aino_the_burden_of_creative_genius',
                    serializeId: 4,
                    title: 'talent_name.aino_the_burden_of_creative_genius',
                    description: 'talent_descr.aino_the_burden_of_creative_genius',
                    stats: {
                        text_number_percent_1: charTalentTables.Aino.cons[5][0] * 100,
                        text_number_percent_2: charTalentTables.Aino.cons[5][1] * 100,
                    },
                    realStats: {
                        dmg_reaction_electrocharged: [charTalentTables.Aino.cons[5][0] * 100, charTalentTables.Aino.cons[5][0] * 100, charTalentTables.Aino.cons[5][0] * 100 + charTalentTables.Aino.cons[5][1] * 100],
                        dmg_reaction_rupture: [charTalentTables.Aino.cons[5][0] * 100, charTalentTables.Aino.cons[5][0] * 100, charTalentTables.Aino.cons[5][0] * 100 + charTalentTables.Aino.cons[5][1] * 100],
                        dmg_reaction_lunar: [charTalentTables.Aino.cons[5][0] * 100, charTalentTables.Aino.cons[5][0] * 100, charTalentTables.Aino.cons[5][0] * 100 + charTalentTables.Aino.cons[5][1] * 100],
                    },
                }),
            ]
        },
    ]),
    partyData: {
        conditions: [
            new ConditionMoonPhaseSetting(),
            new ConditionBoolean({
                name: 'party.aino_the_theory_of_ashfield_equilibrium',
                serializeId: 1,
                title: 'talent_name.aino_the_theory_of_ashfield_equilibrium',
                description: 'talent_descr.aino_the_theory_of_ashfield_equilibrium',
                stats: {
                    mastery: charTalentTables.Aino.cons[0][0],
                },
                info: {
                    constellation: 1,
                },
            }),
            new ConditionMoonPhaseBoolean({
                name: 'party.aino_the_burden_of_creative_genius',
                serializeId: 2,
                title: 'talent_name.aino_the_burden_of_creative_genius',
                description: 'talent_descr.aino_the_burden_of_creative_genius',
                stats: {
                    text_number_percent_1: charTalentTables.Aino.cons[5][0] * 100,
                    text_number_percent_2: charTalentTables.Aino.cons[5][1] * 100,
                },
                realStats: {
                    dmg_reaction_electrocharged: [charTalentTables.Aino.cons[5][0] * 100, charTalentTables.Aino.cons[5][0] * 100, charTalentTables.Aino.cons[5][0] * 100 + charTalentTables.Aino.cons[5][1] * 100],
                    dmg_reaction_rupture: [charTalentTables.Aino.cons[5][0] * 100, charTalentTables.Aino.cons[5][0] * 100, charTalentTables.Aino.cons[5][0] * 100 + charTalentTables.Aino.cons[5][1] * 100],
                    dmg_reaction_lunar: [charTalentTables.Aino.cons[5][0] * 100, charTalentTables.Aino.cons[5][0] * 100, charTalentTables.Aino.cons[5][0] * 100 + charTalentTables.Aino.cons[5][1] * 100],
                },
                info: {
                    constellation: 6,
                },
            }),
        ],
    }
});

