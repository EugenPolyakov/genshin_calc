import { Condition, ConditionAnd } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanValue } from "../../classes/Condition/Boolean/Value";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionConverter } from "../../classes/Condition/Converter";
import { ConditionNot } from "../../classes/Condition/Not";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { ConditionStaticLevel } from "../../classes/Condition/Static/Level";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierWriothesley } from "../../classes/Feature2/Multiplier/Wriothesley";
import { FeatureReactionStellarConduct } from "../../classes/Feature2/Reaction/Extended/StellarConduct";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Wriothesley.s1_id,
        title: 'talent_name.wriothesley_forceful_fists_of_frost',
        description: 'talent_descr.wriothesley_forceful_fists_of_frost',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Wriothesley.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Wriothesley.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Wriothesley.s1.p3),
            },
            {
                type: 'multihit_sum',
                hits: 2,
                table: new StatTable('normal_hit_4', charTalentTables.Wriothesley.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Wriothesley.s1.p6),
            },
            {
                table:  new StatTable('charged_hit', charTalentTables.Wriothesley.s1.p7),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Wriothesley.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Wriothesley.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Wriothesley.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Wriothesley.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Wriothesley.s2_id,
        title: 'talent_name.wriothesley_icefang_rush_1',
        description: 'talent_descr.wriothesley_icefang_rush_1',
        items: [
            {
                unit: 'normal_attack',
                table: new StatTable('wriothesley_enhanced_repelling_fist', charTalentTables.Wriothesley.s2.p1),
            },
            {
                unit: 'hp',
                table: new StatTable('hp_cost', charTalentTables.Wriothesley.s2.p2),
            },
            {
                unit: 'unit',
                table: new StatTable('duration', charTalentTables.Wriothesley.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Wriothesley.s2.p4),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Wriothesley.s3_id,
        title: 'talent_name.wriothesley_darkgold_wolfbite',
        description: 'talent_descr.wriothesley_darkgold_wolfbite',
        items: [
            {
                type: 'multihit',
                hits: 5,
                table: new StatTable('burst_dmg', charTalentTables.Wriothesley.s3.p1),
            },
            {
                table: new StatTable('surging_blade_dmg', charTalentTables.Wriothesley.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Wriothesley.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('surging_blade_interval', charTalentTables.Wriothesley.s3.p5),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Wriothesley.s3.p4),
            },
        ],
    },
    links: charTalentTables.Wriothesley.links,
});

