import React from 'react';

import "../../../css/Components/Tab/ArtifactSubstatTab.css"

import { ControlsBar } from '../Components/ControlsBar';
import { Dropdown } from '../Components/Inputs/Dropdown';
import { FullHeight, FullHeightStatic, FullHeightScrollable } from '../Components/FullHeight';
import { ReactTab } from '../Components/Tab';
import { Tab } from "../Tab";
import { Stats, isPercent } from '../../classes/Stats';
import { FeatureTableHeader, FeatureTableValues } from '../Components/FeatureTable';
import { Feature2 } from '../../classes/Feature2';
import { DB } from '../../db/DB';
import { UI } from '../../ui';

export class ArtifactSubstatTab extends Tab {
    constructor(params) {
        super(params);

        this.id = 'suggestsubstat';
        this.rightRab = false;
    }

    refresh() {
        if (!this.component) {
            return;
        }

        this.component.setState({
            feature: this.app.getFeature(),
            displayMode: this.app.getDisplayMode(),
        });
    }

    createContent() {
        return (
            <ArtifactSubstatView
                ref={obj => { this.component = obj }}
                feature={this.app.getFeature()}
                displayMode={this.app.getDisplayMode()}
            />
        )
    }
}

class ArtifactSubstatView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            feature: props.feature,
            displayMode: props.displayMode,
        };
    }

    dataFeaturesItems() {
        return Feature2.buildDropdown(UI.Layout.app.currentSet());
    }

    dataResults() {
        let results = [];
        let build = UI.Layout.app.currentSet();

        let feature = build.getFeatureByName(this.state.feature);
        if (!feature) {
            return [];
        }

        let base = build.getBuildData();
        let baseFeature = feature.getResult(base)[this.state.feature];

        let statsList = DB.Artifacts.Substats.getKeys();

        for (let stat of statsList) {
            let data = DB.Artifacts.Substats.get(stat);
            let rolls = data.rollsReal[data.rollsReal.length - 1];

            let sum = rolls.reduce((a, b) => a + b, 0);
            let avg = (sum / rolls.length) || 0;

            let bonus = new Stats();
            bonus.add(stat, avg);
            if (isPercent(stat))
                avg *= 100;

            let buildData = build.getBuildData();
            buildData.stats.concat(bonus);
            let statFeature = feature.getResult(buildData)[this.state.feature];

            if (!valuesAreEqual(baseFeature, statFeature)) {
                results.push({
                    stat: stat,
                    value: avg,
                    feature: statFeature,
                    baseFeature: baseFeature,
                });
            }
        }

        results = results.sort(function(a,b) {return b.feature.average - a.feature.average});

        return results;
    }

    handleFeature(feature) {
        this.setState({feature: feature});
        UI.Layout.app.setFeature(feature);
    }

    handleDisplayMode(mode) {
        this.setState({displayMode: mode});
        UI.Layout.app.setDisplayMode(mode);
    }

    render() {
        let items = this.dataResults();
        return (
            <ReactTab title={UI.Lang.get('tab_header.suggest-artifact-substat')}>
                <FullHeight>
                    <FullHeightStatic>
                        <ControlsBar>
                            <Dropdown
                                barClass="resizable"
                                items={this.dataFeaturesItems()}
                                selected={this.state.feature}
                                onChange={(item) => this.handleFeature(item.value)}
                            />
                            <Dropdown
                                barClass="feature-type"
                                items={[
                                    {value: 'percent', text: UI.Lang.get('suggester.display_percent')},
                                    {value: 'absolute', text: UI.Lang.get('suggester.display_absolute')},
                                ]}
                                selected={this.state.displayMode}
                                onChange={(item) => this.handleDisplayMode(item.value)}
                            />
                        </ControlsBar>
                        <FeatureTableHeader title={UI.Lang.get('stat_view.average_roll')}/>
                    </FullHeightStatic>
                    <FullHeightScrollable noPadding={true}>
                        <ArtifactSubstatList
                            items={items}
                            feature={this.state.feature}
                            displayMode={this.state.displayMode}
                        />
                    </FullHeightScrollable>
                </FullHeight>
            </ReactTab>
        );
    }
}

function ArtifactSubstatList(props) {
    let items = [];
    let index = 0;

    for (let item of props.items) {
        items.push(
            <ArtifactSubstatItem
                key={item.stat}
                odd={++index % 2}
                displayMode={props.displayMode}
                {...item}
            />
        );
    }

    return (
        <div className="suggest-substat">{items}</div>
    );
}

function ArtifactSubstatItem(props) {
    return (
        <div className={'line' + (props.odd ? ' odd': '')}>
            <div className="name">{UI.Lang.get('stat.' + props.stat)}</div>
            <div className="value">{Stats.format(props.stat, props.value, {signed: true})}</div>
            <FeatureTableValues
                result={props.feature}
                base={props.baseFeature}
                displayMode={props.displayMode}
            />
        </div>
    )
}

function valuesAreEqual(value1, value2) {
    let result = true;

    for (const key of ['normal', 'crit', 'average']) {
        result &&= Math.abs(value1[key] - value2[key]) < 0.0001;
    }

    return result;
}
