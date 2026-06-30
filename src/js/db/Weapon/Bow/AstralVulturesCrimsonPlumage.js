import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionCalcElements } from "../../../classes/Condition/CalcElements";
import { ConditionStaticRefineCrimsonPlumage } from "../../../classes/Condition/Static/Refine/CrimsonPlumage";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";
import { weaponDataTable } from "../../generated/WeaponStatTables";

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
                new StatTable('atk_percent', weaponDataTable.AstralVulturesCrimsonPlumage.the_moonring_sighted.param1, 100),
            ],
        }),
        new ConditionStaticRefineCrimsonPlumage({
            title: 'talent_name.weapon_the_moonring_sighted',
            description: 'talent_descr.weapon_the_moonring_sighted_2',
            levelSetting: 'weapon_refine',
            effectLevelSetting: 'party_elements_different',
            stats: [
                new StatTable('text_percent_1', weaponDataTable.AstralVulturesCrimsonPlumage.the_moonring_sighted.param3, 100),
                new StatTable('text_percent_2', weaponDataTable.AstralVulturesCrimsonPlumage.the_moonring_sighted.param4, 100),
                new StatTable('text_percent_3', weaponDataTable.AstralVulturesCrimsonPlumage.the_moonring_sighted.param5, 100),
                new StatTable('text_percent_4', weaponDataTable.AstralVulturesCrimsonPlumage.the_moonring_sighted.param6, 100),
            ],
            realStats: [
                new StatTable('', [
                    new StatTable('dmg_charged', weaponDataTable.AstralVulturesCrimsonPlumage.the_moonring_sighted.param3, 100),
                    new StatTable('dmg_charged', weaponDataTable.AstralVulturesCrimsonPlumage.the_moonring_sighted.param4, 100),
                ]),
                new StatTable('', [
                    new StatTable('dmg_burst', weaponDataTable.AstralVulturesCrimsonPlumage.the_moonring_sighted.param5, 100),
                    new StatTable('dmg_burst', weaponDataTable.AstralVulturesCrimsonPlumage.the_moonring_sighted.param6, 100),
                ]),
            ],
            subConditions: [
                new ConditionBoolean({name: 'party_elements_different'}),
            ],
        }),
    ],
});
