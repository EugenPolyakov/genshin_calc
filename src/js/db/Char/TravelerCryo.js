import { Condition, ConditionAnd } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanLevels } from "../../classes/Condition/Boolean/Levels";
import { ConditionNumber } from "../../classes/Condition/Number";
import { ConditionOr } from "../../classes/Condition/Or";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStacksHidden } from "../../classes/Condition/Stacks/Hidden";
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
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { FeatureReactionStellarConduct } from "../../classes/Feature2/Reaction/Extended/Stellar/Conduct";
import { FeatureReactionStellarSwirlLike } from "../../classes/Feature2/Reaction/Extended/Stellar/SwirlLike";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";
import { travelerElevation } from "./TravelerPyro";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.TravelerCryo.s1_id,
        title: 'talent_name.traveler_foreign_frostglint',
        description: 'talent_descr.traveler_foreign_frostglint',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.TravelerCryo.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.TravelerCryo.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.TravelerCryo.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.TravelerCryo.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.TravelerCryo.s1.p5),
            },
            {
                type: 'hits',
                name: 'charged_hit',
                table: [
                    new StatTable('charged_hit_1', charTalentTables.TravelerCryo.s1.p6),
                    new StatTable('charged_hit_2', charTalentTables.TravelerCryo.s1.p7),
                ],
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.TravelerCryo.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.TravelerCryo.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.TravelerCryo.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.TravelerCryo.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.TravelerCryo.s2_id,
        title: 'talent_name.traveler_ice_fog_piercer_1',
        description: 'talent_descr.traveler_ice_fog_piercer_1',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.TravelerCryo.s2.p1),
            },
            {
                table: new StatTable('traveler_ice_crystal_dmg', charTalentTables.TravelerCryo.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('traveler_frostpierce_star_duration', charTalentTables.TravelerCryo.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.TravelerCryo.s2.p3),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.TravelerCryo.s3_id,
        title: 'talent_name.traveler_frostbound_javelin',
        description: 'talent_descr.traveler_frostbound_javelin',
        items: [
            {
                table: new StatTable('traveler_ice_javelin_dmg', charTalentTables.TravelerCryo.s3.p1),
            },
            {
                table: new StatTable('traveler_frostglow_dmg_bonus', charTalentTables.TravelerCryo.s3.p2),
            },
            {
                table: new StatTable('traveler_stellar_conduct_ice_javelin_single_strike_dmg', charTalentTables.TravelerCryo.s3.p8),
            },
            {
                table: new StatTable('traveler_stellar_conduct_frostglow_dmg_bonus', charTalentTables.TravelerCryo.s3.p9),
            },
            {
                table: new StatTable('traveler_stellar_swirl_ice_javelin_single_strike_dmg', charTalentTables.TravelerCryo.s3.p10),
            },
            {
                table: new StatTable('traveler_stellar_swirl_frostglow_dmg_bonus', charTalentTables.TravelerCryo.s3.p11),
            },
            {
                unit: '',
                table: new StatTable('traveler_no_of_strikes_in_attack', charTalentTables.TravelerCryo.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('traveler_additional_frostglow_attack_strikes_at_stack_max', charTalentTables.TravelerCryo.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.TravelerCryo.s3.p6),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.TravelerCryo.s3.p7),
            },
        ],
    },
    links: charTalentTables.TravelerCryo.links,
});

const emBuffPost = new PostEffectStats({
    from: 'atk*',
    percent: new StatTable('mastery', [charTalentTables.TravelerCryo.passsive[1][0]]),
    statCap: new ValueTable([charTalentTables.TravelerCryo.passsive[1][1]]),
    condition: new ConditionAscensionChar({ ascension: 4 }),
});

const stellarPost = new PostEffectStats({
    from: 'atk*',
    percent: [
        new StatTable('stellar_conduct_multi', [charTalentTables.TravelerCryo.passsive[2][0]], 100),
        new StatTable('stellar_swirl_multi', [charTalentTables.TravelerCryo.passsive[2][2]], 100),
    ],
    statCap: new ValueTable([charTalentTables.TravelerCryo.passsive[2][1] * 100]),
});

