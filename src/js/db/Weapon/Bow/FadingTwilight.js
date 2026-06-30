import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";
import { weaponDataTable } from "../../generated/WeaponStatTables";

export const FadingTwilight = new DbObjectWeapon({
    name: 'fading_twilight',
    serializeId: 123,
    gameId: weaponDataTable.FadingTwilight.gameId,
    iconClass: "weapon-icon-bow-fading-twilight",
    rarity: weaponDataTable.FadingTwilight.rarity,
    weapon: weaponDataTable.FadingTwilight.weapon,
    statTable: weaponStatTables.FadingTwilight,
    settingsSets: [
        {
            name: 'fading_twilight_2',
            settings: {
                weapon_fading_twilight_1: 0,
                weapon_fading_twilight_2: 1,
                weapon_fading_twilight_3: 0,
            },
        },
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.weapon_radiance_of_the_deeps_1',
            description: 'talent_descr.weapon_radiance_of_the_deeps_1',
        }),
        new ConditionBooleanRefine({
            name: 'weapon_fading_twilight_1',
            serializeId: 1,
            title: 'talent_name.weapon_radiance_of_the_deeps_2',
            description: 'talent_descr.weapon_radiance_of_the_deeps_2',
            stats: [
                new StatTable('dmg_all', weaponDataTable.FadingTwilight.Weapon_Bow_FallenSun.param2, 100),
            ],
            subConditions: [
                new ConditionBooleanRefine({
                    name: 'weapon_fading_twilight_2',
                    invert: true,
                }),
                new ConditionBooleanRefine({
                    name: 'weapon_fading_twilight_3',
                    invert: true,
                }),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_fading_twilight_2',
            serializeId: 2,
            title: 'talent_name.weapon_radiance_of_the_deeps_3',
            description: 'talent_descr.weapon_radiance_of_the_deeps_2',
            stats: [
                new StatTable('dmg_all', weaponDataTable.FadingTwilight.Weapon_Bow_FallenSun.param3, 100),
            ],
            subConditions: [
                new ConditionBooleanRefine({
                    name: 'weapon_fading_twilight_1',
                    invert: true,
                }),
                new ConditionBooleanRefine({
                    name: 'weapon_fading_twilight_3',
                    invert: true,
                }),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_fading_twilight_3',
            serializeId: 3,
            title: 'talent_name.weapon_radiance_of_the_deeps_4',
            description: 'talent_descr.weapon_radiance_of_the_deeps_2',
            stats: [
                new StatTable('dmg_all', weaponDataTable.FadingTwilight.Weapon_Bow_FallenSun.param4),
            ],
            subConditions: [
                new ConditionBooleanRefine({
                    name: 'weapon_fading_twilight_1',
                    invert: true,
                }),
                new ConditionBooleanRefine({
                    name: 'weapon_fading_twilight_2',
                    invert: true,
                }),
            ],
        }),
    ],
});
