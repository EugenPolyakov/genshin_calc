import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const StarcallersWatch = new DbObjectWeapon({
    name: 'starcallers_watch',
    serializeId: 195,
    gameId: 14517,
    iconClass: "weapon-icon-catalyst-starcallers-watch",
    rarity: 5,
    weapon: 'catalyst',
    statTable: weaponStatTables.StarcallersWatch,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_offering_unto_wind_and_sun',
            description: 'talent_descr.weapon_offering_unto_wind_and_sun_1',
            stats: [
                new StatTable('mastery', [100, 125, 150, 175, 200]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_starcallers_watch',
            serializeId: 1,
            title: 'talent_name.weapon_offering_unto_wind_and_sun',
            description: 'talent_descr.weapon_offering_unto_wind_and_sun_2',
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('dmg_all', [28, 35, 42, 49, 56]),
            ],
        }),
    ],
});

