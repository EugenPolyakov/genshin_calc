import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanCharElement } from "../../classes/Condition/Boolean/CharElement";
import { ConditionBooleanDropdownValue } from "../../classes/Condition/Boolean/DropdownValue";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionDropdownElement } from "../../classes/Condition/Dropdown/Element";
import { ConditionHexCheck } from "../../classes/Condition/HexCheck";
import { ConditionHexCurrent } from "../../classes/Condition/HexCurrent";
import { ConditionNumber } from "../../classes/Condition/Number";
import { ConditionNumberTalent } from "../../classes/Condition/Number/Talent";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamage } from "../../classes/Feature2/Damage";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlunge } from "../../classes/Feature2/Damage/Plunge";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { FeatureShield } from "../../classes/Feature2/Shield";
import { FeatureStatic } from "../../classes/Feature2/Static";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { PostEffectStatsStatic } from "../../classes/PostEffect/Stats/Static";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Nicole.s1_id,
        title: 'talent_name.nicole_allegoria',
        description: 'talent_descr.nicole_allegoria',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Nicole.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Nicole.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Nicole.s1.p3),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Nicole.s1.p4),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Nicole.s1.p5),
            },
            {
                table: new StatTable('plunge', charTalentTables.Nicole.s1.p6),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Nicole.s1.p7),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Nicole.s1.p8),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Nicole.s2_id,
        title: 'talent_name.nicole_uncreated_light',
        description: 'talent_descr.nicole_uncreated_light',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Nicole.s2.p1),
            },
            {
                type: 'shield',
                table: [
                    new StatTable('shield_absorption', charTalentTables.Nicole.s2.p2),
                    new StatTable('', charTalentTables.Nicole.s2.p3),
                ],
            },
            {
                table: new StatTable('shield_duration', charTalentTables.Nicole.s2.p4),
            },
            {
                table: new StatTable('nicole_grace_of_kenosis_atk_bonus_ratio', charTalentTables.Nicole.s2.p5),
            },
            {
                unit: 'unit',
                table: new StatTable('nicole_grace_of_kenosis_max_atk_bonus', charTalentTables.Nicole.s2.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('nicole_grace_of_kenosis_duration', charTalentTables.Nicole.s2.p7),
            },
            {
                unit: 'unit',
                table: new StatTable('cd', charTalentTables.Nicole.s2.p8),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Nicole.s3_id,
        title: 'talent_name.nicole_ladder_of_divine_ascent',
        description: 'talent_descr.nicole_ladder_of_divine_ascent',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Nicole.s3.p1),
            },
            {
                table: new StatTable('nicole_arcane_projection_dmg', charTalentTables.Nicole.s3.p2),
            },
            {
                unit: 'unit',
                table: new StatTable('nicole_arcane_projection_attack_count', charTalentTables.Nicole.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('nicole_silent_contemplation_duration', charTalentTables.Nicole.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Nicole.s3.p5),
            },
            {
                unit: 'unit',
                table: new StatTable('energy_cost', charTalentTables.Nicole.s3.p6),
            },
        ],
    },
    links: charTalentTables.Nicole.links,
});

var GraceOfKenosis = new PostEffectStats({
    from: 'atk*',
    levelSetting: 'char_skill_elemental',
    percent: Talents.getAlias('skill.nicole_grace_of_kenosis_atk_bonus_ratio', 'atk', 0.01),
    statCap: Talents.get('skill.nicole_grace_of_kenosis_max_atk_bonus'),
    condition: new ConditionBoolean({ name: 'n11310001' }),
});

