import React from 'react';
import "../../../css/Components/Tab/Artifacts.css"

import { Stats } from '../../classes/Stats';
import { ConditionList } from '../Components/ConditionList';
import { ControlsBar, ControlsBarDivider } from '../Components/ControlsBar';
import { FullHeight, FullHeightScrollable, FullHeightStatic } from '../Components/FullHeight';
import { ArtifactIcon } from '../Components/Icons';
import { TitledButton } from '../Components/Inputs/Buttons';
import { ReactTab } from '../Components/Tab';
import { Lang } from '../Lang';
import { Tab } from "../Tab";
import { StatsInfo } from './Artifacts/StatsInfo';
import { RollsInfo } from './Artifacts/RollsInfo';
import { DB } from '../../db/DB';
import { UI } from '../../ui';

let lang = new Lang();

export class ArtifactsTab extends Tab {
    constructor(params) {
        super(params);

        this.id = 'artifacts';
        this.rightRab = true;
        this.title = 'tab_header.artifacts';
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
            <ArtifactsView
                ref={element => { this.component = element }}
                title={this.title}
            />
        )
    }
}

export class ArtifactsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.strings = {
            title: lang.get(this.props.title),
            scan: lang.get('artifact_view.scan'),
            change: lang.get('artifact_view.change_set'),
            clear: lang.get('artifact_view.clear_artifacts'),
        };
    }

    render() {
        return (
            <ReactTab title={this.strings.title}>
                {this.tabContent()}
            </ReactTab>
        );
    }

    replaceArtifacts(arts) {
        for (let art of arts) {
            UI.Layout.app.setArtifact(art, true);
        }
        UI.Layout.app.refresh({objects: ['build']});
    }

    handleSettingChange(name, value) {
        let oldSettings = UI.Layout.app.currentSet().artifacts.getSettings();
        oldSettings[name] = value;
        UI.Layout.app.setArtifactsSettings(oldSettings);
    }

    handleScanClick() {
        UI.ArtifactScanner.show((art) => {
            if (art) {
                UI.ArtifactScanner.hide();
                UI.Layout.app.setArtifact(art);
            }
        }, {ignoreStorage: true});
    }

    handleSwitchClick() {
        UI.ArtifactSetSelectReact.show({
            callback: (data) => {
                if (!data) {
                    return;
                }

                let maxLevel = DB.Artifacts.Rarity[data.maxRarity-1].maxLevel;
                let arts = UI.Layout.app.getArtifacts();

                for (const slot of Object.keys(arts)) {
                    if (data.slots.length && !data.slots.includes(slot)) {
                        continue;
                    }

                    let art = arts[slot];
                    if (art) {
                        art = art.clone();

                        art.set    = data.key;
                        art.level  = Math.min(art.level, maxLevel);
                        art.rarity = Math.max(Math.min(art.rarity, data.maxRarity), data.minRarity);

                        UI.Layout.app.currentSet().setArtifact(art);
                    }
                }

                UI.Layout.app.refresh();
            },
        });
    }

    handleClearClick() {
        UI.ConfirmWindow.show('modal.confirm', 'artifact_view.clear_confirm', () => {
            UI.Layout.app.currentSet().clearArtifacts();
            UI.Layout.app.refresh();
        });
    }

    handleArtifactOpen(slot) {
        let art = UI.Layout.app.getArtifacts()[slot];

        UI.ArtifactWindow.show((art) => {
            UI.Layout.app.setArtifact(art);
        }, art, slot);
    }

    handleArtifactDelete(slot) {
        let art = UI.Layout.app.getArtifacts()[slot];

        UI.ConfirmWindow.show('modal.confirm', 'artifact_pool.confirm_unequip_artifact', () => {
            UI.Layout.app.removeArtifact(art);
        });
    }

    handleArtifactStorage(slot) {
        let art = UI.Layout.app.getArtifacts()[slot];

        if (art) {
            UI.ConfirmWindow.show('modal.confirm', 'artifact_pool.confirm_add_storage', () => {
                UI.Layout.app.storage.artifacts.addArtifacts([art]);
                UI.Layout.app.refresh({objects: ['storage.artifacts']});
            });
        }
    }

    tabContent() {
        let data = UI.Layout.app.getStats();
        let conditions = UI.Layout.app.getConditions({objects: ['artifacts']});

        let artifacts = [];
        let artData = UI.Layout.app.getArtifacts();
        let storageHashes = UI.Layout.app.storage.artifacts.storageHashes();

        for (let slot of Object.keys(artData)) {
            let artifact = artData[slot];
            artifacts.push({
                slot: slot,
                artifact: artifact,
                inStorage: artifact && storageHashes[artifact.getHash()],
            });
        }

        return (
            <FullHeight>
                <FullHeightStatic>
                    <ControlsBar>
                        <TitledButton
                            icon="icon-scan"
                            title={this.strings.scan}
                            onClick={() => this.handleScanClick()}
                        />
                        <TitledButton
                            icon="icon-replace"
                            title={this.strings.change}
                            onClick={() => this.handleSwitchClick()}
                        />
                        <ControlsBarDivider />
                        <TitledButton
                            icon="icon-delete"
                            title={this.strings.clear}
                            onClick={() => this.handleClearClick()}
                        />
                    </ControlsBar>
                </FullHeightStatic>
                <FullHeightScrollable>
                    <ArtifactsList
                        artifacts={artifacts}
                        onIconClick={(slot) => this.handleArtifactOpen(slot)}
                        onDeleteClick={(slot) => this.handleArtifactDelete(slot)}
                        onStorageClick={(slot) => this.handleArtifactStorage(slot)}
                    />
                    <ConditionList
                        items={conditions}
                        settings={data.settings}
                        onChange={(name, value) => this.handleSettingChange(name, value)}
                    />
                    <StatsInfo
                        build={UI.Layout.app.currentSet()}
                    />
                    <RollsInfo
                        build={UI.Layout.app.currentSet()}
                        feature={UI.Layout.app.getFeature()}
                    />
                </FullHeightScrollable>
            </FullHeight>
        );
    }
}

