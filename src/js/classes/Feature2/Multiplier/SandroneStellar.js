import { BuildData } from "../../Build/Data";
import { ValueTable } from "../../ValueTable";
import { FeatureMultiplier } from "../Multiplier";

export class FeatureMultiplierSandroneStellar extends FeatureMultiplier {
    /**
     * @param {BuildData} data
     * @returns {number}
     */
    getScalingMultiplier(data) {
        let result = 1;
        let level = data.settings.sandrone_refined_tactics;
        if (level > 10)
            level = 10;

        if (level > 0) {
            result += level * 0.1;
        }

        return result;
    }
}