export const Nicole = new DbObjectChar({
    name: 'nicole',
    serializeId: 121,
    gameId: charTalentTables.Nicole.char_id,
    iconClass: 'char-icon-nicole',
    rarity: 5,
    element: 'pyro',
    weapon: charTalentTables.Nicole.char_weapon,
    originList: ['mondstadt'],
    talents: Talents,
    statTable: charTables.Nicole,
    features: [
        new FeatureDamageNormal({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureShield({
            category: 'skill',
            element: 'pyro',
            name: 'shield_absorption',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'atk*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.shield_absorption'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            category: 'skill',
            name: 'nicole_grace_of_kenosis_atk_bonus_ratio',
            postEffect: GraceOfKenosis,
        }),
        new FeatureDamageBurst({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamage({
            category: 'burst',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.nicole_arcane_projection_dmg'),
                }),
                new FeatureMultiplier({
                    values: new ValueTable([charTalentTables.Nicole.passsive[2][0]], 100),
                    source: 'hex',
                    condition: new ConditionAnd([
                        new ConditionHexCurrent(),
                        new ConditionHexCheck({ hex: 2 }),
                    ]),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'n11310001',
            serializeId: 1,
            title: 'talent_name.n11310001',
            description: 'talent_descr.n11310001',
        }),
        new ConditionBoolean({
            name: 'char_hex_nicole',
            serializeId: 2,
            title: 'talent_name.nicole_light_in_the_darkness',
            description: 'talent_descr.nicole_light_in_the_darkness_1',
        }),
        new ConditionStatic({
            title: 'talent_name.nicole_light_in_the_darkness',
            description: 'talent_descr.nicole_light_in_the_darkness_2',
            condition: new ConditionAnd([
                new ConditionHexCurrent(),
                new ConditionHexCheck({ hex: 2 }),
            ]),
        }),
        new ConditionStatic({
            title: 'talent_name.nicole_methexis',
            description: 'talent_descr.nicole_methexis',
            info: {ascension: 1},
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new ConditionBoolean({
            name: 'n11310002',
            serializeId: 3,
            title: 'talent_name.n11310002',
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'n11310001' }),
                new ConditionAscensionChar({ ascension: 1 }),
            ]),
        }),
        new ConditionStatic({
            name: 'nicole_philokalia',
            title: 'talent_name.nicole_philokalia',
            description: 'talent_descr.nicole_philokalia',
            info: { ascension: 4 },
            condition: new ConditionAscensionChar({ ascension: 4 }),
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            values: new ValueTable([charTalentTables.Nicole.cons[3][2]], 100),
            source: 'constellation4',
            target: new FeatureMultiplierTarget({
                damageTypes: ['normal', 'charged', 'plunge', 'skill', 'burst'],
            }),
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'nicole_whether_left_or_right_no_matter_which_way_you_turn' }),
                new ConditionConstellation({ constellation: 4 }),
            ]),
        }),
    ],
    postEffects: [
        GraceOfKenosis,
        new PostEffectStatsStatic({
            percent: new StatTable('atk', [charTalentTables.Nicole.passsive[0][2]]),
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'n11310001' }),
                new ConditionBoolean({ name: 'n11310002' }),
                new ConditionAscensionChar({ ascension: 1 }),
            ]),
        }),
        new PostEffectStatsStatic({
            percent: new StatTable('atk', [charTalentTables.Nicole.cons[1][0]]),
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'n11310001' }),
                new ConditionConstellation({ constellation: 2 }),
            ]),
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.nicole_do_not_be_afraid_child_who_is_loved',
                    description: 'talent_descr.nicole_do_not_be_afraid_child_who_is_loved',
                }),
            ],
            features: [
                new FeatureDamage({
                    name: 'nicole_arcane_projection_unity',
                    category: 'other',
                    damageType: '',
                    element: 'pyro',
                    multipliers: [
                        new FeatureMultiplier({
                            source: 'constellation1',
                            values: new ValueTable([charTalentTables.Nicole.cons[0][0]], 100),
                        }),
                    ],
                }),
            ],
        },
        {
            conditions: [
                new ConditionDropdownElement({
                    name: 'nicole_i_will_guide_you_and_show_you_the_path_you_should_tread',
                    serializeId: 4,
                    multiple: true,
                    hideEmpty: true,
                    dropdownClass: 'select-element-multiple big',
                    title: 'talent_name.nicole_i_will_guide_you_and_show_you_the_path_you_should_tread',
                    description: 'talent_descr.nicole_i_will_guide_you_and_show_you_the_path_you_should_tread',
                    values: [
                        {
                            value: 'pyro',
                            serializeId: 1,
                        },
                        {
                            value: 'cryo',
                            serializeId: 2,
                        },
                        {
                            value: 'electro',
                            serializeId: 3,
                        },
                        {
                            value: 'hydro',
                            serializeId: 4,
                        },
                        {
                            value: 'anemo',
                            serializeId: 5,
                        },
                        {
                            value: 'geo',
                            serializeId: 6,
                        },
                        {
                            value: 'dendro',
                            serializeId: 7,
                        },
                    ],
                }),
                ...['pyro', 'hydro', 'electro', 'cryo', 'anemo', 'geo', 'dendro'].map((elem) => {
                    return new Condition({
                        stats: {
                            ['enemy_res_' + elem]: -charTalentTables.Nicole.cons[1][1] * 100,
                        },
                        condition: new ConditionAnd([
                            new ConditionBooleanDropdownValue({ name: 'nicole_i_will_guide_you_and_show_you_the_path_you_should_tread', value: elem }),
                        ]),
                    })
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
                    name: 'nicole_whether_left_or_right_no_matter_which_way_you_turn',
                    serializeId: 5,
                    title: 'talent_name.nicole_whether_left_or_right_no_matter_which_way_you_turn',
                    description: 'talent_descr.nicole_whether_left_or_right_no_matter_which_way_you_turn',
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
                    title: 'talent_name.nicole_this_is_the_path_walk_it_without_delay',
                    description: 'talent_descr.nicole_this_is_the_path_walk_it_without_delay',
                    stats: {
                        enemy_def_ignore: charTalentTables.Nicole.cons[5][0] * 100,
                    },
                    condition: new ConditionAnd([
                        new ConditionBoolean({ name: 'n11310001' }),
                        new ConditionBoolean({ name: 'n11310002' }),
                        new ConditionAscensionChar({ ascension: 1 }),
                    ]),
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            stats: ['atk_total'],
            settings: ['char_skill_burst', 'char_skill_elemental'],
        },
        conditions: [
            new ConditionNumber({
                name: 'nicole_atk_total',
                serializeId: 1,
                title: 'talent_name.stats_total_atk',
                partyStat: 'atk_total',
                rotation: 'party',
                max: 10000,
            }),
            new ConditionNumberTalent({
                name: 'nicole_char_skill_elemental',
                title: 'talent_name.stats_level_skill',
                partySetting: 'char_skill_elemental',
                serializeId: 2,
            }),
            new ConditionBoolean({
                name: 'party.nicole_constellation_3',
                serializeId: 3,
                title: 'talent_name.nicole_a_lamp_by_your_side_a_light_to_shine_the_way',
                description: 'talent_descr.char_constellation_skill',
                settings: {
                    nicole_char_skill_elemental_bonus: 3,
                },
                info: {
                    constellation: 3,
                },
            }),
            new ConditionNumberTalent({
                name: 'nicole_char_skill_burst',
                title: 'talent_name.stats_level_burst',
                partySetting: 'char_skill_burst',
                serializeId: 4,
            }),
            new ConditionBoolean({
                name: 'party.nicole_constellation_5',
                serializeId: 5,
                title: 'talent_name.nicole_you_will_hear_my_voice_beside_you',
                description: 'talent_descr.char_constellation_burst',
                settings: {
                    nicole_char_skill_burst_bonus: 3,
                },
                info: {
                    constellation: 5,
                },
            }),
            new ConditionBoolean({
                name: 'party.n11310001',
                serializeId: 6,
                title: 'talent_name.n11310001',
                description: 'talent_descr.n11310001',
            }),
            new ConditionBoolean({
                name: 'char_hex_nicole',
                serializeId: 7,
                title: 'talent_name.nicole_light_in_the_darkness',
                description: 'talent_descr.nicole_light_in_the_darkness_1',
            }),
            new ConditionStatic({
                title: 'talent_name.nicole_light_in_the_darkness',
                description: 'talent_descr.nicole_light_in_the_darkness_2',
                condition: new ConditionAnd([
                    new ConditionHexCurrent(),
                    new ConditionHexCheck({ hex: 2 }),
                ]),
            }),
            new ConditionBoolean({
                name: 'party.nicole_methexis',
                serializeId: 8,
                title: 'talent_name.nicole_methexis',
                description: 'talent_descr.nicole_methexis',
                info: { ascension: 1 },
            }),
            new ConditionBoolean({
                name: 'party.nicole_constellation_1',
                serializeId: 12,
                title: 'talent_name.nicole_do_not_be_afraid_child_who_is_loved',
                description: 'talent_descr.nicole_do_not_be_afraid_child_who_is_loved',
                info: { constellation: 1 },
            }),
            new ConditionDropdownElement({
                name: 'party.nicole_i_will_guide_you_and_show_you_the_path_you_should_tread',
                serializeId: 9,
                multiple: true,
                hideEmpty: true,
                dropdownClass: 'select-element-multiple big',
                title: 'talent_name.nicole_i_will_guide_you_and_show_you_the_path_you_should_tread',
                description: 'talent_descr.nicole_i_will_guide_you_and_show_you_the_path_you_should_tread',
                info: { constellation: 2 },
                values: [
                    {
                        value: 'pyro',
                        serializeId: 1,
                    },
                    {
                        value: 'cryo',
                        serializeId: 2,
                    },
                    {
                        value: 'electro',
                        serializeId: 3,
                    },
                    {
                        value: 'hydro',
                        serializeId: 4,
                    },
                    {
                        value: 'anemo',
                        serializeId: 5,
                    },
                    {
                        value: 'geo',
                        serializeId: 6,
                    },
                    {
                        value: 'dendro',
                        serializeId: 7,
                    },
                ],
            }),
            ...['pyro', 'hydro', 'electro', 'cryo', 'anemo', 'geo', 'dendro'].map((elem) => {
                return new Condition({
                    stats: {
                        ['enemy_res_' + elem]: -charTalentTables.Nicole.cons[1][1] * 100,
                    },
                    condition: new ConditionAnd([
                        new ConditionBooleanDropdownValue({ name: 'party.nicole_i_will_guide_you_and_show_you_the_path_you_should_tread', value: elem }),
                    ]),
                })
            }),
            new ConditionBoolean({
                name: 'party.nicole_constellation_4',
                serializeId: 10,
                title: 'talent_name.nicole_whether_left_or_right_no_matter_which_way_you_turn',
                description: 'talent_descr.nicole_whether_left_or_right_no_matter_which_way_you_turn',
                info: { constellation: 4 },
            }),
            new ConditionBoolean({
                name: 'party.nicole_constellation_6',
                serializeId: 11,
                title: 'talent_name.nicole_this_is_the_path_walk_it_without_delay',
                description: 'talent_descr.nicole_this_is_the_path_walk_it_without_delay',
                info: { constellation: 6 },
                stats: {
                    enemy_def_ignore: charTalentTables.Nicole.cons[5][0] * 100,
                },
            }),
        ],
        postEffects: [
            new PostEffectStats({
                from: 'nicole_atk_total',
                levelSetting: 'nicole_char_skill_elemental',
                percent: Talents.getAlias('skill.nicole_grace_of_kenosis_atk_bonus_ratio', 'atk', 0.01),
                statCap: Talents.get('skill.nicole_grace_of_kenosis_max_atk_bonus'),
                condition: new ConditionBoolean({ name: 'party.n11310001' }),
            }),
            new PostEffectStatsStatic({
                percent: new StatTable('atk', [charTalentTables.Nicole.passsive[0][2]]),
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'party.n11310001' }),
                    new ConditionBoolean({ name: 'party.nicole_methexis' }),
                ]),
            }),
            new PostEffectStatsStatic({
                percent: new StatTable('atk', [charTalentTables.Nicole.cons[1][0]]),
                condition: new ConditionAnd([
                    new ConditionBoolean({ name: 'party.n11310001' }),
                    new ConditionBoolean({ name: 'party.nicole_i_will_guide_you_and_show_you_the_path_you_should_tread' }),
                ]),
            }),
        ],
        multipliers: [
            new FeatureMultiplier({
                scaling: 'nicole_atk_total',
                values: new ValueTable([charTalentTables.Nicole.cons[3][2]], 100),
                source: 'nicole',
                target: new FeatureMultiplierTarget({
                    damageTypes: ['normal', 'charged', 'plunge', 'skill', 'burst'],
                }),
                condition: new ConditionBoolean({ name: 'party.party.nicole_constellation_4' }),
            }),
        ],
        features: [
            new FeatureDamage({
                category: 'other',
                fullName: 'burst.nicole_arcane_projection_dmg',
                element: function (settings) { return settings.char_element; },
                multipliers: [
                    new FeatureMultiplier({
                        leveling: 'nicole_char_skill_burst',
                        source: 'nicole',
                        values: Talents.get('burst.nicole_arcane_projection_dmg'),
                    }),
                    new FeatureMultiplier({
                        scaling: 'nicole_atk_total',
                        values: new ValueTable([charTalentTables.Nicole.passsive[2][0]], 100),
                        source: 'hex',
                        condition: new ConditionAnd([
                            new ConditionHexCurrent(),
                            new ConditionHexCheck({ hex: 2 }),
                        ]),
                    }),
                ],
            }),
            new FeatureDamage({
                name: 'nicole_arcane_projection_unity',
                category: 'other',
                element: function (settings) { return settings.char_element; },
                multipliers: [
                    new FeatureMultiplier({
                        source: 'nicole',
                        values: new ValueTable([charTalentTables.Nicole.cons[0][0]], 100),
                    }),
                ],
                condition: new ConditionBoolean({ name: 'party.nicole_constellation_1' }),
            }),
        ],
    },
});
