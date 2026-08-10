import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionEnemyStatus } from "../../classes/Condition/Boolean/EnemyStatus";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNumber } from "../../classes/Condition/Number";
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
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { FeatureReactionStellarConduct } from "../../classes/Feature2/Reaction/Extended/Stellar/Conduct";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Qiqi.s1_id,
        title: 'talent_name.qiqi_ancient_sword_art',
        description: 'talent_descr.qiqi_ancient_sword_art',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Qiqi.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Qiqi.s1.p2),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_3', charTalentTables.Qiqi.s1.p3),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_4', charTalentTables.Qiqi.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Qiqi.s1.p5),
            },
            {
                type: 'hits',
                name: 'charged_hit_total',
                table: [
                    new StatTable('charged_hit', charTalentTables.Qiqi.s1.p6),
                    new StatTable('charged_hit', charTalentTables.Qiqi.s1.p6),
                ],
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Qiqi.s1.p7),
            },
            {
                table: new StatTable('plunge', charTalentTables.Qiqi.s1.p6),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Qiqi.s1.p9),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Qiqi.s1.p10),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Qiqi.s2_id,
        title: 'talent_name.qiqi_herald_of_frost',
        getDescription(settings) {
            if (settings.qiqi_seven_sacred_treasures)
                return 'talent_descr.qiqi_herald_of_frost_hex';
            return 'talent_descr.qiqi_herald_of_frost';
        },
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Qiqi.s2.p8),
            },
            {
                type: 'shield',
                unit: 'atk',
                table: [
                    new StatTable('party_heal_on_hit', charTalentTables.Qiqi.s2.p1),
                    new StatTable('', charTalentTables.Qiqi.s2.p2),
                ],
            },
            {
                type: 'shield',
                unit: 'atk',
                table: [
                    new StatTable('heal_dot', charTalentTables.Qiqi.s2.p3),
                    new StatTable('', charTalentTables.Qiqi.s2.p4),
                ],
            },
            {
                table: new StatTable('qiqi_herald_of_frost', charTalentTables.Qiqi.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Qiqi.s2.p6),
            },
            {
                table: new StatTable('qiqi_herald_of_frost_coordinated_attack_dmg', charTalentTables.Qiqi.s2.p9),
            },
            {
                unit: 'sec',
                table: new StatTable('qiqi_herald_of_frost_coordinated_attack_cd', charTalentTables.Qiqi.s2.p10),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Qiqi.s2.p7),
                isHidden(settings) {
                    return settings.qiqi_seven_sacred_treasures;
                },
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Qiqi.s2.p11),
                isHidden(settings) {
                    return !settings.qiqi_seven_sacred_treasures;
                },
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Qiqi.s3_id,
        title: 'talent_name.qiqi_preserver_of_fortune',
        getDescription(settings) {
            if (settings.qiqi_seven_sacred_treasures)
                return 'talent_descr.qiqi_preserver_of_fortune_hex';
            return 'talent_descr.qiqi_preserver_of_fortune';
        },
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Qiqi.s3.p3),
            },
            {
                table: new StatTable('qiqi_stellar_conduct_dmg', charTalentTables.Qiqi.s3.p7),
            },
            {
                type: 'shield',
                unit: 'atk',
                table: [
                    new StatTable('heal', charTalentTables.Qiqi.s3.p1),
                    new StatTable('', charTalentTables.Qiqi.s3.p2),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Qiqi.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Qiqi.s3.p5),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Qiqi.s3.p6),
            },
        ],
    },
    links: charTalentTables.Qiqi.links,
});

const A1HealingRecv = 20;
const C2NormalDmg = 15;

