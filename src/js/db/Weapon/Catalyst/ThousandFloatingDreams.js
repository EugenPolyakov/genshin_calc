import { ConditionBooleanValue } from "../../../classes/Condition/Boolean/Value";
import { ConditionCalcElements } from "../../../classes/Condition/CalcElements";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { ConditionStaticRefineAdditionalLevel } from "../../../classes/Condition/Static/Refine/AdditionalLevel";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const ThousandFloatingDreams = new DbObjectWeapon({
    name: 'a_thousand_floating_dreams',
    serializeId: 138,
    gameId: 14511,
    iconClass: "weapon-icon-catalyst-a-thousand-floating-dreams",
    rarity: 5,
    weapon: 'catalyst',
    statTable: weaponStatTables.ThousandFloatingDreams,
    conditions: [
        new ConditionCalcElements({}),
        new ConditionStatic({
            title: 'talent_name.weapon_a_thousand_nights_dawnsong',
            description: 'talent_descr.weapon_a_thousand_nights_dawnsong_4',
        }),
        new ConditionStaticRefineAdditionalLevel({
            title: 'talent_name.weapon_a_thousand_nights_dawnsong',
            description: 'talent_descr.weapon_a_thousand_nights_dawnsong_3',
            effectLevelSetting: 'party_elements_same',
            stats: [
                new StatTable('text_mastery', weaponDataTable.ThousandFloatingDreams.a_thousand_nights_dawnsong.param1),
            ],
            realStats: [
                new StatTable('', [
                    new StatTable('mastery', weaponDataTable.ThousandFloatingDreams.a_thousand_nights_dawnsong.param1, 1),
                    new StatTable('mastery', weaponDataTable.ThousandFloatingDreams.a_thousand_nights_dawnsong.param1, 2),
                    new StatTable('mastery', weaponDataTable.ThousandFloatingDreams.a_thousand_nights_dawnsong.param1, 3),
                ]),
            ],
            condition: new ConditionBooleanValue({
                cond: 'gt',
                value: 0,
                setting: 'party_elements_same',
            }),
        }),
        new ConditionStaticRefineAdditionalLevel({
            title: 'talent_name.weapon_a_thousand_nights_dawnsong',
            description: 'talent_descr.weapon_a_thousand_nights_dawnsong_1',
            effectLevelSetting: 'party_elements_different',
            stats: [
                new StatTable('dmg_own_text', weaponDataTable.ThousandFloatingDreams.a_thousand_nights_dawnsong.param2, 100),
            ],
            realStats: [
                new StatTable('', [
                    new StatTable('dmg_own', weaponDataTable.ThousandFloatingDreams.a_thousand_nights_dawnsong.param2, 100),
                    new StatTable('dmg_own', weaponDataTable.ThousandFloatingDreams.a_thousand_nights_dawnsong.param2, 200),
                    new StatTable('dmg_own', weaponDataTable.ThousandFloatingDreams.a_thousand_nights_dawnsong.param2, 300),
                ]),
            ],
            condition: new ConditionBooleanValue({
                cond: 'gt',
                value: 0,
                setting: 'party_elements_different',
            }),
        }),
    ],
});

