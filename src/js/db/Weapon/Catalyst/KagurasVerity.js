import { ConditionBooleanValue } from "../../../classes/Condition/Boolean/Value";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const KagurasVerity = new DbObjectWeapon({
    name: 'kaguras_verity',
    serializeId: 119,
    gameId: weaponDataTable.KagurasVerity.gameId,
    iconClass: "weapon-icon-catalyst-kaguras-verity",
    rarity: weaponDataTable.KagurasVerity.rarity,
    weapon: weaponDataTable.KagurasVerity.weapon,
    statTable: weaponStatTables.KagurasVerity,
    settingsSets: [
        {
            name: 'stacks_1',
            settings: {
                "weapon_kaguras_verity": 1,
            },
        },
        {
            name: 'stacks_3',
            settings: {
                "weapon_kaguras_verity": 3,
            },
        },
    ],
    conditions: [
        new ConditionStacks({
            name: 'weapon_kaguras_verity',
            serializeId: 1,
            title: 'talent_name.weapon_kagura_dance_of_the_sacred_sakura',
            description: 'talent_descr.weapon_kagura_dance_of_the_sacred_sakura_1',
            maxStacks: 3,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('dmg_skill', weaponDataTable.KagurasVerity.kagura_dance_of_the_sacred_sakura.param1, 100),
                new StatTable('dmg_stellar_conduct', weaponDataTable.KagurasVerity.kagura_dance_of_the_sacred_sakura.param4, 100),
            ],
        }),
        new ConditionBooleanValue({
            name: 'weapon_kaguras_verity_max_stack',
            title: 'talent_name.weapon_kagura_dance_of_the_sacred_sakura',
            description: 'talent_descr.weapon_kagura_dance_of_the_sacred_sakura_2',
            levelSetting: 'weapon_refine',
            cond: 'ge',
            value: 3,
            setting: 'weapon_kaguras_verity',
            stats: [
                new StatTable('dmg_anemo', weaponDataTable.KagurasVerity.kagura_dance_of_the_sacred_sakura.param3, 100),
                new StatTable('dmg_geo', weaponDataTable.KagurasVerity.kagura_dance_of_the_sacred_sakura.param3, 100),
                new StatTable('dmg_pyro', weaponDataTable.KagurasVerity.kagura_dance_of_the_sacred_sakura.param3, 100),
                new StatTable('dmg_electro', weaponDataTable.KagurasVerity.kagura_dance_of_the_sacred_sakura.param3, 100),
                new StatTable('dmg_hydro', weaponDataTable.KagurasVerity.kagura_dance_of_the_sacred_sakura.param3, 100),
                new StatTable('dmg_cryo', weaponDataTable.KagurasVerity.kagura_dance_of_the_sacred_sakura.param3, 100),
                new StatTable('dmg_dendro', weaponDataTable.KagurasVerity.kagura_dance_of_the_sacred_sakura.param3, 100),
            ],
        }),
    ],
});
