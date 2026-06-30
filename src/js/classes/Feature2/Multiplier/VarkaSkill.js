import { BuildData } from "../../Build/Data";
import { CConst } from "../Compile/Types/Item";
import { CDivide, CNumberFloor, CValueCap } from "../Compile/Types/Block";
import { FeatureMultiplier } from "../Multiplier";
import { makeStatTotalItem } from "../Compile/Helpers";
import { charTalentTables } from "../../../db/generated/CharTalentTables";

export function VarkaSturmUndDrangScalingMultiplier(data) {
    if (data.settings.varka_has_all)
        return charTalentTables.Varka.passsive[0][3];
    else if (data.settings.varka_has_one)
        return charTalentTables.Varka.passsive[0][2];
    else
        return 1;
}

export class FeatureMultiplierVarkaSkill extends FeatureMultiplier {
    /**
     * @param {BuildData} data
     * @returns {CItem}
     */
    getTreeBonusMultiplier(data) {
        let bonuses = [];
        if (data && data.settings) {
            if ((data.settings.char_ascension || 0) >= 1)
                bonuses.push(new CConst({
                    value: VarkaSturmUndDrangScalingMultiplier(data),
                    percent: true,
                    comment: 'ascension1',
                }));

            if ((data.settings.char_constellation || 0) >= 1 && data.settings['varka_come_friend_let_us_dance_beneath_the_moons_soft_glow'])
                bonuses.push(new CConst({
                    value: charTalentTables.Varka.cons[0][0],
                    percent: true,
                    comment: 'constellation1',
                }));
        }

        return bonuses;
    }
}
