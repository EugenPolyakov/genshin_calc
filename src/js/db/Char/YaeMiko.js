import { Condition, ConditionAnd } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionLevelSelect } from "../../classes/Condition/LevelSelect";
import { ConditionOr } from "../../classes/Condition/Or";
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
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { FeatureReactionStellarConduct } from "../../classes/Feature2/Reaction/Extended/StellarConduct";
import { PostEffectStatsMastery } from "../../classes/PostEffect/Stats/Mastery";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.YaeMiko.s1_id,
        title: 'talent_name.yae_miko_spiritfox_sin_eater',
        description: 'talent_descr.yae_miko_spiritfox_sin_eater',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.YaeMiko.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.YaeMiko.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.YaeMiko.s1.p3),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.YaeMiko.s1.p4),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.YaeMiko.s1.p5),
            },
            {
                table: new StatTable('plunge', charTalentTables.YaeMiko.s1.p6),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.YaeMiko.s1.p7),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.YaeMiko.s1.p8),

            },
        ],
    },
    skill: {
        gameId: charTalentTables.YaeMiko.s2_id,
        title: 'talent_name.yae_miko_sesshou_sakura',
        description: 'talent_descr.yae_miko_sesshou_sakura',
        items: [
            {
                table: new StatTable('yae_miko_level_1', charTalentTables.YaeMiko.s2.p1),
            },
            {
                table: new StatTable('yae_miko_level_2', charTalentTables.YaeMiko.s2.p2),
            },
            {
                table: new StatTable('yae_miko_level_3', charTalentTables.YaeMiko.s2.p3),
            },
            {
                table: new StatTable('yae_miko_level_4', charTalentTables.YaeMiko.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.YaeMiko.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.YaeMiko.s2.p6),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.YaeMiko.s3_id,
        title: 'talent_name.yae_miko_tenko_kenshin',
        getDescription(settings) {
            if (settings.yae_miko_edict_of_cleansing)
                return 'talent_descr.yae_miko_tenko_kenshin_hex';
            return 'talent_descr.yae_miko_tenko_kenshin';
        },
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.YaeMiko.s3.p1),
            },
            {
                table: new StatTable('yae_miko_tenko_thunderbolt_dmg', charTalentTables.YaeMiko.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.YaeMiko.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.YaeMiko.s3.p4),
            },
        ],
    },
    links: charTalentTables.YaeMiko.links,
});

const skillDmgPost = new PostEffectStatsMastery({
    global: true,
    percent: new StatTable('dmg_skill_yaemiko', [0.15]),
    conditions: [
        new ConditionAscensionChar({ascension: 4}),
    ],
});

