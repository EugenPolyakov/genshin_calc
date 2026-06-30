import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponDataTable, weaponStatTables } from "../../generated/WeaponStatTables";

export const golden_frostbound_oath = new DbObjectWeapon({
    name: 'golden_frostbound_oath',
    serializeId: 242,
    gameId: weaponDataTable.golden_frostbound_oath.gameId,
    iconClass: "weapon-icon-bow-golden-frostbound-oath",
    rarity: weaponDataTable.golden_frostbound_oath.rarity,
    weapon: weaponDataTable.golden_frostbound_oath.weapon,
    statTable: weaponStatTables.golden_frostbound_oath,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_golden_frostbound_oath_1',
            description: 'talent_descr.weapon_golden_frostbound_oath_1',
            stats: [
                new StatTable('def_percent', weaponDataTable.golden_frostbound_oath.golden_frostbound_oath.def_percent),
            ],
        }),
        new ConditionBooleanRefine({
            title: 'talent_name.weapon_golden_frostbound_oath_2',
            description: 'talent_descr.weapon_golden_frostbound_oath_2',
            stats: [
                new StatTable('dmg_geo', weaponDataTable.golden_frostbound_oath.golden_frostbound_oath.param2, 100),
                new StatTable('dmg_reaction_lunarcrystallize', weaponDataTable.golden_frostbound_oath.golden_frostbound_oath.param2, 100),
                new StatTable('text_dmg_geo_percent', weaponDataTable.golden_frostbound_oath.golden_frostbound_oath.param3, 50),
                new StatTable('text_dmg_reaction_lunarcrystallize_percent', weaponDataTable.golden_frostbound_oath.golden_frostbound_oath.param3, 50),
            ],
        }),
    ],
});

