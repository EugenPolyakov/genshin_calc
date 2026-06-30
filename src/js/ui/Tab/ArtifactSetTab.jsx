import React from 'react';
import parse from 'html-react-parser';

import "../../../css/Components/Tab/ArtifactSetTab.css"

import { ControlsBar } from '../Components/ControlsBar';
import { Dropdown } from '../Components/Inputs/Dropdown';
import { FeatureTableHeader, FeatureTableValues } from '../Components/FeatureTable';
import { FullHeight, FullHeightStatic, FullHeightScrollable } from '../Components/FullHeight';
import { ReactTab } from '../Components/Tab';
import { ResultTableButton } from '../Components/Inputs/Buttons';
import { Tab } from "../Tab";
import { WorkerFactorySuggestSet } from '../../classes/WorkerFactory/SuggestSet';
import { ArtifactSetIcon } from '../Components/Icons';
import { Feature2 } from '../../classes/Feature2';
import { DB } from '../../db/DB';
import { UI } from '../../ui';

export class ArtifactSetTab extends Tab {
    constructor(params) {
        super(params);

        this.id = 'suggestset';
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
            <ArtifactSetView
                ref={obj => { this.component = obj }}
                feature={this.app.getFeature()}
                displayMode={this.app.getDisplayMode()}
            />
        )
    }
}

class ArtifactSetView extends React.Component {
    constructor(props) {
        super(props);

        this.lastBuild = '';
        this.lastFeature = '';
        this.baseFeature = {};

        this.state = {
            items: [],
            feature: props.feature,
            displayMode: props.displayMode,
            hasResults: true,
        };

        this.factory = new WorkerFactorySuggestSet({
            callback: (data) => this.completeCallback(data),
        });
    }

    dataFeaturesItems() {
        return Feature2.buildDropdown(UI.Layout.app.currentSet());
    }

    handleFeature(feature) {
        this.setState({feature: feature});
        UI.Layout.app.setFeature(feature);
    }

    handleDisplayMode(mode) {
        this.setState({displayMode: mode});
        UI.Layout.app.setDisplayMode(mode);
    }

    handleApplySet(data) {
        let build = UI.Layout.app.currentSet().clone();
        let oldArts = build.getArtifacts();
        let arts = [];

        for (const slot of Object.keys(oldArts)) {
            let art = oldArts[slot];
            if (art) {
                arts.push(art.clone());
            }
        }

        let index = 0;
        let usedSet = {};

        for (const part of data.sets) {
            let setName = part.id;

            for (let i = 0; i < part.pieces; ++i) {
                arts[index++].set = setName;
            }

            usedSet[setName] = 1;
        }

        let setNames = DB.Artifacts.Sets.getKeys();

        for (let i = index; i < arts.length; ++i) {
            let curArt = arts[i];

            for (const setName of setNames) {
                if (usedSet[setName]) {
                    continue;
                }

                let setData = DB.Artifacts.Sets.get(setName);
                let cond = setData.getConditions(1);

                if (cond.length) {
                    continue;
                }

                if (setData.minRarity <= curArt.rarity && setData.maxRarity >= curArt.rarity) {
                    usedSet[setName] = 1;
                    curArt.set = setName;
                    break;
                }
            }
        }

        build.clearArtifacts();
        for (const art of arts) {
            build.setArtifact(art);
        }
        build.setArtifactsSettings(data.settings);
        UI.Layout.app.replaceSet(build);
    }

    triggerGenerate() {
        let hash = UI.Layout.app.currentSet().getHash();
        if (this.lastBuild == hash && this.lastFeature == this.state.feature) {
            return;
        }

        if (this.state.isLoading) {
            this.factory.terminate();
        }

        let build = UI.Layout.app.currentSet();

        this.lastBuild = build.getHash();
        this.lastFeature = this.state.feature;

        this.setState({
            isLoading: true,
        });

        this.factory.run({
            calcset: UI.Layout.app.currentSet(),
            feature: this.state.feature,
            showBeta: UI.Layout.app.showBetaContent(),
        });
    }

    completeCallback(data) {
        this.baseFeature = UI.Layout.app.currentSet().getFeatureResultByName(this.state.feature);

        this.setState({
            isLoading: false,
            items: data,
            hasResults: !!data.length,
        });
    }

    componentDidUpdate() {
        this.triggerGenerate();
    }

    render() {
        return (
            <ReactTab title={UI.Lang.get('tab_header.suggest-artifact-set')}>
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
                        <FeatureTableHeader />
                    </FullHeightStatic>
                    <FullHeightScrollable
                        noPadding={true}
                        isLoading={this.state.isLoading}
                        loadingOverlay={UI.Lang.get('pool_view.loading')}
                    >
                        {this.state.hasResults ?
                            <ArtifactSetList
                                items={this.state.items}
                                feature={this.state.feature}
                                baseFeature={this.baseFeature}
                                displayMode={this.state.displayMode}
                                onApply={(item) => this.handleApplySet(item)}
                            />
                        : <div className="placeholder">{parse(UI.Lang.getTalent('suggester.no_equipped_artifacts'))}</div> }
                    </FullHeightScrollable>
                </FullHeight>
            </ReactTab>
        );
    }
}

function ArtifactSetList(props) {
    let items = [];
    let index = 0;

    for (let item of props.items) {
        items.push(
            <ArtifactSetItem
                key={'result'+ index}
                odd={++index % 2}
                displayMode={props.displayMode}
                baseFeature={props.baseFeature}
                item={item}
                onApply={() => props.onApply(item)}
            />
        );
    }

    return (
        <div className="suggest-set">{items}</div>
    );
}

function ArtifactSetItem(props) {
    return (
        <div className={'line' + (props.odd ? ' odd': '')}>
            <ArtifactSetDetail items={props.item.sets} />
            <div className="button">
                <ResultTableButton
                    icon="icon-load"
                    onClick={props.onApply}
                />
            </div>
            <FeatureTableValues
                result={props.item.feature}
                base={props.baseFeature}
                displayMode={props.displayMode}
            />
        </div>
    )
}

function ArtifactSetDetail(props) {
    let images = [];
    let titles = [];
    let index = 0;

    for (let item of props.items) {
        ++index;
        let setData = DB.Artifacts.Sets.get(item.id);

        titles.push(
            <div key={item.id} className="title">{item.pieces}: {UI.Lang.get(setData.getName())}</div>
        );

        images.push(
            <div key={'icon'+ item.id} className={'icon icon-'+ index}>
                <ArtifactSetIcon set={setData} size={40} />
            </div>
        );
    }

    return (
        <div className="info">
            {images}
            <div className="titles">{titles}</div>
        </div>
    );
}
