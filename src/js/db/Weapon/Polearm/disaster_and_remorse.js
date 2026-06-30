import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const disaster_and_remorse = new DbObjectWeapon({
    name: 'disaster_and_remorse',
    serializeId: 244,
    gameId: weaponDataTable.disaster_and_remorse.gameId,
    iconClass: "weapon-icon-polearm-disaster-and-remorse",
    rarity: weaponDataTable.disaster_and_remorse.rarity,
    weapon: weaponDataTable.disaster_and_remorse.weapon,
    statTable: weaponStatTables.disaster_and_remorse,
    conditions: [
        new ConditionStatic({
            title: 'talent_name.weapon_disaster_and_remorse_1',
            description: 'talent_descr.weapon_disaster_and_remorse_1',
        }),
        new ConditionBooleanRefine({
            name: 'weapon_disaster_and_remorse_2',
            serializeId: 1,
            title: 'talent_name.weapon_disaster_and_remorse_2',
            description: 'talent_descr.weapon_disaster_and_remorse_2',
            stats: [
                new StatTable('dmg_normal', weaponDataTable.disaster_and_remorse.disaster_and_remorse.param3, 100),
                new StatTable('dmg_charged', weaponDataTable.disaster_and_remorse.disaster_and_remorse.param3, 100),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_disaster_and_remorse_3',
            serializeId: 2,
            title: 'talent_name.weapon_disaster_and_remorse_3',
            description: 'talent_descr.weapon_disaster_and_remorse_3',
            stats: [
                new StatTable('dmg_skill', weaponDataTable.disaster_and_remorse.disaster_and_remorse.param4, 100),
                new StatTable('dmg_burst', weaponDataTable.disaster_and_remorse.disaster_and_remorse.param4, 100),
            ],
        }),
    ],
});
