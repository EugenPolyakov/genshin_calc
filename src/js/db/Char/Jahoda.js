import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionMoonPhaseSetting } from "../../classes/Condition/CustomOrigin/MoonPhaseSetting";
import { ConditionJahodaParty } from "../../classes/Condition/JahodaParty";
import { ConditionMoonPhaseCheck } from "../../classes/Condition/MoonPhaseCheck";
import { ConditionOr } from "../../classes/Condition/Or";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageChargedAimed } from "../../classes/Feature2/Damage/Charged/Aimed";
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Jahoda.s1_id,
        title: 'talent_name.jahoda_strike_while_the_arrows_hot',
        description: 'talent_descr.jahoda_strike_while_the_arrows_hot',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Jahoda.s1.p1),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_2', charTalentTables.Jahoda.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Jahoda.s1.p3),
            },
            {
                table: new StatTable('aimed', charTalentTables.Jahoda.s1.p4),
            },
            {
                table: new StatTable('charged_aimed', charTalentTables.Jahoda.s1.p5),
            },
            {
                table: new StatTable('plunge', charTalentTables.Jahoda.s1.p6),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Jahoda.s1.p7),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Jahoda.s1.p8),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Jahoda.s2_id,
        title: 'talent_name.jahoda_splitting_the_spoils',
        description: 'talent_descr.jahoda_splitting_the_spoils',
        items: [
            {
                table: new StatTable('jahoda_smoke_bomb_dmg', charTalentTables.Jahoda.s2.p1),
            },
            {
                table: new StatTable('jahoda_unfilled_treasure_flask_dmg', charTalentTables.Jahoda.s2.p2),
            },
            {
                table: new StatTable('jahoda_filled_treasure_flask_dmg', charTalentTables.Jahoda.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('jahoda_treasure_flask_duration', charTalentTables.Jahoda.s2.p4),
            },
            {
                table: new StatTable('jahoda_meowball_dmg', charTalentTables.Jahoda.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Jahoda.s2.p6),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Jahoda.s3_id,
        title: 'talent_name.jahoda_seven_tools_of_the_hunter',
        description: 'talent_descr.jahoda_seven_tools_of_the_hunter',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Jahoda.s3.p1),
            },
            {
                table: new StatTable('jahoda_purrsonal_coordinated_assistance_robot_dmg', charTalentTables.Jahoda.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('jahoda_purrsonal_coordinated_assistance_robot_duration', charTalentTables.Jahoda.s3.p3),
            },
            {
                type: 'shield',
                name: 'jahoda_purrsonal_coordinated_assistance_robot_healing',
                table: [
                    new StatTable('jahoda_purrsonal_coordinated_assistance_robot_healing', charTalentTables.Jahoda.s3.p4),
                    new StatTable('', charTalentTables.Jahoda.s3.p5),
                ],
            },
            {
                type: 'shield',
                name: 'jahoda_lowest_hp_character_additional_healing',
                table: [
                    new StatTable('jahoda_lowest_hp_character_additional_healing', charTalentTables.Jahoda.s3.p6),
                    new StatTable('', charTalentTables.Jahoda.s3.p7),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Jahoda.s3.p8),
            },
            {
                unit: 'unit',
                table: new StatTable('energy_cost', charTalentTables.Jahoda.s3.p9),
            },
        ],
    },
    links: charTalentTables.Jahoda.links,
});

