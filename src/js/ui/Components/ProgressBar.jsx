import "../../../css/Components/ProgressBar.css"
import { formatNumber } from "../Utils";

export function ProgressBar(props) {
    let percent = (props.total ? props.count * 100 / props.total : 0).toFixed(1);
    let displayPercent = props.total ? Math.floor(percent) : 0;

    return (
        <div className={'progress-bar' + (props.addClass ? ' '+ props.addClass : '')}>
            <div className="bar" style={{width: percent +'%'}} />
            <div className="line">
                <div className="value left">{ formatNumber(props.count, { zero: 1 })}</div>
                <div className="sep">/</div>
                <div className="value right">{ formatNumber(props.total, { zero: 1 })} ({displayPercent}%)</div>
            </div>
        </div>
    );
}
