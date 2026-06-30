import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const RainbowsTrail = new DbObjectWeapon({
    name: 'footprint_of_the_rainbow',
    serializeId: 183,
    gameId: 13431,
    iconClass: "weapon-icon-polearm-footprint-of-the-rainbow",
    rarity: 4,
    weapon: 'polearm',
    statTable: weaponStatTables.RainbowsTrail,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_rainbows_trail',
            serializeId: 1,
            title: 'talent_name.weapon_pact_of_flowing_springs',
            description: 'talent_descr.weapon_pact_of_flowing_springs',
            stats: [
                new StatTable('def_percent', [16, 20, 24, 28, 32]),
            ],
        }),
    ],
});
