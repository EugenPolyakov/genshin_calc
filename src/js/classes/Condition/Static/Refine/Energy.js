import { ConditionStaticRefine } from "../Refine";

export class ConditionStaticRefineEnergy extends ConditionStaticRefine {
    getDefaultStats(settings) {
        let stats = super.getDefaultStats(settings);
        let level = 0;
        for (let v of this.params.energyLevels)
            if (settings['char_burst_energy_cost'] <= v)
                level++;

        stats.add('text_number_f', level);

        if (!level) {
            return stats;
        }

        if (this.params.realStats) {
            for (const tables of this.params.realStats) {
                let stat = tables.getValue(level);
                stats.add(stat.getName(), stat.getValue(settings.weapon_refine))
            }
        }

        return stats;
    }
}
