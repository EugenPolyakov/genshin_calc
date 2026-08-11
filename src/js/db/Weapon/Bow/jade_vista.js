import { ConditionBooleanValue } from "../../../classes/Condition/Boolean/Value";
import { ConditionCalcElements } from "../../../classes/Condition/CalcElements";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { ConditionStaticRefineAdditionalLevel } from "../../../classes/Condition/Static/Refine/AdditionalLevel";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const jade_vista = new DbObjectWeapon({
    name: 'jade_vista',
    serializeId: 246,
    gameId: weaponDataTable.jade_vista.gameId,
    iconClass: "weapon-icon-bow-jade-vista",
    rarity: weaponDataTable.jade_vista.rarity,
    weapon: weaponDataTable.jade_vista.weapon,
    statTable: weaponStatTables.jade_vista,
    conditions: [
        new ConditionCalcElements(),
        new ConditionStaticRefineAdditionalLevel({
            title: 'talent_name.weapon_jade_vista',
            description: 'talent_descr.weapon_jade_vista_1',
            effectLevelSetting: 'party_elements_same',
            stats: [
                new StatTable('text_1', weaponDataTable.jade_vista.jade_vista.param2),
            ],
            realStats: [
                new StatTable('', [
                    new StatTable('mastery', weaponDataTable.jade_vista.jade_vista.param2, 1),
                    new StatTable('mastery', weaponDataTable.jade_vista.jade_vista.param2, 2),
                    new StatTable('mastery', weaponDataTable.jade_vista.jade_vista.param2, 3),
                ]),
            ],
            condition: new ConditionBooleanValue({
                cond: 'gt',
                value: 0,
                setting: 'party_elements_same',
            }),
        }),
        new ConditionStaticRefineAdditionalLevel({
            title: 'talent_name.weapon_jade_vista',
            description: 'talent_descr.weapon_jade_vista_2',
            effectLevelSetting: 'party_elements_different',
            stats: [
                new StatTable('text_percent_1', weaponDataTable.jade_vista.jade_vista.param1, 100),
            ],
            realStats: [
                new StatTable('', [
                    new StatTable('atk_percent', weaponDataTable.jade_vista.jade_vista.param1, 100),
                    new StatTable('atk_percent', weaponDataTable.jade_vista.jade_vista.param1, 200),
                    new StatTable('atk_percent', weaponDataTable.jade_vista.jade_vista.param1, 300),
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
