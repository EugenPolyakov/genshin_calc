import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamageVarka, getVarkaActiveElement } from "../../classes/Feature2/Damage/Varka";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";
import { FeatureDamage } from "../../classes/Feature2/Damage";
import { ConditionCalcElementsVarka } from "../../classes/Condition/CalcElementsVarka";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionHexCheck } from "../../classes/Condition/HexCheck";
import { ConditionVarkaStatic } from "../../classes/Condition/Static/Varka";
import { ConditionHexCurrent } from "../../classes/Condition/HexCurrent";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { ValueTable } from "../../classes/ValueTable";
import { FeatureMultiplierVarkaSkill } from "../../classes/Feature2/Multiplier/VarkaSkill";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionStacksHidden } from "../../classes/Condition/Stacks/Hidden";
import { ConditionDropdownElement } from "../../classes/Condition/Dropdown/Element";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Varka.s1_id,
        title: 'talent_name.varka_dancing_radiance',
        description: 'talent_descr.varka_dancing_radiance',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Varka.s1.p1),
            },
            {
                type: 'hits',
                name: 'normal_hit_2',
                table: [
                    new StatTable('normal_hit_2_1', charTalentTables.Varka.s1.p3),
                    new StatTable('normal_hit_2_2', charTalentTables.Varka.s1.p2),
                ],
            },
            {
                type: 'hits',
                name: 'normal_hit_3',
                table: [
                    new StatTable('normal_hit_3_1', charTalentTables.Varka.s1.p5),
                    new StatTable('normal_hit_3_2', charTalentTables.Varka.s1.p4),
                ],
            },
            {
                type: 'hits',
                name: 'normal_hit_4',
                table: [
                    new StatTable('normal_hit_4_1', charTalentTables.Varka.s1.p6),
                    new StatTable('normal_hit_4_2', charTalentTables.Varka.s1.p7),
                ],
            },
            {
                type: 'hits',
                name: 'normal_hit_5',
                table: [
                    new StatTable('normal_hit_5_1', charTalentTables.Varka.s1.p8),
                    new StatTable('normal_hit_5_2', charTalentTables.Varka.s1.p9),
                ],
            },
            {
                type: 'hits',
                name: 'charged_hit',
                table: [
                    new StatTable('charged_hit_1', charTalentTables.Varka.s1.p10),
                    new StatTable('charged_hit_2', charTalentTables.Varka.s1.p11),
                ],
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Varka.s1.p12),
            },
            {
                table: new StatTable('plunge', charTalentTables.Varka.s1.p13),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Varka.s1.p14),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Varka.s1.p15),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Varka.s2_id,
        title: 'talent_name.varka_windbound_execution',
        description: 'talent_descr.varka_windbound_execution',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Varka.s2.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('cd_press', charTalentTables.Varka.s2.p19),
            },
            {
                unit: 'sec',
                table: new StatTable('cd_hold', charTalentTables.Varka.s2.p20),
            },
            {
                unit: 'sec',
                table: new StatTable('varka_sturm_und_drang_duration', charTalentTables.Varka.s2.p2),
            },
            {
                table: new StatTable('varka_sturm_und_drang_1_hit_dmg', charTalentTables.Varka.s2.p3),
            },
            {
                type: 'hits',
                name: 'varka_sturm_und_drang_2_hit_dmg',
                table: [
                    new StatTable('varka_sturm_und_drang_2_hit_dmg_1', charTalentTables.Varka.s2.p5),
                    new StatTable('varka_sturm_und_drang_2_hit_dmg_2', charTalentTables.Varka.s2.p4),
                ],
            },
            {
                type: 'hits',
                name: 'varka_sturm_und_drang_3_hit_dmg',
                table: [
                    new StatTable('varka_sturm_und_drang_3_hit_dmg_1', charTalentTables.Varka.s2.p7),
                    new StatTable('varka_sturm_und_drang_3_hit_dmg_2', charTalentTables.Varka.s2.p6),
                ],
            },
            {
                type: 'hits',
                name: 'varka_sturm_und_drang_4_hit_dmg',
                table: [
                    new StatTable('varka_sturm_und_drang_4_hit_dmg_1', charTalentTables.Varka.s2.p8),
                    new StatTable('varka_sturm_und_drang_4_hit_dmg_2', charTalentTables.Varka.s2.p9),
                ],
            },
            {
                type: 'hits',
                name: 'varka_sturm_und_drang_5_hit_dmg',
                table: [
                    new StatTable('varka_sturm_und_drang_5_hit_dmg_1', charTalentTables.Varka.s2.p10),
                    new StatTable('varka_sturm_und_drang_5_hit_dmg_2', charTalentTables.Varka.s2.p11),
                ],
            },
            {
                type: 'hits',
                name: 'varka_sturm_und_drang_charged_attack_dmg',
                table: [
                    new StatTable('varka_sturm_und_drang_charged_attack_dmg_1', charTalentTables.Varka.s2.p12),
                    new StatTable('varka_sturm_und_drang_charged_attack_dmg_2', charTalentTables.Varka.s2.p13),
                ],
            },
            {
                type: 'hits',
                name: 'varka_four_winds_ascension_dmg',
                table: [
                    new StatTable('varka_four_winds_ascension_dmg_1', charTalentTables.Varka.s2.p14),
                    new StatTable('varka_four_winds_ascension_dmg_2', charTalentTables.Varka.s2.p15),
                ],
            },
            {
                type: 'separated',
                name: 'varka_azure_devour_dmg',
                separator: ' + ',
                table: [
                    new StatTable('varka_azure_devour_dmg_1', charTalentTables.Varka.s2.p16),
                    new StatTable('varka_azure_devour_dmg_2', charTalentTables.Varka.s2.p17),
                ],
                counts: ['*2', '*2'],
            },
            {
                unit: 'sec',
                table: new StatTable('varka_four_winds_ascension_cd', charTalentTables.Varka.s2.p18),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Varka.s3_id,
        title: 'talent_name.varka_northwind_avatar',
        description: 'talent_descr.varka_northwind_avatar',
        items: [
            {
                table: new StatTable('varka_skill_1_hit_dmg', charTalentTables.Varka.s3.p1),
            },
            {
                table: new StatTable('varka_skill_2_hit_dmg', charTalentTables.Varka.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Varka.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Varka.s3.p4),
            },
        ],
    },
    links: charTalentTables.Varka.links,
});

