import { reactionDamageValues } from "../../../db/generated/ElementScale";
import { FeatureMultiplierReaction } from "../Multiplier/Reaction";
import { FeatureMultiplierReactionTransformative } from "../Multiplier/Reaction/Transformative";
import { FeatureReaction } from "../Reaction";

export class FeatureReactionTransformative extends FeatureReaction {
    getReactionMasteryBonus(data) {
        return FeatureMultiplierReactionTransformative.masteryMultiplier(data);
    }
}
