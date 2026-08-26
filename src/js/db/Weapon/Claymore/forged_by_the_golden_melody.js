import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionGroupRefine } from "../../../classes/Condition/Group/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const forged_by_the_golden_melody = new DbObjectWeapon({
    name: 'forged_by_the_golden_melody',
    serializeId: 252,
    gameId: weaponDataTable.forged_by_the_golden_melody.gameId,
    iconClass: "weapon-icon-claymore-forged-by-the-golden-melody",
    rarity: weaponDataTable.forged_by_the_golden_melody.rarity,
    weapon: weaponDataTable.forged_by_the_golden_melody.weapon,
    statTable: weaponStatTables.forged_by_the_golden_melody,
    conditions: [
        new ConditionGroupRefine({
            name: 'weapon_forged_by_the_golden_melody_1',
            serializeId: 1,
            group: 1,
            title: 'talent_name.weapon_forged_by_the_golden_melody',
            description: 'talent_descr.weapon_forged_by_the_golden_melody_1',
            stats: [
                new StatTable('atk_percent', weaponDataTable.forged_by_the_golden_melody.forged_by_the_golden_melody.param1, 100),
            ],
        }),
        new ConditionGroupRefine({
            name: 'weapon_forged_by_the_golden_melody_1',
            serializeId: 2,
            group: 2,
            title: 'talent_name.weapon_forged_by_the_golden_melody',
            description: 'talent_descr.weapon_forged_by_the_golden_melody_2',
            stats: [
                new StatTable('mastery', weaponDataTable.forged_by_the_golden_melody.forged_by_the_golden_melody.param2),
            ],
        }),
        new ConditionGroupRefine({
            name: 'weapon_forged_by_the_golden_melody_1',
            serializeId: 3,
            group: 3,
            title: 'talent_name.weapon_forged_by_the_golden_melody',
            description: 'talent_descr.weapon_forged_by_the_golden_melody_3',
            stats: [
                new StatTable('dmg_reaction_stellar_glimmer', weaponDataTable.forged_by_the_golden_melody.forged_by_the_golden_melody.param3, 100),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_forged_by_the_golden_melody_2',
            serializeId: 4,
            title: 'talent_name.weapon_forged_by_the_golden_melody',
            description: 'talent_descr.weapon_forged_by_the_golden_melody_4',
            stats: [
                new StatTable('dmg_reaction_stellar_glimmer', weaponDataTable.forged_by_the_golden_melody.forged_by_the_golden_melody.param3, 100),
            ],
        }),
    ],
});
