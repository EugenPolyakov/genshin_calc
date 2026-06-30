import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const BriefPavilionChatter = new DbObjectWeapon({
    name: 'tamayuratei_no_ohanashi',
    serializeId: 197,
    gameId: 13432,
    iconClass: 'weapon-icon-polearm-tamayuratei-no-ohanashi',
    rarity: 4,
    weapon: 'polearm',
    statTable: weaponStatTables.BriefPavilionChatter,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_brief_pavilion_chatter',
            serializeId: 1,
            title: 'talent_name.weapon_busybodys_running_light',
            description: 'talent_descr.weapon_busybodys_running_light',
            stats: [
                new StatTable('atk_percent', [20, 25, 30, 35, 40]),
                new StatTable('move_speed', [10]),
            ],
        }),
    ],
});
