import React from "react";
import parse from 'html-react-parser';
import "../../../css/ui/Window/ArtifactScanner.css"
import levenshtein from "js-levenshtein-esm";

import { Artifact } from "../../classes/Artifact";
import { Scanner } from "./ArtifactScaner/Scanner";
import { Serializer } from "../../classes/Serializer";
import { ScannerTextSubstat } from "./ArtifactScaner/Text/Substat";
import { ScannerImageInventory } from "./ArtifactScaner/Image/Inventory";
import { DB } from "../../db/DB";
import { UI } from "../../ui";
import { Modal } from "../Modal";
import { TitledButton } from "../Components/Inputs/Buttons";
import { ControlsBar } from "../Components/ControlsBar";
import { FileInput } from "../Components/Inputs/Input";
import { Dropdown } from "../Components/Inputs/Dropdown";
import { ArtifactListItem } from "../Components/Artifact";
import { DialogContainer } from "../Components/Dialog/Container";
import { ProgressBar } from "../Components/ProgressBar";
import { ArtifactListItemSimilar } from "../Components/Artifact/Similar";
import { ScrolledPanel } from "../Components/ScrolledPanel";

export class ArtifactScanner extends Modal {
    init(app) {
        super.init(app);
        this.worker = new Scanner(UI.Lang.getLang());
    }

    createContent() {
        return (
            <ArtifactScannerComponent
                ref={ (obj) => this.modal = obj }
                storage={ this.app.storage.char }
                artifactStorage={ this.app.storage.artifacts }
                title={ UI.Lang.get('modal_window.lock_artifact') }
            />
        );
    }
}

class ArtifactScannerComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            croppedError: false,
            progress: 0,
            totalProgress: 0,
            firstScan: true,
            groupNames: [''],
            art: null,
            canUpdate: false,
            canAdd: false,
            isVisible: false,
            index: "",
        };

        window.addEventListener("paste", (event) => this.handlePastImage(event), false);
    }

    render() {
        let artData;
        if (this.state.art) {
            let art = this.state.art;

            if (art && art.getMainStat() && art.getSetName())
                this.state.canAdd = true;

            let similar = '';
            if (!this.opts.ignoreStorage) {
                similar = (
                    <div className="gi-artifact-scanner-artifact-similar">
                        <div>{ UI.Lang.get('scanner.storage_artifact') }</div>
                        { this.showSimilar(art) }
                    </div>
                )
            }

            artData = (
                <>
                    <div className="gi-artifact-scanner-artifact-current">
                        <div>{ UI.Lang.get('scanner.scanned_artifact') }</div>
                        { art && (
                            <ArtifactListItem
                                hash={ art.getHash() }
                                art={ art }
                                onEdit={ () => this.handleArtifactEdit() }
                                tooltip={ art.getErrorsFormatted() }
                            />) }
                        { art && this.opts.groups && (<Dropdown
                            addClass="comma"
                            isMultiple={ true }
                            items={ this.opts.groups }
                            selected={ this.state.groupNames }
                            onChange={ (items) => this.handleGroupName(items) } />
                        ) }
                    </div>
                    { similar }
                </>
            );
        }
        else if (this.state.croppedError)
            artData = UI.Lang.get('scanner.error');
        else if (this.state.totalProgress)
            artData = (
                <ProgressBar count={ this.state.progress } total={ this.state.totalProgress } />
            );
        else
            artData = parse(UI.Lang.getTalent('scanner.instruction'));

        return (
            <DialogContainer
                addClass="gi-window-artifact-scanner"
                isVisible={ this.state.isVisible }
                title={ UI.Lang.get('modal_window.scanning_artifact') }
                closeCallback={ () => this.handleClose() }
            >
                <div className="gi-scanner-image-preview" id="img_preview">
                    <img ref={ (obj) => this.img = obj} src={ 'images/help/scanner_' + UI.Lang.getLang() +'.png' } />
                </div>
                <div className="gi-scanner-image-controls">
                    { UI.Lang.get('scanner.paste') }
                    <br />
                    <FileInput
                        onChange={ (e) => this.handleSelectFile(e) }
                    />
                    <div className="gi-hr" />

                    <div className="gi-artifact-scanner-artifact">
                        { artData }
                    </div>
                    <div className="gi-hr" />

                    <ControlsBar>
                        <TitledButton
                            icon="icon-ok"
                            title={ UI.Lang.get('scanner.add_to_pool') }
                            disabled={ !this.state.canAdd }
                            onClick={ () => this.addToPool() }
                        />
                        <TitledButton
                            icon="icon-ok"
                            title={ UI.Lang.get('scanner.update_storage') }
                            disabled={ !this.state.canUpdate }
                            onClick={ () => this.updateStorage() }
                        />
                        <TitledButton
                            icon="icon-cancel"
                            title={ UI.Lang.get('modal_buttons.cancel') }
                            onClick={ () => this.handleClose() }
                        />
                    </ControlsBar>
                </div>
            </DialogContainer>
        );
    }

    handleGroupName(items) {
        let result = items.map((i) => { return i.value });
        if (result.length == 0) {
            result = [""]
        }

        this.setState({
            groupNames: result,
        });
    }

    addToPool() {
        if (this.state.art) {
            this.state.art.setGroups(this.state.groupNames)
            this.callback(this.state.art);
            this.clearResult();
        }
    }

    handleUpdateItem(index) {
        this.setState({ index });
    }

    updateStorage() {
        if (this.state.art && this.callback && this.state.index >= 0) {
            this.state.art.setGroups(this.state.groupNames)

            let exArt = UI.Layout.app.storage.artifacts.getArtByIndex(this.state.index);

            this.state.art.setLocked(exArt.isLocked());
            var oldSubStats = exArt.getSubStats();
            for (let i = 0; i < oldSubStats.length; i++)
                if (oldSubStats[i].initialValue || oldSubStats[i].values.length == 1)
                    this.state.art.getSubStats()[i].initialValue = oldSubStats[i].initialValue || (oldSubStats[i].values[0] + 1);
            UI.Layout.app.storage.artifacts.updateByHash(exArt.getHash(), this.state.art);
            UI.Layout.app.refresh();

            this.clearResult();
        }
    }

    handleClose() {
        this.clearResult();
        //UI.ArtifactScanner.worker
        this.setState({
            isVisible: false,
        });
    }

    handleSelectFile(e) {
        let file = e.target.files[0];
        this.acceptImage(file);
    }

    handlePastImage(event) {
        if (this.state.isVisible) {
            var items = event.clipboardData.items;

            for (var i = 0; i < items.length; i++) {
                if (items[i].type.indexOf("image") == -1) continue;

                var blob = items[i].getAsFile();
                this.acceptImage(blob);
            }
        }
    }

    handleArtifactEdit() {
        UI.ArtifactWindow.show((result) => {
            let similarArts = null;
            let index = "";
            if (!this.opts.ignoreStorage) {
                similarArts = UI.Layout.app.storage.artifacts.getSimilar(result);
                if (similarArts.length)
                    index = similarArts[0].index;
            }
            this.setState({
                art: result,
                similarArts,
                index,
            });
        }, this.state.art);
    }

    show(callback, opts) {
        this.callback = callback;
        this.opts = opts || {};
        if (this.opts.groups)
            this.opts.groups = this.opts.groups.map(x => ({
                text: x.title,
                value: x.value,
            }));

        this.setState({
            isVisible: true,
        });
    }

    processImage(img) {
        const that = this;

        let debug = 0;
        let data  = new ScannerImageInventory(img);
        let croppedData = data.getArtifactCanvas();

        this.valid = false;
        this.art   = null;

        if (!croppedData) {
            this.setState({
                croppedError: true,
                art: null,
                similarArts: null,
                index: "",
            });
            return;
        }

        if (debug) {
            that.root.find('.gi-scanner-image-preview').empty();
        }

        this.img.src = croppedData.canvas.toDataURL('image/png');

        this.setState({
            progress: 0,
            totalProgress: 100,
            croppedError: false,
            art: null,
            similarArts: null,
            index: "",
        });

        UI.ArtifactScanner.worker.process(croppedData.canvas, {
            debug: debug,
            progressCallback: (percent) => this.updateProgress(percent),
            resultCallback: (d) => {
                d.rarity = croppedData.rarity;
                this.processResult(d);
            },
        });
    }

    updateProgress(percent) {
        this.setState({
            progress: percent,
        });
    }

    processResult(data) {
        if (!data) {
            this.setState({
                croppedError: true,
            });
            return;
        }

        let result = {
            slot: this.processSlot(data),
            subStats: this.processStats(data),
        };

        result.set = this.processSetName(data, result.slot);

        if (result.slot == 'flower') {
            result.mainStat = 'hp';
        } else if (result.slot == 'plume') {
            result.mainStat = 'atk';
        } else {
            result.mainStat = this.processMainStat(data, result.slot);
        }

        result.level = this.processResultLevel(data, result);

        let art = new Artifact(data.rarity, result.level, result.slot, result.set, result.mainStat, result.subStats);
        art.tryDoRightSubstats();

        let similarArts;
        let index = "";
        if (!this.opts.ignoreStorage) {
            similarArts = UI.Layout.app.storage.artifacts.getSimilar(art);
            if (similarArts.length)
                index = similarArts[0].index;
        }

        this.setState({
            art: art,
            croppedError: false,
            totalProgress: 0,
            groupNames: [''],
            similarArts,
            index,
        });
    }

    showSimilar(art) {
        let similarArts = this.state.similarArts;

        if (similarArts.length) {
            let block = [];
            let hash = Serializer.pack(art);
            for (const similar of similarArts) {
                let selected = similar.index == this.state.index;
                let similar_hash = Serializer.pack(similar.art);
                if (similar_hash == hash) {
                    this.state.canAdd = false;
                } else {
                    this.state.canUpdate = true;
                }

                block.push(
                    <ArtifactListItemSimilar
                        key={ similar.index }
                        hash={ similar_hash }
                        art={ similar.art }
                        index={ similar.index }
                        sample={ art }
                        selected={ selected }
                        onChange={ (e) => this.handleUpdateItem(e.target.value) }
                    />
                );
            }
            block = block.splice(0);

            return <ScrolledPanel style={ { height: "100%" } }>{ block }</ScrolledPanel>;
        } else {
            return (<div className="text-remark">{UI.Lang.get('scanner.no_similar')}</div>);
        }
    }

    processResultLevel(data, result) {
        if (result && result.slot && result.mainStat) {
            let parser = new ScannerTextSubstat();
            let v = data.mainVal.replace(',', '.');
            let msValue = parser.getStatValue(v, v);

            if (msValue) {
                let slotData = DB.Artifacts.Mainstats.get(result.mainStat);
                let values = slotData.values[data.rarity-1] || [];
                for (let level = 0; level <= 20; ++level) {
                    if (values.getValue(level) == msValue) {
                        return level
                    }
                }
            }
        }

        let maxLevel = DB.Artifacts.Rarity[data.rarity-1].maxLevel;
        let level = parseInt(data.level.replace(/\W/g, ''));

        if (level >= 0 && level <= maxLevel) {
            return level;
        }

        return 0;
    }

    processMainStat(result, slot) {
        let text = result.mainName.replace(/^[^\wа-я]+/ig, '');
        text = text.replace(/[^\wа-я]+$/ig, '').toLowerCase();

        let data = DB.Artifacts.Slots.get(slot);
        let stats = [];

        if (data) {
            stats = data.mainStats;
        } else {
            stats = DB.Artifacts.Mainstats.getKeys();
        }

        let candidates = [];

        for (let stat of stats) {
            let n = UI.Lang.get('stat_artifact.'+ stat).toLowerCase();
            let d = levenshtein(text, n);

            if (d <= Math.min(n.length / 2, 2)) {
                candidates.push({
                    distance: d,
                    stat: stat,
                });
            }
        }

        if (candidates.length > 0) {
            candidates = candidates.sort(function(a, b) {return a.distance - b.distance});
            return candidates[0].stat;
        }

        return '';
    }

    processSlot(result) {
        let text = result.slot.replace(/^[^\wа-я]+/ig, '');
        text = text.replace(/[^\wа-я]+$/ig, '').toLowerCase();

        let candidates = [];

        for (let slot of DB.Artifacts.Slots.getKeys()) {
            let n = UI.Lang.get('artifact_set.'+ slot).toLowerCase();
            let d = levenshtein(text, n);

            if (d <= Math.min(n.length / 2, 4)) {
                candidates.push({
                    distance: d,
                    slot: slot,
                });
            }
        }

        if (candidates.length > 0) {
            candidates = candidates.sort(function(a, b) {return a.distance - b.distance});
            return candidates[0].slot;
        }

        return '';
    }

    processSetName(result) {
        for (let text of [result.set, result.set2, result.set3, result.set4]) {
            text = text.replace(/\d+\s*(предме|piec)/ig, '');
            text = text.replace(/^[^\wа-я]+/ig, '');
            text = text.replace(/[^\wа-я]+$/ig, '').toLowerCase();

            for (let setName of DB.Artifacts.Sets.getKeys()) {
                let setData = DB.Artifacts.Sets.get(setName);
                let n = UI.Lang.get(setData.getName()).toLowerCase();

                if (levenshtein(text, n) <= 3) {
                    return setName;
                }
            }
        }

        return '';
    }

    processStats(data) {
        let lines = (data.stats + data.statsLastLine).split("\n");
        let result = [];

        let parser = new ScannerTextSubstat();
        let lastStat = 0;
        for (let line of lines) {
            let item = parser.process(line);

            if (item) {
                lastStat = result.push({ stat: item.stat, value: item.value, unactivated: item.unactivated }) - 1;
            } else if (line.toLowerCase().includes(UI.Lang.get('stat_artifact.unactivated').toLowerCase())) {
                result[lastStat].unactivated = true;
            }
        }

        return result;
    }

    acceptImage(file) {
        if (!file) {
            return;
        }

        const that = this;

        let fr = new FileReader();
        fr.onload = function() {
            let img = new Image();
            img.onload = function() {
                that.processImage(img);
            };
            img.src = fr.result;
        };
        fr.readAsDataURL(file)
    }

    clearResult() {
        this.setState({
            croppedError: false,
            totalProgress: 0,
            groupNames: [''],
            art: null,
            canUpdate: false,
            canAdd: false,
            index: "",
        });
    }
}
