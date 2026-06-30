import { ConditionAnd } from "../../../classes/Condition/And";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const reliquary_of_truth = new DbObjectWeapon({
    name: 'reliquary_of_truth',
    serializeId: 237,
    gameId: weaponDataTable.reliquary_of_truth.gameId,
    iconClass: "weapon-icon-catalyst-reliquary-of-truth",
    rarity: weaponDataTable.reliquary_of_truth.rarity,
    weapon: weaponDataTable.reliquary_of_truth.weapon,
    statTable: weaponStatTables.reliquary_of_truth,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_reliquary_of_truth',
            description: 'talent_descr.weapon_reliquary_of_truth_1',
            stats: [
                new StatTable('crit_rate', weaponDataTable.reliquary_of_truth.reliquary_of_truth.crit_rate_base),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_reliquary_of_truth_1',
            serializeId: 1,
            title: 'talent_name.weapon_reliquary_of_truth',
            description: 'talent_descr.weapon_reliquary_of_truth_2',
            stats: [
                new StatTable('mastery', weaponDataTable.reliquary_of_truth.reliquary_of_truth.param1),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_reliquary_of_truth_2',
            serializeId: 2,
            title: 'talent_name.weapon_reliquary_of_truth',
            description: 'talent_descr.weapon_reliquary_of_truth_3',
            stats: [
                new StatTable('crit_dmg', weaponDataTable.reliquary_of_truth.reliquary_of_truth.param2, 100),
            ],
        }),
        new ConditionStaticRefine({
            title: 'talent_name.weapon_reliquary_of_truth',
            description: 'talent_descr.weapon_reliquary_of_truth_4',
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'weapon_reliquary_of_truth_1' }),
                new ConditionBoolean({ name: 'weapon_reliquary_of_truth_2' }),
            ]),
            stats: [
                new StatTable('mastery', weaponDataTable.reliquary_of_truth.reliquary_of_truth.param1, 0.5),
                new StatTable('crit_dmg', weaponDataTable.reliquary_of_truth.reliquary_of_truth.param2, 50),
            ],
        }),
    ],
});
