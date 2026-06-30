import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionCalcElements } from "../../../classes/Condition/CalcElements";
import { ConditionStaticRefineCrimsonPlumage } from "../../../classes/Condition/Static/Refine/CrimsonPlumage";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";
import { weaponDataTable } from "../../generated/WeaponStatTables";

const charged_table_1 = weaponDataTable.AstralVulturesCrimsonPlumage.Weapon_Bow_Qoyllorsnova.param3.map(v => v * 100);//[20, 25, 30, 35, 40];
const charged_table_2 = weaponDataTable.AstralVulturesCrimsonPlumage.Weapon_Bow_Qoyllorsnova.param4.map(v => v * 100);//[48, 60, 72, 84, 96];
const burst_table_1 = weaponDataTable.AstralVulturesCrimsonPlumage.Weapon_Bow_Qoyllorsnova.param5.map(v => v * 100);//[10, 12.5, 15, 17.5, 20];
const burst_table_2 = weaponDataTable.AstralVulturesCrimsonPlumage.Weapon_Bow_Qoyllorsnova.param6.map(v => v * 100);//[24, 30, 36, 42, 48];

export const AstralVulturesCrimsonPlumage = new DbObjectWeapon({
    name: 'astral_vultures_crimson_plumage',
    serializeId: 190,
    gameId: weaponDataTable.AstralVulturesCrimsonPlumage.gameId,
    iconClass: "weapon-icon-bow-astral-vultures-crimson-plumage",
    rarity: weaponDataTable.AstralVulturesCrimsonPlumage.rarity,
    weapon: weaponDataTable.AstralVulturesCrimsonPlumage.weapon,
    statTable: weaponStatTables.AstralVulturesCrimsonPlumage,
    conditions: [
        new ConditionCalcElements(),
        new ConditionBooleanRefine({
            name: 'astral_vultures_crimson_plumage',
            serializeId: 1,
            title: 'talent_name.weapon_the_moonring_sighted',
            description: 'talent_descr.weapon_the_moonring_sighted_1',
            stats: [
                new StatTable('atk_percent', weaponDataTable.AstralVulturesCrimsonPlumage.Weapon_Bow_Qoyllorsnova.param1, 100),
            ],
        }),
        new ConditionStaticRefineCrimsonPlumage({
            title: 'talent_name.weapon_the_moonring_sighted',
            description: 'talent_descr.weapon_the_moonring_sighted_2',
            levelSetting: 'weapon_refine',
            effectLevelSetting: 'party_elements_different',
            stats: [
                new StatTable('text_percent_1', charged_table_1),
                new StatTable('text_percent_2', charged_table_2),
                new StatTable('text_percent_3', burst_table_1),
                new StatTable('text_percent_4', burst_table_2),
            ],
            realStats: [
                new StatTable('', [
                    new StatTable('dmg_charged', charged_table_1),
                    new StatTable('dmg_charged', charged_table_2),
                ]),
                new StatTable('', [
                    new StatTable('dmg_burst', burst_table_1),
                    new StatTable('dmg_burst', burst_table_2),
                ]),
            ],
            subConditions: [
                new ConditionBoolean({name: 'party_elements_different'}),
            ],
        }),
    ],
});
