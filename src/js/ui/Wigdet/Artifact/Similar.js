import { Stats } from "../../../classes/Stats";
import { UI } from "../../../ui";
import { ArtifactWidget } from "../Artifact";

export class ArtifactWidgetSimilar extends ArtifactWidget {
    getButtons(opts) {
        let id = 'storage_index_'+ opts.index;
        let html = '<div class="gi-radio-wrapper">';
        html += '<input class="gi-radio" type="radio" id="'+ id +'" name="storage_index" value="'+ opts.index +'" ';
        if (opts.selected) {
            html += 'checked="checked"';
        }

        html += '><label for="'+ id +'"><span class="span-label">'+ UI.Lang.get('scanner.use_similar') +'</span></label></div>';
        return html;
    }

    getMainstat(art, opts) {
        const mainStat = art.getMainStat() || '';

        let selected = false;
        if (opts.sample && opts.sample.getMainStatValue() > art.getMainStatValue()) {
            selected = true;
        }

        let html = '<div class="artifact-list-box-mainstat"><span class="stat">';
        html += UI.Lang.get('stat_short.'+ mainStat.replace('_percent', '')) +'</span></div>';
        html += '<div class="artifact-list-box-mainstat"><span class="value '+ (selected ? 'selected' : '') +'">';
        html += Stats.format(mainStat, art.getMainStatValue(), {signed: true});
        html += '</span><span class="stat"> (+'+ art.getLevel() +')</span></div></div></div>';
        return html;
    }

    getSubstats(art, opts) {
        let html = new Array(Object.keys(art.subStats).length);

        for (let substat in art.subStats) {
            let selected = false;

            if (opts.sample) {
                let ss = opts.sample.subStats[substat];

                if (ss && ss.stat == substat && ss.value > art.subStats[substat].value) {
                    selected = true;
                } else if (!ss) {
                    selected = true;
                }
            }

            html[art.subStats[substat].index] = this.getOneSubStat(art.subStats[substat].value, substat, selected, art.subStats[substat].unactivated);
        }

        return html.reduce((r, v) => r += v, '');
    }
}
