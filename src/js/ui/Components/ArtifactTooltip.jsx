import React from 'react';
import ReactDOM from 'react-dom';
import parse from 'html-react-parser';

import "../../../css/ui/Tooltip/Artifact.css"

import { Modal } from '../Modal';
import { waitForCondition } from '../../Utils';
import { Stats } from '../../classes/Stats';
import { DB } from '../../db/DB';
import { UI } from '../../ui';
import { ArtifactSet } from '../../classes/ArtifactSet';
import { Artifact } from '../../classes/Artifact';
import { WorkerFactoryPotentialArtifactUsefulness } from '../../classes/WorkerFactory/PotentialArtifactUsefulness';
import { Serializer } from '../../classes/Serializer';

export class ArtifactTooltip extends Modal {
    constructor () {
        super();

        this.factory = new WorkerFactoryPotentialArtifactUsefulness({
            maxThreads: 6,
            callback: (data) => this.generateCompleteCallback(data),
            progressCallback: (data) => this.generateProgressCallback(data),
        });
    }

    generateCompleteCallback(data) {
        let artProfit = {
            calculated: true,
            actualValues: data.actualValues,
            profitValues: data.profitValues,
            goodCount: data.goodCount,
            combCount: data.combCount,
        };
        UI.Layout.app.currentSet().setProfitArtifact(data.currentArtifact, artProfit);
        if (this.modal && Serializer.pack(this.modal.state.artifact) == data.currentArtifact)
            this.modal.forceUpdate();
    }

    generateProgressCallback(data) {
        let artProfit = {
            calculated: false,
            progress: data.progress,
        };
        UI.Layout.app.currentSet().setProfitArtifact(data.currentArtifact, artProfit);
        if (this.modal && Serializer.pack(this.modal.state.artifact) == data.currentArtifact)
            this.modal.forceUpdate();
    }

    createContent() {
        return (
            <ArtifactTooltipWindow
                ref={(obj) => this.modal = obj}
            />
        )
    }

    hide() {
        waitForCondition(
            () => {return this.modal},
            () => {this.modal.hide()},
        );
    }

    updatePosition() {
        waitForCondition(
            () => {return this.modal},
            () => {this.modal.updatePosition()},
        );
    }
}

class ArtifactTooltipWindow extends React.PureComponent {
    constructor(props) {
        super(props);

        this.hideTimeout;
        this.state = {
            isVisible: false,
        };
    }

