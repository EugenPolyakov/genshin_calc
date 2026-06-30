import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const nocturnes_curtain_call = new DbObjectWeapon({
    name: 'nocturnes_curtain_call',
    serializeId: 240,
    gameId: weaponDataTable.nocturnes_curtain_call.gameId,
    iconClass: "weapon-icon-catalyst-nocturnes-curtain-call",
    rarity: weaponDataTable.nocturnes_curtain_call.rarity,
    weapon: weaponDataTable.nocturnes_curtain_call.weapon,
    statTable: weaponStatTables.nocturnes_curtain_call,
    conditions: [
        new ConditionStaticRefine({
            name: 'weapon_nocturnes_curtain_call_1',
            serializeId: 1,
            title: 'talent_name.weapon_nocturnes_curtain_call',
            description: 'talent_descr.weapon_nocturnes_curtain_call_1',
            stats: [
                new StatTable('hp_percent', weaponDataTable.nocturnes_curtain_call.nocturnes_curtain_call.hp_percent),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_nocturnes_curtain_call_2',
            serializeId: 2,
            title: 'talent_name.weapon_nocturnes_curtain_call',
            description: 'talent_descr.weapon_nocturnes_curtain_call_2',
            stats: [
                new StatTable('text_energy', weaponDataTable.nocturnes_curtain_call.nocturnes_curtain_call.param4),
                new StatTable('hp_percent', weaponDataTable.nocturnes_curtain_call.nocturnes_curtain_call.param1, 100),
                new StatTable('crit_dmg_lunar', weaponDataTable.nocturnes_curtain_call.nocturnes_curtain_call.param2, 100),
            ],
        }),
    ],
});