export const YaeMiko = new DbObjectChar({
    name: 'yae_miko',
    serializeId: 49,
    gameId: 10000058,
    iconClass: "char-icon-yae-miko",
    rarity: 5,
    element: 'electro',
    weapon: 'catalyst',
    origin: 'inazuma',
    talents: Talents,
    statTable: charTables.YaeMiko,
    features: [
        new FeatureDamageNormal({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'electro',
            damageBonuses: ['dmg_skill_yaemiko'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.yae_miko_level_1'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'electro',
            damageBonuses: ['dmg_skill_yaemiko'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.yae_miko_level_2'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'electro',
            damageBonuses: ['dmg_skill_yaemiko'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.yae_miko_level_3'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'electro',
            damageBonuses: ['dmg_skill_yaemiko'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.yae_miko_level_4'),
                }),
            ],
            condition: new ConditionConstellation({ constellation: 2 }),
        }),
        new FeatureReactionStellarConduct({
            element: 'electro',
            category: 'skill',
            name: 'yae_miko_additional_sesshou_sakura_dmg',
            //damageBonuses: ['dmg_skill_yaemiko'],
            multipliers: [
                new FeatureMultiplier({
                    values: new ValueTable([charTalentTables.YaeMiko.passsive[2][2]], 100),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing' }),
                new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing_superconduct' }),
                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
            ]),
        }),
        new FeatureDamageBurst({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    scalingMultiplier: 2,
                    scalingMultiplierCondition: new ConditionAnd([
                        new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing' }),
                        new ConditionConstellation({ constellation: 4 }),
                    ]),
                    scalingSource: 'constellation4',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    scalingMultiplier: 2,
                    scalingMultiplierCondition: new ConditionAnd([
                        new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing' }),
                        new ConditionConstellation({ constellation: 4 }),
                    ]),
                    scalingSource: 'constellation4',
                    values: Talents.get('burst.yae_miko_tenko_thunderbolt_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'electro',
            name: 'yae_miko_additional_tenko_thunderbolt_dmg',
            multipliers: [
                new FeatureMultiplier({
                    source: 'ascension1',
                    values: new ValueTable([charTalentTables.YaeMiko.passsive[0][0]], 100),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing' }),
                new ConditionAscensionChar({ ascension: 1 }),
                new ConditionOr([
                    new ConditionBoolean({ name: 'allowed_stellar_conduct', invert: 1 }),
                    new ConditionBoolean({ name: 'common.enemy_superconduct', invert: 1 }),
                ]),
            ]),
        }),
        new FeatureReactionStellarConduct({
            element: 'electro',
            category: 'burst',
            name: 'yae_miko_additional_tenko_thunderbolt_dmg',
            multipliers: [
                new FeatureMultiplier({
                    source: 'ascension1',
                    values: new ValueTable([charTalentTables.YaeMiko.passsive[0][1]], 100),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing' }),
                new ConditionAscensionChar({ ascension: 1 }),
                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
            ]),
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'yae_miko_skill_bonus',
            postEffect: skillDmgPost,
            format: 'percent',
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'yae_miko_edict_of_cleansing',
            title: 'talent_name.yae_miko_edict_of_cleansing',
            description: 'talent_descr.yae_miko_edict_of_cleansing_1',
            serializeId: 2,
        }),
        new ConditionBoolean({
            name: 'yae_miko_edict_of_cleansing_superconduct',
            title: 'talent_name.yae_miko_edict_of_cleansing',
            description: 'talent_descr.yae_miko_edict_of_cleansing_2',
            serializeId: 3,
            condition: new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing' }),
        }),
        new ConditionStatic({
            title: 'talent_name.yae_miko_edict_of_cleansing',
            description: 'talent_descr.yae_miko_edict_of_cleansing_3',
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing' }),
                new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing_superconduct' }),
                new ConditionBoolean({ name: 'common.enemy_superconduct' }),
                new ConditionBoolean({ name: 'allowed_stellar_conduct' }),
            ]),
        }),
        new ConditionStatic({
            title: 'talent_name.yae_miko_the_shrines_sacred_shade',
            description: 'talent_descr.yae_miko_the_shrines_sacred_shade',
            info: { ascension: 1 },
            hideCondition: new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing' }),
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing', invert: 1 }),
                new ConditionAscensionChar({ ascension: 1 }),
            ]),
        }),
        new ConditionStatic({
            title: 'talent_name.yae_miko_the_shrines_sacred_shade',
            description: 'talent_descr.yae_miko_the_shrines_sacred_shade_hex',
            info: { ascension: 1 },
            hideCondition: new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing', invert: 1 }),
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing' }),
                new ConditionAscensionChar({ ascension: 1 }),
            ]),
        }),
        new ConditionStatic({
            title: 'talent_name.yae_miko_enlightened_blessing',
            description: 'talent_descr.yae_miko_enlightened_blessing',
            stats: {
                text_percent: 0.15,
            },
            info: {ascension: 4},
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            target: new FeatureMultiplierTarget({
                damageTypes: 'skill',
            }),
            source: 'yae_miko_edict_of_cleansing',
            values: new ValueTable([charTalentTables.YaeMiko.passsive[2][0]], 100),
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing' }),
                new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing_superconduct' }),
            ]),
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.yae_miko_yakan_offering',
                    description: 'talent_descr.yae_miko_yakan_offering',
                    hideCondition: new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing' }),
                }),
                new ConditionStatic({
                    title: 'talent_name.yae_miko_yakan_offering',
                    description: 'talent_descr.yae_miko_yakan_offering_hex_1',
                    hideCondition: new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing', invert: 1 }),
                    stats: {
                        text_dmg_electro: charTalentTables.YaeMiko.cons[0][1] * 100,
                    }
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.yae_miko_foxs_mooncall',
                    description: 'talent_descr.yae_miko_foxs_mooncall',
                    hideCondition: new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing' }),
                }),
                new ConditionLevelSelect({
                    name: 'yae_miko_foxs_mooncall',
                    serializeId: 4,
                    title: 'talent_name.yae_miko_foxs_mooncall',
                    description: 'talent_descr.yae_miko_foxs_mooncall_hex_1',
                    hideCondition: new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing', invert: 1 }),
                    maxStacks: 4,
                    stats: [
                        new StatTable('mastery', [
                            charTalentTables.YaeMiko.cons[1][3],
                            charTalentTables.YaeMiko.cons[1][4],
                            charTalentTables.YaeMiko.cons[1][5],
                            charTalentTables.YaeMiko.cons[1][6],
                        ])
                    ],
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
                    name: 'miko_sakura_channeling',
                    serializeId: 1,
                    title: 'talent_name.yae_miko_sakura_channeling',
                    description: 'talent_descr.yae_miko_sakura_channeling',
                    hideCondition: new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing' }),
                    condition: new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing', invert: 1 }),
                    stats: {
                        dmg_electro: 20,
                    },
                }),
                new ConditionBoolean({
                    name: 'miko_sakura_channeling',
                    serializeId: 1,
                    title: 'talent_name.yae_miko_sakura_channeling',
                    description: 'talent_descr.yae_miko_sakura_channeling_hex',
                    hideCondition: new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing', invert: 1 }),
                    condition: new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing' }),
                    stats: {
                        dmg_electro: 20,
                    },
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
                    title: 'talent_name.yae_miko_daisesshou',
                    description: 'talent_descr.yae_miko_daisesshou',
                    hideCondition: new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing' }),
                    condition: new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing', invert: 1 }),
                    stats: {
                        enemy_def_ignore_skill: charTalentTables.YaeMiko.cons[5][0] * 100,
                    },
                }),
                new ConditionStatic({
                    title: 'talent_name.yae_miko_daisesshou',
                    description: 'talent_descr.yae_miko_daisesshou_hex',
                    hideCondition: new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing', invert: 1 }),
                    condition: new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing' }),
                    stats: {
                        enemy_def_ignore_skill: charTalentTables.YaeMiko.cons[5][0] * 100,
                        crit_dmg_stellar_conduct: charTalentTables.YaeMiko.cons[5][1] * 100,
                    },
                }),
            ],
        },
    ]),
    postEffects: [
        skillDmgPost,
    ],
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.yae_miko_yakan_offering',
                serializeId: 2,
                title: 'talent_name.yae_miko_yakan_offering',
                description: 'talent_descr.yae_miko_yakan_offering_hex_2',
                info: { constellation: 2 },
                //hideCondition: new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing', invert: 1 }),
                stats: {
                    text_dmg_electro: charTalentTables.YaeMiko.cons[0][1] * 100,
                    dmg_electro: charTalentTables.YaeMiko.cons[0][1] * 100,
                    dmg_reaction_stellar_conduct: charTalentTables.YaeMiko.cons[0][1] * 100,
                }
            }),
            new ConditionLevelSelect({
                name: 'party.yae_miko_foxs_mooncall',
                serializeId: 3,
                title: 'talent_name.yae_miko_foxs_mooncall',
                description: 'talent_descr.yae_miko_foxs_mooncall_hex_2',
                //hideCondition: new ConditionBoolean({ name: 'yae_miko_edict_of_cleansing', invert: 1 }),
                maxStacks: 4,
                info: { constellation: 3 },
                condition: new ConditionBoolean({ name: 'common.char_status_off_field', invert: 1 }),
                stats: [
                    new StatTable('mastery', [
                        charTalentTables.YaeMiko.cons[1][3],
                        charTalentTables.YaeMiko.cons[1][4],
                        charTalentTables.YaeMiko.cons[1][5],
                        charTalentTables.YaeMiko.cons[1][6],
                    ])
                ],
            }),
            new ConditionBoolean({
                name: 'party.miko_sakura_channeling',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.yae_miko_sakura_channeling',
                description: 'talent_descr.yae_miko_sakura_channeling',
                info: {constellation: 4},
                stats: {
                    dmg_electro: 20,
                },
            }),
        ],
    },
});
