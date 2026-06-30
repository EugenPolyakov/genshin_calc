import { Condition } from "../../../classes/Condition";
import { ConditionAnd } from "../../../classes/Condition/And";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const Slingshot = new DbObjectWeapon({
    name: 'slingshot',
    serializeId: 38,
    gameId: 15304,
    iconClass: "weapon-icon-bow-slingshot",
    rarity: 3,
    weapon: 'bow',
    statTable: weaponStatTables.Slingshot,
    //refineTable: [],
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_slingshot',
            serializeId: 1,
            title: 'talent_name.weapon_slingshot',
            description: 'talent_descr.weapon_slingshot',
            stats: [
                new StatTable('dmg_normal', [36, 42, 48, 54, 60]),
                new StatTable('dmg_charged', [36, 42, 48, 54, 60]),
            ],
            condition: new ConditionBoolean({ name: 'tartaglia_raging_tide', invert: 1 }),
        }),
        new Condition({
            isHidden: true,
            stats: {
                dmg_normal: -10,
                dmg_charged: -10,
            },
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'weapon_slingshot', invert: 1 }),
                new ConditionBoolean({ name: 'tartaglia_raging_tide', invert: 1 }),
            ]),
        }),
    ],
});
