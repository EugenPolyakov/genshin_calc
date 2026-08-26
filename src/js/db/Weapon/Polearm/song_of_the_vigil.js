import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const song_of_the_vigil = new DbObjectWeapon({
    name: 'song_of_the_vigil',
    serializeId: 251,
    gameId: weaponDataTable.song_of_the_vigil.gameId,
    iconClass: "weapon-icon-polearm-song-of-the-vigil",
    rarity: weaponDataTable.song_of_the_vigil.rarity,
    weapon: weaponDataTable.song_of_the_vigil.weapon,
    statTable: weaponStatTables.song_of_the_vigil,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_song_of_the_vigil',
            serializeId: 1,
            title: 'talent_name.weapon_song_of_the_vigil',
            description: 'talent_descr.weapon_song_of_the_vigil',
            stats: [
                new StatTable('atk_percent', weaponDataTable.song_of_the_vigil.song_of_the_vigil.param2, 100),
                new StatTable('text', weaponDataTable.song_of_the_vigil.song_of_the_vigil.param1),
            ],
        }),
    ],
});
