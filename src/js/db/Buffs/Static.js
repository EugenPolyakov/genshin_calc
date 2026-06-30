import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionBoLStat } from "../../classes/Condition/BoLStat";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionHexCheck } from "../../classes/Condition/HexCheck";
import { ConditionHexCurrent } from "../../classes/Condition/HexCurrent";
import { ConditionMillenialMovement } from "../../classes/Condition/MillenialMovement";
import { ConditionPartyWeaponSelect } from "../../classes/Condition/PartyWeaponSelect";
import { DbObjectBuff } from "../../classes/DbObject/Buff";
import { PostEffectKhajNisut } from "../../classes/PostEffect/KhajNisut";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { StatTable } from "../../classes/StatTable";
import { weaponDataTable } from "../generated/WeaponStatTables";

export const Static = new DbObjectBuff({
    name: 'static',
    invisible: true,
    conditions: [
        new ConditionMillenialMovement({
            atkBuff: [
                new StatTable('atk_percent', [20, 25, 30, 35, 40]),
            ],
            atkSpeedBuff: [
                new StatTable('atk_speed_normal', [12, 15, 18, 21, 24]),
            ],
            masteryBuff: [
                new StatTable('mastery', [100, 125, 150, 175, 200]),
            ],
            affixBuff: [
                new StatTable('dmg_normal', [16, 20, 24, 28, 32]),
                new StatTable('dmg_charged', [16, 20, 24, 28, 32]),
                new StatTable('dmg_plunge', [16, 20, 24, 28, 32]),
            ],
        }),
        new ConditionBoLStat({
            condition: new ConditionBoolean({name: 'common.bond_of_life'}),
        }),
        new ConditionPartyWeaponSelect({
            activeWeaponCondition: new ConditionBoolean({ name: 'symphonist_of_scents_3' }),
            partyWeaponCondition: 'weapon_other.weapon_symphonist_of_scents',
            stats: [
                new StatTable('atk_percent', weaponDataTable.SymphonistofScents.seasoned_symphony.param3, 100),
            ],
        }),
        new ConditionPartyWeaponSelect({
            activeWeaponCondition: new ConditionBoolean({ name: 'weapon_fractured_halo_2' }),
            partyWeaponCondition: 'weapon_other.weapon_fractured_halo',
            stats: [
                new StatTable('dmg_reaction_lunarcharged', weaponDataTable.FracturedHalo.purifying_crown.param3, 100),
            ],
        }),
        new ConditionPartyWeaponSelect({
            activeWeaponCondition: new ConditionAnd([
                new ConditionBoolean({ name: 'weapon_nightweavers_looking_glass_1' }),
                new ConditionBoolean({ name: 'weapon_nightweavers_looking_glass_2' }),
            ]),
            partyWeaponCondition: 'weapon_other.weapon_nightweavers_looking_glass',
            stats: [
                new StatTable('dmg_reaction_rupture', weaponDataTable.nightweavers_looking_glass.nightweavers_looking_glass.param5, 100),
                new StatTable('dmg_reaction_burgeon', weaponDataTable.nightweavers_looking_glass.nightweavers_looking_glass.param6, 100),
                new StatTable('dmg_reaction_hyperbloom', weaponDataTable.nightweavers_looking_glass.nightweavers_looking_glass.param6, 100),
                new StatTable('dmg_reaction_lunarbloom', weaponDataTable.nightweavers_looking_glass.nightweavers_looking_glass.param7, 100),
            ],
        }),
    ],
    postEffects: [
        new PostEffectKhajNisut({
            percent: new StatTable('mastery', [0.002, 0.0025, 0.003, 0.0035, 0.004]),
        }),
        new PostEffectStats({
            from: function (data) {
                let max = Math.max(data.settings.weapon_angelos_heptades_1 ? data.settings.weapon_refine : 0, data.settings['weapon_other.weapon_angelos_heptades'] || 0);
                if (data.settings.weapon_angelos_heptades_1 && max == data.settings.weapon_refine)
                    return 'atk*';
                return 'angelos_heptades_atk';
            },
            levelSetting: function (settings) {
                return Math.max(settings.weapon_angelos_heptades_1 ? settings.weapon_refine : 0, settings['weapon_other.weapon_angelos_heptades'] || 0);
            },
            percent: new StatTable('dmg_all', weaponDataTable.angelos_heptades.angelos_heptades.param3, 0.1),
            statCap: new StatTable('dmg_all', weaponDataTable.angelos_heptades.angelos_heptades.param4, 100),
        }),
    ],
});