export const Jahoda = new DbObjectChar({
    name: 'jahoda',
    serializeId: 114,
    gameId: charTalentTables.Jahoda.char_id,
    iconClass: 'char-icon-jahoda',
    rarity: 4,
    element: 'anemo',
    weapon: charTalentTables.Jahoda.char_weapon,
    originList: ['nodkrai', 'lunar'],
    talents: Talents,
    statTable: charTables.Jahoda,
    features: [
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            name: 'normal_hit_2',
            category: 'attack',
            damageType: 'normal',
            allowInfusion: true,
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_2'),
                        }),
                    ],
                },
            ]
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageChargedAimed({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.aimed'),
                }),
            ],
        }),
        new FeatureDamageChargedAimed({
            element: 'anemo',
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
        new FeatureDamageSkill({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.jahoda_smoke_bomb_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.jahoda_unfilled_treasure_flask_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.jahoda_filled_treasure_flask_dmg'),
                }),
            ],
        }),
        ...['pyro', 'hydro', 'cryo', 'electro'].map((elem) => 
            new FeatureDamageSkill({
                name: 'jahoda_meowball_dmg_' + elem,
                element: elem,
                multipliers: [
                    new FeatureMultiplier({
                        leveling: 'char_skill_elemental',
                        values: Talents.get('skill.jahoda_meowball_dmg'),
                    }),
                ],
                condition: new ConditionMoonPhaseCheck({ moonphase: 2 }),
            })
        ),
        new FeatureDamageBurst({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.jahoda_purrsonal_coordinated_assistance_robot_dmg'),
                    scalingSource: 'ascension1',
                    scalingMultiplier: charTalentTables.Jahoda.passsive[0][0],
                    scalingMultiplierCondition: new ConditionAnd([
                        new ConditionAscensionChar({ ascension: 1 }),
                        new ConditionBoolean({ name: 'jahoda_a1_pyro' }),
                    ]),
                }),
            ],
        }),
        ...['pyro', 'hydro', 'cryo', 'electro'].map((elem) => 
            new FeatureDamageBurst({
                name: 'jahoda_purrsonal_coordinated_assistance_robot_dmg_' + elem,
                element: elem,
                multipliers: [
                    new FeatureMultiplier({
                        leveling: 'char_skill_burst',
                        values: Talents.get('burst.jahoda_purrsonal_coordinated_assistance_robot_dmg'),
                        scalingSource: 'ascension1',
                        scalingMultiplier: charTalentTables.Jahoda.passsive[0][0],
                        scalingMultiplierCondition: new ConditionAnd([
                            new ConditionAscensionChar({ ascension: 1 }),
                            new ConditionBoolean({ name: 'jahoda_a1_pyro' }),
                        ]),
                    }),
                ],
                condition: new ConditionMoonPhaseCheck({ moonphase: 2 }),
            })
        ),
        new FeatureHeal({
            category: 'burst',
            partyHeal: 1,
            name: 'jahoda_purrsonal_coordinated_assistance_robot_healing',
            multipliers: [
                new FeatureMultiplierList({
                    leveling: 'char_skill_burst',
                    values: Talents.getList('burst.jahoda_purrsonal_coordinated_assistance_robot_healing'),
                    scalingSource: 'ascension1',
                    scalingMultiplier: charTalentTables.Jahoda.passsive[0][1],
                    scalingMultiplierCondition: new ConditionAnd([
                        new ConditionAscensionChar({ ascension: 1 }),
                        new ConditionBoolean({ name: 'jahoda_a1_hydro' }),
                        new ConditionOr([
                            new ConditionBoolean({ name: 'jahoda_a1_pyro', invert: true }),
                            new ConditionAnd([
                                new ConditionConstellation({ constellation: 2 }),
                                new ConditionMoonPhaseCheck({ moonphase: 2 }),
                            ]),
                        ]),
                    ]),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'burst',
            partyHeal: 1,
            name: 'jahoda_lowest_hp_character_additional_healing',
            multipliers: [
                new FeatureMultiplierList({
                    leveling: 'char_skill_burst',
                    values: Talents.getList('burst.jahoda_lowest_hp_character_additional_healing'),
                    scalingSource: 'ascension1',
                    scalingMultiplier: charTalentTables.Jahoda.passsive[0][1],
                    scalingMultiplierCondition: new ConditionAnd([
                        new ConditionAscensionChar({ ascension: 1 }),
                        new ConditionBoolean({ name: 'jahoda_a1_hydro' }),
                        new ConditionOr([
                            new ConditionBoolean({ name: 'jahoda_a1_pyro', invert: true }),
                            new ConditionAnd([
                                new ConditionConstellation({ constellation: 2 }),
                                new ConditionMoonPhaseCheck({ moonphase: 2 }),
                            ]),
                        ]),
                    ]),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionMoonPhaseSetting(),
        new ConditionJahodaParty(),
        new ConditionStatic({
            name: 'jahoda_plan_to_get_paid',
            title: 'talent_name.jahoda_plan_to_get_paid',
            description: 'talent_descr.jahoda_plan_to_get_paid',
            info: {ascension: 1},
            condition: new ConditionAscensionChar({ ascension: 1 }),
            stats: {
                text_percent_dmg: charTalentTables.Jahoda.passsive[0][0] * 100,
                text_percent_heal: charTalentTables.Jahoda.passsive[0][1] * 100,
            }
        }),
        new ConditionBoolean({
            name: 'jahoda_sweet_berry_bounty',
            serializeId: 1,
            title: 'talent_name.jahoda_sweet_berry_bounty',
            description: 'talent_descr.jahoda_sweet_berry_bounty',
            info: {ascension: 4},
            condition: new ConditionAscensionChar({ ascension: 4 }),
            stats: {
                mastery: charTalentTables.Jahoda.passsive[1][0],
            },
        }),
    ],
    multipliers: [
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    name: 'jahoda_one_more_flask',
                    title: 'talent_name.jahoda_one_more_flask',
                    description: 'talent_descr.jahoda_one_more_flask',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    name: 'jahoda_rogues_quick_thinking',
                    title: 'talent_name.jahoda_rogues_quick_thinking',
                    description: 'talent_descr.jahoda_rogues_quick_thinking',
                    condition: new ConditionMoonPhaseCheck({ moonphase: 2 }),
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
                    name: 'jahoda_wild_berry_amid_the_dust',
                    title: 'talent_name.jahoda_wild_berry_amid_the_dust',
                    description: 'talent_descr.jahoda_wild_berry_amid_the_dust',
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
                new ConditionBoolean({
                    name: 'jahoda_the_littlest_luck',
                    title: 'talent_name.jahoda_the_littlest_luck',
                    description: 'talent_descr.jahoda_the_littlest_luck',
                    condition: new ConditionMoonPhaseCheck({ moonphase: 2 }),
                    stats: {
                        crit_rate: charTalentTables.Jahoda.cons[5][0] * 100,
                        crit_dmg: charTalentTables.Jahoda.cons[5][1] * 100,
                    }
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionMoonPhaseSetting(),
            new ConditionBoolean({
                name: 'party.jahoda_sweet_berry_bounty',
                serializeId: 1,
                title: 'talent_name.jahoda_sweet_berry_bounty',
                description: 'talent_descr.jahoda_sweet_berry_bounty',
                info: { ascension: 4 },
                stats: {
                    mastery: charTalentTables.Jahoda.passsive[1][0],
                },
            }),
            new ConditionBoolean({
                name: 'party.jahoda_the_littlest_luck',
                title: 'talent_name.jahoda_the_littlest_luck',
                description: 'talent_descr.jahoda_the_littlest_luck',
                info: { constellation: 6 },
                condition: new ConditionMoonPhaseCheck({ moonphase: 2 }),
                stats: {
                    crit_rate: charTalentTables.Jahoda.cons[5][0] * 100,
                    crit_dmg: charTalentTables.Jahoda.cons[5][1] * 100,
                }
            }),
        ],
    },
});
