import React from "react";
import "../../../../css/Components/RankResult.css"

import { ArtifactSetIcon } from "../../Components/Icons";
import { Stats } from "../../../classes/Stats";
import { formatNumber } from "../../../Utils";
import { DB } from "../../../db/DB";

export function RankResultItemList(props) {
    let lines = [];
    let index = 0;

    for (let item of props.artifacts) {
        index++;
        lines.push(
            <RankResultItem
                key={ 'set' + (index) }
                even={ index % 2 == 0 }
                art={ item.art }
                sort={ props.sort }
                profit={ item.artProfit }
            />
        )
    }

    return (<table className="rank-result">
        <tbody>
            { lines }
        </tbody>
    </table>
    );
}

export function RankResultItem(props) {
    let art = props.art;
    let setData = DB.Artifacts.Sets.get(art.set);
    let substats = new Array(Object.keys(art.getSubStats()).length);

    for (let item in art.getSubStats()) {
        let value = art.getSubStats()[item];
        let stat = item.replace('_percent', '');
        substats[value.index] = (
            <div key={ item } className={ 'substat' + (value.unactivated ? ' unactivated' : '') }>
                <span className="stat">{ UI.Lang.get('stat_mini.' + stat) }</span>
                <span className="value">{ Stats.format(item, value.value, { signed: false }) }</span>
            </div>
        );
    }
    let statOriginal = art.getMainStat()
    let stat = statOriginal.replace('_percent', '');

    return (
        <tr className="rank-result-item">
            <td>
                <div className='artifact-list-box'>
                    <div className="line">
                        <ArtifactSetIcon
                            size={ 60 }
                            set={ art.set }
                            rarity={ art.rarity }
                            slot={ art.slot }
                        />
                        <div className="main">
                            <div className="line">
                                <div className="name">{ UI.Lang.get(setData.getName()) }</div>
                            </div>
                            <div className="main-stat">
                                { UI.Lang.get('stat_short.' + stat) + " " }
                                <span className="main-value">
                                    { Stats.format(statOriginal, art.getMainStatValue(), { }) }
                                </span>
                                (+{ art.getLevel() })
                            </div>
                        </div>
                    </div>
                    { substats }
                </div>
            </td>
            <RankFeatures
                profit={ props.profit }
                sort={ props.sort }
            />
        </tr>
    );
}

function RankFeatures(props) {
    let mainValues = {};
    let percentValues = {};
    let chanceValues = {};
    for (let key of ['normal', 'crit', 'average']) {
        let val1 = props.profit.actualValues[key];
        let val2 = props.profit.profitValues[key];

        let diff = Math.round(val2 / val1 * 1000) / 10 - 100;
        if (diff > 0) {
            mainValues[key] = formatNumber(val2 - val1, { signed: 1 });
            percentValues[key] = Stats.format('text_percent', diff, { decimal_digits: 1, no_decimal_zero: 1, signed: 1 });
            chanceValues[key] = Stats.format('text_percent', props.profit.goodCount[key] / props.profit.combCount * 100, { decimal_digits: 2, zero: 1 });
        } else {
            mainValues[key] = "-";
            percentValues[key] = "-";
            chanceValues[key] = "-";
        }
    }

    return (<>
        <td className="values">
            <div className={ "value" + (props.sort == "normal" ? " sorted" : "") }>{ mainValues.normal }</div>
            <div className={ "value" + (props.sort == "normal" ? " sorted" : "") }>{ percentValues.normal }</div>
            <div className={ "value" + (props.sort == "chance_normal" ? " sorted" : "") }>{ chanceValues.normal }</div>
        </td>
        <td className="values">
            <div className={ "value" + (props.sort == "crit" ? " sorted" : "") }>{ mainValues.crit }</div>
            <div className={ "value" + (props.sort == "crit" ? " sorted" : "") }>{ percentValues.crit }</div>
            <div className={ "value" + (props.sort == "chance_crit" ? " sorted" : "") }>{ chanceValues.crit }</div>
        </td>
        <td className="values">
            <div className={ "value" + (props.sort == "average" ? " sorted" : "") }>{ mainValues.average }</div>
            <div className={ "value" + (props.sort == "average" ? " sorted" : "") }>{ percentValues.average }</div>
            <div className={ "value" + (props.sort == "chance_average" ? " sorted" : "") }>{ chanceValues.average }</div>
        </td>
    </>
    );
}
