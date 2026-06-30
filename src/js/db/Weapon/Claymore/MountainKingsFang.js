import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const MountainKingsFang = new DbObjectWeapon({
    name: 'fang_of_the_mountain_king',
    serializeId: 181,
    gameId: 12513,
    iconClass: "weapon-icon-claymore-fang-of-the-mountain-king",
    rarity: 5,
    weapon: 'claymore',
    statTable: weaponStatTables.MountainKingsFang,
    conditions: [
        new ConditionStacks({
            name: 'weapon_mountain_kings_fang',
            serializeId: 1,
            title: 'talent_name.weapon_turquoise_hunt',
            description: 'talent_descr.weapon_turquoise_hunt',
            maxStacks: 6,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('dmg_skill', [10, 12.5, 15, 17.5, 20]),
                new StatTable('dmg_burst', [10, 12.5, 15, 17.5, 20]),
            ],
        }),
    ],
});