function ArtifactsList(props) {
    let items = [];

    for (let item of props.artifacts) {
        items.push(
            <ArtifactBlock
                key={item.slot}
                artifact={item.artifact}
                slot={item.slot}
                showStorage={!item.inStorage}
                onIconClick={() => props.onIconClick(item.slot)}
                onDeleteClick={() => props.onDeleteClick(item.slot)}
                onStorageClick={() => props.onStorageClick(item.slot)}
            />
        );
    }

    return (
        <>
            {items}
        </>
    );
}

function ArtifactBlock(props) {
    let art = props.artifact;
    if (!art) {
        return (
            <EmptyArtifactBlock
                slot={props.slot}
                onClick={props.onIconClick}
            />
        )
    }

    let setData = DB.Artifacts.Sets.get(art.set);
    let substats = new Array( Object.keys( art.getSubStats() ).length );

    for (let subStat in art.getSubStats()) {
        substats[art.getSubStats()[subStat].index] = (
            <div key={subStat} className="value">
                <span className="stat-name">{lang.get('stat.'+ subStat)} </span>
                { Stats.format( subStat, art.getSubStats()[subStat].value, {signed: true})}
            </div>
        );
    }

    // TODO
    // let errors = [];
    // for (let name of art.getErrors()) {
    //     errors.push(<p>{lang.get('artifact_error.'+ name)}</p>)
    // }

    return (
        <div className="artifact-big-block">
            <div className="line icon-line">
                <ArtifactIcon
                    size="60"
                    artifact={art}
                />
                {!art.isValid() ? <div className="invalid"></div> : null}
                <div className="names">
                    <div className="line">
                        <div className="buttons">
                            <ArtifactButton
                                icon="edit"
                                onClick={props.onIconClick}
                                tooltip={lang.get('tooltip.artifact_edit')}
                            />
                            <ArtifactButton
                                icon="delete"
                                onClick={props.onDeleteClick}
                                tooltip={lang.get('tooltip.artifact_pulloff')}
                            />
                            {props.showStorage ? <ArtifactButton
                                icon="storage"
                                onClick={props.onStorageClick}
                                tooltip={lang.get('tooltip.artifact_storage')}
                            /> : null}
                        </div>
                        <div className="name">{lang.get(setData.getName())}</div>
                    </div>
                    <div className="line main-stat">
                        <div className="level">+{art.getLevel()}</div>
                        <div className="value">
                            <span className="stat-name">({lang.get('stat.'+ art.getMainStat())} </span>
                            +{Stats.format(art.getMainStat(), art.getMainStatValue())}
                            <span className="stat-name">)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="line sub-stat">
                {substats}
            </div>
        </div>
    );
}


function EmptyArtifactBlock(props) {
    return (
        <div className="artifact-big-block">
            <div
                className={'icon '+ props.slot}
                onClick={props.onClick}
            />
        </div>
    );
}


function ArtifactButton(props) {
    return (
        <div
            className={'button '+ props.icon}
            onClick={props.onClick}
            data-tooltip={props.tooltip}
        />
    );
}

