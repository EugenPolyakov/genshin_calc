import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionMoonPhaseBoolean } from "../../../classes/Condition/Boolean/MoonPhase";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { ConditionMoonPhaseSetting } from "../../../classes/Condition/CustomOrigin/MoonPhaseSetting";

export const NightOfTheSkysUnveiling = new ArtifactSet({
    serializeId: 56,
    goodId: 'NightOfTheSkysUnveiling',
    gameId: 15041,
    itemIds: [41412, 41413, 41422, 41423, 41432, 41433, 41442, 41443, 41452, 41453, 41513, 41514, 41523, 41524, 41533, 41534, 41543, 41544, 41553, 41554, 23781, 23782, 23783, 23784, 23785, 23786, 23787, 23788, 23789, 23790],
    name: "artifact_set.night_of_the_skys_unveiling",
    iconClass: "artifact-icon-night-of-the-skys-unveiling",
    minRarity: 4,
    maxRarity: 5,
    setBonus:  [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.night_of_the_skys_unveiling_2',
                    description: 'set_descr.night_of_the_skys_unveiling_2',
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
                new ConditionMoonPhaseBoolean({
                    name: 'set.night_of_the_skys_unveiling_4',
                    serializeId: 51,
                    title: 'set_bonus.night_of_the_skys_unveiling_4',
                    description: 'set_descr.night_of_the_skys_unveiling_4',
                    stats: {
                        text_crit_rate_1: 15,
                        text_crit_rate_2: 30,
                        text_lunar_reaction_dmg_percent: 10,
                    },
                })
            ],
        },
    ],
});
