import { Condition } from "../Condition";
import { Stats } from "../Stats";

export class ConditionShatteredChains extends Condition {
    getSettings(settings) {
        let stacks = 0;
        if (settings.char_origin == 'natlan') {
            ++stacks;
        }

        for (let i = 1; i <= 3; ++i) {
            let charId = settings['party_char_' + i];
            if (!charId) {
                continue;
            }

            const char = DB.Chars.getById(charId);
            if (char.origin == 'natlan') {
                ++stacks;
            } else if (char.element != settings.char_element) {
                ++stacks;
            }
        }

        return { weapon_shattered_chains_stacks: stacks };
    }

    getDefaultStats(settings) {
        //todo может добавить возможность подстановки из настроек чтобы для вывода не копировать настройки в статы???
        return new Stats({ weapon_shattered_chains_stacks: settings.weapon_shattered_chains_stacks });
    }
}
