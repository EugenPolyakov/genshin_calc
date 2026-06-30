import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionCalcElementsZibai } from "../../classes/Condition/CalcElementsZibai";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionMoonPhaseSetting } from "../../classes/Condition/CustomOrigin/MoonPhaseSetting";
import { ConditionMoonPhaseCheck } from "../../classes/Condition/MoonPhaseCheck";
import { ConditionNumber } from "../../classes/Condition/Number";
import { ConditionNumberPhaseShiftRadiance } from "../../classes/Condition/Number/PhaseShiftRadiance";
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
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { FeatureReactionLunarCrystallizeLike } from "../../classes/Feature2/Reaction/Transformative/Lunar/CrystallizeLike";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Zibai.s1_id,
        title: 'talent_name.zibai_golden_blades_petaled_touch',
        description: 'talent_descr.zibai_golden_blades_petaled_touch',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Zibai.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Zibai.s1.p2),
            },
            {
                type: 'hits',
                name: 'normal_hit_3',
                table: [
                    new StatTable('normal_hit_3_1', charTalentTables.Zibai.s1.p3),
                    new StatTable('normal_hit_3_2', charTalentTables.Zibai.s1.p4),
                ],
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Zibai.s1.p5),
            },
            {
                type: 'hits',
                name: 'charged_hit',
                table: [
                    new StatTable('charged_hit_1', charTalentTables.Zibai.s1.p6),
                    new StatTable('charged_hit_2', charTalentTables.Zibai.s1.p7),
                ],
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Zibai.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Zibai.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Zibai.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Zibai.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Zibai.s2_id,
        title: 'talent_name.zibai_heaven_and_earth_made_manifest',
        description: 'talent_descr.zibai_heaven_and_earth_made_manifest',
        items: [
            {
                unit: 'def',
                table: new StatTable('zibai_lunar_phase_shift_1_hit_dmg', charTalentTables.Zibai.s2.p6),
            },
            {
                unit: 'def',
                table: new StatTable('zibai_lunar_phase_shift_2_hit_dmg', charTalentTables.Zibai.s2.p7),
            },
            {
                unit: 'def',
                type: 'hits',
                name: 'zibai_lunar_phase_shift_3_hit_dmg',
                table: [
                    new StatTable('zibai_lunar_phase_shift_3_hit_dmg_1', charTalentTables.Zibai.s2.p8),
                    new StatTable('zibai_lunar_phase_shift_3_hit_dmg_2', charTalentTables.Zibai.s2.p9),
                ],
            },
            {
                unit: 'def',
                table: new StatTable('zibai_lunar_phase_shift_4_hit_dmg', charTalentTables.Zibai.s2.p10),
            },
            {
                unit: 'def',
                type: 'hits',
                name: 'zibai_lunar_phase_shift_charged_attack_dmg',
                table: [
                    new StatTable('zibai_lunar_phase_shift_charged_attack_dmg_1', charTalentTables.Zibai.s2.p11),
                    new StatTable('zibai_lunar_phase_shift_charged_attack_dmg_2', charTalentTables.Zibai.s2.p12),
                ],
            },
            {
                unit: 'def',
                table: new StatTable('zibai_spirit_steeds_stride_1_hit_dmg', charTalentTables.Zibai.s2.p1),
            },
            {
                unit: 'def',
                table: new StatTable('zibai_spirit_steeds_stride_2_hit_dmg', charTalentTables.Zibai.s2.p2),
            },
            {
                unit: 'def',
                table: new StatTable('zibai_lunar_phase_shift_4_hit_additional_dmg', charTalentTables.Zibai.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('zibai_lunar_phase_shift_duration', charTalentTables.Zibai.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Zibai.s2.p5),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Zibai.s3_id,
        title: 'talent_name.zibai_tri_sphere_eminence',
        description: 'talent_descr.zibai_tri_sphere_eminence',
        items: [
            {
                unit: 'def',
                table: new StatTable('zibai_skill_1_hit_dmg', charTalentTables.Zibai.s3.p1),
            },
            {
                unit: 'def',
                table: new StatTable('zibai_skill_2_hit_dmg', charTalentTables.Zibai.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Zibai.s3.p3),
            },
            {
                unit: 'unit',
                table: new StatTable('energy_cost', charTalentTables.Zibai.s3.p4),
            },
        ],
    },
    links: charTalentTables.Zibai.links,
});

const lunarcrystallizePost = new PostEffectStats({
    from: 'def*',
    percent: new StatTable('lunarcrystallize_multi', [charTalentTables.Zibai.passsive[2][0]]),
    statCap: new ValueTable([charTalentTables.Zibai.passsive[2][1] * 100]),
});

export const Zibai = new DbObjectChar({
    name: 'zibai',
    serializeId: 117,
    gameId: charTalentTables.Zibai.char_id,
    iconClass: 'char-icon-zibai',
    rarity: 5,
    element: 'geo',
    weapon: charTalentTables.Zibai.char_weapon,
    originList: ['liyue', 'lunar'],
    talents: Talents,
    statTable: charTables.Zibai,
    features: [
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'zibai_lunar_phase_shift', invert: 1 }),
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'zibai_lunar_phase_shift', invert: 1 }),
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
            condition: new ConditionBoolean({ name: 'zibai_lunar_phase_shift', invert: 1 }),
        }),
        new FeatureDamageNormal({
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3_1'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'zibai_lunar_phase_shift', invert: 1 }),
        }),
        new FeatureDamageNormal({
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3_2'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'zibai_lunar_phase_shift', invert: 1 }),
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'zibai_lunar_phase_shift', invert: 1 }),
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'charged',
            name: 'charged_hit',
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.charged_hit_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.charged_hit_2'),
                        }),
                    ],
                },
            ],
            condition: new ConditionBoolean({ name: 'zibai_lunar_phase_shift', invert: 1 }),
        }),
        new FeatureDamageCharged({
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit_1'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'zibai_lunar_phase_shift', invert: 1 }),
        }),
        new FeatureDamageCharged({
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit_2'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'zibai_lunar_phase_shift', invert: 1 }),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_1',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.zibai_lunar_phase_shift_1_hit_dmg'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'zibai_lunar_phase_shift' }),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_2',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.zibai_lunar_phase_shift_2_hit_dmg'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'zibai_lunar_phase_shift' }),
        }),
        new FeatureDamageMultihit({
            name: 'normal_hit_3',
            category: 'attack',
            damageType: 'normal',
            allowInfusion: true,
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            scaling: 'def*',
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.zibai_lunar_phase_shift_3_hit_dmg_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            scaling: 'def*',
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.zibai_lunar_phase_shift_3_hit_dmg_2'),
                        }),
                    ],
                },
            ],
            condition: new ConditionBoolean({ name: 'zibai_lunar_phase_shift' }),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3_1',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.zibai_lunar_phase_shift_3_hit_dmg_1'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'zibai_lunar_phase_shift' }),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3_2',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.zibai_lunar_phase_shift_3_hit_dmg_2'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'zibai_lunar_phase_shift' }),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.zibai_lunar_phase_shift_4_hit_dmg'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'zibai_lunar_phase_shift' }),
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'charged',
            name: 'charged_hit',
            allowInfusion: true,
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            scaling: 'def*',
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.zibai_lunar_phase_shift_charged_attack_dmg_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            scaling: 'def*',
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.zibai_lunar_phase_shift_charged_attack_dmg_2'),
                        }),
                    ],
                },
            ],
            condition: new ConditionBoolean({ name: 'zibai_lunar_phase_shift' }),
        }),
        new FeatureDamageCharged({
            name: 'charged_hit_1',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.zibai_lunar_phase_shift_charged_attack_dmg_1'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'zibai_lunar_phase_shift' }),
        }),
        new FeatureDamageCharged({
            name: 'charged_hit_2',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.zibai_lunar_phase_shift_charged_attack_dmg_2'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'zibai_lunar_phase_shift' }),
        }),
        new FeatureReactionLunarCrystallizeLike({
            element: 'geo',
            category: 'attack',
            fullName: 'skill.zibai_lunar_phase_shift_4_hit_additional_dmg',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.zibai_lunar_phase_shift_4_hit_additional_dmg'),
                    scalingSource: 'constellation4',
                    scalingMultiplier: charTalentTables.Zibai.cons[3][0],
                    scalingMultiplierCondition: new ConditionAnd([
                        new ConditionConstellation({ constellation: 4 }),
                        new ConditionBoolean({ name: 'zibai_the_spirit_passes_then_form_follows' }),
                    ]),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'zibai_lunar_phase_shift' }),
                new ConditionMoonPhaseCheck({ moonphase: 2 }),
            ]),
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
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.zibai_spirit_steeds_stride_1_hit_dmg'),
                }),
            ],
            condition: new ConditionBoolean({ name: 'zibai_lunar_phase_shift' }),
        }),
        new FeatureReactionLunarCrystallizeLike({
            element: 'geo',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    scalingSource: 'constellation1',
                    scalingMultiplier: charTalentTables.Zibai.cons[0][0],
                    scalingMultiplierCondition: new ConditionAnd([
                        new ConditionBoolean({ name: 'zibai_lunar_phase_shift' }),
                        new ConditionBoolean({ name: 'zibai_burst_forth_with_vigor_but_enter_in_silence' }),
                        new ConditionConstellation({ constellation: 1 }),
                    ]),
                    values: Talents.get('skill.zibai_spirit_steeds_stride_2_hit_dmg'),
                }),
            ],
            tags: ['zibai_spirit_steeds_stride_2_hit_dmg'],
            rotationAfterItems: (item, opts) => {
                if (item.count > 1 || opts.insideBlock) {
                    return [];
                }

                return [{
                    type: 'condition',
                    object: 'char',
                    static: true,
                    getSettings: (settings) => {
                        return {
                            'zibai_burst_forth_with_vigor_but_enter_in_silence': false,
                        };
                    },
                }];
            },
            condition: new ConditionBoolean({ name: 'zibai_lunar_phase_shift' }),
        }),
        new FeatureDamageBurst({
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.zibai_skill_1_hit_dmg'),
                }),
            ],
        }),
        new FeatureReactionLunarCrystallizeLike({
            element: 'geo',
            category: 'burst',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.zibai_skill_2_hit_dmg'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'lunarcrystallize_base_bonus',
            postEffect: lunarcrystallizePost,
            format: 'percent',
        }),
    ],
    conditions: [
        new ConditionMoonPhaseSetting(),
        new ConditionCalcElementsZibai(),
        new ConditionBoolean({
            serializeId: 1,
            name: 'zibai_lunar_phase_shift',
            title: 'talent_name.n11260001',
            description: 'talent_descr.n11260001_2',
            settings: {
                attack_infusion: 'geo',
            },
        }),
        new ConditionBoolean({
            serializeId: 2,
            name: 'zibai_the_selenic_adeptus_descends',
            title: 'talent_name.zibai_the_selenic_adeptus_descends',
            description: 'talent_descr.zibai_the_selenic_adeptus_descends',
            info: {ascension: 1},
            condition: new ConditionAscensionChar({ ascension: 1 }),
            stats: {
                text_percent: charTalentTables.Zibai.passsive[0][0] * 100,
            },
        }),
        new ConditionStatic({
            name: 'zibai_layered_peaks_pierce_the_clouds',
            title: 'talent_name.zibai_layered_peaks_pierce_the_clouds',
            description: 'talent_descr.zibai_layered_peaks_pierce_the_clouds',
            stats: {
                text_def_percent: charTalentTables.Zibai.passsive[1][0] * 100,
                text_mastery: charTalentTables.Zibai.passsive[1][1],
            },
            info: {ascension: 4},
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
        new ConditionStacksHidden({
            name: 'zibai_other_geo',
            maxStacks: 3,
            stats: [
                new StatTable('def_percent', [charTalentTables.Zibai.passsive[1][0]], 100),
            ],
            condition: new ConditionAscensionChar({ ascension: 4 }),
        }),
        new ConditionStacksHidden({
            name: 'zibai_hydro',
            maxStacks: 3,
            stats: [
                new StatTable('mastery', [charTalentTables.Zibai.passsive[1][1]]),
            ],
            condition: new ConditionAscensionChar({ ascension: 4 }),
        }),
        new ConditionStatic({
            title: 'talent_name.zibai_the_coursing_sun_and_moon',
            description: 'talent_descr.zibai_the_coursing_sun_and_moon',
            settings: {
                allowed_lunarcrystallize: 1,
            },
            stats: {
                text_percent: charTalentTables.Zibai.passsive[2][0] * 100,
                text_percent_max: charTalentTables.Zibai.passsive[2][1] * 100,
            },
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'def*',
            leveling: 'char_skill_elemental',
            source: 'ascension1',
            scalingSource: 'constellation1',
            scalingMultiplier: charTalentTables.Zibai.cons[0][0],
            scalingMultiplierCondition: new ConditionAnd([
                new ConditionBoolean({ name: 'zibai_lunar_phase_shift' }),
                new ConditionBoolean({ name: 'zibai_burst_forth_with_vigor_but_enter_in_silence' }),
                new ConditionConstellation({ constellation: 1 }),
            ]),
            values: new ValueTable([charTalentTables.Zibai.passsive[0][0]], 100),
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'zibai_the_selenic_adeptus_descends' }),
                new ConditionAscensionChar({ ascension: 1 }),
            ]),
            target: new FeatureMultiplierTarget({
                isReactionFlatBonus: true,
                tags: ['zibai_spirit_steeds_stride_2_hit_dmg'],
            }),
        }),
        new FeatureMultiplier({
            scaling: 'def*',
            leveling: 'char_skill_elemental',
            source: 'constellation2',
            scalingSource: 'constellation1',
            scalingMultiplier: charTalentTables.Zibai.cons[0][0],
            scalingMultiplierCondition: new ConditionAnd([
                new ConditionBoolean({ name: 'zibai_lunar_phase_shift' }),
                new ConditionBoolean({ name: 'zibai_burst_forth_with_vigor_but_enter_in_silence' }),
                new ConditionConstellation({ constellation: 1 }),
            ]),
            values: new ValueTable([charTalentTables.Zibai.cons[1][1] - charTalentTables.Zibai.passsive[0][0]], 100),
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'zibai_the_selenic_adeptus_descends' }),
                new ConditionAscensionChar({ ascension: 1 }),
                new ConditionConstellation({ constellation: 2 }),
                new ConditionMoonPhaseCheck({ moonphase: 2 }),
            ]),
            target: new FeatureMultiplierTarget({
                isReactionFlatBonus: true,
                tags: ['zibai_spirit_steeds_stride_2_hit_dmg'],
            }),
        }),
    ],
    postEffects: [
        lunarcrystallizePost,
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionBoolean({
                    name: 'zibai_burst_forth_with_vigor_but_enter_in_silence',
                    serializeId: 5,
                    title: 'talent_name.zibai_burst_forth_with_vigor_but_enter_in_silence',
                    description: 'talent_descr.zibai_burst_forth_with_vigor_but_enter_in_silence',
                    stats: {
                        text_percent: charTalentTables.Zibai.cons[0][0] * 100,
                    }
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.zibai_at_birth_are_souls_born_and_in_death_leave_but_husks',
                    description: 'talent_descr.zibai_at_birth_are_souls_born_and_in_death_leave_but_husks_1',
                    stats: {
                        dmg_reaction_lunarcrystallize: charTalentTables.Zibai.cons[1][0] * 100,
                    },
                }),
                new ConditionStatic({
                    title: 'talent_name.zibai_at_birth_are_souls_born_and_in_death_leave_but_husks',
                    description: 'talent_descr.zibai_at_birth_are_souls_born_and_in_death_leave_but_husks_2',
                    stats: {
                        text_percent: charTalentTables.Zibai.cons[1][1] * 100,
                    },
                    condition: new ConditionMoonPhaseCheck({ moonphase: 2 }),
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
                    serializeId: 3,
                    name: 'zibai_the_spirit_passes_then_form_follows',
                    title: 'talent_name.zibai_the_spirit_passes_then_form_follows',
                    description: 'talent_descr.zibai_the_spirit_passes_then_form_follows',
                    stats: {
                        text_percent: charTalentTables.Zibai.cons[3][0] * 100,
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
                new ConditionNumberPhaseShiftRadiance({
                    serializeId: 4,
                    name: 'zibai_the_world_a_journey_in_passing',
                    title: 'talent_name.zibai_the_world_a_journey_in_passing',
                    description: 'talent_descr.zibai_the_world_a_journey_in_passing',
                    statScale: charTalentTables.Zibai.cons[5][0] * 100,
                    stat: 'dmg_reaction_lunarcrystallize_bonus',
                    stats: {
                        text_percent: charTalentTables.Zibai.cons[5][0] * 100,
                    }
                }),
            ],
        },
    ]),
    partyData: {

        loadStats: {
            stats: ['def_total'],
        },
        conditions: [
            new ConditionMoonPhaseSetting(),
            new ConditionNumber({
                name: 'zibai_def_total',
                title: 'talent_name.stats_total_def',
                partyStat: 'def_total',
                serializeId: 1,
                rotation: 'party',
                max: 10000,
            }),
            new ConditionStatic({
                title: 'talent_name.zibai_the_coursing_sun_and_moon',
                description: 'talent_descr.zibai_the_coursing_sun_and_moon',
                settings: {
                    allowed_lunarcrystallize: 1,
                },
                stats: {
                    text_percent: charTalentTables.Zibai.passsive[2][0] * 100,
                    text_percent_max: charTalentTables.Zibai.passsive[2][1] * 100,
                },
            }),
        ],
        postEffects: [
            new PostEffectStats({
                from: 'zibai_def_total',
                percent: new StatTable('lunarcrystallize_multi', [charTalentTables.Zibai.passsive[2][0]]),
                statCap: new ValueTable([charTalentTables.Zibai.passsive[2][1] * 100]),
            })
        ],
    },
});
