import React from 'react';
import parse from 'html-react-parser';

import "../../../css/Components/Tab/RankArtifact.css"

import { ControlsBar, ControlsBarDivider } from '../Components/ControlsBar';
import { Dropdown } from '../Components/Inputs/Dropdown';
import { Feature2 } from '../../classes/Feature2';
import { FullHeight, FullHeightStatic, FullHeightScrollable } from '../Components/FullHeight';
import { ReactTab } from '../Components/Tab';
import { Tab } from "../Tab";
import { TitledButton, ToggleRoundButton } from '../Components/Inputs/Buttons';
import { DB } from '../../db/DB';
import { UI } from '../../ui';
import { RankProgressModal } from '../Components/Dialog/RankProgressModal';
import { WorkerFactoryPotentialArtifactUsefulness } from '../../classes/WorkerFactory/PotentialArtifactUsefulness';
import { Serializer } from '../../classes/Serializer';
import { Artifact } from '../../classes/Artifact';
import { RankResultItemList } from './RankArtifacts/RankResult';

export class RankArtifactTab extends Tab {
    constructor(params) {
        super(params);
        this.id = 'rankart';
        this.rightRab = true;
    }

    refresh() {
        if (!this.component) {
            return;
        }

        this.component.setState({
            feature: this.app.getFeature(),
        });
    }

    createContent() {
        return (
            <RankArtifact
                ref={ RankArtifact => { this.component = RankArtifact }}
                feature={this.app.getFeature()}
                onFeatureChanged={(feature) => this.app.setFeature(feature)}
            />
        )
    }
}

class RankArtifact extends React.Component {
    constructor(props) {
        super(props);

        this.storage = UI.Layout.app.storage.artifacts;

        this.factory = new WorkerFactoryPotentialArtifactUsefulness({
            maxThreads: 6,
            callback: (data) => this.rankCompleteCallback(data),
            startCallback: (data) => this.rankStartCallback(data),
            progressCallback: (data) => this.rankProgressCallback(data),
            terminateCallback: (list) => this.rankTerminateCallback(list),
        });

        this.state = {
            isLoading: false,
            feature: props.feature,
            featureType: 'average',
            activeSlot: 'flower',
            artifacts: {
                flower: [],
                plume: [],
                sands: [],
                goblet: [],
                circlet: [],
                all: [],
            },
        };

        this.calculateList = [];

        this.featureTypeValues = [
            { value: 'normal', text: UI.Lang.get('pool_view.type_normal') },
            { value: 'crit', text: UI.Lang.get('pool_view.type_crit') },
            { value: 'average', text: UI.Lang.get('pool_view.type_average') },
            { value: 'chance_normal', text: UI.Lang.get('pool_view.type_normal_chance') },
            { value: 'chance_crit', text: UI.Lang.get('pool_view.type_crit_chance') },
            { value: 'chance_average', text: UI.Lang.get('pool_view.type_average_chance') },
        ];
    }

    isCurrentFilterActual() {
        if (this.state.artifacts[this.state.activeSlot].length > 0) {
            let list = this.storage.storageHashes();
            for (let art of this.state.artifacts[this.state.activeSlot]) {
                if (!list[art.hash] || !UI.Layout.app.currentSet().getProfitArtifact(art.hash)) {
                    return false;
                    break;
                }
            }
        }

        return true;
    }

    dataFeaturesItems() {
        return Feature2.buildDropdown(UI.Layout.app.currentSet());
    }

    dataArtifactsList(slot) {
        let list = this.storage.listArtifacts().slice(0);

        for (let j = list.length - 1; j >= 0; j--) {
            if (DB.Artifacts.Rarity[list[j].getRarity() - 1].maxLevel == list[j].getLevel() || list[j].getSlot() != slot)
                list.splice(j, 1);
        }

        return list;
    }

    handleFeature(selectedItem) {
        let feature = selectedItem.value;
        this.setState({feature: feature});
        UI.Layout.app.setFeature(feature);
    }

    changeSort(feature, list) {
        let sort;
        if (['normal', 'crit', 'average'].includes(feature))
            sort = (a, b) => (a.artProfit.actualValues[feature] - a.artProfit.profitValues[feature]) - (b.artProfit.actualValues[feature] - b.artProfit.profitValues[feature]);
        else {
            feature = feature.substring(7);
            sort = (a, b) => (b.artProfit.goodCount[feature] / b.artProfit.combCount) - (a.artProfit.goodCount[feature] / a.artProfit.combCount);
        }

        list.sort(sort);
    }

    handleFeatureType(selectedItem) {
        let newState = {
            featureType: selectedItem.value,
            artifacts: {},
        }
        for (let slot in this.state.artifacts) {
            let newArr = this.state.artifacts[slot];
            if (newArr.length > 0)
                this.changeSort(selectedItem.value, newArr);
            newState.artifacts[slot] = newArr;
        }

        this.setState(newState);
    }

