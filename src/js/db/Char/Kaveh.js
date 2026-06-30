import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanLevels } from "../../classes/Condition/Boolean/Levels";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionLevels } from "../../classes/Condition/Levels";
import { ConditionNumberTalent } from "../../classes/Condition/Number/Talent";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamage } from "../../classes/Feature2/Damage";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Kaveh.s1_id,
        title: 'talent_name.kaveh_schematic_setup',
        description: 'talent_descr.kaveh_schematic_setup',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Kaveh.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Kaveh.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Kaveh.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Kaveh.s1.p4),
            },
            {
                table: new StatTable('charged_spin', charTalentTables.Kaveh.s1.p5),
            },
            {
                table: new StatTable('charged_final', charTalentTables.Kaveh.s1.p6),
            },
            {
                unit: 'per_sec',
                table: new StatTable('stamina_cost', charTalentTables.Kaveh.s1.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('max_duration', charTalentTables.Kaveh.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Kaveh.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Kaveh.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Kaveh.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Kaveh.s2_id,
        title: 'talent_name.kaveh_artistic_ingenuity',
        description: 'talent_descr.kaveh_artistic_ingenuity',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Kaveh.s2.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Kaveh.s2.p2),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Kaveh.s3_id,
        title: 'talent_name.kaveh_painted_dome',
        description: 'talent_descr.kaveh_painted_dome_1',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Kaveh.s3.p1),
            },
            {
                table: new StatTable('kaveh_bloom_dmg_bonus', charTalentTables.Kaveh.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Kaveh.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Kaveh.s3.p4),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Kaveh.s3.p5),
            },
        ],
    },
});

const TalentValues = {
    A1BloomHeal: 300,
    A4Mastery: 25,
    C1DendroRes: 50,
    C1Healing: 25,
    C2AtkSpeed: 15,
    C4BloomDmg: 60,
    C6Dmg: 61.8,
};

export const Kaveh = new DbObjectChar({
    name: 'kaveh',
    serializeId: 69,
    gameId: 10000081,
    iconClass: "char-icon-kaveh",
    rarity: 4,
    element: 'dendro',
    weapon: 'claymore',
    origin: 'sumeru',
    talents: Talents,
    statTable: charTables.Kaveh,
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
        new FeatureDamageNormal({
            name: 'normal_hit_3',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_spin',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_spin'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_final',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_final'),
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
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamage({
            name: 'kaveh_pairidaezas_light_dmg',
            category: 'attack',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation6',
                    values: new ValueTable([TalentValues.C6Dmg]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
        }),
        new FeatureHeal({
            name: 'kaveh_bloom_heal',
            category: 'other',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    source: 'ascension1',
                    values: new ValueTable([TalentValues.A1BloomHeal]),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'kaveh_painted_dome',
            serializeId: 1,
            title: 'talent_name.kaveh_painted_dome',
            description: 'talent_descr.kaveh_painted_dome_2',
            settings: {
                attack_infusion: 'dendro',
            },
        }),
        new ConditionLevels({
            levelSetting: 'char_skill_burst',
            stats: [
                Talents.getAlias('burst.kaveh_bloom_dmg_bonus', 'dmg_reaction_rupture'),
            ],
            subConditions: [
                new ConditionBoolean({name: 'kaveh_painted_dome'}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.kaveh_an_architects_undertaking',
            description: 'talent_descr.kaveh_an_architects_undertaking',
            info: {ascension: 1},
            stats: {
                text_percent_heal: TalentValues.A1BloomHeal,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStacks({
            name: 'kaveh_a_craftsmans_curious_conceptions',
            serializeId: 2,
            title: 'talent_name.kaveh_a_craftsmans_curious_conceptions',
            description: 'talent_descr.kaveh_a_craftsmans_curious_conceptions',
            maxStacks: 4,
            info: {ascension: 4},
            stats: [
                new StatTable('mastery', [TalentValues.A4Mastery]),
            ],
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionBoolean({
                    name: 'kaveh_sublime_salutations',
                    serializeId: 3,
                    title: 'talent_name.kaveh_sublime_salutations',
                    description: 'talent_descr.kaveh_sublime_salutations',
                    stats: {
                        res_dendro: TalentValues.C1DendroRes,
                        healing_recv: TalentValues.C1Healing,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.kaveh_grace_of_royal_roads',
                    description: 'talent_descr.kaveh_grace_of_royal_roads',
                    stats: {
                        atk_speed_normal: TalentValues.C2AtkSpeed,
                    },
                    subConditions: [
                        new ConditionBoolean({name: 'kaveh_painted_dome'}),
                    ],
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
                    title: 'talent_name.kaveh_feast_of_apadana',
                    description: 'talent_descr.kaveh_feast_of_apadana',
                    stats: {
                        dmg_reaction_rupture: TalentValues.C4BloomDmg,
                    },
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
                    title: 'talent_name.kaveh_pairidaezas_dreams',
                    description: 'talent_descr.kaveh_pairidaezas_dreams',
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionNumberTalent({
                name: 'kaveh_char_skill_burst',
                title: 'talent_name.stats_level_burst',
                partySetting: 'char_skill_burst',
                serializeId: 1,
            }),
            new ConditionBoolean({
                name: 'party.kaveh_profferings_of_dur_untash',
                serializeId: 2,
                title: 'talent_name.kaveh_profferings_of_dur_untash',
                description: 'talent_descr.char_constellation_burst',
                settings: {
                    kaveh_char_skill_burst_bonus: 3,
                },
                info: {
                    constellation: 3,
                },
            }),
            new ConditionBooleanLevels({
                name: 'party.kaveh_painted_dome',
                serializeId: 3,
                rotation: 'party',
                title: 'talent_name.kaveh_painted_dome',
                description: 'talent_descr.kaveh_painted_dome_3',
                levelSetting: 'kaveh_char_skill_burst',
                stats: [
                    Talents.getAlias('burst.kaveh_bloom_dmg_bonus', 'dmg_reaction_rupture'),
                ],
            }),
        ],
    },
});