export const Wriothesley = new DbObjectChar({
    name: 'wriothesley',
    serializeId: 76,
    gameId: 10000086,
    iconClass: 'char-icon-wriothesley',
    rarity: 5,
    element: 'cryo',
    weapon: 'catalyst',
    origin: 'fontaine',
    talents: Talents,
    statTable: charTables.Wriothesley,
    features: [
        new FeatureDamageNormal({
            element: 'cryo',
            critRateBonuses: ['crit_rate_enhancement_wriothesley'],
            critDamageBonuses: ['crit_dmg_enhancement_wriothesley'],
            multipliers: [
                new FeatureMultiplierWriothesley({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                    scalingValues: Talents.get('skill.wriothesley_enhanced_repelling_fist'),
                    //идеальный вариант, но не совсем точный из-за плохого множителя 0.01
                    //scalingValues: Talents.getAlias('skill.wriothesley_enhanced_repelling_fist', '', 0.01),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'cryo',
            critRateBonuses: ['crit_rate_enhancement_wriothesley'],
            critDamageBonuses: ['crit_dmg_enhancement_wriothesley'],
            multipliers: [
                new FeatureMultiplierWriothesley({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                    scalingValues: Talents.get('skill.wriothesley_enhanced_repelling_fist'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'cryo',
            critRateBonuses: ['crit_rate_enhancement_wriothesley'],
            critDamageBonuses: ['crit_dmg_enhancement_wriothesley'],
            multipliers: [
                new FeatureMultiplierWriothesley({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                    scalingValues: Talents.get('skill.wriothesley_enhanced_repelling_fist'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionAscensionChar({ ascension: 1 }),
                new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                new ConditionBoolean({ name: 'wriothesley_chilling_penalty' }),
            ]),
        }),
        new FeatureReactionStellarConduct({
            category: 'attack',
            element: 'cryo',
            critRateBonuses: ['crit_rate_enhancement_wriothesley'],
            critDamageBonuses: ['crit_dmg_enhancement_wriothesley'],
            multipliers: [
                new FeatureMultiplierWriothesley({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                    scalingValues: Talents.get('skill.wriothesley_enhanced_repelling_fist'),
                    scalingSource: 'ascension1',
                    scalingMultiplier: 0.6,
                    customScalingValue: 0.2,
                    customScalingCondition: new ConditionAnd([
                        new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                        new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                        new ConditionConstellation({ constellation: 2 }),
                        new ConditionBooleanValue({
                            setting: 'wriothesley_reckoning_for_sin',
                            cond: 'ge',
                            value: 5,
                        }),
                    ]),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionAscensionChar({ ascension: 1 }),
                new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                new ConditionBoolean({ name: 'wriothesley_chilling_penalty' }),
            ]),
        }),
        new FeatureDamageMultihit({
            name: 'normal_hit_4',
            element: 'cryo',
            category: 'attack',
            damageType: 'normal',
            critRateBonuses: ['crit_rate_enhancement_wriothesley'],
            critDamageBonuses: ['crit_dmg_enhancement_wriothesley'],
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplierWriothesley({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_4'),
                            scalingValues: Talents.get('skill.wriothesley_enhanced_repelling_fist'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4_1',
            element: 'cryo',
            hits: 2,
            isChild: true,
            critRateBonuses: ['crit_rate_enhancement_wriothesley'],
            critDamageBonuses: ['crit_dmg_enhancement_wriothesley'],
            multipliers: [
                new FeatureMultiplierWriothesley({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                    scalingValues: Talents.get('skill.wriothesley_enhanced_repelling_fist'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'cryo',
            critRateBonuses: ['crit_rate_enhancement_wriothesley'],
            critDamageBonuses: ['crit_dmg_enhancement_wriothesley'],
            multipliers: [
                new FeatureMultiplierWriothesley({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5'),
                    scalingValues: Talents.get('skill.wriothesley_enhanced_repelling_fist'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionAscensionChar({ ascension: 1 }),
                new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                new ConditionBoolean({ name: 'wriothesley_chilling_penalty' }),
            ]),
        }),
        new FeatureReactionStellarConduct({
            category: 'attack',
            element: 'cryo',
            damageBonuses: ['dmg_reaction_stellar_conduct_wriothesley_hit_5'],
            critRateBonuses: ['crit_rate_enhancement_wriothesley'],
            critDamageBonuses: ['crit_dmg_enhancement_wriothesley'],
            multipliers: [
                new FeatureMultiplierWriothesley({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5'),
                    scalingValues: Talents.get('skill.wriothesley_enhanced_repelling_fist'),
                    scalingSource: 'ascension1',
                    scalingMultiplier: 0.8,
                    customScalingValue: 0.4,
                    customScalingCondition: new ConditionAnd([
                        new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                        new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                        new ConditionConstellation({ constellation: 2 }),
                        new ConditionBooleanValue({
                            setting: 'wriothesley_reckoning_for_sin',
                            cond: 'ge',
                            value: 5,
                        }),
                    ]),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionAscensionChar({ ascension: 1 }),
                new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                new ConditionBoolean({ name: 'wriothesley_chilling_penalty' }),
            ]),
        }),
        new FeatureReactionStellarConduct({
            category: 'attack',
            name: 'wriothesley_normal_hit_5_icicle',
            element: 'cryo',
            damageBonuses: ['dmg_reaction_stellar_conduct_wriothesley_hit_5'],
            critRateBonuses: ['crit_rate_enhancement_wriothesley'],
            critDamageBonuses: ['crit_dmg_enhancement_wriothesley'],
            multipliers: [
                new FeatureMultiplierWriothesley({
                    leveling: 'char_skill_attack',
                    values: Talents.getAlias('attack.normal_hit_5', '', 0.2),
                    scalingValues: Talents.get('skill.wriothesley_enhanced_repelling_fist'),
                    scalingSource: 'ascension1',
                    scalingMultiplier: 0.8,
                    customScalingValue: 0.4,
                    customScalingCondition: new ConditionAnd([
                        new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                        new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                        new ConditionConstellation({ constellation: 2 }),
                        new ConditionBooleanValue({
                            setting: 'wriothesley_reckoning_for_sin',
                            cond: 'ge',
                            value: 5,
                        }),
                    ]),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionAscensionChar({ ascension: 1 }),
                new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                new ConditionBoolean({ name: 'wriothesley_chilling_penalty' }),
            ]),
        }),
        new FeatureDamageCharged({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'wriothesley_vaulting_fist_dmg',
            element: 'cryo',
            damageBonuses: ['dmg_charged_wriothesley'],
            critRateBonuses: ['crit_rate_charged_wriothesley'],
            critDamageBonuses: ['crit_dmg_charged_wriothesley'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
            ]),
        }),
        new FeatureReactionStellarConduct({
            fullName: 'attack.wriothesley_vaulting_fist_stellar_dmg',
            name: 'wriothesley_vaulting_fist_dmg',
            category: 'attack',
            element: 'cryo',
            damageBonuses: ['dmg_reaction_stellar_conduct_wriothesley_fist'],
            critRateBonuses: ['crit_rate_enhancement_wriothesley'],
            critDamageBonuses: ['crit_dmg_enhancement_wriothesley'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    scalingMultiplier: 1.5,
                    scalingSource: 'constellation2',
                    scalingMultiplierCondition: new ConditionConstellation({ constellation: 2 }),
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
            ]),
        }),
        new FeatureReactionStellarConduct({
            name: 'wriothesley_vaulting_fist_stellar_icicle_dmg',
            category: 'attack',
            element: 'cryo',
            damageBonuses: ['dmg_reaction_stellar_conduct_wriothesley_fist'],
            critRateBonuses: ['crit_rate_enhancement_wriothesley'],
            critDamageBonuses: ['crit_dmg_enhancement_wriothesley'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    scalingMultiplier: 1.5,
                    scalingSource: 'constellation2',
                    scalingMultiplierCondition: new ConditionConstellation({ constellation: 2 }),
                    values: Talents.getAlias('attack.charged_hit', '', 0.2),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
            ]),
        }),
        new FeatureHeal({
            name: 'wriothesley_vaulting_fist_heal',
            category: 'attack',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'ascension1',
                    leveling: 'wriothesley_heal_level',
                    values: new ValueTable([30, 50]),
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
        new FeatureDamageBurst({
            element: 'cryo',
            damageBonuses: ['dmg_burst_wriothesley'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'wriothesley_there_shall_be_an_unveiling_for_injustice',
            serializeId: 5,
            title: 'talent_name.wriothesley_there_shall_be_an_unveiling_for_injustice',
            description: 'talent_descr.wriothesley_there_shall_be_an_unveiling_for_injustice_2',
        }),
        new ConditionStatic({
            title: 'talent_name.wriothesley_there_shall_be_an_unveiling_for_injustice',
            description: 'talent_descr.wriothesley_there_shall_be_an_unveiling_for_injustice_3',
            stats: {
                dmg_reaction_stellar_conduct: charTalentTables.Wriothesley.passsive[2][3] * 100,
            },
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
            ]),
        }),
        new ConditionBoolean({
            name: 'wriothesley_chilling_penalty',
            serializeId: 1,
            title: 'talent_name.wriothesley_icefang_rush_2',
            description: 'talent_descr.wriothesley_icefang_rush_2',
        }),
        new ConditionStatic({
            title: 'talent_name.wriothesley_there_shall_be_a_plea_for_justice',
            description: 'talent_descr.wriothesley_there_shall_be_a_plea_for_justice',
            stats: {
                dmg_charged_wriothesley: charTalentTables.Wriothesley.passsive[0][1] * 100,
            },
            info: { ascension: 1 },
            hideCondition: new ConditionAnd([
                new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
            ]),
            condition: new ConditionAnd([
                new ConditionAscensionChar({ ascension: 1 }),
                new ConditionNot([
                    new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                    new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                    new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                ]),
            ]),
        }),
        new ConditionStatic({
            title: 'talent_name.wriothesley_there_shall_be_a_plea_for_justice',
            description: 'talent_descr.wriothesley_there_shall_be_an_unveiling_for_injustice_1',
            info: { ascension: 1 },
            hideCondition: new ConditionNot([
                new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
            ]),
            condition: new ConditionAnd([
                new ConditionAscensionChar({ ascension: 1 }),
                new ConditionAnd([
                    new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                    new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                    new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                ]),
            ]),
        }),
        new ConditionStacks({
            name: 'wriothesley_reckoning_for_sin',
            serializeId: 2,
            title: 'talent_name.wriothesley_there_shall_be_a_reckoning_for_sin',
            description: 'talent_descr.wriothesley_there_shall_be_a_reckoning_for_sin',
            maxStacks: 5,
            stats: [
                new StatTable('atk_percent', [6]),
            ],
            info: { ascension: 4 },
            condition: new ConditionAnd([
                new ConditionAscensionChar({ascension: 4}),
            ]),
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.wriothesley_terror_for_the_evildoers',
                    description: 'talent_descr.wriothesley_terror_for_the_evildoers',
                    stats: {
                        dmg_charged_wriothesley: 150,
                    },
                    hideCondition: new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                    condition: new ConditionAnd([
                        new ConditionAscensionChar({ ascension: 1 }),
                        new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice', invert: 1 }),
                    ]),
                }),
                new ConditionStatic({
                    title: 'talent_name.wriothesley_terror_for_the_evildoers',
                    description: 'talent_descr.wriothesley_terror_for_the_evildoers_hex_1',
                    stats: {
                        dmg_charged_wriothesley: 150,
                    },
                    hideCondition: new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice', invert: 1 }),
                    condition: new ConditionAnd([
                        new ConditionAscensionChar({ ascension: 1 }),
                        new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                    ]),
                }),
                new ConditionBoolean({
                    name: 'wriothesley_terror_for_the_evildoers_1',
                    serializeId: 6,
                    title: 'talent_name.wriothesley_terror_for_the_evildoers',
                    description: 'talent_descr.wriothesley_terror_for_the_evildoers_hex_2',
                    stats: {
                        dmg_reaction_stellar_conduct_wriothesley_hit_5: charTalentTables.Wriothesley.cons[0][3] * 100,
                    },
                    hideCondition: new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice', invert: 1 }),
                    condition: new ConditionAnd([
                        new ConditionAscensionChar({ ascension: 1 }),
                        new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                    ]),
                }),
                new ConditionBoolean({
                    name: 'wriothesley_terror_for_the_evildoers_2',
                    serializeId: 7,
                    title: 'talent_name.wriothesley_terror_for_the_evildoers',
                    description: 'talent_descr.wriothesley_terror_for_the_evildoers_hex_3',
                    stats: {
                        dmg_reaction_stellar_conduct_wriothesley_fist: charTalentTables.Wriothesley.cons[0][4] * 100,
                    },
                    hideCondition: new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice', invert: 1 }),
                    condition: new ConditionAnd([
                        new ConditionAscensionChar({ ascension: 1 }),
                        new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                    ]),
                }),
            ],
        },
        {
            conditions: [
                new ConditionStaticLevel({
                    title: 'talent_name.wriothesley_shackles_for_the_arrogant',
                    description: 'talent_descr.wriothesley_shackles_for_the_arrogant',
                    levelSetting: 'wriothesley_reckoning_for_sin',
                    fromZero: true,
                    stats: [
                        new StatTable('dmg_burst_wriothesley', [0, 40, 80, 120, 160, 200]),
                    ],
                    hideCondition: new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                    condition: new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice', invert: 1 }),
                }),
                new ConditionStaticLevel({
                    title: 'talent_name.wriothesley_shackles_for_the_arrogant',
                    description: 'talent_descr.wriothesley_shackles_for_the_arrogant_hex',
                    levelSetting: 'wriothesley_reckoning_for_sin',
                    fromZero: true,
                    stats: [
                        new StatTable('dmg_burst_wriothesley', [0, 40, 80, 120, 160, 200]),
                    ],
                    hideCondition: new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice', invert: 1 }),
                    condition: new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                }),
                new Condition({
                    isHidden: true,
                    stats: {
                        dmg_charged: charTalentTables.Wriothesley.cons[1][2] * 100,
                        dmg_normal: charTalentTables.Wriothesley.cons[1][1] * 100,
                    },
                    condition: new ConditionAnd([
                        new ConditionBooleanValue({
                            setting: 'wriothesley_reckoning_for_sin',
                            cond: 'ge',
                            value: 5,
                        }),
                        new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                        new ConditionNot([
                            new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                            new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                        ]),
                    ]),
                })
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
                    title: 'talent_name.wriothesley_redemption_for_the_suffering',
                    description: 'talent_descr.wriothesley_redemption_for_the_suffering_1',
                    settings: {
                        wriothesley_heal_level: 2,
                    },
                    condition: new ConditionAnd([
                        new ConditionAscensionChar({ascension: 1}),
                    ]),
                }),
                new ConditionConverter({
                    oldType: "checkbox",
                    serializeId: 3,
                    newType(result) {
                        result['common.char_status_off_field'] = false;
                        result['wriothesley_redemption_for_the_suffering'] = true;
                    }
                }),
                new ConditionConverter({
                    oldType: "checkbox",
                    serializeId: 4,
                    newType(result) {
                        result['common.char_status_off_field'] = true;
                        result['wriothesley_redemption_for_the_suffering'] = true;
                    }
                }),
                new ConditionBoolean({
                    name: 'wriothesley_redemption_for_the_suffering',
                    serializeId: 8,
                    title: 'talent_name.wriothesley_redemption_for_the_suffering',
                    description: 'talent_descr.wriothesley_redemption_for_the_suffering_2',
                    condition: new ConditionNot([
                        new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                        new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                    ]),
                }),
                new ConditionBoolean({
                    name: 'common.char_status_off_field',
                    serializeId: 9,
                    title: 'weapon_settings.off_field',
                }),
                new Condition({
                    isHidden: true,
                    stats: {
                        atk_speed_normal: 20,
                    },
                    condition: new ConditionAnd([
                        new ConditionNot([
                            new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                            new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                            new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                        ]),
                        new ConditionBoolean({ name: 'common.char_status_off_field', invert: 1 }),
                        new ConditionBoolean({ name: 'wriothesley_redemption_for_the_suffering' }),
                    ]),
                }),
                new Condition({
                    isHidden: true,
                    stats: {
                        atk_speed_normal: 10,
                    },
                    condition: new ConditionAnd([
                        new ConditionNot([
                            new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                            new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                            new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                        ]),
                        new ConditionBoolean({ name: 'common.char_status_off_field' }),
                        new ConditionBoolean({ name: 'wriothesley_redemption_for_the_suffering' }),
                    ]),
                }),
                new ConditionStatic({
                    title: 'talent_name.wriothesley_redemption_for_the_suffering',
                    description: 'talent_descr.wriothesley_redemption_for_the_suffering_hex',
                    stats: {
                        atk_speed_normal: 20,
                    },
                    condition: new ConditionAnd([
                        new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                        new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                    ]),
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
                    title: 'talent_name.wriothesley_esteem_for_the_innocent',
                    description: 'talent_descr.wriothesley_esteem_for_the_innocent',
                    stats: {
                        crit_rate_charged_wriothesley: 10,
                        crit_dmg_charged_wriothesley: 80,
                    },
                    condition: new ConditionAnd([
                        new ConditionAscensionChar({ ascension: 1 }),
                        new ConditionNot([
                            new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                            new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                            new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                        ]),
                    ]),
                }),
                new ConditionStatic({
                    title: 'talent_name.wriothesley_esteem_for_the_innocent',
                    description: 'talent_descr.wriothesley_esteem_for_the_innocent_hex',
                    stats: {
                        crit_rate_enhancement_wriothesley: 10,
                        crit_dmg_enhancement_wriothesley: 80,
                    },
                    condition: new ConditionAnd([
                        new ConditionAscensionChar({ ascension: 1 }),
                        new ConditionBoolean({ name: 'wriothesley_there_shall_be_an_unveiling_for_injustice' }),
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                        new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
                    ]),
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.wriothesley_redemption_for_the_suffering_2',
                serializeId: 1,
                title: 'talent_name.wriothesley_redemption_for_the_suffering_3',
                description: 'talent_descr.wriothesley_redemption_for_the_suffering_4',
                info: {constellation: 4},
                stats: {
                    atk_speed_normal: 10,
                },
            }),
        ],
    },
});
