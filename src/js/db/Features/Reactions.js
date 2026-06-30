import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanCharElement } from "../../classes/Condition/Boolean/CharElement";
import { ConditionOr } from "../../classes/Condition/Or";
import { FeatureReactionSwirl } from "../../classes/Feature2/Reaction/Transformative/Swirl";
import { FeatureReactionElectroCharged } from "../../classes/Feature2/Reaction/Transformative/ElectroCharged";
import { FeatureReactionOverloaded } from "../../classes/Feature2/Reaction/Transformative/Overloaded";
import { FeatureReactionSuperConduct } from "../../classes/Feature2/Reaction/Transformative/SuperConduct";
import { FeatureReactionHyperBloom } from "../../classes/Feature2/Reaction/Transformative/Bloom/HyperBloom";
import { FeatureReactionShattered } from "../../classes/Feature2/Reaction/Transformative/Shattered";
import { FeatureReactionBurning } from "../../classes/Feature2/Reaction/Transformative/Burning";
import { FeatureReactionHyperBurgeon } from "../../classes/Feature2/Reaction/Transformative/Bloom/Burgeon";
import { FeatureReactionCrystallize } from "../../classes/Feature2/Reaction/Crystallize";
import { FeatureReactionRupture } from "../../classes/Feature2/Reaction/Transformative/Bloom/Rupture";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionNot } from "../../classes/Condition/Not";
import { FeatureReactionLunarCharged } from "../../classes/Feature2/Reaction/Transformative/Lunar/Charged";
import { FeatureReactionLunarBloom } from "../../classes/Feature2/Reaction/Transformative/Lunar/Bloom";
import { FeatureMultiplierReaction } from "../../classes/Feature2/Multiplier/Reaction";
import { reactionDamageValues, reactionShieldValues } from "../generated/ElementScale";

const lunarchargedCond = new ConditionAnd([
    new ConditionBoolean({name: 'allowed_lunarcharged'}),
    new ConditionOr([
        new ConditionBooleanCharElement({element: ['hydro', 'electro', 'anemo']}),
        new ConditionBoolean({name: 'allowed_infusion_hydro'}),
        new ConditionBoolean({name: 'allowed_infusion_anemo'}),
        new ConditionBoolean({name: 'allowed_infusion_electro'}),
    ]),
]);

const lunarbloomCond = new ConditionAnd([
    new ConditionBoolean({ name: 'allowed_lunarbloom' }),
    new ConditionOr([
        new ConditionBooleanCharElement({ element: ['hydro', 'dendro', 'anemo'] }),
        new ConditionBoolean({ name: 'allowed_infusion_hydro' }),
        new ConditionBoolean({ name: 'allowed_infusion_dendro' }),
        new ConditionBoolean({ name: 'allowed_infusion_anemo' }),
    ]),
]);

