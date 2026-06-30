import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanValue } from "../../classes/Condition/Boolean/Value";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionHexCheck } from "../../classes/Condition/HexCheck";
import { ConditionNumber } from "../../classes/Condition/Number";
import { ConditionOr } from "../../classes/Condition/Or";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamage } from "../../classes/Feature2/Damage";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { FeatureStatic } from "../../classes/Feature2/Static";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Lohen.s1_id,
        title: 'talent_name.lohen_spear_of_favonius_broken_oath',
        description: 'talent_descr.lohen_spear_of_favonius_broken_oath',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Lohen.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Lohen.s1.p2),
            },
            {
                type: 'multihit',
                hits: 3,
                table: new StatTable('normal_hit_3', charTalentTables.Lohen.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Lohen.s1.p4),
            },
            {
                type: 'hits',
                name: 'normal_hit_5',
                table: [
                    new StatTable('normal_hit_5_1', charTalentTables.Lohen.s1.p5),
                    new StatTable('normal_hit_5_2', charTalentTables.Lohen.s1.p6),
                ],
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('charged_hit', charTalentTables.Lohen.s1.p7),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Lohen.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Lohen.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Lohen.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Lohen.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Lohen.s2_id,
        title: 'talent_name.lohen_unforeseen_strike',
        description: 'talent_descr.lohen_unforeseen_strike',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Lohen.s2.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Lohen.s2.p2),
            },
            {
                type: 'multihit',
                hits: 3,
                table: new StatTable('normal_hit_3', charTalentTables.Lohen.s2.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Lohen.s2.p4),
            },
            {
                type: 'hits',
                name: 'normal_hit_5',
                table: [
                    new StatTable('normal_hit_5_1', charTalentTables.Lohen.s2.p5),
                    new StatTable('normal_hit_5_2', charTalentTables.Lohen.s2.p6),
                ],
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('charged_hit', charTalentTables.Lohen.s2.p7),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Lohen.s2.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Lohen.s2.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Lohen.s2.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Lohen.s2.p11),
            },
            {
                unit: 'sec',
                table: new StatTable('lohen_masterstroke', charTalentTables.Lohen.s2.p12),
            },
            {
                type: 'multihit',
                hits: 4,
                table: new StatTable('lohen_etched_into_bone_and_soul_dmg', charTalentTables.Lohen.s2.p17),
            },
            {
                table: new StatTable('lohen_dmg_increase_from_will_to_win', charTalentTables.Lohen.s2.p18),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Lohen.s2.p19),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Lohen.s3_id,
        title: 'talent_name.lohen_manifest_judgment',
        description: 'talent_descr.lohen_manifest_judgment',
        items: [
            {
                type: 'multihit',
                hits: 6,
                table: new StatTable('skill_dmg', charTalentTables.Lohen.s3.p1),
            },
            {
                table: new StatTable('lohen_dmg_increase_from_will_to_win', charTalentTables.Lohen.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Lohen.s3.p3),
            },
            {
                unit: 'unit',
                table: new StatTable('energy_cost', charTalentTables.Lohen.s3.p4),
            },
        ],
    },
    links: charTalentTables.Lohen.links,
});

var willToWin = new PostEffectStats({
    from: 'lohen_will_to_win',
    levelSetting: 'char_skill_burst',
    maxLevelSetting: 10,
    percent: [
        Talents.getMulti({
            name: 'dmg_skill',
            from: 'skill.lohen_dmg_increase_from_will_to_win',
        }),
        Talents.getMulti({
            name: 'dmg_burst',
            from: 'burst.lohen_dmg_increase_from_will_to_win',
        }),
    ],
});

function rotationAfterItemsBurst(item, opts) {
    if (item.count > 1 || opts.insideBlock) {
        return [];
    }

    return [{
        type: 'condition',
        object: 'char',
        static: true,
        getSettings: (settings) => {
            if (settings.char_constellation >= 6)
                return {};
            return {
                'lohen_will_to_win': 0,
            };
        },
    }];
}