export const TravelerCryo = new DbObjectChar({
    name: 'traveler_cryo',
    serializeId: 124,
    gameId: [10000005, 10000007],
    depotIds: [505, 705],
    iconClass: 'char-icon-traveler-girl',
    rarity: 5,
    element: 'cryo',
    weapon: charTalentTables.TravelerCryo.char_weapon,
    origin: 'foreign',
    talents: Talents,
    statTable: charTables.TravelerCryo,
    features: [
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
                new FeatureMultiplier({
                    source: 'ascension1',
                    values: new ValueTable([charTalentTables.TravelerCryo.passsive[0][0]], 100),
                    condition: new ConditionAnd([
                        new ConditionAscensionChar({ ascension: 1 }),
                        new ConditionBoolean({ name: 'traveler_frostpierce_star' }),
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                    ]),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
                new FeatureMultiplier({
                    source: 'ascension1',
                    values: new ValueTable([charTalentTables.TravelerCryo.passsive[0][0]], 100),
                    condition: new ConditionAnd([
                        new ConditionAscensionChar({ ascension: 1 }),
                        new ConditionBoolean({ name: 'traveler_frostpierce_star' }),
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                    ]),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
                new FeatureMultiplier({
                    source: 'ascension1',
                    values: new ValueTable([charTalentTables.TravelerCryo.passsive[0][0]], 100),
                    condition: new ConditionAnd([
                        new ConditionAscensionChar({ ascension: 1 }),
                        new ConditionBoolean({ name: 'traveler_frostpierce_star' }),
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                    ]),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
                new FeatureMultiplier({
                    source: 'ascension1',
                    values: new ValueTable([charTalentTables.TravelerCryo.passsive[0][0]], 100),
                    condition: new ConditionAnd([
                        new ConditionAscensionChar({ ascension: 1 }),
                        new ConditionBoolean({ name: 'traveler_frostpierce_star' }),
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                    ]),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5'),
                }),
                new FeatureMultiplier({
                    source: 'ascension1',
                    values: new ValueTable([charTalentTables.TravelerCryo.passsive[0][0]], 100),
                    condition: new ConditionAnd([
                        new ConditionAscensionChar({ ascension: 1 }),
                        new ConditionBoolean({ name: 'traveler_frostpierce_star' }),
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                    ]),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'charged',
            name: 'charged_hit_total',
            element: (settings) => (settings && settings.traveler_foreign_permafrost) ? 'cryo' : 'phys',
            allowInfusion: true,
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.charged_hit_1'),
                        }),
                        new FeatureMultiplier({
                            source: 'traveler_elevation',
                            values: new ValueTable([charTalentTables.TravelerCryo.passsive[3][7]], 100),
                            condition: new ConditionBoolean({ name: 'traveler_foreign_permafrost' }),
                        }),
                        new FeatureMultiplier({
                            source: 'ascension1',
                            values: new ValueTable([charTalentTables.TravelerCryo.passsive[0][0]], 100),
                            condition: new ConditionAnd([
                                new ConditionAscensionChar({ ascension: 1 }),
                                new ConditionBoolean({ name: 'traveler_frostpierce_star' }),
                                new ConditionBoolean({ name: 'traveler_foreign_permafrost', invert: 1 }),
                                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                            ]),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.charged_hit_2'),
                        }),
                        new FeatureMultiplier({
                            source: 'traveler_elevation',
                            values: new ValueTable([charTalentTables.TravelerCryo.passsive[3][7]], 100),
                            condition: new ConditionBoolean({ name: 'traveler_foreign_permafrost' }),
                        }),
                        new FeatureMultiplier({
                            source: 'ascension1',
                            values: new ValueTable([charTalentTables.TravelerCryo.passsive[0][0]], 100),
                            condition: new ConditionAnd([
                                new ConditionAscensionChar({ ascension: 1 }),
                                new ConditionBoolean({ name: 'traveler_frostpierce_star' }),
                                new ConditionBoolean({ name: 'traveler_foreign_permafrost', invert: 1 }),
                                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                            ]),
                        }),
                    ],
                },
            ],
            condition: new ConditionOr([
                new ConditionAnd([
                    new ConditionBoolean({ name: 'common.enemy_superconduct', invert: 1 }),
                    new ConditionBoolean({ name: 'common.radiance_stellar_swirl', invert: 1 }),
                ]),
                new ConditionBoolean({ name: 'traveler_foreign_permafrost', invert: 1 }),
            ]),
        }),
        new FeatureDamageCharged({
            element: (settings) => (settings && settings.traveler_foreign_permafrost) ? 'cryo' : 'phys',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit_1'),
                }),
                new FeatureMultiplier({
                    source: 'traveler_elevation',
                    values: new ValueTable([charTalentTables.TravelerCryo.passsive[3][7]], 100),
                    condition: new ConditionBoolean({ name: 'traveler_foreign_permafrost' }),
                }),
                new FeatureMultiplier({
                    source: 'ascension1',
                    values: new ValueTable([charTalentTables.TravelerCryo.passsive[0][0]], 100),
                    condition: new ConditionAnd([
                        new ConditionAscensionChar({ ascension: 1 }),
                        new ConditionBoolean({ name: 'traveler_frostpierce_star' }),
                        new ConditionBoolean({ name: 'traveler_foreign_permafrost', invert: 1 }),
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                    ]),
                }),
            ],
            condition: new ConditionOr([
                new ConditionAnd([
                    new ConditionBoolean({ name: 'common.enemy_superconduct', invert: 1 }),
                    new ConditionBoolean({ name: 'common.radiance_stellar_swirl', invert: 1 }),
                ]),
                new ConditionBoolean({ name: 'traveler_foreign_permafrost', invert: 1 }),
            ]),
        }),
        new FeatureDamageCharged({
            element(settings) { return (settings && settings.traveler_foreign_permafrost) ? 'cryo' : 'phys'; },
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit_2'),
                }),
                new FeatureMultiplier({
                    source: 'traveler_elevation',
                    values: new ValueTable([charTalentTables.TravelerCryo.passsive[3][7]], 100),
                    condition: new ConditionBoolean({ name: 'traveler_foreign_permafrost' }),
                }),
                new FeatureMultiplier({
                    source: 'ascension1',
                    values: new ValueTable([charTalentTables.TravelerCryo.passsive[0][0]], 100),
                    condition: new ConditionAnd([
                        new ConditionAscensionChar({ ascension: 1 }),
                        new ConditionBoolean({ name: 'traveler_frostpierce_star' }),
                        new ConditionBoolean({ name: 'traveler_foreign_permafrost', invert: 1 }),
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                    ]),
                }),
            ],
            condition: new ConditionOr([
                new ConditionAnd([
                    new ConditionBoolean({ name: 'common.enemy_superconduct', invert: 1 }),
                    new ConditionBoolean({ name: 'common.radiance_stellar_swirl', invert: 1 }),
                ]),
                new ConditionBoolean({ name: 'traveler_foreign_permafrost', invert: 1 }),
            ]),
        }),
        new FeatureReactionStellarConduct({
            category: 'attack',
            name: 'charged_hit_total',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit_1'),
                }),
                new FeatureMultiplier({
                    source: 'traveler_elevation',
                    values: new ValueTable([charTalentTables.TravelerCryo.passsive[3][7]], 100),
                    condition: new ConditionBoolean({ name: 'traveler_foreign_permafrost' }),
                }),
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit_2'),
                }),
                new FeatureMultiplier({
                    source: 'traveler_elevation',
                    values: new ValueTable([charTalentTables.TravelerCryo.passsive[3][7]], 100),
                    condition: new ConditionBoolean({ name: 'traveler_foreign_permafrost' }),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                new ConditionBoolean({ name: 'traveler_foreign_permafrost' }),
            ]),
        }),
        new FeatureReactionStellarConduct({
            category: 'attack',
            element: 'cryo',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit_1'),
                }),
                new FeatureMultiplier({
                    source: 'traveler_elevation',
                    values: new ValueTable([charTalentTables.TravelerCryo.passsive[3][7]], 100),
                    condition: new ConditionBoolean({ name: 'traveler_foreign_permafrost' }),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                new ConditionBoolean({ name: 'traveler_foreign_permafrost' }),
            ]),
        }),
        new FeatureReactionStellarConduct({
            category: 'attack',
            element: 'cryo',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit_2'),
                }),
                new FeatureMultiplier({
                    source: 'traveler_elevation',
                    values: new ValueTable([charTalentTables.TravelerCryo.passsive[3][7]], 100),
                    condition: new ConditionBoolean({ name: 'traveler_foreign_permafrost' }),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                new ConditionBoolean({ name: 'traveler_foreign_permafrost' }),
            ]),
        }),
        new FeatureReactionStellarSwirlLike({
            category: 'attack',
            name: 'charged_hit_total',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit_1'),
                }),
                new FeatureMultiplier({
                    source: 'traveler_elevation',
                    values: new ValueTable([charTalentTables.TravelerCryo.passsive[3][7]], 100),
                }),
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit_2'),
                }),
                new FeatureMultiplier({
                    source: 'traveler_elevation',
                    values: new ValueTable([charTalentTables.TravelerCryo.passsive[3][7]], 100),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'common.enemy_superconduct', invert: 1 }),
                new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                new ConditionBoolean({ name: 'traveler_foreign_permafrost' }),
            ]),
        }),
        new FeatureReactionStellarSwirlLike({
            category: 'attack',
            element: 'cryo',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit_1'),
                }),
                new FeatureMultiplier({
                    source: 'traveler_elevation',
                    values: new ValueTable([charTalentTables.TravelerCryo.passsive[3][7]], 100),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'common.enemy_superconduct', invert: 1 }),
                new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                new ConditionBoolean({ name: 'traveler_foreign_permafrost' }),
            ]),
        }),
        new FeatureReactionStellarSwirlLike({
            category: 'attack',
            element: 'cryo',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit_2'),
                }),
                new FeatureMultiplier({
                    source: 'traveler_elevation',
                    values: new ValueTable([charTalentTables.TravelerCryo.passsive[3][7]], 100),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'common.enemy_superconduct', invert: 1 }),
                new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                new ConditionBoolean({ name: 'traveler_foreign_permafrost' }),
            ]),
        }),
        new FeatureDamagePlungeCollision({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
                new FeatureMultiplier({
                    source: 'ascension1',
                    values: new ValueTable([charTalentTables.TravelerCryo.passsive[0][0]], 100),
                    condition: new ConditionAnd([
                        new ConditionAscensionChar({ ascension: 1 }),
                        new ConditionBoolean({ name: 'traveler_frostpierce_star' }),
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                    ]),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
                new FeatureMultiplier({
                    source: 'ascension1',
                    values: new ValueTable([charTalentTables.TravelerCryo.passsive[0][0]], 100),
                    condition: new ConditionAnd([
                        new ConditionAscensionChar({ ascension: 1 }),
                        new ConditionBoolean({ name: 'traveler_frostpierce_star' }),
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                    ]),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
                new FeatureMultiplier({
                    source: 'ascension1',
                    values: new ValueTable([charTalentTables.TravelerCryo.passsive[0][0]], 100),
                    condition: new ConditionAnd([
                        new ConditionAscensionChar({ ascension: 1 }),
                        new ConditionBoolean({ name: 'traveler_frostpierce_star' }),
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                    ]),
                }),
            ],
        }),
        new FeatureDamageSkill({
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
                    values: Talents.get('skill.traveler_ice_crystal_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.traveler_ice_javelin_dmg'),
                }),
                new FeatureMultiplier({
                    stacksLeveling: 'n10050002',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.traveler_frostglow_dmg_bonus'),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'common.enemy_superconduct', invert: 1 }),
                new ConditionBoolean({ name: 'common.radiance_stellar_swirl', invert: 1 }),
            ]),
        }),
        new FeatureReactionStellarConduct({
            category: 'burst',
            element: 'cryo',
            name: 'traveler_ice_javelin_dmg',
            fullName: 'burst.traveler_stellar_conduct_ice_javelin_single_strike_dmg',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.traveler_stellar_conduct_ice_javelin_single_strike_dmg'),
                }),
                new FeatureMultiplier({
                    stacksLeveling: 'n10050002',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.traveler_stellar_conduct_frostglow_dmg_bonus'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'common.enemy_superconduct' }),
        }),
        new FeatureReactionStellarSwirlLike({
            category: 'burst',
            element: 'cryo',
            name: 'traveler_ice_javelin_dmg',
            fullName: 'burst.traveler_stellar_swirl_ice_javelin_single_strike_dmg',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.traveler_stellar_swirl_ice_javelin_single_strike_dmg'),
                }),
                new FeatureMultiplier({
                    stacksLeveling: 'n10050002',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.traveler_stellar_swirl_frostglow_dmg_bonus'),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'common.enemy_superconduct', invert: 1 }),
                new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
            ]),
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'mastery_bonus',
            postEffect: emBuffPost,
            condition: new ConditionAscensionChar({ ascension: 4 }),
        }),
        new FeaturePostEffectValue({
            name: 'stellarglimmer_base_bonus',
            format: 'percent',
            postEffect: stellarPost,
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'common.enemy_superconduct',
            serializeId: 1,
            title: 'talent_name.n11330003',
        }),
        new ConditionStacks({
            name: 'common.radiance_stellar_swirl',
            serializeId: 2,
            maxStacks: 2,
            title: 'talent_name.stellar_vortex',
            description: 'talent_descr.stellar_vortex',
        }),
        new ConditionBoolean({
            name: 'traveler_frostpierce_star',
            serializeId: 3,
            title: 'talent_name.traveler_ice_fog_piercer_2',
            description: 'talent_descr.traveler_ice_fog_piercer_2',
        }),
        new ConditionStacks({
            name: 'n10050002',
            serializeId: 7,
            maxStacks: 8,
            title: 'talent_name.n10050002',
            description: 'talent_descr.n10050002',
        }),
        new ConditionStatic({
            title: 'talent_name.traveler_ever_keen_frost',
            description: 'talent_descr.traveler_ever_keen_frost',
            info: { ascension: 1 },
            settings: {
                attack_infusion_cryo: 1,
            },
            condition: new ConditionAnd([
                new ConditionAscensionChar({ ascension: 1 }),
                new ConditionBoolean({ name: 'traveler_frostpierce_star' }),
                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
            ]),
        }),
        new ConditionStatic({
            title: 'talent_name.traveler_lucent_ice',
            description: 'talent_descr.traveler_lucent_ice',
            info: { ascension: 4 },
            condition: new ConditionAscensionChar({ ascension: 4 }),
        }),
        new ConditionBoolean({
            name: 'traveler_swordfighting_techniques',
            serializeId: 4,
            title: 'talent_name.traveler_swordfighting_techniques',
            description: 'talent_descr.traveler_swordfighting_techniques',
            stats: {
                atk_base: 3,
            },
        }),
        new ConditionBoolean({
            name: 'traveler_special_training',
            serializeId: 5,
            title: 'talent_name.traveler_special_training',
            description: 'talent_descr.traveler_special_training',
            stats: {
                atk_base: 7,
                mastery: 15,
                hp_base: 50,
            },
        }),
        travelerElevation,
        new ConditionStatic({
            title: 'talent_name.traveler_illusory_frostmirror',
            description: 'talent_descr.traveler_illusory_frostmirror_1',
            settings: {
                allowed_stellar_conduct: true,
                allowed_stellar_swirl: true,
            }
        }),
        new ConditionBoolean({
            name: 'traveler_foreign_permafrost',
            serializeId: 6,
            title: 'talent_name.traveler_foreign_permafrost',
            description: 'talent_descr.traveler_foreign_permafrost',
        }),
    ],
    multipliers: [
    ],
    postEffects: [
        emBuffPost,
        stellarPost,
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    name: 'traveler_somber_freeze',
                    title: 'talent_name.traveler_somber_freeze',
                    description: 'talent_descr.traveler_somber_freeze',
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'traveler_frostfall_reverberation',
                    serializeId: 8,
                    title: 'talent_name.traveler_frostfall_reverberation',
                    description: 'talent_descr.traveler_frostfall_reverberation_1',
                    stats: {
                        mastery: charTalentTables.TravelerCryo.cons[1][0],
                    },
                }),
                new ConditionBoolean({
                    name: 'traveler_frostfall_reverberation_2',
                    serializeId: 9,
                    title: 'talent_name.traveler_frostfall_reverberation',
                    description: 'talent_descr.traveler_frostfall_reverberation_2',
                    stats: {
                        mastery: charTalentTables.TravelerCryo.cons[1][0],
                    },
                    condition: new ConditionBoolean({ name: 'traveler_frostfall_reverberation' }),
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
                    name: 'traveler_enduring_ice',
                    title: 'talent_name.traveler_enduring_ice',
                    description: 'talent_descr.traveler_enduring_ice',
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
                    name: 'traveler_brumal_grimfrost',
                    serializeId: 10,
                    title: 'talent_name.traveler_brumal_grimfrost',
                    description: 'talent_descr.traveler_brumal_grimfrost',
                }),
                new ConditionStacksHidden({
                    name: 'n10050002',
                    maxStacks: 8,
                    stats: [
                        new StatTable('dmg_reaction_stellar_glimmer', [charTalentTables.TravelerCryo.cons[5][0]], 100)
                    ],
                    condition: new ConditionAnd([
                        new ConditionBoolean({ name: 'traveler_brumal_grimfrost' }),
                        new ConditionBoolean({ name: 'common.char_status_off_field', invert: 1 }),
                    ]),
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            stats: ['atk_total'],
            settings: ['traveler_frostfall_reverberation', 'traveler_frostfall_reverberation_2', 'n10050002'],
        },
        conditions: [
            new ConditionNumber({
                name: 'traveler_atk_total',
                title: 'talent_name.stats_total_atk',
                partyStat: 'atk_total',
                serializeId: 1,
                max: 10000,
            }),
            new ConditionStatic({
                title: 'talent_name.traveler_illusory_frostmirror',
                description: 'talent_descr.traveler_illusory_frostmirror_2',
                settings: {
                    allowed_stellar_conduct: true,
                    allowed_stellar_swirl: true,
                }
            }),
            new ConditionBoolean({
                name: 'party.traveler_frostfall_reverberation',
                partySetting: 'traveler_frostfall_reverberation',
                serializeId: 2,
                title: 'talent_name.traveler_frostfall_reverberation',
                description: 'talent_descr.traveler_frostfall_reverberation_1',
                info: { constellation: 2 },
                stats: {
                    mastery: charTalentTables.TravelerCryo.cons[1][0],
                },
            }),
            new ConditionBoolean({
                name: 'party.traveler_frostfall_reverberation_2',
                partySetting: 'traveler_frostfall_reverberation_2',
                serializeId: 3,
                title: 'talent_name.traveler_frostfall_reverberation',
                description: 'talent_descr.traveler_frostfall_reverberation_2',
                info: { constellation: 2 },
                stats: {
                    mastery: charTalentTables.TravelerCryo.cons[1][0],
                },
                condition: new ConditionBoolean({ name: 'party.traveler_frostfall_reverberation' }),
            }),
            new ConditionStacks({
                name: 'party.traveler_brumal_grimfrost',
                partySetting: 'n10050002',
                serializeId: 4,
                title: 'talent_name.traveler_brumal_grimfrost',
                description: 'talent_descr.traveler_brumal_grimfrost',
                maxStacks: 8,
                info: { constellation: 6 },
                stats: [
                    new StatTable('dmg_reaction_stellar_glimmer', [charTalentTables.TravelerCryo.cons[5][0]], 100)
                ],
                condition: new ConditionBoolean({ name: 'common.char_status_off_field', invert: 1 }),
            }),
        ],
        postEffects: [
            new PostEffectStats({
                from: 'traveler_atk_total',
                percent: new StatTable('stellar_conduct_multi', [charTalentTables.TravelerCryo.passsive[2][0]], 100),
                statCap: new ValueTable([charTalentTables.Sandrone.passsive[2][1] * 100]),
            }),
            new PostEffectStats({
                from: 'traveler_atk_total',
                percent: new StatTable('stellar_swirl_multi', [charTalentTables.TravelerCryo.passsive[2][2]], 100),
                statCap: new ValueTable([charTalentTables.TravelerCryo.passsive[2][1] * 100]),
            }),
        ],
    },
});
