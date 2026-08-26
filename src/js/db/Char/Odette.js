import { Condition, ConditionAnd, ConditionOr } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanLevels } from "../../classes/Condition/Boolean/Levels";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNumber } from "../../classes/Condition/Number";
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
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { FeatureReactionStellarConduct } from "../../classes/Feature2/Reaction/Extended/Stellar/Conduct";
import { FeatureReactionStellarSwirlLike } from "../../classes/Feature2/Reaction/Extended/Stellar/SwirlLike";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { StatTable } from "../../classes/StatTable";
import { StatTableConditions } from "../../classes/StatTable/Condition";
import { ValueTable } from "../../classes/ValueTable";
import { conditionDefaultAttack, conditionStellarConductAttack, conditionStellarSwirlAttack } from "../Utils";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";
import { stellarGlimmerConditions } from "./Sandrone";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Odette.s1_id,
        title: 'talent_name.odette_snow_swan_variation',
        description: 'talent_descr.odette_snow_swan_variation',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Odette.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Odette.s1.p2),
            },
            {
                type: 'hits',
                name: 'normal_hit_3',
                table: [
                    new StatTable('normal_hit_3_1', charTalentTables.Odette.s1.p3),
                    new StatTable('normal_hit_3_2', charTalentTables.Odette.s1.p4),
                ],
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Odette.s1.p5),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Odette.s1.p6),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Odette.s1.p7),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Odette.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Odette.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Odette.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Odette.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Odette.s2_id,
        title: 'talent_name.odette_phantom_night_dancers',
        description: 'talent_descr.odette_phantom_night_dancers',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Odette.s2.p1),
            },
            {
                table: new StatTable('odette_coda_at_dawns_tolling_dot', charTalentTables.Odette.s2.p2),
            },
            {
                table: new StatTable('odette_coda_at_dawns_tolling_dmg', charTalentTables.Odette.s2.p3),
            },
            {
                table: new StatTable('odette_coda_at_dawns_tolling_stellar_swirl_dmg', charTalentTables.Odette.s2.p4),
            },
            {
                table: new StatTable('odette_plume_dance_move_dmg', charTalentTables.Odette.s2.p5),
            },
            {
                table: new StatTable('odette_plume_dance_move_stellar_conduct_dmg', charTalentTables.Odette.s2.p6),
            },
            {
                table: new StatTable('odette_plume_dance_move_stellar_swirl_dmg', charTalentTables.Odette.s2.p7),
            },
            {
                table: new StatTable('odette_wing_dance_move_dmg', charTalentTables.Odette.s2.p8),
            },
            {
                table: new StatTable('odette_wing_dance_move_stellar_conduct_dmg', charTalentTables.Odette.s2.p9),
            },
            {
                table: new StatTable('odette_wing_dance_move_stellar_swirl_dmg', charTalentTables.Odette.s2.p10),
            },
            {
                unit: 'sec',
                table: new StatTable('odette_coda_at_dawns_tolling_cd', charTalentTables.Odette.s2.p13),
            },
            {
                unit: 'sec',
                table: new StatTable('odette_solo_dance_double_duration', charTalentTables.Odette.s2.p11),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Odette.s2.p12),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Odette.s3_id,
        title: 'talent_name.odette_bluebird_finale',
        description: 'talent_descr.odette_bluebird_finale',
        items: [
            {
                table: new StatTable('odette_slash_dmg', charTalentTables.Odette.s3.p1),
            },
            {
                table: new StatTable('odette_final_slash_dmg', charTalentTables.Odette.s3.p2),
            },
            {
                table: new StatTable('odette_snow_swans_dream_stellar_glimmer_reaction_dmg_bonus', charTalentTables.Odette.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('odette_snow_swans_dream_duration', charTalentTables.Odette.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('odette_solo_dance_double_duration', charTalentTables.Odette.s3.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Odette.s3.p6),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Odette.s3.p7),
            },
        ],
    },
    links: charTalentTables.Odette.links,
});

const stellarDmgPost = new PostEffectStats({
    from: 'atk*',
    percent: new StatTable('dmg_reaction_stellar_glimmer', [charTalentTables.Odette.passsive[1][1]]),
    statCap: new ValueTable([charTalentTables.Odette.passsive[1][2] * 100]),
    exceed: charTalentTables.Odette.passsive[1][0],
    condition: new ConditionAscensionChar({ ascension: 4 }),
});