export const Qiqi = new DbObjectChar({
    name: 'qiqi',
    serializeId: 20,
    gameId: 10000035,
    iconClass: "char-icon-qiqi",
    rarity: 5,
    element: 'cryo',
    weapon: 'sword',
    origin: 'liyue',
    talents: Talents,
    statTable: charTables.Qiqi,
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
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_5',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'charged',
            name: 'charged_hit_total',
            allowInfusion: true,
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.charged_hit'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_hit',
            isChild: true,
            hits: 2,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
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
            name: 'skill_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.qiqi_herald_of_frost_coordinated_attack_dmg'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'qiqi_seven_sacred_treasures' }),
        }),
        new FeatureDamageSkill({
            name: 'qiqi_herald_of_frost',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.qiqi_herald_of_frost'),
                }),
            ],
        }),
        new FeatureHeal({
            name: 'party_heal_on_hit',
            category: 'skill',
            partyHeal: true,
            multipliers: [
                new FeatureMultiplierList({
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.party_heal_on_hit'),
                }),
            ],
        }),
        new FeatureHeal({
            name: 'heal_dot',
            category: 'skill',
            multipliers: [
                new FeatureMultiplierList({
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.heal_dot'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureReactionStellarConduct({
            name: 'qiqi_stellar_conduct_dmg',
            category: 'burst',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.qiqi_stellar_conduct_dmg'),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'qiqi_seven_sacred_treasures' }),
                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
            ]),
        }),
        new FeatureHeal({
            name: 'heal',
            category: 'burst',
            multipliers: [
                new FeatureMultiplierList({
                    leveling: 'char_skill_burst',
                    values: Talents.getList('burst.heal'),
                }),
            ],
        }),
        new FeatureHeal({
            name: 'qiqi_divine_suppression',
            category: 'other',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation4',
                    values: new ValueTable([charTalentTables.Qiqi.cons[3][0]], 100),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'qiqi_seven_sacred_treasures' }),
                new ConditionConstellation({ constellation: 4 }),
            ]),
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'qiqi_seven_sacred_treasures',
            serializeId: 3,
            title: 'talent_name.qiqi_seven_sacred_treasures',
            description: 'talent_descr.qiqi_seven_sacred_treasures_1',
        }),
        new ConditionStatic({
            title: 'talent_name.qiqi_seven_sacred_treasures',
            description: 'talent_descr.qiqi_seven_sacred_treasures_2',
            stats: {
                dmg_reaction_stellar_conduct: charTalentTables.Qiqi.passsive[1][0] * 100,
                dmg_reaction_superconduct: charTalentTables.Qiqi.passsive[1][0] * 100,
            },
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'qiqi_seven_sacred_treasures' }),
                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
            ]),
        }),
        new ConditionBoolean({
            name: 'qiqi_life_prolonging_methods',
            serializeId: 1,
            title: 'talent_name.qiqi_life_prolonging_methods',
            description: 'talent_descr.qiqi_life_prolonging_methods',
            stats: {
                healing_recv: A1HealingRecv,
            },
            info: {ascension: 1},
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new ConditionStatic({
            title: 'talent_name.qiqi_a_glimpse_into_arcanum',
            description: 'talent_descr.qiqi_a_glimpse_into_arcanum_hex_1',
            info: { ascension: 4 },
            condition: new ConditionAscensionChar({ ascension: 4 }),
        }),
        new ConditionStatic({
            title: 'talent_name.qiqi_a_glimpse_into_arcanum',
            description: 'talent_descr.qiqi_a_glimpse_into_arcanum_hex_2',
            info: { ascension: 4 },
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'qiqi_seven_sacred_treasures' }),
                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                new ConditionAscensionChar({ ascension: 4 }),
            ]),
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.qiqi_ascetics_of_frost',
                    description: 'talent_descr.qiqi_ascetics_of_frost',
                    hideCondition: new ConditionBoolean({ name: 'qiqi_seven_sacred_treasures' }),
                }),
                new ConditionStatic({
                    title: 'talent_name.qiqi_ascetics_of_frost',
                    description: 'talent_descr.qiqi_ascetics_of_frost_hex',
                    hideCondition: new ConditionBoolean({ name: 'qiqi_seven_sacred_treasures', invert: 1 }),
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.qiqi_frozen_to_the_bone',
                    description: 'talent_descr.qiqi_frozen_to_the_bone_hex_1',
                    stats: {
                        dmg_normal: C2NormalDmg,
                        dmg_charged: C2NormalDmg,
                    },
                    condition: new ConditionEnemyStatus({status: ['cryo']}),
                }),
                new ConditionStatic({
                    name: 'qiqi_frozen_to_the_bone',
                    serializeId: 2,
                    title: 'talent_name.qiqi_frozen_to_the_bone',
                    description: 'talent_descr.qiqi_frozen_to_the_bone_hex_2',
                    hideCondition: new ConditionBoolean({ name: 'qiqi_seven_sacred_treasures', invert: 1 }),
                    stats: {
                        atk_percent: charTalentTables.Qiqi.cons[1][0] * 100,
                    },
                    condition: new ConditionAnd([
                        new ConditionBoolean({ name: 'qiqi_seven_sacred_treasures' }),
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                        new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                    ]),
                }),
            ]
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
                    title: 'talent_name.qiqi_divine_suppression',
                    description: 'talent_descr.qiqi_divine_suppression',
                    hideCondition: new ConditionBoolean({ name: 'qiqi_seven_sacred_treasures' }),
                }),
                new ConditionStatic({
                    title: 'talent_name.qiqi_divine_suppression',
                    description: 'talent_descr.qiqi_divine_suppression_hex',
                    hideCondition: new ConditionBoolean({ name: 'qiqi_seven_sacred_treasures', invert: 1 }),
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
                    title: 'talent_name.qiqi_rite_of_resurrection',
                    description: 'talent_descr.qiqi_rite_of_resurrection',
                    hideCondition: new ConditionBoolean({ name: 'qiqi_seven_sacred_treasures' }),
                }),
                new ConditionStatic({
                    title: 'talent_name.qiqi_rite_of_resurrection',
                    description: 'talent_descr.qiqi_rite_of_resurrection_hex_1',
                    hideCondition: new ConditionBoolean({ name: 'qiqi_seven_sacred_treasures', invert: 1 }),
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
                name: 'qiqi_atk_total',
                title: 'talent_name.stats_total_atk',
                partyStat: 'atk_total',
                serializeId: 4,
                max: 10000,
            }),
            new ConditionBoolean({
                name: 'party.qiqi_seven_sacred_treasures',
                serializeId: 3,
                partySetting: 'qiqi_seven_sacred_treasures',
                title: 'talent_name.qiqi_seven_sacred_treasures',
                description: 'talent_descr.qiqi_seven_sacred_treasures_1',
            }),
            new ConditionStatic({
                title: 'talent_name.qiqi_seven_sacred_treasures',
                description: 'talent_descr.qiqi_seven_sacred_treasures_2',
                stats: {
                    dmg_reaction_stellar_conduct: charTalentTables.Qiqi.passsive[1][0] * 100,
                    dmg_reaction_superconduct: charTalentTables.Qiqi.passsive[1][0] * 100,
                },
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'party.qiqi_seven_sacred_treasures' }),
                    new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                    new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                ]),
            }),
            new ConditionBoolean({
                name: 'party.qiqi_life_prolonging_methods',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.qiqi_life_prolonging_methods',
                description: 'talent_descr.qiqi_life_prolonging_methods',
                info: {ascension: 4},
                stats: {
                    healing_recv: 20,
                },
            }),
            new ConditionBoolean({
                name: 'party.qiqi_rite_of_resurrection',
                serializeId: 2,
                title: 'talent_name.qiqi_rite_of_resurrection',
                description: 'talent_descr.qiqi_rite_of_resurrection_hex_2',
                info: { constellation: 6 },
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'party.qiqi_seven_sacred_treasures' }),
                    new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                    new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                ]),
            }),
        ],
        multipliers: [
            new FeatureMultiplier({
                scaling: 'qiqi_atk_total',
                source: 'qiqi',
                values: new StatTable('', [charTalentTables.Qiqi.cons[5][1]], 100),
                target: new FeatureMultiplierTarget({
                    isReactionFlatBonus: true,
                    tags: 'stellar_conduct_reaction',
                }),
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'party.qiqi_seven_sacred_treasures' }),
                    new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                    new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                    new ConditionBoolean({ name: 'party.qiqi_rite_of_resurrection' }),
                ]),
            }),
        ],
    },
});
