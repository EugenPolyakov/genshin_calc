import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const OathswornEye = new DbObjectWeapon({
    name: 'oathsworn_eye',
    serializeId: 120,
    gameId: 14415,
    iconClass: "weapon-icon-catalyst-oathsworn-eye",
    rarity: 4,
    weapon: 'catalyst',
    statTable: weaponStatTables.OathswornEye,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_oathsworn_eye',
            serializeId: 1,
            title: 'talent_name.weapon_people_of_the_faltering_light',
            description: 'talent_descr.weapon_people_of_the_faltering_light',
            stats: [
                new StatTable('recharge', [24, 30, 36, 42, 48]),
            ],
        })
    ],
});

