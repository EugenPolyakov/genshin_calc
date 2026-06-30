import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionAnd } from "../../../classes/Condition/And";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionHexCurrent } from "../../../classes/Condition/HexCurrent";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const ADayCarvedFromRisingWinds = new ArtifactSet({
    serializeId: 58,
    goodId: 'ADayCarvedFromRisingWinds',
    gameId: 15043,
    itemIds: [43412, 43413, 43422, 43423, 43432, 43433, 43442, 43443, 43452, 43453, 43513, 43514, 43523, 43524, 43533, 43534, 43543, 43544, 43553, 43554, 23801, 23802, 23803, 23804, 23805, 23806, 23807, 23808, 23809, 23810],
    name: "artifact_set.a_day_carved_from_rising_winds",
    iconClass: "artifact-icon-a-day-carved-from-rising-winds",
    minRarity: 4,
    maxRarity: 5,
    setBonus:  [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.a_day_carved_from_rising_winds_2',
                    description: 'set_descr.a_day_carved_from_rising_winds_2',
                    stats: {
                        atk_percent: 18,
                    },
                })
            ],
        },
        {},
        {
            conditions: [
                new ConditionBoolean({
                    name: 'set.a_day_carved_from_rising_winds_4_1',
                    serializeId: 48,
                    title: 'set_bonus.a_day_carved_from_rising_winds_4',
                    description: 'set_descr.a_day_carved_from_rising_winds_4_1',
                    stats: {
                        atk_percent: 25,
                    },
                }),
                new ConditionStatic({
                    title: 'set_bonus.a_day_carved_from_rising_winds_4',
                    description: 'set_descr.a_day_carved_from_rising_winds_4_2',
                    stats: {
                        crit_rate: 20,
                    },
                    condition: new ConditionAnd([
                        new ConditionBoolean({ name: 'set.a_day_carved_from_rising_winds_4_1' }),
                        new ConditionHexCurrent(),
                    ]),
                })
            ],
        },
    ],
});