    show(artifact, feature, artSettings) {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout)
        }

        this.setState({
            artifact: artifact,
            feature: feature,
            isVisible: true,
            artSettings: artSettings,
        });
    }

    hide() {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout)
        }

        this.hideTimeout = setTimeout(() => {this.handleClose()}, 20);
    }

    handleClose() {
        this.setState({isVisible: false});
    }

    render() {
        return ReactDOM.createPortal(
            this.dialogNode(),
            document.body,
        );
    }

    updatePosition() {
        if (this.root && this.root.clientWidth) {
            this.setState({
                top: 30 + 'px',
                left: (UI.Layout.windowWidth() / 2 - this.root.clientWidth - 10) + 'px',
            });
        }
    }

    generateProfitBlock(result) {
        if (!result.calculated) {
            return (
                <table className="gi-tooltip-artifact-feature">
                    <tbody>
                        <tr><th>{ UI.Lang.get('artifacts_ui.calculation_progress') }{ Stats.format('text_percent', result.progress, { decimal_digits: 2, no_decimal_zero: 1, zero: 1 }) }</th></tr>
                    </tbody>
                </table>
            );
        }
        let values = [];
        let values2 = [];
        for (let key of ['normal', 'crit', 'average']) {
            let val1 = result.actualValues[key];
            let val2 = result.profitValues[key];
            let diff = Math.round(val2 / val1 * 1000) / 10 - 100;
            diff = Stats.format('text_percent', diff, { decimal_digits: 1, no_decimal_zero: 1 });

            values.push(
                <td key={ key }>
                    { formatNumber(val2) }<br />
                    { val2 ? formatNumber(val2 - val1, { signed: 1 }) : '' }<br />
                    { val2 ? diff : '' }
                </td>
            );
            values2.push(
                <td key={ key }>
                    { Stats.format('text_percent', result.goodCount[key] / result.combCount * 100, { decimal_digits: 2, no_decimal_zero: 1 }) }
                </td>
            );
        }

        return (
                <table className="gi-tooltip-artifact-feature">
                    <tbody>
                        <tr><th colSpan="5">{ UI.Lang.get('artifacts_ui.maximum_possible_values') }</th></tr>
                        <tr><th colSpan="5">{ UI.Lang.get('feature_' + this.state.feature) }</th></tr>
                        <tr></tr>
                        <tr>
                            <td></td>
                            <td>{ UI.Lang.get('stat_view.normal') }</td>
                            <td>{ UI.Lang.get('stat_view.crit') }</td>
                            <td>{ UI.Lang.get('stat_view.average') }</td>
                        </tr>
                        <tr><td></td>{ values }</tr>
                        <tr><td>{ UI.Lang.get('artifacts_ui.chance') }</td>{ values2 }</tr>
                    </tbody>
                </table>
        );
    }

    dialogNode() {
        /**
         * @type {Artifact}
         */
        let art = this.state.artifact;
        if (!art || !this.state.isVisible) {return ""}

        let mainStat = art.getMainStat();
        /**
         * @type {ArtifactSet}
         */
        let setData = DB.Artifacts.Sets.get(art.getSet());
        let conditions = setData.getConditionsByPieces();

        let subStats = new Array( Object.keys( art.getSubStats() ).length );
        for (let item in art.getSubStats()) {
            subStats[art.getSubStats()[item].index] =(
                <li key={ "stat" + (art.getSubStats()[item].index - 1)}>
                    { UI.Lang.getStat( 'stat.' + item ) }&nbsp;{ Stats.format( item, art.getSubStats()[item].value, {signed: 1})}
                </li>
            );
        }

        let condItems = [];
        for (const i in conditions) {
            let items = conditions[i];
            for (const item of items) {
                let stats = item.getDisplayStats({});
                let descr = item.getDescription(stats);

                if (descr) {
                    condItems.push(
                        <li key={"cond"+ condItems.length}>{UI.Lang.get('artifact_set.pieces_'+ i)}:&nbsp;{parse(descr)}</li>
                    );
                }
            }
        }

        let featureBlock = "";
        if (this.state.feature) {
            let build = UI.Layout.app.currentSet().clone();
            let feat1 = build.calcFeatures(1)[this.state.feature];

            let rarity = DB.Artifacts.Rarity[art.getRarity() - 1];
            if (art.getLevel() < rarity.maxLevel) {
                let packed = Serializer.pack(art);
                let artProfit = UI.Layout.app.currentSet().getProfitArtifact(packed);
                if (!artProfit) {
                    artProfit = {
                        calculated: false,
                        progress: 0,
                    };
                    UI.Layout.app.currentSet().setProfitArtifact(packed, artProfit);

                    let subStatsRollsCount = DB.Artifacts.Substats.get('hp').rolls[art.getRarity() - 1].length;
                    let customStats = Math.floor((rarity.maxLevel - art.getLevel() + 3) / 4);
                    let combCount = 0;
                    let supportedStats = Array.from(new Set([
                        'atk', 'atk_percent', 'def', 'def_percent', 'hp', 'hp_percent',
                        'crit_rate', 'crit_dmg', 'mastery', 'recharge'
                    ]).delete(mainStat));
                    let factor = function (z, skip) { let r = 1; for (let i = skip + 1; i <= z; i++) r *= i; return r; }
                    let newStatsCount = rarity.maxSubstats - Object.keys(art.getSubStats()).length;
                    customStats -= newStatsCount + (art.getLevel() < 4 ? Object.entries(art.getSubStats()).reduce((a, x) => x[1].unactivated ? a + 1: a, 0): 0);
                    let newStatsCombCount = factor(supportedStats.length, supportedStats.length - newStatsCount) * Math.pow(subStatsRollsCount, newStatsCount);
                    if (art.getRarity() == 5 && Object.values(art.getSubStats()).some(x => x.unactivated)) {
                        combCount = factor(customStats + 16 - 1, 16 - 1) / factor(customStats, 1);
                    } else {
                        combCount = factor(customStats + subStatsRollsCount * rarity.maxSubstats - 1, subStatsRollsCount * rarity.maxSubstats - 1) /
                            factor(customStats, 1);
                    }
                    let workerData = {
                        currentArtifact: packed,
                        combCount,
                        newStatsCombCount,
                        subStatsRollsCount,
                        newStatsCount,
                        supportedStats,
                        customStats,
                        rarity: art.getRarity(),
                        artSettings: this.state.artSettings,
                        feature: this.state.feature,
                        build: UI.Layout.app.currentSet().serialize(),
                        actualValues: {
                            normal: feat1.normal,
                            crit: feat1.crit,
                            average: feat1.average,
                        },
                    }

                    UI.TooltipArtifact.factory.run(workerData);
                }

                featureBlock = this.generateProfitBlock(artProfit);
            } else {
                build.setArtifact(art);
                build.setArtifactsSettings(this.state.artSettings);
                build.artifacts.removeInvalidSettings();

                let feat2 = build.calcFeatures(1)[this.state.feature];
                let values = [];

                for (let key of ['normal', 'crit', 'average']) {
                    let val1 = feat1[key];
                    let val2 = feat2[key];
                    let diff = Math.round(val2 / val1 * 1000) / 10 - 100;
                    diff = Stats.format('text_percent', diff, { decimal_digits: 1, no_decimal_zero: 1 });

                    values.push(
                        <td key={ key }>
                            { formatNumber(val2) }<br />
                            { val2 ? formatNumber(val2 - val1, { signed: 1 }) : '' }<br />
                            { val1 ? diff : '' }
                        </td>
                    );
                }

                featureBlock = (
                    <table className="gi-tooltip-artifact-feature">
                        <tbody>
                            <tr><th colSpan="4">{ UI.Lang.get('feature_' + this.state.feature) }</th></tr>
                            <tr></tr>
                            <tr>
                                <td>{ UI.Lang.get('stat_view.normal') }</td>
                                <td>{ UI.Lang.get('stat_view.crit') }</td>
                                <td>{ UI.Lang.get('stat_view.average') }</td>
                            </tr>
                            <tr>{ values }</tr>
                        </tbody>
                    </table>
                );
            }
        }

        return (
            <div ref={(obj) => this.root = obj} className="gi-tooltip gi-tooltip-artifact" style={{left: this.state.left, top: this.state.top}}>
                <div className={"gi-tooltip-artifact-caption rarity-"+ art.getRarity()}>
                    <div className="gi-tooltip-artifact-caption-background-left"/>
                    <div className="gi-tooltip-artifact-caption-background-middle"/>
                    <div className="gi-tooltip-artifact-caption-background-right"/>
                    {art.title ? art.title : UI.Lang.get( setData.getName() )}
                </div>
                <div className="gi-tooltip-artifact-stats">
                    <div className="gi-tooltip-artifact-mainstat-name">{UI.Lang.getStat('stat.'+ mainStat)}</div>
                    <div className="gi-tooltip-artifact-mainstat-value">{Stats.format(mainStat, art.getMainStatValue())}</div>
                </div>
                <div className="gi-tooltip-artifact-substats">
                    <ul>{subStats}</ul>
                </div>
                <div className="gi-tooltip-artifact-set-name">{UI.Lang.get( setData.getName() )}:</div>
                <ul className="gi-tooltip-artifact-pieces">{condItems}</ul>
                {featureBlock}
            </div>
        );
    }
}

function formatNumber(value, opts) {
    opts ||= {};

    let result = Math.round(value);
    if (result == 0) {
        return '-';
    }

    result = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    if (opts.signed && value >= 0) {
        result = '+'+ result;
    }

    return result;
}