export const Lohen = new DbObjectChar({
    name: 'lohen',
    serializeId: 122,
    gameId: charTalentTables.Lohen.char_id,
    iconClass: 'char-icon-lohen',
    rarity: 5,
    element: 'cryo',
    weapon: charTalentTables.Lohen.char_weapon,
    origin: 'mondstadt',
    talents: Talents,
    beta: true,
    statTable: charTables.Lohen,
    features: [
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'lohen_masterstroke', invert: 1 }),
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'lohen_masterstroke', invert: 1 }),
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_3',
            allowInfusion: true,
            items: [
                {
                    hits: 3,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_3'),
                        }),
                    ],
                },
            ],
            condition: new ConditionBoolean({ name: 'lohen_masterstroke', invert: 1 }),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3_1',
            isChild: true,
            hits: 3,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'lohen_masterstroke', invert: 1 }),
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'lohen_masterstroke', invert: 1 }),
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_5',
            allowInfusion: true,
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_5_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_5_2'),
                        }),
                    ],
                },
            ],
            condition: new ConditionBoolean({ name: 'lohen_masterstroke', invert: 1 }),
        }),
        new FeatureDamageNormal({
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5_1'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'lohen_masterstroke', invert: 1 }),
        }),
        new FeatureDamageNormal({
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5_2'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'lohen_masterstroke', invert: 1 }),
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
            condition: new ConditionBoolean({ name: 'lohen_masterstroke', invert: 1 }),
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
            condition: new ConditionBoolean({ name: 'lohen_masterstroke', invert: 1 }),
        }),
        new FeatureDamagePlungeCollision({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'lohen_masterstroke', invert: 1 }),
        }),
        new FeatureDamagePlungeShockWave({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'lohen_masterstroke', invert: 1 }),
        }),
        new FeatureDamagePlungeShockWave({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'lohen_masterstroke', invert: 1 }),
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.normal_hit_1'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'lohen_masterstroke' }),
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.normal_hit_2'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'lohen_masterstroke' }),
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_3',
            allowInfusion: true,
            items: [
                {
                    hits: 3,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.normal_hit_3'),
                        }),
                    ],
                },
            ],
            condition: new ConditionBoolean({ name: 'lohen_masterstroke' }),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3_1',
            isChild: true,
            hits: 3,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.normal_hit_3'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'lohen_masterstroke' }),
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.normal_hit_4'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'lohen_masterstroke' }),
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'skill',
            name: 'normal_hit_5',
            allowInfusion: true,
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.normal_hit_5_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.normal_hit_5_2'),
                        }),
                    ],
                },
            ],
            condition: new ConditionBoolean({ name: 'lohen_masterstroke' }),
        }),
        new FeatureDamageNormal({
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.normal_hit_5_1'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'lohen_masterstroke' }),
        }),
        new FeatureDamageNormal({
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.normal_hit_5_2'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'lohen_masterstroke' }),
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
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.charged_hit'),
                        }),
                    ],
                },
            ],
            condition: new ConditionBoolean({ name: 'lohen_masterstroke' }),
        }),
        new FeatureDamageCharged({
            element: 'cryo',
            isChild: true,
            hits: 2,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.charged_hit'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'lohen_masterstroke' }),
        }),
        new FeatureDamagePlungeCollision({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.plunge'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'lohen_masterstroke' }),
        }),
        new FeatureDamagePlungeShockWave({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.plunge_low'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'lohen_masterstroke' }),
        }),
        new FeatureDamagePlungeShockWave({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.plunge_high'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'lohen_masterstroke' }),
        }),
        new FeatureDamage({
            name: 'lohen_evilsbane_blade_dmg',
            category: 'attack',
            damageType: '',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation2',
                    values: new ValueTable([charTalentTables.Lohen.cons[1][0]], 100),
                }),
            ],
            condition: new ConditionConstellation({ constellation: 2 }),
        }),
        new FeatureDamageSkill({
            element: 'cryo',
            rotationAfterItems: rotationAfterItemsBurst,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.lohen_etched_into_bone_and_soul_dmg'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'lohen_masterstroke' }),
        }),
        new FeatureDamageBurst({
            element: 'cryo',
            rotationAfterItems: rotationAfterItemsBurst,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.skill_dmg'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            fullName: 'burst.lohen_dmg_increase_from_will_to_win',
            format: 'percent',
            postEffect: willToWin,
        })
    ],
    postEffects: [
        willToWin,
    ],
    conditions: [
        new ConditionBoolean({
            name: 'lohen_masterstroke',
            serializeId: 1,
            title: 'talent_name.n11290001',
            stats: {
                charged_stamina_cost: charTalentTables.Lohen.s2.p8[0] - charTalentTables.Lohen.s1.p8[0],
            },
            settings: {
                attack_infusion: 'cryo',
            },
        }),
        new ConditionNumber({
            name: 'lohen_will_to_win',
            serializeId: 2,
            title: 'talent_name.n11290004',
            max: function (settings) {
                if (settings.char_constellation >= 1)
                    return 300;
                return 100;
            },
            class: 'inputs-3digit',
        }),
        new ConditionBoolean({
            name: 'char_hex_lohen',
            serializeId: 3,
            title: 'talent_name.lohen_unhealing_thorn',
            description: 'talent_descr.lohen_unhealing_thorn_1',
        }),
        new ConditionBoolean({
            name: 'lohen_unhealing_thorn',
            serializeId: 4,
            title: 'talent_name.lohen_unhealing_thorn',
            description: 'talent_descr.lohen_unhealing_thorn_2',
            stats: {
                dmg_normal: charTalentTables.Lohen.passsive[2][1] * 100,
                dmg_charged: charTalentTables.Lohen.passsive[2][1] * 100,
            },
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'char_hex_lohen' }),
                new ConditionHexCheck({ hex: 2 }),
                new ConditionOr([
                    new ConditionBooleanValue({ setting: 'lohen_will_to_win', value: 150, cond: 'ge' }),
                    new ConditionAnd([
                        new ConditionBooleanValue({ setting: 'char_constellation', value: 0, cond: 'eq' }),
                        new ConditionBooleanValue({ setting: 'lohen_will_to_win', value: 50, cond: 'ge' }),
                    ]),
                ]),
            ]),
        }),
        new ConditionStatic({
            name: 'lohen_moratorium_on_questioning',
            title: 'talent_name.lohen_moratorium_on_questioning',
            description: 'talent_descr.lohen_moratorium_on_questioning',
            info: {ascension: 1},
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new ConditionBoolean({
            name: 'lohen_flippant_masterpiece',
            serializeId: 5,
            title: 'talent_name.lohen_flippant_masterpiece',
            description: 'talent_descr.lohen_flippant_masterpiece',
            info: {ascension: 4},
            condition: new ConditionAscensionChar({ ascension: 4 }),
            stats: {
                atk_percent: charTalentTables.Lohen.passsive[1][0] * 100,
            },
        }),
    ],
    multipliers: [
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    name: 'lohen_o_breezes_that_so_oft_bear_sorrowful_lament',
                    title: 'talent_name.lohen_o_breezes_that_so_oft_bear_sorrowful_lament',
                    description: 'talent_descr.lohen_o_breezes_that_so_oft_bear_sorrowful_lament',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    name: 'lohen_in_flight_i_strike_whatever_flies',
                    title: 'talent_name.lohen_in_flight_i_strike_whatever_flies',
                    description: 'talent_descr.lohen_in_flight_i_strike_whatever_flies',
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
                    name: 'lohen_radiant_love_laughing_death',
                    title: 'talent_name.lohen_radiant_love_laughing_death',
                    description: 'talent_descr.lohen_radiant_love_laughing_death',
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
                    name: 'lohen_to_drown_to_sink_unconscious_supreme_joy',
                    title: 'talent_name.lohen_to_drown_to_sink_unconscious_supreme_joy',
                    description: 'talent_descr.lohen_to_drown_to_sink_unconscious_supreme_joy',
                    stats: {
                        crit_dmg_skill: charTalentTables.Lohen.cons[5][1] * 100,
                        crit_dmg_burst: charTalentTables.Lohen.cons[5][1] * 100,
                    }
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'char_hex_lohen',
                serializeId: 1,
                title: 'talent_name.lohen_unhealing_thorn',
                description: 'talent_descr.lohen_unhealing_thorn_1',
            }),
            new ConditionBoolean({
                name: 'lohen_flippant_masterpiece',
                serializeId: 2,
                title: 'talent_name.lohen_flippant_masterpiece',
                description: 'talent_descr.lohen_flippant_masterpiece',
                info: { ascension: 4 },
                stats: {
                    atk_percent: charTalentTables.Lohen.passsive[1][0] * 100,
                },
            }),
            new ConditionBoolean({
                name: 'lohen_constellation_2',
                serializeId: 3,
                name: 'lohen_in_flight_i_strike_whatever_flies',
                title: 'talent_name.lohen_in_flight_i_strike_whatever_flies',
                description: 'talent_descr.lohen_in_flight_i_strike_whatever_flies',
                info: { constellation: 2 },
                stats: {
                    mastery: charTalentTables.Lohen.cons[1][1],
                }
            }),
        ],
    }
});
