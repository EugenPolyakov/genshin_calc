import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const TidalShadow = new DbObjectWeapon({
    name: 'tidal_shadow',
    serializeId: 150,
    gameId: 12425,
    iconClass: 'weapon-icon-claymore-tidal-shadow',
    rarity: 4,
    weapon: 'claymore',
    statTable: weaponStatTables.TidalShadow,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_tidal_shadow',
            serializeId: 1,
            title: 'talent_name.weapon_white_cruising_wave',
            description: 'talent_descr.weapon_white_cruising_wave',
            stats: [
                new StatTable('atk_percent', [24, 30, 36, 42, 48]),
            ],
        }),
    ],
});
