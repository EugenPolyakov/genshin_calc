import { Condition } from "../Condition";

export class ConditionNonLunarElement extends Condition {
    getType() {
        return 'static';
    }

    checkOrigin(v) {
        return v == 'lunar';
    }

    checkElement(e) {
        return e == this.params.element;
    }

    isActive(settings) {
        let result = super.isActive(settings);
        if (!result) {
            return false;
        }

        result = !settings.char_originList.some(this.checkOrigin, this) && this.checkElement(settings['char_element'] || '');

        if (!result) {
            for (let i = 1; i <= 3; ++i) {
                let charId = settings['party_char_' + i];
                if (!charId) {
                    continue;
                }

                const char = DB.Chars.getById(charId);
                if (!char.originList.some(this.checkOrigin, this)) {
                    //раз уж получили данные персонажа, то можно и у него считывать, а не из косвенных
                    result = this.checkElement(settings['resonance_element_' + i] || '');
                    if (result)
                        break;
                }
            }
        }

        return this.params.invert ? !result : result;
    }
}
