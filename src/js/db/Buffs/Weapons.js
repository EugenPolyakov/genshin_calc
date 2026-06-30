import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionHexCheck } from "../../classes/Condition/HexCheck";
import { ConditionHexCurrent } from "../../classes/Condition/HexCurrent";
import { ConditionLevelSelect } from "../../classes/Condition/LevelSelect";
import { ConditionNot } from "../../classes/Condition/Not";
import { ConditionPartyWeapon } from "../../classes/Condition/PartyWeapon";
import { ConditionStacksHidden } from "../../classes/Condition/Stacks/Hidden";
import { DbObjectBuff } from "../../classes/DbObject/Buff";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { StatTable } from "../../classes/StatTable";
import { StatTableConditions } from "../../classes/StatTable/Condition";
import { CHARACTER_MAX_POSSIBLE_HP } from "../Constants";
import { weaponDataTable } from "../generated/WeaponStatTables";

export const Weapons = new DbObjectBuff({
    name: 'weapons',
    conditions: [
        new ConditionLevelSelect({
            name: 'weapon.thrilling_tales',
            serializeId: 13,
            rotation: 'buffs',
            title: 'weapon_name.thrilling_tales_of_dragon_slayers',
            description: 'talent_descr.weapon_heritage',
            maxStacks: 5,
            icon: {
                rarity: 3,
                name: 'sprite-weapon-catalyst weapon-icon-catalyst-thrilling-tales-of-dragon-slayers',
            },
            stats: [
                new StatTable('atk_percent', [24, 30, 36, 42, 48]),
                new StatTable('text_percent', [24, 30, 36, 42, 48]),
            ],
        }),
        new ConditionLevelSelect({
            name: 'weapon_other.weapon_wolfs_gravestone',
            serializeId: 14,
            rotation: 'buffs',
            title: 'weapon_name.wolfs_gravestone',
            description: 'talent_descr.weapon_wolfish_tracker_2',
            maxStacks: 5,
            icon: {
                rarity: 5,
                name: 'sprite-weapon-claymore weapon-icon-claymore-wolfs-gravestone',
            },
            stats: [
                new StatTable('atk_percent', [40, 50, 60, 70, 80]),
            ],
            subConditions: [
                new ConditionBoolean({
                    name: 'weapon_wolfs_gravestone',
                    invert: true,
                }),
            ],
        }),
        new ConditionLevelSelect({
            name: 'weapon_other.weapon_elegy_for_the_end',
            serializeId: 15,
            rotation: 'buffs',
            title: 'weapon_name.elegy_for_the_end',
            description: 'talent_descr.weapon_the_parting_refrain_1',
            maxStacks: 5,
            icon: {
                rarity: 5,
                name: 'sprite-weapon-bow weapon-icon-bow-elegy-for-the-end',
            },
            stats: [
                new StatTable('text_value', [100, 125, 150, 175, 200]),
                new StatTable('text_percent', [20, 25, 30, 35, 40]),
            ],
        }),
        new ConditionLevelSelect({
            name: 'weapon_other.weapon_song_of_broken_pines',
            serializeId: 16,
            rotation: 'buffs',
            title: 'weapon_name.song_of_broken_pines',
            description: 'talent_descr.weapon_rebels_banner_hymn_2',
            maxStacks: 5,
            icon: {
                rarity: 5,
                name: 'sprite-weapon-claymore weapon-icon-claymore-song-of-broken-pines',
            },
            stats: [
                new StatTable('text_percent', [20, 25, 30, 35, 40]),
                new StatTable('text_percent_2', [12, 15, 18, 21, 24]),
            ],
        }),
        new ConditionLevelSelect({
            name: 'weapon_other.weapon_freedom_sworn',
            serializeId: 18,
            rotation: 'buffs',
            title: 'weapon_name.freedom_sworn',
            description: 'talent_descr.weapon_revolutionary_chorale_2',
            maxStacks: 5,
            icon: {
                rarity: 5,
                name: 'sprite-weapon-sword weapon-icon-sword-freedom-sworn',
            },
            stats: [
                new StatTable('text_percent', [20, 25, 30, 35, 40]),
                new StatTable('text_percent_2', [16, 20, 24, 28, 32]),
            ],
        }),
        new ConditionLevelSelect({
            name: 'weapon_other.weapon_white_dragon_ring',
            serializeId: 19,
            rotation: 'buffs',
            title: 'weapon_name.hakushin_ring',
            description: 'talent_descr.weapon_sakura_saiguu',
            maxStacks: 5,
            icon: {
                rarity: 4,
                name: 'sprite-weapon-catalyst weapon-icon-catalyst-hakushin-ring',
            },
            stats: [
                new StatTable('dmg_own', [10, 12.5, 15, 17.5, 20]),
            ],
            subConditions: [
                new ConditionBoolean({
                    name: 'weapon_white_dragon_ring',
                    invert: true,
                }),
            ],
        }),
        new ConditionLevelSelect({
            name: 'weapon_other.forest_sanctuary',
            serializeId: 27,
            rotation: 'buffs',
            title: 'talent_name.weapon_forest_sanctuary',
            description: 'talent_descr.weapon_forest_sanctuary',
            maxStacks: 5,
            icon: {
                rarity: 4,
                name: 'sprite-weapon-sword weapon-icon-sword-sapwood-blade',
            },
            stats: [
                new StatTable('mastery', [60, 75, 90, 105, 120]),
            ],
            subConditions: [
                new ConditionBoolean({
                    name: 'weapon_forest_sanctuary',
                    invert: true,
                }),
            ],
        }),
        new ConditionLevelSelect({
            name: 'weapon_other.stillwood_moonshadow',
            serializeId: 28,
            rotation: 'buffs',
            title: 'talent_name.weapon_stillwood_moonshadow',
            description: 'talent_descr.weapon_stillwood_moonshadow',
            maxStacks: 5,
            icon: {
                rarity: 4,
                name: 'sprite-weapon-polearm weapon-icon-polearm-moonpiercer',
            },
            stats: [
                new StatTable('atk_percent', [16, 20, 24, 28, 32]),
            ],
            subConditions: [
                new ConditionBoolean({
                    name: 'weapon_stillwood_moonshadow',
                    invert: true,
                }),
            ],
        }),
        new ConditionLevelSelect({
            name: 'weapon.cranes_echoing_call',
            serializeId: 52,
            rotation: 'buffs',
            title: 'weapon_name.cranes_echoing_call',
            description: 'talent_descr.weapon_cloudfall_axiom_1',
            maxStacks: 5,
            icon: {
                rarity: 5,
                name: 'sprite-weapon-catalyst weapon-icon-catalyst-cranes-echoing-call',
            },
            stats: [
                new StatTable('dmg_plunge', [28, 41, 54, 67, 80]),
            ],
            subConditions: [
                new ConditionNot([
                    new ConditionBoolean({name: 'weapon_cranes_echoing_call'}),
                ]),
            ],
        }),
        new ConditionPartyWeapon({
            name: 'weapon_other.desert_pavilion',
            serializeIds: [34, 44, 46],
            statName: 'desert_pavilion_mastery',
            statSerializeIds: [33, 43, 45],
            partyStat: 'mastery',
            statMax: 10000,
            title: 'talent_name.weapon_desert_pavilion_1',
            statTitle: 'talent_name.weapon_desert_pavilion_2',
            description: 'talent_descr.weapon_desert_pavilion',
            icon: {
                rarity: 4,
                name: 'sprite-weapon-claymore weapon-icon-claymore-makhaira-aquamarine',
            },
            stats: [
                new StatTable('text_percent', [24, 30, 36, 42, 48]),
            ],
        }),
        new ConditionPartyWeapon({
            name: 'weapon_other.weapon_key_of_khaj_nisut',
            serializeIds: [32, 40, 42],
            statName: 'sunken_song_of_the_sands_hp',
            statSerializeIds: [31, 39, 41],
            maxDisplay: 1,
            statClass: 'inputs-6digit',
            partyStat: 'hp',
            statMax: CHARACTER_MAX_POSSIBLE_HP,
            title: 'talent_name.weapon_sunken_song_of_the_sands',
            statTitle: 'talent_name.weapon_sunken_song_of_the_sands',
            description: 'talent_descr.weapon_sunken_song_of_the_sands_3',
            icon: {
                rarity: 5,
                name: 'sprite-weapon-sword weapon-icon-sword-key-of-khaj-nisut',
            },
            stats: [
                new StatTable('text_percent', [0.2, 0.25, 0.3, 0.35, 0.4]),
            ],
        }),
        new ConditionPartyWeapon({
            name: 'weapon_other.whisper_of_the_jinn',
            serializeIds: [30, 36, 38],
            statName: 'whisper_of_the_jinn_mastery',
            statSerializeIds: [29, 35, 37],
            partyStat: 'mastery',
            statMax: 10000,
            title: 'talent_name.weapon_jinnis_whisper_1',
            statTitle: 'talent_name.weapon_jinnis_whisper_2',
            description: 'talent_descr.weapon_jinnis_whisper',
            icon: {
                rarity: 4,
                name: 'sprite-weapon-sword weapon-icon-sword-xiphos-moonlight',
            },
            stats: [
                new StatTable('text_percent', [0.036, 0.045, 0.054, 0.063, 0.072]),
            ],
        }),
        new ConditionPartyWeapon({
            name: 'weapon_other.weapon_thousand_floating_dreams',
            serializeIds: [47, 48, 49],
            title: 'talent_name.weapon_a_thousand_nights_dawnsong',
            description: 'talent_descr.weapon_a_thousand_nights_dawnsong_2',
            icon: {
                rarity: 5,
                name: 'sprite-weapon-catalyst weapon-icon-catalyst-a-thousand-floating-dreams',
            },
            stats: [
                new StatTable('mastery', [40, 42, 44, 46, 48]),
            ],
        }),
        new ConditionPartyWeapon({
            name: 'weapon_other.weapon_peak_patrol_song',
            serializeIds: [55],
            statName: 'peak_patrol_song_def',
            statSerializeIds: [56],
            statClass: 'inputs-6digit',
            partyStat: 'def',
            statMax: 20000,
            title: 'talent_name.weapon_halcyon_years_unending_1',
            statTitle: 'talent_name.weapon_halcyon_years_unending_2',
            description: 'talent_descr.weapon_halcyon_years_unending_2',
            icon: {
                rarity: 5,
                name: 'sprite-weapon-sword weapon-icon-sword-peak-patrol-song',
            },
            stats: [
                new StatTable('text_percent', [8, 10, 12, 14, 16]),
                new StatTable('text_percent_max', [25.6, 32, 38.4, 44.8, 51.2]),
            ],
        }),
        new ConditionPartyWeapon({
            name: 'weapon_other.weapon_starcallers_watch',
            serializeIds: [57],
            title: 'talent_name.weapon_offering_unto_wind_and_sun',
            description: 'talent_descr.weapon_offering_unto_wind_and_sun_2',
            icon: {
                rarity: 5,
                name: 'sprite-weapon-catalyst weapon-icon-catalyst-starcallers-watch',
            },
            stats: [
                new StatTable('dmg_all', [28, 35, 42, 49, 56]),
            ],
            subConditions: [
                new ConditionNot([
                    new ConditionBoolean({name: 'weapon_starcallers_watch'}),
                ]),
            ],
        }),
        new ConditionLevelSelect({
            name: 'weapon_other.weapon_symphonist_of_scents',
            serializeId: 58,
            title: 'talent_name.weapon_seasoned_symphony',
            description: 'talent_descr.weapon_seasoned_symphony_3',
            rotation: 'buffs',
            maxStacks: 5,
            icon: {
                rarity: 5,
                name: 'sprite-weapon-polearm weapon-icon-polearm-symphonist-of-scents',
            },
            stats: [
                new StatTable('text_atk_percent', [32, 40, 48, 56, 64]),
            ],
        }),
        new ConditionLevelSelect({
            name: 'weapon_other.weapon_fractured_halo',
            serializeId: 59,
            title: 'talent_name.weapon_purifying_crown',
            description: 'talent_descr.weapon_purifying_crown_2',
            rotation: 'buffs',
            maxStacks: 5,
            icon: {
                rarity: 5,
                name: 'sprite-weapon-polearm weapon-icon-polearm-fractured-halo',
            },
            stats: [
                new StatTable('dmg_reaction_lunarcharged_percent', [40, 50, 60, 70, 80]),
            ],
        }),
        new ConditionLevelSelect({
            name: 'weapon_other.weapon_nightweavers_looking_glass',
            serializeId: 64,
            title: 'talent_name.weapon_nightweavers_looking_glass',
            description: 'talent_descr.weapon_nightweavers_looking_glass_3',
            rotation: 'buffs',
            maxStacks: 5,
            icon: {
                rarity: weaponDataTable.athame_artis.rarity,
                name: 'sprite-weapon-catalyst weapon-icon-catalyst-nightweavers-looking-glass',
            },
            weaponCondition: new ConditionAnd([
                new ConditionBoolean({ name: 'weapon_nightweavers_looking_glass_1' }),
                new ConditionBoolean({ name: 'weapon_nightweavers_looking_glass_2' }),
            ]),
            stats: [
                new StatTable('text_percent_1', weaponDataTable.nightweavers_looking_glass.nightweavers_looking_glass.param5, 100),
                new StatTable('text_percent_2', weaponDataTable.nightweavers_looking_glass.nightweavers_looking_glass.param6, 100),
                new StatTable('text_percent_3', weaponDataTable.nightweavers_looking_glass.nightweavers_looking_glass.param7, 100),
            ],
        }),
        new ConditionLevelSelect({
            name: 'weapon_other.weapon_athame_artis',
            serializeId: 63,
            title: 'talent_name.weapon_athame_artis',
            description: 'talent_descr.weapon_athame_artis_4',
            icon: {
                rarity: weaponDataTable.athame_artis.rarity,
                name: 'sprite-weapon-sword weapon-icon-sword-athame-artis',
            },
            stats: [
                new StatTable('atk_percent', weaponDataTable.athame_artis.athame_artis.param4, 100),
                new StatTable('text_percent2', weaponDataTable.athame_artis.athame_artis.param3, 100),
                new StatTable('text_percent', weaponDataTable.athame_artis.athame_artis.param4, 100),
                new StatTableConditions('atk_percent', weaponDataTable.athame_artis.athame_artis.param4, new ConditionHexCheck({ hex: 2 }), 75),
            ],
            condition: new ConditionBoolean({ name: 'common.char_status_shield_off_field', invert: 1 }),
        }),
        new ConditionLevelSelect({
            name: 'weapon_other.weapon_golden_frostbound_oath',
            serializeId: 70,
            title: 'talent_name.weapon_golden_frostbound_oath_3',
            description: 'talent_descr.weapon_golden_frostbound_oath_3',
            rotation: 'buffs',
            maxStacks: 5,
            icon: {
                rarity: weaponDataTable.golden_frostbound_oath.rarity,
                name: 'sprite-weapon-bow weapon-icon-bow-golden-frostbound-oath',
            },
            stats: [
                new StatTable('text_dmg_geo_percent', weaponDataTable.golden_frostbound_oath.golden_frostbound_oath.param3, 50),
                new StatTable('text_dmg_reaction_lunarcrystallize_percent', weaponDataTable.golden_frostbound_oath.golden_frostbound_oath.param3, 50),
                new StatTable('dmg_geo', weaponDataTable.golden_frostbound_oath.golden_frostbound_oath.param3, 50),
                new StatTable('dmg_reaction_lunarcrystallize', weaponDataTable.golden_frostbound_oath.golden_frostbound_oath.param3, 50),
            ],
        }),
        new ConditionPartyWeapon({
            name: 'weapon_other.weapon_angelos_heptades',
            serializeIds: [71],
            title: 'talent_name.weapon_angelos_heptades_1',
            statTitle: 'talent_name.weapon_angelos_heptades_2',
            description: 'talent_descr.weapon_angelos_heptades_2',
            statName: 'angelos_heptades_atk',
            statSerializeIds: [72],
            rotation: 'buffs',
            maxStacks: 5,

            statClass: 'inputs-6digit',
            partyStat: 'atk',
            statMax: 20000,

            icon: {
                rarity: weaponDataTable.angelos_heptades.rarity,
                name: 'sprite-weapon-catalyst weapon-icon-catalyst-angelos-heptades',
            },
            stats: [
                new StatTable('text_dmg_percent', weaponDataTable.angelos_heptades.angelos_heptades.param3, 100),
                new StatTable('text_dmg_percent_max', weaponDataTable.angelos_heptades.angelos_heptades.param4, 100),
            ],
        }),
        new ConditionStacksHidden({ serializeId: 73, name: 'temp' }),
        new ConditionStacksHidden({ serializeId: 74, name: 'temp' }),
        new ConditionStacksHidden({ serializeId: 75, name: 'temp' }),
        new ConditionStacksHidden({ serializeId: 76, name: 'temp' }),
        new ConditionStacksHidden({ serializeId: 77, name: 'temp' }),
        new ConditionStacksHidden({ serializeId: 78, name: 'temp' }),
    ],
    postEffects: [
        new PostEffectStats({
            from: 'whisper_of_the_jinn_mastery',
            levelSetting: 'weapon_other.whisper_of_the_jinn',
            percent: new StatTable('recharge', [3.6 * 0.003, 4.5 * 0.003, 5.4 * 0.003, 6.3 * 0.003, 7.2 * 0.003]),
            conditions: [
                new ConditionBoolean({name: 'weapon_other.whisper_of_the_jinn'}),
            ],
        }),
        new PostEffectStats({
            from: 'whisper_of_the_jinn_mastery_2',
            levelSetting: 'weapon_other.whisper_of_the_jinn_2',
            percent: new StatTable('recharge', [3.6 * 0.003, 4.5 * 0.003, 5.4 * 0.003, 6.3 * 0.003, 7.2 * 0.003]),
            conditions: [
                new ConditionBoolean({name: 'weapon_other.whisper_of_the_jinn_2'}),
            ],
        }),
        new PostEffectStats({
            from: 'whisper_of_the_jinn_mastery_3',
            levelSetting: 'weapon_other.whisper_of_the_jinn_3',
            percent: new StatTable('recharge', [3.6 * 0.003, 4.5 * 0.003, 5.4 * 0.003, 6.3 * 0.003, 7.2 * 0.003]),
            conditions: [
                new ConditionBoolean({name: 'weapon_other.whisper_of_the_jinn_3'}),
            ],
        }),
        new PostEffectStats({
            from: 'desert_pavilion_mastery',
            levelSetting: 'weapon_other.desert_pavilion',
            percent: new StatTable('atk', [24 * 0.003, 30 * 0.003, 36 * 0.003, 42 * 0.003, 48 * 0.003]),
            conditions: [
                new ConditionBoolean({name: 'weapon_other.desert_pavilion'}),
            ],
        }),
        new PostEffectStats({
            from: 'desert_pavilion_mastery_2',
            levelSetting: 'weapon_other.desert_pavilion_2',
            percent: new StatTable('atk', [24 * 0.003, 30 * 0.003, 36 * 0.003, 42 * 0.003, 48 * 0.003]),
            conditions: [
                new ConditionBoolean({name: 'weapon_other.desert_pavilion_2'}),
            ],
        }),
        new PostEffectStats({
            from: 'desert_pavilion_mastery_3',
            levelSetting: 'weapon_other.desert_pavilion_3',
            percent: new StatTable('atk', [24 * 0.003, 30 * 0.003, 36 * 0.003, 42 * 0.003, 48 * 0.003]),
            conditions: [
                new ConditionBoolean({name: 'weapon_other.desert_pavilion_3'}),
            ],
        }),
        new PostEffectStats({
            from: 'peak_patrol_song_def',
            levelSetting: 'weapon_other.weapon_peak_patrol_song',
            percent: [
                new StatTable('dmg_anemo', [0.008, 0.01, 0.012, 0.014, 0.016]),
                new StatTable('dmg_electro', [0.008, 0.01, 0.012, 0.014, 0.016]),
                new StatTable('dmg_pyro', [0.008, 0.01, 0.012, 0.014, 0.016]),
                new StatTable('dmg_cryo', [0.008, 0.01, 0.012, 0.014, 0.016]),
                new StatTable('dmg_hydro', [0.008, 0.01, 0.012, 0.014, 0.016]),
                new StatTable('dmg_geo', [0.008, 0.01, 0.012, 0.014, 0.016]),
                new StatTable('dmg_dendro', [0.008, 0.01, 0.012, 0.014, 0.016]),
            ],
            statCap: new StatTable('', [25.6, 32, 38.4, 44.8, 51.2]),
            conditions: [
                new ConditionBoolean({name: 'weapon_other.weapon_peak_patrol_song'}),
                new ConditionNot([
                    new ConditionBoolean({name: 'weapon_peak_patrol_song_2'}),
                ]),
            ],
        }),
        new PostEffectStats({
            from: 'angelos_heptades_atk',
            levelSetting: 'weapon_other.weapon_angelos_heptades',
            percent: new StatTable('dmg_all', weaponDataTable.angelos_heptades.angelos_heptades.param3, 0.1),
            statCap: new StatTable('dmg_all', weaponDataTable.angelos_heptades.angelos_heptades.param4, 100),
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'weapon_angelos_heptades', invert: 1 }),
                new ConditionBoolean({ name: 'common.char_status_shield_off_field', invert: 1 }),
            ]),
        }),
        new PostEffectStats({
            from: 'angelos_heptades_atk',
            levelSetting: 'weapon_other.weapon_angelos_heptades',
            percent: new StatTable('dmg_all', weaponDataTable.angelos_heptades.angelos_heptades.param3, 0.05),
            statCap: new StatTable('dmg_all', weaponDataTable.angelos_heptades.angelos_heptades.param4, 50),
            condition: new ConditionAnd([
                new ConditionHexCheck({ hex: 2 }),
                new ConditionHexCurrent(),
                new ConditionBoolean({ name: 'weapon_angelos_heptades', invert: 1 }),
                new ConditionBoolean({ name: 'common.char_status_shield_off_field' }),
            ]),
        }),
    ]
});
