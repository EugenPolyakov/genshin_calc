import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionAnd } from "../../../classes/Condition/And";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionMoonPhaseSetting } from "../../../classes/Condition/CustomOrigin/MoonPhaseSetting";
import { ConditionMoonPhaseCheck } from "../../../classes/Condition/MoonPhaseCheck";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const AubadeOfMorningstarAndMoon = new ArtifactSet({
    serializeId: 59,
    goodId: 'AubadeOfMorningstarAndMoon',
    gameId: 15044,
    itemIds: [44412, 44413, 44422, 44423, 44432, 44433, 44442, 44443, 44452, 44453, 44513, 44514, 44523, 44524, 44533, 44534, 44543, 44544, 44553, 44554, 23811, 23812, 23813, 23814, 23815, 23816, 23817, 23818, 23819, 23820],
    name: "artifact_set.aubade_of_morningstar_and_moon",
    iconClass: "artifact-icon-aubade-of-morningstar-and-moon",
    minRarity: 4,
    maxRarity: 5,
    setBonus:  [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.aubade_of_morningstar_and_moon_2',
                    description: 'set_descr.aubade_of_morningstar_and_moon_2',
                    stats: {
                        mastery: 80,
                    },
                })
            ],
        },
        {},
        {
            conditions: [
                new ConditionMoonPhaseSetting(),
                new ConditionBoolean({
                    name: 'set.aubade_of_morningstar_and_moon_4_1',
                    serializeId: 49,
                    title: 'set_bonus.aubade_of_morningstar_and_moon_4',
                    description: 'set_descr.aubade_of_morningstar_and_moon_4_1',
                    stats: {
                        dmg_reaction_lunar: 20,
                    },
                }),
                new ConditionStatic({
                    title: 'set_bonus.aubade_of_morningstar_and_moon_4',
                    description: 'set_descr.aubade_of_morningstar_and_moon_4_2',
                    stats: {
                        dmg_reaction_lunar: 40,
                    },
                    condition: new ConditionAnd([
                        new ConditionBoolean({ name: 'set.aubade_of_morningstar_and_moon_4_1' }),
                        new ConditionMoonPhaseCheck({ moonphase: 2 }),
                    ]),
                })
            ],
        },
    ],
});
