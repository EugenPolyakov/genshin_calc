import { ConditionBooleanMoonPhaseRefine } from "../../../classes/Condition/Boolean/MoonPhaseRefine";
import { ConditionMoonPhaseSetting } from "../../../classes/Condition/CustomOrigin/MoonPhaseSetting";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const snare_hook = new DbObjectWeapon({
    name: 'snare_hook',
    serializeId: 228,
    gameId: weaponDataTable.snare_hook.gameId,
    iconClass: "weapon-icon-bow-snare-hook",
    rarity: weaponDataTable.snare_hook.rarity,
    weapon: weaponDataTable.snare_hook.weapon,
    statTable: weaponStatTables.snare_hook,
    conditions: [
        new ConditionMoonPhaseSetting(),
        new ConditionBooleanMoonPhaseRefine({
            name: 'weapon_snare_hook',
            serializeId: 1,
            title: 'talent_name.weapon_snare_hook',
            description: 'talent_descr.weapon_snare_hook',
            stats: [
                new StatTable('text_mastery_default', weaponDataTable.snare_hook.snare_hook.param1),
                new StatTable('mastery', weaponDataTable.snare_hook.snare_hook.param1),
                new StatTable('text_mastery', weaponDataTable.snare_hook.snare_hook.param3),
            ],
            realStats: [
                [
                    new StatTable('mastery', [0]),
                    new StatTable('mastery', [0]),
                    new StatTable('mastery', weaponDataTable.snare_hook.snare_hook.param3),
                ],
            ]
        })
    ],
});