const stellarPost = new PostEffectStats({
    from: 'atk*',
    percent: [
        new StatTable('stellar_conduct_multi', [charTalentTables.Odette.passsive[2][0]]),
        new StatTable('stellar_swirl_multi', [charTalentTables.Odette.passsive[2][0]]),
    ],
    statCap: new ValueTable([charTalentTables.Odette.passsive[2][1] * 100]),
});

export const Odette = new DbObjectChar({
    name: 'odette',
    serializeId: 126,
    gameId: charTalentTables.Odette.char_id,
    iconClass: 'char-icon-odette',
    rarity: 5,
    element: 'cryo',
    weapon: charTalentTables.Odette.char_weapon,
    origin: 'snezhnaya',
    talents: Talents,
    statTable: charTables.Odette,
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
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5'),
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
                    values: Talents.get('skill.odette_coda_at_dawns_tolling_dot'),
                }),
            ],
        }),
        new FeatureReactionStellarConduct({
            element: 'cryo',
            category: 'skill',
            name: 'odette_coda_at_dawns_tolling_dmg',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.odette_coda_at_dawns_tolling_dmg'),
                }),
            ],
            condition: new ConditionOr([
                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                new ConditionBoolean({ name: 'common.radiance_stellar_swirl', invert: 1 }),
            ]),
        }),
        new FeatureReactionStellarSwirlLike({
            element: 'cryo',
            category: 'skill',
            name: 'odette_coda_at_dawns_tolling_dmg',
            fullName: 'skill.odette_coda_at_dawns_tolling_stellar_swirl_dmg',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.odette_coda_at_dawns_tolling_stellar_swirl_dmg'),
                }),
            ],
            condition: conditionStellarSwirlAttack,
        }),
        new FeatureDamageSkill({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.odette_plume_dance_move_dmg'),
                }),
            ],
            condition: conditionDefaultAttack,
        }),
        new FeatureReactionStellarConduct({
            element: 'cryo',
            category: 'skill',
            name: 'odette_plume_dance_move_dmg',
            fullName: 'skill.odette_plume_dance_move_stellar_conduct_dmg',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.odette_plume_dance_move_stellar_conduct_dmg'),
                }),
            ],
            condition: conditionStellarConductAttack,
        }),
        new FeatureReactionStellarSwirlLike({
            element: 'cryo',
            category: 'skill',
            name: 'odette_plume_dance_move_dmg',
            fullName: 'skill.odette_plume_dance_move_stellar_swirl_dmg',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.odette_plume_dance_move_stellar_swirl_dmg'),
                }),
            ],
            condition: conditionStellarSwirlAttack,
        }),
        new FeatureDamageSkill({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.odette_wing_dance_move_dmg'),
                }),
            ],
            condition: conditionDefaultAttack,
        }),
        new FeatureReactionStellarConduct({
            element: 'cryo',
            category: 'skill',
            name: 'odette_wing_dance_move_dmg',
            fullName: 'skill.odette_wing_dance_move_stellar_conduct_dmg',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.odette_wing_dance_move_stellar_conduct_dmg'),
                }),
            ],
            condition: conditionStellarConductAttack,
        }),
        new FeatureReactionStellarSwirlLike({
            element: 'cryo',
            category: 'skill',
            name: 'odette_wing_dance_move_dmg',
            fullName: 'skill.odette_wing_dance_move_stellar_swirl_dmg',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.odette_wing_dance_move_stellar_swirl_dmg'),
                }),
            ],
            condition: conditionStellarSwirlAttack,
        }),
        new FeatureDamageBurst({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.odette_slash_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.odette_final_slash_dmg'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            name: 'dmg_reaction_stellar_glimmer_bonus',
            format: 'percent',
            postEffect: stellarDmgPost,
        }),
        new FeaturePostEffectValue({
            name: 'stellarglimmer_base_bonus',
            format: 'percent',
            postEffect: stellarPost,
        }),
    ],
    conditions: [
        ...stellarGlimmerConditions,
        new ConditionStatic({
            title: 'talent_name.odette_spring_rite_of_the_chosen_one',
            description: 'talent_descr.odette_spring_rite_of_the_chosen_one',
            info: { ascension: 1 },
            condition: new ConditionAscensionChar({ ascension: 1 }),
        }),
        new ConditionBoolean({
            name: 'n11500001',
            serializeId: 4,
            title: 'talent_name.n11500001',
            description: 'talent_descr.n11500001_1',
        }),
        new ConditionStacks({
            name: 'n11500003',
            serializeId: 6,
            title: 'talent_name.n11500003',
            description: 'talent_descr.n11500003',
            maxStacks(settings) {
                let cnt = 4;
                if (settings.char_constellation > 0)
                    cnt += 2;
                return cnt;
            },
            stats: [
                new StatTable('dmg_reaction_stellar_glimmer', [15]),
                new StatTableConditions('atk_percent', [charTalentTables.Odette.cons[1][0] * 100], new ConditionConstellation({ constellation: 2 })),
            ],
            condition: new ConditionAscensionChar({ ascension: 1 }),
            condition: new ConditionBoolean({ name: 'n11500001' }),
        }),
        new ConditionBooleanLevels({
            name: 'odette_bluebird_finale',
            serializeId: 5,
            title: 'talent_name.odette_bluebird_finale',
            levelSetting: 'char_skill_burst',
            stats: [
                Talents.getAlias('burst.odette_snow_swans_dream_stellar_glimmer_reaction_dmg_bonus', 'dmg_reaction_stellar_glimmer'),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.odette_pathetique_of_pateticheskaya',
            description: 'talent_descr.odette_pathetique_of_pateticheskaya',
            info: { ascension: 4 },
            condition: new ConditionAscensionChar({ ascension: 4 }),
        }),
        new ConditionStatic({
            title: 'talent_name.odette_dance_of_aurore',
            description: 'talent_descr.odette_dance_of_aurore_1',
            settings: {
                allowed_stellar_conduct: true,
                allowed_stellar_swirl: true,
            }
        }),
    ],
    multipliers: [
    ],
    postEffects: [
        stellarDmgPost,
        stellarPost,
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.odette_on_this_danceless_morn_she_gazes_at_her_reflection',
                    description: 'talent_descr.odette_on_this_danceless_morn_she_gazes_at_her_reflection',
                }),
            ],
            features: [
                new FeatureReactionStellarConduct({
                    element: 'cryo',
                    category: 'skill',
                    name: 'odette_coda_at_dawns_tolling_additional_dmg',
                    multipliers: [
                        new FeatureMultiplier({
                            source: 'constellation1',
                            values: new ValueTable([charTalentTables.Odette.cons[0][3]], 100),
                        }),
                    ],
                    condition: new ConditionOr([
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                        new ConditionBoolean({ name: 'common.radiance_stellar_swirl', invert: 1 }),
                    ]),
                }),
                new FeatureReactionStellarSwirlLike({
                    element: 'cryo',
                    category: 'skill',
                    name: 'odette_coda_at_dawns_tolling_additional_dmg',
                    fullName: 'skill.odette_coda_at_dawns_tolling_stellar_swirl_additional_dmg',
                    multipliers: [
                        new FeatureMultiplier({
                            source: 'constellation1',
                            values: new ValueTable([charTalentTables.Odette.cons[0][4]], 100),
                        }),
                    ],
                    condition: conditionStellarSwirlAttack,
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    name: 'odette_i_must_see_the_snow_swans_unseen_dream_for_myself_she_thought',
                    title: 'talent_name.odette_i_must_see_the_snow_swans_unseen_dream_for_myself_she_thought',
                    description: 'talent_descr.odette_i_must_see_the_snow_swans_unseen_dream_for_myself_she_thought_1',
                }),
                new ConditionStatic({
                    name: 'odette_i_must_see_the_snow_swans_unseen_dream_for_myself_she_thought',
                    title: 'talent_name.odette_i_must_see_the_snow_swans_unseen_dream_for_myself_she_thought',
                    description: 'talent_descr.odette_i_must_see_the_snow_swans_unseen_dream_for_myself_she_thought_2',
                    stats: {
                        enemy_res_electro: -charTalentTables.Odette.cons[1][1] * 100,
                    },
                    condition: new ConditionAnd([
                        new ConditionBoolean({ name: 'n11500001' }),
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                    ]),
                }),
                new ConditionStatic({
                    name: 'odette_i_must_see_the_snow_swans_unseen_dream_for_myself_she_thought',
                    title: 'talent_name.odette_i_must_see_the_snow_swans_unseen_dream_for_myself_she_thought',
                    description: 'talent_descr.odette_i_must_see_the_snow_swans_unseen_dream_for_myself_she_thought_3',
                    stats: {
                        enemy_res_anemo: -charTalentTables.Odette.cons[1][1] * 100,
                    },
                    condition: new ConditionAnd([
                        new ConditionBoolean({ name: 'n11500001' }),
                        new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                    ]),
                }),
                new Condition({
                    isHidden: true,
                    stats: {
                        enemy_res_cryo: -charTalentTables.Odette.cons[1][1] * 100,
                    },
                    condition: new ConditionAnd([
                        new ConditionBoolean({ name: 'n11500001' }),
                        new ConditionOr([
                            new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                            new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                        ]),
                    ]),
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
                    name: 'odette_up_up_the_long_delirious_burning_blue',
                    title: 'talent_name.odette_up_up_the_long_delirious_burning_blue',
                    description: 'talent_descr.odette_up_up_the_long_delirious_burning_blue',
                }),
            ],
            features: [
                new FeatureReactionStellarConduct({
                    element: 'cryo',
                    category: 'other',
                    name: 'odette_assist_dmg',
                    multipliers: [
                        new FeatureMultiplier({
                            source: 'constellation4',
                            values: new ValueTable([charTalentTables.Odette.cons[3][0]], 100),
                        }),
                    ],
                    condition: new ConditionOr([
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                        new ConditionBoolean({ name: 'common.radiance_stellar_swirl', invert: 1 }),
                    ]),
                }),
                new FeatureReactionStellarSwirlLike({
                    element: 'cryo',
                    category: 'other',
                    name: 'odette_assist_dmg',
                    fullName: 'other.odette_assist_stellar_swirl_dmg',
                    multipliers: [
                        new FeatureMultiplier({
                            source: 'constellation4',
                            values: new ValueTable([charTalentTables.Odette.cons[3][1]], 100),
                        }),
                    ],
                    condition: conditionStellarSwirlAttack,
                }),
            ],
        },
        {
            conditions: [
                new Condition({
                    settings: {
                        char_skill_burst_bonus: 3
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.odette_put_out_my_hand_and_touched_the_face_of_the_divine',
                    description: 'talent_descr.odette_put_out_my_hand_and_touched_the_face_of_the_divine_1',
                    stats: {
                        dmg_reaction_stellar_glimmer_bonus: charTalentTables.Odette.cons[5][1] * 100,
                    }
                }),
                new Condition({
                    isHidden: true,
                    stats: {
                        dmg_reaction_stellar_glimmer_bonus: charTalentTables.Odette.cons[5][0] * 100,
                    },
                    condition: new ConditionBoolean({ name: 'n11500003' }),
                })
            ],
        },
    ]),
    partyData: {
        loadStats: {
            stats: ['atk_total'],
            settings: ['char_skill_burst', 'n11500001'],
        },
        conditions: [
            new ConditionNumber({
                name: 'odette_atk_total',
                title: 'talent_name.stats_total_atk',
                partyStat: 'atk_total',
                serializeId: 1,
                max: 10000,
            }),
            new ConditionStatic({
                title: 'talent_name.odette_dance_of_aurore',
                description: 'talent_descr.odette_dance_of_aurore_2',
                settings: {
                    allowed_stellar_conduct: true,
                    allowed_stellar_swirl: true,
                }
            }),
            new ConditionNumberTalent({
                name: 'odette_char_skill_burst',
                title: 'talent_name.stats_level_burst',
                partySetting: 'char_skill_burst',
                serializeId: 2,
            }),
            new ConditionBoolean({
                name: 'party.odette_constellation_5',
                serializeId: 3,
                title: 'talent_name.odette_oh_i_have_slipped_the_surly_bonds_of_earth',
                description: 'talent_descr.char_constellation_burst',
                settings: {
                    odette_char_skill_burst_bonus: 3,
                },
                info: { constellation: 5 },
            }),
            new ConditionBoolean({
                name: 'party.n11500001',
                partySetting: 'n11500001',
                serializeId: 4,
                rotation: 'party',
                title: 'talent_name.n11500001',
                description: 'talent_descr.n11500001_1',
            }),
            new ConditionStacks({
                name: 'party.n11500003',
                serializeId: 5,
                rotation: 'party',
                title: 'talent_name.n11500003',
                description: 'talent_descr.n11500003',
                maxStacks: 6,
                stats: [
                    new StatTable('dmg_reaction_stellar_glimmer', [15]),
                    new StatTableConditions('atk_percent', [charTalentTables.Odette.cons[1][0] * 100], new ConditionBoolean({ name: 'party.odette_i_must_see_the_snow_swans_unseen_dream_for_myself_she_thought' })),
                ],
                info: { ascension: 1 },
                condition: new ConditionBoolean({ name: 'party.n11500001' }),
            }),
            new ConditionBoolean({
                name: 'party.odette_i_must_see_the_snow_swans_unseen_dream_for_myself_she_thought',
                serializeId: 6,
                title: 'talent_name.odette_i_must_see_the_snow_swans_unseen_dream_for_myself_she_thought',
                description: 'talent_descr.odette_i_must_see_the_snow_swans_unseen_dream_for_myself_she_thought_1',
                info: { constellation: 2 },
                condition: new ConditionBoolean({ name: 'party.n11500001' }),
            }),
            new ConditionStatic({
                title: 'talent_name.odette_i_must_see_the_snow_swans_unseen_dream_for_myself_she_thought',
                description: 'talent_descr.odette_i_must_see_the_snow_swans_unseen_dream_for_myself_she_thought_2',
                info: { constellation: 2 },
                stats: {
                    enemy_res_electro: -charTalentTables.Odette.cons[1][1] * 100,
                },
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'party.n11500001' }),
                    new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                ]),
            }),
            new ConditionStatic({
                title: 'talent_name.odette_i_must_see_the_snow_swans_unseen_dream_for_myself_she_thought',
                description: 'talent_descr.odette_i_must_see_the_snow_swans_unseen_dream_for_myself_she_thought_3',
                info: { constellation: 2 },
                stats: {
                    enemy_res_anemo: -charTalentTables.Odette.cons[1][1] * 100,
                },
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'party.n11500001' }),
                    new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                ]),
            }),
            new Condition({
                isHidden: true,
                stats: {
                    enemy_res_cryo: -charTalentTables.Odette.cons[1][1] * 100,
                },
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'party.n11500001' }),
                    new ConditionOr([
                        new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                        new ConditionBoolean({ name: 'common.radiance_stellar_swirl' }),
                    ]),
                ]),
            }),
            new ConditionBooleanLevels({
                name: 'party.odette_up_up_the_long_delirious_burning_blue',
                serializeId: 7,
                title: 'talent_name.odette_up_up_the_long_delirious_burning_blue',
                description: 'talent_descr.odette_up_up_the_long_delirious_burning_blue',
                levelSetting: 'odette_char_skill_burst',
                info: { constellation: 4 },
                stats: [
                    Talents.getAlias('burst.odette_snow_swans_dream_stellar_glimmer_reaction_dmg_bonus', 'dmg_reaction_stellar_glimmer', 0.5),
                ],
            }),
            new ConditionBoolean({
                name: 'party.odette_put_out_my_hand_and_touched_the_face_of_the_divine',
                serializeId: 8,
                title: 'talent_name.odette_put_out_my_hand_and_touched_the_face_of_the_divine',
                description: 'talent_descr.odette_put_out_my_hand_and_touched_the_face_of_the_divine_2',
                stats: {
                    dmg_reaction_stellar_glimmer_bonus: charTalentTables.Odette.cons[5][0] * 100,
                },
                info: { constellation: 6 },
            }),
        ],
        postEffects: [
            new PostEffectStats({
                from: 'odette_atk_total',
                percent: [
                    new StatTable('stellar_conduct_multi', [charTalentTables.Odette.passsive[2][0]]),
                    new StatTable('stellar_swirl_multi', [charTalentTables.Odette.passsive[2][0]]),
                ],
                statCap: new ValueTable([charTalentTables.Odette.passsive[2][1] * 100]),
            }),
        ],
    },
});
