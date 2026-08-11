import { Condition, ConditionAnd } from "../../../classes/Condition";
import { ConditionBooleanChar } from "../../../classes/Condition/Boolean/Char";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionBooleanValue } from "../../../classes/Condition/Boolean/Value";
import { ConditionDropdownElementTraveler } from "../../../classes/Condition/Dropdown/Element/Traveler";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const exaiphanes_blade = new DbObjectWeapon({
    name: 'exaiphanes_blade',
    serializeId: 257,
    gameId: weaponDataTable.exaiphanes_blade.gameId,
    iconClass: "weapon-icon-sword-exaiphanes-blade",
    rarity: weaponDataTable.exaiphanes_blade.rarity,
    weapon: weaponDataTable.exaiphanes_blade.weapon,
    statTable: weaponStatTables.exaiphanes_blade,
    conditions: [
        new ConditionDropdownElementTraveler({
            name: 'common.n10050001',
            serializeId: 1,
            multiple: true,
            hideEmpty: true,
            dropdownClass: 'big select-element-multiple',
            title: 'talent_name.weapon_exaiphanes_blade',
            description: 'talent_descr.weapon_exaiphanes_blade_1',
            hideCondition: new ConditionBooleanValue({
                cond: 'lt',
                value: 2,
                setting: 'weapon_refine',
            }),
            condition: new ConditionAnd([
                new ConditionBooleanValue({
                    cond: 'ge',
                    value: 2,
                    setting: 'weapon_refine',
                }),
                new ConditionBooleanChar({
                    chars: ['traveler_anemo', 'traveler_geo', 'traveler_electro', 'taveler_dendro', 'traveler_hydro', 'traveler_pyro', 'traveler_cryo'],
                }),
            ]),
            values: [
                {
                    value: 'anemo',
                    serializeId: 1,
                    conditions: [new Condition({ stats: { crit_dmg: weaponDataTable.exaiphanes_blade.exaiphanes_blade.param3[1] * 100 }})],
                },
                {
                    value: 'geo',
                    serializeId: 2,
                    conditions: [new Condition({ stats: { crit_dmg: weaponDataTable.exaiphanes_blade.exaiphanes_blade.param3[1] * 100 } })],
                },
                {
                    value: 'electro',
                    serializeId: 3,
                    conditions: [new Condition({ stats: { crit_dmg: weaponDataTable.exaiphanes_blade.exaiphanes_blade.param3[1] * 100 } })],
                },
                {
                    value: 'dendro',
                    serializeId: 4,
                    conditions: [new Condition({ stats: { crit_dmg: weaponDataTable.exaiphanes_blade.exaiphanes_blade.param3[1] * 100 } })],
                },
                {
                    value: 'hydro',
                    serializeId: 5,
                    conditions: [new Condition({ stats: { crit_dmg: weaponDataTable.exaiphanes_blade.exaiphanes_blade.param3[1] * 100 } })],
                },
                {
                    value: 'pyro',
                    serializeId: 6,
                    conditions: [new Condition({ stats: { crit_dmg: weaponDataTable.exaiphanes_blade.exaiphanes_blade.param3[1] * 100 } })],
                },
                {
                    value: 'cryo',
                    serializeId: 7,
                    conditions: [new Condition({ stats: { crit_dmg: weaponDataTable.exaiphanes_blade.exaiphanes_blade.param3[1] * 100 } })],
                },
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_exaiphanes_blade',
            serializeId: 2,
            title: 'talent_name.weapon_exaiphanes_blade',
            description: 'talent_descr.weapon_exaiphanes_blade_2',
            stats: [
                new StatTable('atk_percent', weaponDataTable.exaiphanes_blade.exaiphanes_blade.param1, 100),
                new StatTable('text', weaponDataTable.exaiphanes_blade.exaiphanes_blade.param4),
            ],
            condition: new ConditionBooleanChar({
                chars: ['traveler_anemo', 'traveler_geo', 'traveler_electro', 'taveler_dendro', 'traveler_hydro', 'traveler_pyro', 'traveler_cryo'],
            }),
        }),
    ],
});
