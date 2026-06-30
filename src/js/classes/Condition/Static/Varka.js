import { ConditionStatic } from "../Static";

export class ConditionVarkaStatic extends ConditionStatic {
    getDefaultStats(settings) {
        let result = super.getDefaultStats(settings);

        result.add('varka_has_one', settings.varka_has_one ? 1 : 0);
        result.add('varka_has_all', settings.varka_has_all ? 1 : 0);
        return result;
    }
}
