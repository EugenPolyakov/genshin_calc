import { ConditionBooleanValue } from "../../../classes/Condition/Boolean/Value";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const whitelake_frostfeather = new DbObjectWeapon({
    name: 'whitelake_frostfeather',
    serializeId: 256,
    gameId: weaponDataTable.whitelake_frostfeather.gameId,
    iconClass: "weapon-icon-sword-whitelake-frostfeather",
    rarity: weaponDataTable.whitelake_frostfeather.rarity,
    weapon: weaponDataTable.whitelake_frostfeather.weapon,
    statTable: weaponStatTables.whitelake_frostfeather,
    conditions: [
        new ConditionStacks({
            name: 'weapon_whitelake_frostfeather',
            serializeId: 1,
            title: 'talent_name.weapon_whitelake_frostfeather',
            description: 'talent_descr.weapon_whitelake_frostfeather_1',
            levelSetting: 'weapon_refine',
            maxStacks: 3,
            stats: [
                new StatTable('atk_percent', weaponDataTable.whitelake_frostfeather.whitelake_frostfeather.param2, 100),
            ],
        }),
        new ConditionStaticRefine({
            title: 'talent_name.weapon_whitelake_frostfeather',
            description: 'talent_descr.weapon_whitelake_frostfeather_2',
            stats: [
                new StatTable('dmg_reaction_stellar_glimmer', weaponDataTable.whitelake_frostfeather.whitelake_frostfeather.param5, 100),
                new StatTable('text', weaponDataTable.whitelake_frostfeather.whitelake_frostfeather.param1),
            ],
            condition: new ConditionBooleanValue({
                cond: 'ge',
                value: 3,
                setting: 'weapon_whitelake_frostfeather',
            })
        }),
    ],
});
