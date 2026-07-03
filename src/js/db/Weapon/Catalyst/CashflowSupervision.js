import { ConditionBooleanValue } from "../../../classes/Condition/Boolean/Value";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const CashflowSupervision = new DbObjectWeapon({
    name: 'cashflow_supervision',
    serializeId: 163,
    gameId: weaponDataTable.CashflowSupervision.gameId,
    iconClass: "weapon-icon-catalyst-cashflow-supervision",
    rarity: weaponDataTable.CashflowSupervision.rarity,
    weapon: weaponDataTable.CashflowSupervision.weapon,
    statTable: weaponStatTables.CashflowSupervision,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_golden_blood_tide',
            description: 'talent_descr.weapon_golden_blood_tide_1',
            stats: [
                new StatTable('atk_percent', weaponDataTable.CashflowSupervision.golden_blood_tide.atk_percent),
            ],
        }),
        new ConditionStacks({
            name: 'weapon_cashflow_supervision',
            serializeId: 1,
            title: 'talent_name.weapon_golden_blood_tide',
            description: 'talent_descr.weapon_golden_blood_tide_2',
            maxStacks: 3,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('dmg_normal', weaponDataTable.CashflowSupervision.golden_blood_tide.param3, 100),
                new StatTable('dmg_charged', weaponDataTable.CashflowSupervision.golden_blood_tide.param4, 100),
                new StatTable('dmg_stellar_conduct', weaponDataTable.CashflowSupervision.golden_blood_tide.param6, 100),
            ],
        }),
        new ConditionBooleanValue({
            title: 'talent_name.weapon_golden_blood_tide',
            description: 'talent_descr.weapon_golden_blood_tide_3',
            levelSetting: 'weapon_refine',
            cond: 'ge',
            value: 3,
            setting: 'weapon_cashflow_supervision',
            stats: [
                new StatTable('atk_speed_normal', weaponDataTable.CashflowSupervision.golden_blood_tide.param5, 100),
            ],
        }),
    ],
});