export function VarkaSturmUndDrangScalingMultiplier(data) {
    if (data.settings.varka_has_all)
        return charTalentTables.Varka.passsive[0][3];
    else if (data.settings.varka_has_one)
        return charTalentTables.Varka.passsive[0][2];
    else
        return 1;
}

export const Varka = new DbObjectChar({
    name: 'varka',
    serializeId: 118,
    gameId: charTalentTables.Varka.char_id,
    iconClass: 'char-icon-varka',
    rarity: 5,
    element: 'anemo',
    weapon: charTalentTables.Varka.char_weapon,
    origin: 'mondstadt',
    talents: Talents,
    statTable: charTables.Varka,
    features: [
        new FeatureDamageNormal({
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang', invert: 1 }),
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_2',
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang', invert: 1 }),
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_2_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_2_2'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang', invert: 1 }),
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang', invert: 1 }),
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2_2'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_3',
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang', invert: 1 }),
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
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang', invert: 1 }),
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang', invert: 1 }),
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3_2'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_4',
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang', invert: 1 }),
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_4_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_4_2'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang', invert: 1 }),
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang', invert: 1 }),
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4_2'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_5',
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang', invert: 1 }),
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
        }),
        new FeatureDamageNormal({
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang', invert: 1 }),
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang', invert: 1 }),
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5_2'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'charged',
            name: 'charged_hit',
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang', invert: 1 }),
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
        }),
        new FeatureDamageCharged({
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang', invert: 1 }),
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit_1'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang', invert: 1 }),
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit_2'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang', invert: 1 }),
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang', invert: 1 }),
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang', invert: 1 }),
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageVarka({
            category: 'attack',
            damageType: 'normal',
            fullName: 'skill.varka_sturm_und_drang_1_hit_dmg',
            allowInfusion: true,
            damageBonuses: ['dmg_sturm_und_drang'],
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang' }),
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    scalingMultiplier: VarkaSturmUndDrangScalingMultiplier,
                    scalingSource: 'ascension1',
                    scalingMultiplierCondition: new ConditionAscensionChar({ ascension: 1 }),
                    values: Talents.get('skill.varka_sturm_und_drang_1_hit_dmg'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'anemo',
            fullName: 'skill.varka_sturm_und_drang_2_hit_dmg_anemo',
            name: 'varka_sturm_und_drang_2_hit_dmg_anemo',
            damageBonuses: ['dmg_sturm_und_drang'],
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang' }),
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    scalingMultiplier: VarkaSturmUndDrangScalingMultiplier,
                    scalingSource: 'ascension1',
                    scalingMultiplierCondition: new ConditionAscensionChar({ ascension: 1 }),
                    values: Talents.get('skill.varka_sturm_und_drang_2_hit_dmg_1'),
                }),
            ],
        }),
        new FeatureDamageVarka({
            category: 'attack',
            damageType: 'normal',
            fullName: 'skill.varka_sturm_und_drang_2_hit_dmg',
            name: 'varka_sturm_und_drang_2_hit_dmg',
            allowInfusion: true,
            damageBonuses: ['dmg_sturm_und_drang'],
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang' }),
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    scalingMultiplier: VarkaSturmUndDrangScalingMultiplier,
                    scalingSource: 'ascension1',
                    scalingMultiplierCondition: new ConditionAscensionChar({ ascension: 1 }),
                    values: Talents.get('skill.varka_sturm_und_drang_2_hit_dmg_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'anemo',
            fullName: 'skill.varka_sturm_und_drang_3_hit_dmg_anemo',
            name: 'varka_sturm_und_drang_3_hit_dmg_anemo',
            damageBonuses: ['dmg_sturm_und_drang'],
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang' }),
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    scalingMultiplier: VarkaSturmUndDrangScalingMultiplier,
                    scalingSource: 'ascension1',
                    scalingMultiplierCondition: new ConditionAscensionChar({ ascension: 1 }),
                    values: Talents.get('skill.varka_sturm_und_drang_3_hit_dmg_1'),
                }),
            ],
        }),
        new FeatureDamageVarka({
            category: 'attack',
            damageType: 'normal',
            fullName: 'skill.varka_sturm_und_drang_3_hit_dmg',
            name: 'varka_sturm_und_drang_3_hit_dmg',
            allowInfusion: true,
            damageBonuses: ['dmg_sturm_und_drang'],
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang' }),
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    scalingMultiplier: VarkaSturmUndDrangScalingMultiplier,
                    scalingSource: 'ascension1',
                    scalingMultiplierCondition: new ConditionAscensionChar({ ascension: 1 }),
                    values: Talents.get('skill.varka_sturm_und_drang_3_hit_dmg_2'),
                }),
            ],
        }),
        new FeatureDamageVarka({
            category: 'attack',
            damageType: 'normal',
            fullName: 'skill.varka_sturm_und_drang_4_hit_dmg',
            name: 'varka_sturm_und_drang_4_hit_dmg',
            allowInfusion: true,
            damageBonuses: ['dmg_sturm_und_drang'],
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang' }),
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    scalingMultiplier: VarkaSturmUndDrangScalingMultiplier,
                    scalingSource: 'ascension1',
                    scalingMultiplierCondition: new ConditionAscensionChar({ ascension: 1 }),
                    values: Talents.get('skill.varka_sturm_und_drang_4_hit_dmg_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'anemo',
            fullName: 'skill.varka_sturm_und_drang_4_hit_dmg_anemo',
            name: 'varka_sturm_und_drang_4_hit_dmg_anemo',
            damageBonuses: ['dmg_sturm_und_drang'],
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang' }),
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    scalingMultiplier: VarkaSturmUndDrangScalingMultiplier,
                    scalingSource: 'ascension1',
                    scalingMultiplierCondition: new ConditionAscensionChar({ ascension: 1 }),
                    values: Talents.get('skill.varka_sturm_und_drang_4_hit_dmg_2'),
                }),
            ],
        }),
        new FeatureDamageVarka({
            category: 'attack',
            damageType: 'normal',
            fullName: 'skill.varka_sturm_und_drang_5_hit_dmg',
            name: 'varka_sturm_und_drang_5_hit_dmg',
            allowInfusion: true,
            damageBonuses: ['dmg_sturm_und_drang'],
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang' }),
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    scalingMultiplier: VarkaSturmUndDrangScalingMultiplier,
                    scalingSource: 'ascension1',
                    scalingMultiplierCondition: new ConditionAscensionChar({ ascension: 1 }),
                    values: Talents.get('skill.varka_sturm_und_drang_5_hit_dmg_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'anemo',
            fullName: 'skill.varka_sturm_und_drang_5_hit_dmg_anemo',
            name: 'varka_sturm_und_drang_5_hit_dmg_anemo',
            damageBonuses: ['dmg_sturm_und_drang'],
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang' }),
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    scalingMultiplier: VarkaSturmUndDrangScalingMultiplier,
                    scalingSource: 'ascension1',
                    scalingMultiplierCondition: new ConditionAscensionChar({ ascension: 1 }),
                    values: Talents.get('skill.varka_sturm_und_drang_5_hit_dmg_2'),
                }),
            ],
        }),
        new FeatureDamageVarka({
            category: 'attack',
            damageType: 'charged',
            fullName: 'skill.varka_sturm_und_drang_charged_attack_dmg',
            name: 'varka_sturm_und_drang_charged_attack_dmg',
            allowInfusion: true,
            damageBonuses: ['dmg_sturm_und_drang'],
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang' }),
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    scalingMultiplier: VarkaSturmUndDrangScalingMultiplier,
                    scalingSource: 'ascension1',
                    scalingMultiplierCondition: new ConditionAscensionChar({ ascension: 1 }),
                    values: Talents.get('skill.varka_sturm_und_drang_charged_attack_dmg_1'),
                }),
            ],
        }),
        new FeatureDamage({
            category: 'attack',
            damageType: 'charged',
            element: 'anemo',
            damageBonuses: ['dmg_sturm_und_drang'],
            fullName: 'skill.varka_sturm_und_drang_charged_attack_dmg_anemo',
            name: 'varka_sturm_und_drang_charged_attack_dmg_anemo',
            condition: new ConditionBoolean({ name: 'varka_sturm_und_drang' }),
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    scalingMultiplier: VarkaSturmUndDrangScalingMultiplier,
                    scalingSource: 'ascension1',
                    scalingMultiplierCondition: new ConditionAscensionChar({ ascension: 1 }),
                    values: Talents.get('skill.varka_sturm_und_drang_charged_attack_dmg_2'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'charged',
            fullName: 'skill.varka_azure_devour_dmg',
            name: 'varka_azure_devour_dmg',
            element: getVarkaActiveElement,
            allowInfusion: true,
            damageBonuses: ['dmg_sturm_und_drang'],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'varka_has_any' }),
                new ConditionBoolean({ name: 'varka_sturm_und_drang' }),
            ]),
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplierVarkaSkill({
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.varka_azure_devour_dmg_1'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageVarka({
            category: 'attack',
            damageType: 'charged',
            fullName: 'skill.varka_azure_devour_dmg_1',
            allowInfusion: true,
            damageBonuses: ['dmg_sturm_und_drang'],
            isChild: true,
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'varka_has_any' }),
                new ConditionBoolean({ name: 'varka_sturm_und_drang' }),
            ]),
            multipliers: [
                new FeatureMultiplierVarkaSkill({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.varka_azure_devour_dmg_1'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'charged',
            fullName: 'skill.varka_azure_devour_dmg_anemo',
            name: 'varka_azure_devour_dmg_anemo',
            element: 'anemo',
            damageBonuses: ['dmg_sturm_und_drang'],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'varka_has_any' }),
                new ConditionBoolean({ name: 'varka_sturm_und_drang' }),
            ]),
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplierVarkaSkill({
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.varka_azure_devour_dmg_2'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamage({
            category: 'attack',
            damageType: 'charged',
            fullName: 'skill.varka_azure_devour_dmg_anemo_1',
            name: 'varka_azure_devour_dmg_anemo_1',
            element: 'anemo',
            damageBonuses: ['dmg_sturm_und_drang'],
            isChild: true,
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'varka_has_any' }),
                new ConditionBoolean({ name: 'varka_sturm_und_drang' }),
            ]),
            multipliers: [
                new FeatureMultiplierVarkaSkill({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.varka_azure_devour_dmg_2'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageVarka({
            category: 'skill',
            damageType: 'skill',
            name: 'varka_four_winds_ascension_dmg',
            damageBonuses: ['dmg_sturm_und_drang'],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'varka_has_any' }),
                new ConditionBoolean({ name: 'varka_sturm_und_drang' }),
            ]),
            multipliers: [
                new FeatureMultiplierVarkaSkill({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.varka_four_winds_ascension_dmg_1'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'anemo',
            name: 'varka_four_winds_ascension_dmg_anemo',
            damageBonuses: ['dmg_sturm_und_drang'],
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'varka_has_any' }),
                new ConditionBoolean({ name: 'varka_sturm_und_drang' }),
            ]),
            multipliers: [
                new FeatureMultiplierVarkaSkill({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.varka_four_winds_ascension_dmg_2'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            category: 'burst',
            damageType: 'burst',
            element: (settings) => getVarkaActiveElement(settings, 'anemo'),
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.varka_skill_1_hit_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.varka_skill_2_hit_dmg'),
                }),
            ],
        }),
        new FeatureDamage({
            element: 'anemo',
            category: 'other',
            name: 'varka_constellation2',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: new ValueTable([charTalentTables.Varka.cons[1][0]]),
                }),
            ],
            condition: new ConditionConstellation({ constellation: 2 }),
        }),
    ],
    conditions: [
        new ConditionCalcElementsVarka(),
        new ConditionBoolean({
            name: 'varka_sturm_und_drang',
            serializeId: 1,
            title: 'talent_name.n11280001',
            description: 'talent_descr.n11280001_1',
        }),
        new ConditionBoolean({
            name: 'char_hex_varka',
            serializeId: 2,
            title: 'talent_name.varka_dawns_return',
            description: 'talent_descr.varka_dawns_return_1',
        }),
        new ConditionStatic({
            title: 'talent_name.varka_dawns_return',
            description: 'talent_descr.varka_dawns_return_2',
            condition: new ConditionAnd([
                new ConditionHexCheck({ hex: 2 }),
                new ConditionHexCurrent(),
            ]),
        }),
        new ConditionVarkaStatic({
            title: 'talent_name.varka_dawn_winds_march',
            description: 'talent_descr.varka_dawn_winds_march',
            info: {ascension: 1},
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new ConditionStacks({
            name: 'varka_winds_vanguard',
            serializeId: 3,
            title: 'talent_name.varka_winds_vanguard',
            description: 'talent_descr.varka_winds_vanguard',
            info: { ascension: 4 },
            maxStacks: charTalentTables.Varka.passsive[1][2],
            stats: [
                new StatTable('dmg_sturm_und_drang', [charTalentTables.Varka.passsive[1][1]], 100),
            ],
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
    ],
    postEffects: [
        new PostEffectStats({
            from: 'atk*',
            percent: [...['dmg_anemo', 'dmg_pyro', 'dmg_hydro', 'dmg_cryo', 'dmg_electro'].map(elem => new StatTable(elem, [charTalentTables.Varka.passsive[0][0]], 0.1))],
            statCap: new ValueTable([charTalentTables.Varka.passsive[0][1]], 100),
            condition: new ConditionAnd([
                new ConditionAscensionChar({ ascension: 1 }),
                new ConditionBoolean({ name: 'varka_has_any' }),
            ]),
        }),
    ],
    multipliers: [
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionBoolean({
                    name: 'varka_come_friend_let_us_dance_beneath_the_moons_soft_glow',
                    serializeId: 4,
                    title: 'talent_name.varka_come_friend_let_us_dance_beneath_the_moons_soft_glow',
                    description: 'talent_descr.varka_come_friend_let_us_dance_beneath_the_moons_soft_glow',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    name: 'varka_when_dawn_breaks_our_journey_shall_take_flight',
                    title: 'talent_name.varka_when_dawn_breaks_our_journey_shall_take_flight',
                    description: 'talent_descr.varka_when_dawn_breaks_our_journey_shall_take_flight',
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
                new ConditionDropdownElement({
                    name: 'varka_for_none_may_take_from_us_our_freedom_of_song',
                    serializeId: 5,
                    title: 'talent_name.varka_for_none_may_take_from_us_our_freedom_of_song',
                    description: 'talent_descr.varka_for_none_may_take_from_us_our_freedom_of_song',
                    values: [
                        {
                            value: 'pyro',
                            serializeId: 4,
                            conditions: [
                                new Condition({ stats: { dmg_pyro: 20, dmg_anemo: 20 } }),
                            ],
                        },
                        {
                            value: 'hydro',
                            serializeId: 3,
                            conditions: [
                                new Condition({ stats: { dmg_hydro: 20, dmg_anemo: 20 } }),
                            ],
                        },
                        {
                            value: 'electro',
                            serializeId: 2,
                            conditions: [
                                new Condition({ stats: { dmg_electro: 20, dmg_anemo: 20 } }),
                            ],
                        },
                        {
                            value: 'cryo',
                            serializeId: 1,
                            conditions: [
                                new Condition({ stats: { dmg_cryo: 20, dmg_anemo: 20 } }),
                            ],
                        },
                    ],
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
                    name: 'varka_beloved_mondstadt_steadfast_you_shall_shine',
                    title: 'talent_name.varka_beloved_mondstadt_steadfast_you_shall_shine',
                    description: 'talent_descr.varka_beloved_mondstadt_steadfast_you_shall_shine',
                }),
                new ConditionStacksHidden({
                    name: 'varka_winds_vanguard',
                    maxStacks: charTalentTables.Varka.passsive[1][2],
                    stats: [
                        new StatTable('crit_dmg', [charTalentTables.Varka.cons[5][1]], 100),
                    ],
                    condition: new ConditionAscensionChar({ ascension: 4 }),
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'char_hex_varka',
                serializeId: 1,
                title: 'talent_name.varka_dawns_return',
                description: 'talent_descr.varka_dawns_return_1',
            }),
            new ConditionDropdownElement({
                name: 'party.varka_for_none_may_take_from_us_our_freedom_of_song',
                serializeId: 2,
                title: 'talent_name.varka_for_none_may_take_from_us_our_freedom_of_song',
                description: 'talent_descr.varka_for_none_may_take_from_us_our_freedom_of_song',
                info: { constellation: 4 },
                values: [
                    {
                        value: 'pyro',
                        serializeId: 4,
                        conditions: [
                            new Condition({ stats: { dmg_pyro: 20, dmg_anemo: 20 } }),
                        ],
                    },
                    {
                        value: 'hydro',
                        serializeId: 3,
                        conditions: [
                            new Condition({ stats: { dmg_hydro: 20, dmg_anemo: 20 } }),
                        ],
                    },
                    {
                        value: 'electro',
                        serializeId: 2,
                        conditions: [
                            new Condition({ stats: { dmg_electro: 20, dmg_anemo: 20 } }),
                        ],
                    },
                    {
                        value: 'cryo',
                        serializeId: 1,
                        conditions: [
                            new Condition({ stats: { dmg_cryo: 20, dmg_anemo: 20 } }),
                        ],
                    },
                ],
            }),
        ],
    },
});
