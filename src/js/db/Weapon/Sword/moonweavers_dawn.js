import { ConditionStaticRefineEnergy } from "../../../classes/Condition/Static/Refine/Energy";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const moonweavers_dawn = new DbObjectWeapon({
    name: 'moonweavers_dawn',
    serializeId: 229,
    gameId: weaponDataTable.moonweavers_dawn.gameId,
    iconClass: "weapon-icon-sword-moonweavers-dawn",
    rarity: weaponDataTable.moonweavers_dawn.rarity,
    weapon: weaponDataTable.moonweavers_dawn.weapon,
    statTable: weaponStatTables.moonweavers_dawn,
    conditions: [
        new ConditionStaticRefineEnergy({
            name: 'weapon_moonweavers_dawn',
            serializeId: 1,
            title: 'talent_name.weapon_moonweavers_dawn',
            description: 'talent_descr.weapon_moonweavers_dawn',
            energyLevels: [60, 40],
            stats: [
                new StatTable('dmg_burst', weaponDataTable.moonweavers_dawn.moonweavers_dawn.param1, 100),
                new StatTable('text_dmg_burst_percent', weaponDataTable.moonweavers_dawn.moonweavers_dawn.param1, 100),
                new StatTable('text_dmg_burst_percent_1', weaponDataTable.moonweavers_dawn.moonweavers_dawn.param2, 100),
                new StatTable('text_dmg_burst_percent_2', weaponDataTable.moonweavers_dawn.moonweavers_dawn.param3, 100),
            ],
            realStats: [
                new StatTable('', [
                    new StatTable('dmg_burst', weaponDataTable.moonweavers_dawn.moonweavers_dawn.param2, 100),
                    new StatTable('dmg_burst', weaponDataTable.moonweavers_dawn.moonweavers_dawn.param3, 100),
                ]),
            ],
        })
    ],
});