export const Reactions = [
    new FeatureReactionSwirl({
        name: 'swirl_pyro',
        element: 'pyro',
        multipliers: [
            new FeatureMultiplierReaction({
                reactionRate: 0.6,
                reactionValue: reactionDamageValues,
            })
        ],
        condition: new ConditionOr([
            new ConditionBooleanCharElement({element: ['anemo']}),
            new ConditionBoolean({name: 'allowed_infusion_anemo'}),
        ]),
    }),
    new FeatureReactionSwirl({
        name: 'swirl_hydro',
        cannotReact: true,
        element: 'hydro',
        multipliers: [
            new FeatureMultiplierReaction({
                reactionRate: 0.6,
                reactionValue: reactionDamageValues,
            })
        ],
        condition: new ConditionOr([
            new ConditionBooleanCharElement({element: ['anemo']}),
            new ConditionBoolean({name: 'allowed_infusion_anemo'}),
        ]),
    }),
    new FeatureReactionSwirl({
        name: 'swirl_electro',
        element: 'electro',
        multipliers: [
            new FeatureMultiplierReaction({
                reactionRate: 0.6,
                reactionValue: reactionDamageValues,
            })
        ],
        condition: new ConditionOr([
            new ConditionBooleanCharElement({element: ['anemo']}),
            new ConditionBoolean({name: 'allowed_infusion_anemo'}),
        ]),
    }),
    new FeatureReactionSwirl({
        name: 'swirl_cryo',
        element: 'cryo',
        multipliers: [
            new FeatureMultiplierReaction({
                reactionRate: 0.6,
                reactionValue: reactionDamageValues,
            })
        ],
        condition: new ConditionOr([
            new ConditionBooleanCharElement({element: ['anemo']}),
            new ConditionBoolean({name: 'allowed_infusion_anemo'}),
        ]),
    }),
    new FeatureReactionBurning({
        name: 'burning',
        element: 'pyro',
        multipliers: [
            new FeatureMultiplierReaction({
                reactionRate: 0.25,
                reactionValue: reactionDamageValues,
            })
        ],
        condition: new ConditionOr([
            new ConditionBooleanCharElement({element: ['pyro', 'anemo', 'dendro']}),
            new ConditionBoolean({name: 'allowed_infusion_pyro'}),
            new ConditionBoolean({name: 'allowed_infusion_anemo'}),
            new ConditionBoolean({name: 'allowed_infusion_dendro'}),
        ]),
    }),
    new FeatureReactionSuperConduct({
        name: 'superconduct',
        element: 'cryo',
        cannotReact: true,
        multipliers: [
            new FeatureMultiplierReaction({
                reactionRate: 1.5,
                reactionValue: reactionDamageValues,
            })
        ],
        condition: new ConditionOr([
            new ConditionBooleanCharElement({element: ['cryo', 'electro', 'anemo']}),
            new ConditionBoolean({name: 'allowed_infusion_cryo'}),
            new ConditionBoolean({name: 'allowed_infusion_anemo'}),
            new ConditionBoolean({name: 'allowed_infusion_electro'}),
        ]),
    }),
    new FeatureReactionElectroCharged({
        name: 'electrocharged',
        element: 'electro',
        cannotReact: true,
        multipliers: [
            new FeatureMultiplierReaction({
                reactionRate: 2,
                reactionValue: reactionDamageValues,
            })
        ],
        condition: new ConditionNot([lunarchargedCond]),
    }),
    new FeatureReactionLunarCharged({
        name: 'lunarcharged_contrubution',
        element: 'electro',
        cannotReact: true,
        multipliers: [
            new FeatureMultiplierReaction({
                reactionRate: 1.8,
                reactionValue: reactionDamageValues,
                scalingStat: 'lunarcharged_multi',
            })
        ],
        condition: lunarchargedCond,
    }),
    new FeatureReactionLunarCharged({
        name: 'lunarcharged_contrubution_2',
        element: 'electro',
        cannotReact: true,
        multipliers: [
            new FeatureMultiplierReaction({
                reactionRate: 1.8,
                reactionValue: reactionDamageValues,
                reactionPenalty: 1 / 2,
                scalingStat: 'lunarcharged_multi',
            })
        ],
        condition: lunarchargedCond,
    }),
    new FeatureReactionLunarCharged({
        name: 'lunarcharged_contrubution_12',
        element: 'electro',
        cannotReact: true,
        multipliers: [
            new FeatureMultiplierReaction({
                reactionRate: 1.8,
                reactionValue: reactionDamageValues,
                reactionPenalty: 1 / 12,
                scalingStat: 'lunarcharged_multi',
            })
        ],
        condition: lunarchargedCond,
    }),
    new FeatureReactionOverloaded({
        name: 'overloaded',
        element: 'pyro',
        cannotReact: true,
        multipliers: [
            new FeatureMultiplierReaction({
                reactionRate: 2.75,
                reactionValue: reactionDamageValues,
            })
        ],
        condition: new ConditionOr([
            new ConditionBooleanCharElement({element: ['pyro', 'electro', 'anemo']}),
            new ConditionBoolean({name: 'allowed_infusion_pyro'}),
            new ConditionBoolean({name: 'allowed_infusion_anemo'}),
            new ConditionBoolean({name: 'allowed_infusion_electro'}),
        ]),
    }),
    new FeatureReactionRupture({
        name: 'rupture',
        element: 'dendro',
        cannotReact: true,
        multipliers: [
            new FeatureMultiplierReaction({
                reactionRate: 2,
                reactionValue: reactionDamageValues,
            })
        ],
        condition: new ConditionOr([
            new ConditionBooleanCharElement({element: ['hydro', 'dendro', 'anemo']}),
            new ConditionBoolean({name: 'allowed_infusion_hydro'}),
            new ConditionBoolean({name: 'allowed_infusion_dendro'}),
            new ConditionBoolean({name: 'allowed_infusion_anemo'}),
        ]),
    }),
    new FeatureReactionLunarBloom({
        name: 'lunarbloom',
        element: 'dendro',
        //cannotReact: false,
        multipliers: [
            new FeatureMultiplierReaction({
                reactionRate: 1.8,
                reactionValue: reactionDamageValues,
                scalingStat: 'lunarbloom_multi',
            })
        ],
        condition: lunarbloomCond,
    }),
    new FeatureReactionHyperBurgeon({
        name: 'burgeon',
        element: 'dendro',
        cannotReact: true,
        multipliers: [
            new FeatureMultiplierReaction({
                reactionRate: 3,
                reactionValue: reactionDamageValues,
            })
        ],
        condition: new ConditionOr([
            new ConditionBooleanCharElement({element: ['pyro', 'anemo']}),
            new ConditionBoolean({name: 'allowed_infusion_pyro'}),
            new ConditionBoolean({name: 'allowed_infusion_anemo'}),
        ]),
    }),
    new FeatureReactionHyperBloom({
        name: 'hyperbloom',
        element: 'dendro',
        cannotReact: true,
        multipliers: [
            new FeatureMultiplierReaction({
                reactionRate: 3,
                reactionValue: reactionDamageValues,
            })
        ],
        condition: new ConditionOr([
            new ConditionBooleanCharElement({element: ['electro', 'anemo']}),
            new ConditionBoolean({name: 'allowed_infusion_anemo'}),
            new ConditionBoolean({name: 'allowed_infusion_electro'}),
        ]),
    }),
    new FeatureReactionCrystallize({
        name: 'crystalize',
        category: 'reaction',
        element: 'shield',
        cannotReact: true,
        multipliers: [
            new FeatureMultiplierReaction({
                reactionRate: 1,
                reactionValue: reactionShieldValues,
            })
        ],
        condition: new ConditionOr([
            new ConditionBooleanCharElement({element: ['geo']}),
            new ConditionBoolean({name: 'allowed_infusion_geo'}),
        ]),
    }),
    new FeatureReactionShattered({
        name: 'shatter',
        element: 'phys',
        cannotReact: true,
        multipliers: [
            new FeatureMultiplierReaction({
                reactionRate: 3,
                reactionValue: reactionDamageValues,
            })
        ],
    }),
];
