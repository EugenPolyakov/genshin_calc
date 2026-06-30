import { ConditionAnd } from "../../../classes/Condition/And";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionHexCheck } from "../../../classes/Condition/HexCheck";
import { ConditionHexCurrent } from "../../../classes/Condition/HexCurrent";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { PostEffectStats } from "../../../classes/PostEffect/Stats";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const angelos_heptades = new DbObjectWeapon({
    name: 'angelos_heptades',
    serializeId: 243,
    gameId: weaponDataTable.angelos_heptades.gameId,
    iconClass: "weapon-icon-catalyst-angelos-heptades",
    rarity: weaponDataTable.angelos_heptades.rarity,
    weapon: weaponDataTable.angelos_heptades.weapon,
    statTable: weaponStatTables.angelos_heptades,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_angelos_heptades_1',
            description: 'talent_descr.weapon_angelos_heptades_1',
            stats: [
                new StatTable('atk_percent', weaponDataTable.angelos_heptades.angelos_heptades.param1, 100),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_angelos_heptades',
            serializeId: 1,
            title: 'talent_name.weapon_angelos_heptades_1',
            description: 'talent_descr.weapon_angelos_heptades_2',
            stats: [
                new StatTable('text_dmg_percent', weaponDataTable.angelos_heptades.angelos_heptades.param3, 100),
                new StatTable('text_dmg_percent_max', weaponDataTable.angelos_heptades.angelos_heptades.param4, 100),
            ],
        }),
        new ConditionStaticRefine({
            title: 'talent_name.weapon_angelos_heptades_1',
            description: 'talent_descr.weapon_angelos_heptades_3',
            stats: [
                new StatTable('energy', weaponDataTable.angelos_heptades.angelos_heptades.param6),
            ],
        })
    ],
    postEffects: [
        new PostEffectStats({
            from: 'atk*',
            levelSetting: 'weapon_refine',
            percent: new StatTable('dmg_all', weaponDataTable.angelos_heptades.angelos_heptades.param3, 0.1),
            statCap: new StatTable('dmg_all', weaponDataTable.angelos_heptades.angelos_heptades.param4, 100),
            condition: new ConditionAnd([
                new ConditionBoolean({ name: 'weapon_angelos_heptades' }),
                new ConditionBoolean({ name: 'common.char_status_shield_off_field', invert: 1 }),
            ]),
        }),
        new PostEffectStats({
            from: 'atk*',
            levelSetting: 'weapon_refine',
            percent: new StatTable('dmg_all', weaponDataTable.angelos_heptades.angelos_heptades.param3, 0.05),
            statCap: new StatTable('dmg_all', weaponDataTable.angelos_heptades.angelos_heptades.param4, 50),
            condition: new ConditionAnd([
                new ConditionHexCheck({ hex: 2 }),
                new ConditionHexCurrent(),
                new ConditionBoolean({ name: 'weapon_angelos_heptades' }),
                new ConditionBoolean({ name: 'common.char_status_shield_off_field' }),
            ]),
        }),
    ],
});
