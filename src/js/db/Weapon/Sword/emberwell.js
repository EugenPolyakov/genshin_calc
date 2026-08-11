import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const emberwell = new DbObjectWeapon({
    name: 'emberwell',
    serializeId: 255,
    gameId: weaponDataTable.emberwell.gameId,
    iconClass: "weapon-icon-sword-emberwell",
    rarity: weaponDataTable.emberwell.rarity,
    weapon: weaponDataTable.emberwell.weapon,
    statTable: weaponStatTables.emberwell,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_emberwell_1',
            serializeId: 1,
            title: 'talent_name.weapon_emberwell',
            description: 'talent_descr.weapon_emberwell_1',
            stats: [
                new StatTable('atk_percent', weaponDataTable.emberwell.emberwell.param1, 100),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_emberwell_2',
            serializeId: 2,
            title: 'talent_name.weapon_emberwell',
            description: 'talent_descr.weapon_emberwell_2',
            stats: [
                new StatTable('dmg_reaction_stellar_glimmer', weaponDataTable.emberwell.emberwell.param3, 100),
            ],
        }),
    ],
});
