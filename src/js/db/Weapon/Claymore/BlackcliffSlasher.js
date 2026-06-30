import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const BlackcliffSlasher = new DbObjectWeapon({
    name: 'blackcliff_slasher',
    serializeId: 65,
    gameId: 12408,
    iconClass: "weapon-icon-claymore-blackcliff-slasher",
    rarity: 4,
    weapon: 'claymore',
    statTable: weaponStatTables.BlackcliffSlasher,
    settingsSets: [
        {
            name: 'no_stacks',
            settings: {
                "weapon_blackcliff_slasher": 0,
            },
        },
        {
            name: 'stacks_3',
            settings: {
                "weapon_blackcliff_slasher": 3,
            },
        },
    ],
    conditions: [
        new ConditionStacks({
            name: 'weapon_blackcliff_slasher',
            serializeId: 1,
            title: 'talent_name.weapon_blackcliffslasher',
            description: 'talent_descr.weapon_blackcliffslasher',
            maxStacks: 3,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('atk_percent', weaponDataTable.BlackcliffSlasher.blackcliffslasher.param1, 100),
            ],
        })
    ],
});

