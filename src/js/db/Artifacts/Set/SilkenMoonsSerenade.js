import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionMoonPhaseBoolean } from "../../../classes/Condition/Boolean/MoonPhase";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { ConditionMoonPhaseSetting } from "../../../classes/Condition/CustomOrigin/MoonPhaseSetting";

export const SilkenMoonsSerenade = new ArtifactSet({
    serializeId: 57,
    goodId: 'SilkenMoonsSerenade',
    gameId: 15042,
    itemIds: [42412, 42413, 42422, 42423, 42432, 42433, 42442, 42443, 42452, 42453, 42513, 42514, 42523, 42524, 42533, 42534, 42543, 42544, 42553, 42554, 23791, 23792, 23793, 23794, 23795, 23796, 23797, 23798, 23799, 23800],
    name: "artifact_set.silken_moons_serenade",
    iconClass: "artifact-icon-silken-moons-serenade",
    minRarity: 4,
    maxRarity: 5,
    setBonus:  [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.silken_moons_serenade_2',
                    description: 'set_descr.silken_moons_serenade_2',
                    stats: {
                        recharge: 20,
                    },
                })
            ],
        },
        {},
        {
            conditions: [
                new ConditionMoonPhaseSetting(),
                new ConditionMoonPhaseBoolean({
                    name: 'set.silken_moons_serenade_4',
                    serializeId: 50,
                    title: 'set_bonus.silken_moons_serenade_4',
                    description: 'set_descr.silken_moons_serenade_4',
                    stats: {
                        text_mastery_1: 60,
                        text_mastery_2: 120,
                        text_lunar_reaction_dmg_percent: 10,
                    },
                })
            ],
        },
    ],
});