    rankCompleteCallback(data) {
        UI.Layout.unlockClosing();
        this.progressModal.hide();

        let result = [];
        for (let item of data.profitValues) {
            let artProfit = {
                calculated: true,
                actualValues: data.actualValues,
                profitValues: item.values,
                goodCount: item.goodCount,
                combCount: item.combCount,
            };
            UI.Layout.app.currentSet().setProfitArtifact(item.currentArtifact, artProfit);

            let art = Artifact.deserialize(Serializer.unpack(item.currentArtifact));
            result.push({
                hash: item.currentArtifact,
                art: art,
                artProfit,
            });
        }

        this.changeSort(this.state.featureType, result);

        let state = {
            artifacts: this.state.artifacts,
        };
        state.artifacts[this.state.activeSlot] = result;
        this.setState(state);
    }

    rankProgressCallback(data) {
        this.progressModal.updateProgress(data);
    }

    rankTerminateCallback() {
        UI.Layout.unlockClosing();
    }

    rankStartCallback(data) {
        UI.Layout.lockClosing();

        this.progressModal.show({
            closeCallback: () => {
                this.progressModal.hide();
                this.factory.terminate();
            },
        });
    }

    startRank() {
        let calculateList = this.dataArtifactsList(this.state.activeSlot);
        if (calculateList.length == 0)
            return;

        let build = UI.Layout.app.currentSet().clone();
        let feat1 = build.calcFeatures(1)[this.state.feature];

        this.factory.run({
            arts: calculateList,
            feature: this.state.feature,
            build: UI.Layout.app.currentSet().serialize(),
            actualValues: {
                normal: feat1.normal,
                crit: feat1.crit,
                average: feat1.average,
            },
        });
    }

    render() {
        return (
            <ReactTab
                title={ UI.Lang.get('tab_header.artifact_pool_suggest') }
                backButton={this.state.view}
                backButtonCallback={() => this.showDefault()}
            >
                {this.tabContent()}
                <RankProgressModal
                    ref={obj => this.progressModal = obj}
                />
            </ReactTab>
        );
    }

    handleSlotChecked(slot) {
        this.setState({ activeSlot: slot });
    }

    slotButtons() {
        let items = [];

        for (let slot of DB.Artifacts.Slots.getKeys()) {
            items.push(
                <ToggleRoundButton
                    key={ slot }
                    icon={ 'icon-' + slot }
                    checked={ this.state.activeSlot == slot }
                    tooltip={ UI.Lang.get('tooltip.artifact_' + slot) }
                    onChange={ () => this.handleSlotChecked(slot) }
                />
            );
        }

        /*items.push(
            <ToggleRoundButton
                key="all"
                icon={ 'icon-all-slots' }
                checked={ this.state.activeSlot == "all" }
                tooltip={ UI.Lang.get('tooltip.artifact_all') }
                onChange={ () => this.handleSlotChecked('all') }
            />
        );*/

        return items;
    }

    tabContent() {
        let content;
        let artCount = this.dataArtifactsList(this.state.activeSlot).length;
        if (artCount == 0) {
            content = (
                <div className="tab-message">{ parse(UI.Lang.getTalent('artifacts_ui.no_suitable_artifacts')) }</div>
            );
        } else {
            content = (<>
                <div>{ artCount } кандидатов</div>
                { this.isCurrentFilterActual() ? "" : (<div className="tab-message">{ parse(UI.Lang.getTalent('artifacts_ui.data_out_of_date')) }</div>) }
                <FullHeightScrollable
                    isLoading={ this.state.isLoading }
                    loadingOverlay={ UI.Lang.get('pool_view.loading') }
                    maxHeight={ UI.Layout.isMobile() ? UI.Layout.windowHeight() - 170 : null }
                >
                    <RankResultItemList sort={ this.state.featureType } artifacts={ this.state.artifacts[this.state.activeSlot] } />
                </FullHeightScrollable>
            </>
            );
        }

        return (
            <FullHeight>
                <FullHeightStatic>
                    <ControlsBar>
                        <Dropdown
                            barClass="resizable"
                            items={this.dataFeaturesItems()}
                            selected={this.state.feature}
                            onChange={(value) => this.handleFeature(value)}
                        />
                        <Dropdown
                            barClass="feature-type"
                            items={this.featureTypeValues}
                            selected={this.state.featureType}
                            onChange={(value) => this.handleFeatureType(value)}
                        />
                    </ControlsBar>
                    <ControlsBar>
                        { this.slotButtons() }
                        <ControlsBarDivider />
                        <TitledButton
                            icon="icon-ok"
                            title={ UI.Lang.get('artifacts_ui.start') }
                            onClick={ () => this.startRank() }
                            disabled={ artCount == 0 }
                        />
                    </ControlsBar>
                </FullHeightStatic>
                { content }
            </FullHeight>
        );
    }
}
