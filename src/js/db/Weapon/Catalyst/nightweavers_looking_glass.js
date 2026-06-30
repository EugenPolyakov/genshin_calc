import { ConditionAnd } from "../../../classes/Condition/And";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const nightweavers_looking_glass = new DbObjectWeapon({
    name: 'nightweavers_looking_glass',
    serializeId: 239,
    gameId: weaponDataTable.nightweavers_looking_glass.gameId,
    iconClass: "weapon-icon-catalyst-nightweavers-looking-glass",
    rarity: weaponDataTable.nightweavers_looking_glass.rarity,
    weapon: weaponDataTable.nightweavers_looking_glass.weapon,
    statTable: weaponStatTables.nightweavers_looking_glass,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_nightweavers_looking_glass_1',
            serializeId: 1,
            title: 'talent_name.weapon_nightweavers_looking_glass',
            description: 'talent_descr.weapon_nightweavers_looking_glass_1',
            stats: [
                new StatTable('mastery', weaponDataTable.nightweavers_looking_glass.nightweavers_looking_glass.param1),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_nightweavers_looking_glass_2',
            serializeId: 2,
            title: 'talent_name.weapon_nightweavers_looking_glass',
            description: 'talent_descr.weapon_nightweavers_looking_glass_2',
            stats: [
                new StatTable('mastery', weaponDataTable.nightweavers_looking_glass.nightweavers_looking_glass.param3),
            ],
        }),
        new ConditionStaticRefine({
            title: 'talent_name.weapon_nightweavers_looking_glass',
            description: 'talent_descr.weapon_nightweavers_looking_glass_3',
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'weapon_nightweavers_looking_glass_1' }),
                new ConditionBoolean({ name: 'weapon_nightweavers_looking_glass_2' }),
            ]),
            stats: [
                new StatTable('text_percent_1', weaponDataTable.nightweavers_looking_glass.nightweavers_looking_glass.param5, 100),
                new StatTable('text_percent_2', weaponDataTable.nightweavers_looking_glass.nightweavers_looking_glass.param6, 100),
                new StatTable('text_percent_3', weaponDataTable.nightweavers_looking_glass.nightweavers_looking_glass.param7, 100),
            ],
        }),
    ],
});
