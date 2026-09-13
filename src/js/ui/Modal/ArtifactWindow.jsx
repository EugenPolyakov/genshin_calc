import React from "react";

import {Artifact} from "../../classes/Artifact"

import "../../../css/modal/ArtifactWindow.css"
import { substatCheck, substatListValid } from "../../classes/SubstatCheck";
import { Stats } from "../../classes/Stats";
import { DB } from "../../db/DB";
import { UI } from "../../ui";
import { NumberInput } from "../Components/Inputs/Input";
import { Slider } from "../Components/Inputs/Slider";
import { DialogContainer } from "../Components/Dialog/Container";
import { ControlsBar } from "../Components/ControlsBar";
import { RoundButton, TitledButton } from "../Components/Inputs/Buttons";
import { Modal } from "../Modal";
import { Dropdown } from "../Components/Inputs/Dropdown";

export class ArtifactWindow extends Modal {
    init(app) {
        super.init(app);
    }

    createContent() {
        return (
            <ArtifactWindowComponent
                ref={ (obj) => this.modal = obj }
            />
        );
    }
}

class ArtifactWindowComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSlot: '',
            rarity: 5,
            level: 0,
            mainStat: '',
            setName: '',
            substats: [
                { stat: '', value: 0, values: [] },
                { stat: '', value: 0, values: [] },
                { stat: '', value: 0, values: [] },
                { stat: '', value: 0, values: [] },
            ],
            isVisible: false,
            groups: [],
            groupsList: [],
        }
    }

    render() {
        let slots = [];
        for (let slot of DB.Artifacts.Slots.getKeys()) {
            slots.push(<div key={ slot } className={ "gi-modal-type " + (this.state.activeSlot == slot ? " active " : " ") + slot } onClick={ () => this.setSlot(slot) } />);
        }
        let mainStats = [];
        for (let stat of DB.Artifacts.Mainstats.getKeys()) {
            let statSlots = DB.Artifacts.Mainstats.get(stat).slots;

            mainStats.push(<div key={ stat } className={ "gi-modal-mainstat-item " + statSlots.join(' ') + (this.state.mainStat == stat ? " active" : "") } onClick={ () => this.setMainstat(stat) } >{ UI.Lang.get('stat_short.' + stat) }</div>);
        }
        let rarityInfo = DB.Artifacts.Rarity[this.state.rarity - 1];
        let art = this.getArtifact(this.state);
        let errors = [];

        for (const name of art.getErrors()) {
            errors.push(UI.Lang.get('artifact_error.' + name));
        }

        let setData = DB.Artifacts.Sets.get(this.state.setName);
        let artImage = '';
        if (setData)
            artImage = setData.getImage();
        else {
            setData = {
                minRarity: 1,
                maxRarity: 5,
            };
        }

        return (
            <DialogContainer
                addClass="gi-artifact-window"
                isVisible={ this.state.isVisible }
                closeCallback={ () => this.handleClose() }
            >
                <div className={ "gi-modal-art-line" + (this.state.lockedSlot ? " locked" : "") }>
                    { slots }
                    <div className={ "gi-modal-set-icon sprite sprite-artifact sprite-40 flower " + artImage } onClick={ () => this.handleSet() } />

                    <div className="gi-artifact-window-stars">
                        { [1, 2, 3, 4, 5].map(i => <div className={ "gi-artifact-window-star" + (this.state.rarity >= i ? " active" : "") + (setData.minRarity < i || setData.maxRarity > i ? " disabled" : "") } key={ i } onClick={ () => (setData.minRarity < i || setData.maxRarity > i) && this.setRarity(i) } />) }
                    </div>
                    <div className="gi-artifact-window-level">
                        <Slider
                            min={ 0 }
                            max={ rarityInfo.maxLevel }
                            value={ this.state.level }
                            onChange={ (lvl) => this.setLevel(lvl) }
                        />
                        <div className="gi-artifact-window-level-value">+{ this.state.level }</div>
                    </div>

                    {
                        this.state.groupsList &&
                            <div className="gi-artifact-window-group-wrapper">
                                <div className="gi-artifact-window-group">
                                    <Dropdown
                                        isMultiple={ true }
                                        items={ this.state.groupsList }
                                        selected={ this.state.groups }
                                        onChange={ (items) => this.handleGroupName(items) }
                                        />
                                </div>
                                <RoundButton icon="icon-add" data-tooltip={ UI.Lang.get('artifact_group.add') } onClick={ () => this.handleAddGroup() } { ...UI.SimpleTooltip } />
                            </div>
                    }

                </div>

                <div className="gi-hr" />
                <div className="gi-artifact-stats">

                    <div className={ "gi-modal-mainstat-line " + this.state.activeSlot }>
                        { mainStats }
                    </div>

                    <div className="gi-hr" />
                    <div className="gi-modal-substat-lines">
                        { [0, 1, 2, 3].map(slot => <SubStatsLine
                            key={ slot }
                            mainStat={ this.state.mainStat }
                            data={ this.state.substats[slot] }
                            rarity={ this.state.rarity }
                            isVisible={ rarityInfo.maxSubstats > slot }
                            changeSubstat={ (stat) => this.setSubstatStat(slot, stat) }
                            addRoll={ (roll) => this.appendRoll(slot, roll) }
                            valueChange={ (value) => this.setSubstatValue(slot, value) }
                            removeRoll={ (roll) => this.removeRoll(slot, roll) }
                        />) }

                        <div className="gi-modal-line-error">
                            { errors.length > 0 && (<><span className="gi-modal-line-error-icon" />{ errors.join('; ') }</>)}
                        </div>
                    </div>
                    <div className="gi-hr" />

                    <ControlsBar>
                        <TitledButton
                            icon="icon-ok"
                            title={ UI.Lang.get('modal_buttons.save') }
                            onClick={ () => this.save() }
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

    internalSetRarity(rarity, state) {
        let rarityInfo = DB.Artifacts.Rarity[rarity - 1];
        if (state.level == null)
            state.level = this.state.level;
        if (state.level > rarityInfo.maxLevel)
            state.level = rarityInfo.maxLevel;

        state.rarity = rarity;
        if (rarity != this.state.rarity) {
            state.substats = this.state.substats.slice();
            let state2 = Object.assign({}, this.state, state);
            let art = this.getArtifact(state2);
            art.tryDoRightSubstats();
            state.substats = this.getSubstatsFromArt(art);
        }

        this.setState(state);
    }

    setRarity(rarity, setName) {
        let minRarity = 1;
        let maxRarity = 5;

        let setData = DB.Artifacts.Sets.get(setName || this.state.setName);

        if (setData) {
            minRarity = setData.minRarity;
            maxRarity = setData.maxRarity;
        }

        if (rarity < minRarity) {
            rarity = minRarity;
        } else if (rarity > maxRarity) {
            rarity = maxRarity;
        }

        this.internalSetRarity(rarity, {});
    }

    setLevel(level) {
        let maxLevel = DB.Artifacts.Rarity[this.state.rarity-1].maxLevel;

        if (level < 0) {
            level = 0;
        } else if (level > maxLevel) {
            level = maxLevel;
        } else {
            level = parseInt(level);
        }

        this.setState({
            level
        });
    }

    setSlot(value) {
        let activeSlot = '';
        if (DB.Artifacts.Slots.get(value)) {
            activeSlot = value;
        } else {
            activeSlot = DB.Artifacts.Slots.getFirstId();
        }

        let mainStat = this.state.mainStat;
        if (mainStat) {
            let allowed = DB.Artifacts.Slots.get(activeSlot).mainStats;
            if (!allowed.includes(this.state.mainStat)) {
                mainStat = allowed[0];
            }
        }

        this.setState({
            activeSlot,
            mainStat
        });
    }

    setMainstat(value) {
        let mainStat = '';
        if (DB.Artifacts.Mainstats.get(value)) {
            mainStat = value;
        }

        let allowed = DB.Artifacts.Slots.get(this.state.activeSlot).mainStats;
        if (!allowed.includes(mainStat)) {
            mainStat = allowed[0];
        }

        this.setState({
            mainStat
        });
    }

    setSubstatStat(slot, stat) {
        let substats = this.state.substats.slice();

        let substat = substats[slot];
        substat.stat = stat;

        if (stat) {
            let data = substatCheck(stat, rarity, substat.value, substat.values);
            if (data.last == 0)
                substat.values = data.steps.map(x => x.rarity - 2);
            else
                substat.values = null;
        }

        this.setState({ substats });
    }

    getSubstatsFromArt(artifact) {
        let substats = [{}, {}, {}, {}];
        let slots = new Set([0, 1, 2, 3]);
        for (let stat in artifact.subStats) {
            substats[artifact.subStats[stat].index] = {
                stat,
                value: artifact.subStats[stat].value,
                values: artifact.subStats[stat].values ? artifact.subStats[stat].values.slice() : null,
            }
            slots.delete(artifact.subStats[stat].index);
        }

        for (let i of slots) {
            substats[i] = { stat: '', value: 0, values: [] };
        }

        return substats;
    }

    appendRoll(slot, roll) {
        if (slot >= 0 && slot < 4) {
            let substats = this.state.substats.slice();
            let substat = substats[slot];
            substat.values.push(roll);
            substat.values = substat.values.sort();
            let subStat = DB.Artifacts.Substats.get(substat.stat);
            substat.value = subStat.rollsToValue[this.state.rarity - 1][substat.values.join('')];
            this.setState({ substats });
        }
    }

    removeRoll(slot, roll) {
        if (slot >= 0 && slot < 4) {
            let index = this.state.substats[slot].values.indexOf(roll);
            if (index >= 0) {
                let substats = this.state.substats.slice();
                let substat = substats[slot];
                substat.values.splice(index, 1);
                if (substat.values.length) {
                    let subStat = DB.Artifacts.Substats.get(substat.stat);
                    substat.value = subStat.rollsToValue[this.state.rarity - 1][substat.values.join('')];
                } else {
                    substat.value = 0;
                }
                this.setState({ substats });
            }
        }
    }

    setSubstatValue(slot, value) {
        if (slot >= 0 && slot < 4) {
            let substats = this.state.substats.slice();
            substats[slot].value = value;
            let state = Object.assign({}, this.state, { substats });
            let art = this.getArtifact(state);
            art.tryDoRightSubstats();
            substats = this.getSubstatsFromArt(art);
            this.setState({
                substats,
            });
        }
    }

    setSet(setName) {
        let setData = DB.Artifacts.Sets.get(setName);

        if (!setData) {
            for (const setId of DB.Artifacts.Sets.getKeysSorted()) {
                setData = DB.Artifacts.Sets.get(setId);
                setName = setId;
                if (setData.maxRarity >= this.state.rarity && setData.minRarity <= this.state.rarity) {
                    break;
                }
            }
        }

        let rarity = this.state.rarity;
        if (rarity > setData.maxRarity)
            rarity = setData.maxRarity;
        else if (rarity < setData.minRarity)
            rarity = setData.minRarity;

        this.internalSetRarity(rarity, { setName })
    }

    save() {
        if (this.callback) {
            this.callback(this.getArtifact(this.state));
        }

        this.handleClose();
    }

    getArtifact(state) {
        let result = new Artifact(state.rarity, state.level, state.activeSlot, state.setName, state.mainStat);
        let maxSubstats = DB.Artifacts.Rarity[state.rarity-1].maxSubstats;

        for (let i = 0; i < maxSubstats; ++i) {
            if (state.substats[i].stat) {
                if (substatListValid(state.substats[i].stat, parseFloat(state.substats[i].value), state.substats[i].values, state.rarity)) {
                    result.addStatByProcs(state.substats[i].stat, state.substats[i].values);
                } else {//if (this.substats[i].value) {
                    result.addStat(state.substats[i].stat, state.substats[i].value - 0);
                }
            }
        }

        result.setGroups(state.groups);

        return result;
    }

    handleClose() {
        this.setState({
            isVisible: false,
        });
    }

    handleGroupName(name) {
        this.setState({ groups: name });
    }

    handleAddGroup() {
        UI.PromptWindow.show('artifact_group.add_new_title', '', (text) => {
            this.refreshGroups(text);
        });
    }

    handleSet() {
        UI.ArtifactSetSelectReact.show({
            slot: this.state.activeSlot,
            callback: (set) => {
                this.setSet(set.key);
            },
        });
    }

    refreshGroups(newGroupName) {
        newGroupName = Artifact.trimGroupName(newGroupName);
        let groupsList = this.state.groupsList.slice();
        let groups = this.state.groups.slice();
        if (!groupsList.includes(newGroupName))
            groupsList.push(newGroupName);
        if (!groups.includes(newGroupName))
            groups.push(newGroupName);

        this.setState({
            groups,
            groupsList,
        });
    }

    show(callback, artifact, slot, opts) {
        opts = opts || { };
        this.callback = callback;

        let state = {
            groups: [],
            groupsList: opts.groups ? opts.groups.slice() : null,
            lockedSlot: false,
            isVisible: true,
        };

        if (artifact) {
            state.groups = artifact.getGroups();
            state.setName = artifact.set;
            state.activeSlot = artifact.slot;
            state.rarity = artifact.rarity;
            state.mainStat = artifact.mainStat;
            state.level = artifact.level;

            if (artifact.slot) {
                state.lockedSlot = true;
            }

            state.substats = this.getSubstatsFromArt(artifact);
            this.setState(state);
        } else {
            if (slot) {
                state.lockedSlot = true;
                state.activeSlot = slot;
            }

            state.substats = [
                { stat: '', value: 0, values: [] },
                { stat: '', value: 0, values: [] },
                { stat: '', value: 0, values: [] },
                { stat: '', value: 0, values: [] },
            ];

            this.setState(state);
        }
    }
}

function SubStatsLine(props) {
    if (!props.isVisible)
        return null;
    let stats = [];
    for (let stat of DB.Artifacts.Substats.getKeys()) {
        stats.push(<div key={ stat } className={ "gi-modal-substat-item" + (props.mainStat == stat ? " disabled" : "") + (props.data.stat == stat ? " active" : "") } onClick={ () => props.mainStat != stat && props.changeSubstat(stat) } >{ UI.Lang.get('stat_short.' + stat) }</div>);
    }

    let divRolls = [];
    let stat = props.data.stat;
    let values = [];
    let percent = false;
    if (stat) {
        percent = DB.Artifacts.Substats.get(stat).type == 'percent';

        if (props.data.values && props.data.values.length < DB.Artifacts.Rarity[props.rarity - 1].maxUpgrades) {
            let rolls = DB.Artifacts.Substats.get(stat).rolls;

            let addRoll = UI.Lang.get('tooltip.add_roll');
            let rarity = 0;
            for (let roll of rolls[props.rarity - 1]) {
                let actRarity = rarity;
                divRolls.push(<div
                    key={ roll }
                    className={ "gi-modal-substat-value-roll active border-rarity-" + (rarity + 2) }
                    data-tooltip={ addRoll }
                    { ...UI.SimpleTooltip }
                    onClick={ () => props.addRoll(actRarity) }
                >
                    { Stats.roundStatValue('', roll, percent) }
                </div>);
                rarity++;
            }
        }

        let data = substatCheck(stat, props.rarity, props.data.value, props.data.values);
        let remove = UI.Lang.get('tooltip.remove_roll');

        let classRef;
        if (data.last > 0 || data.steps.length == 1)
            classRef = "good";
        else
            classRef = "good active";
        let idx = 0;
        for (const roll of data.steps) {
            let rId = roll.rarity - 2;
            values.push(<div key={ ++idx } className={ "gi-modal-substat-value-roll " + classRef + ' border-rarity-' + roll.rarity } data-tooltip={ remove } onClick={ () => props.removeRoll(rId) }>{ Stats.roundStatValue('', roll.value, percent) }</div>);
        }

        if (data.last > 0) {
            values.push(<div key="0" className="gi-modal-substat-value-roll last" data-tooltip={ remove } onClick={ () => props.valueChange(props.data.value - data.last) }>{ data.last }</div>);
        }
    }

    return (
        <div className="gi-modal-substat-line">
            <div className="gi-modal-substat-stats">
                <div className="gi-modal-substat-item gi-modal-substat-item-none">{ UI.Lang.get('stat_short.none') }</div>
                { stats }
            </div>
            <div className="gi-modal-substat-value-wrapper">
                <div className="gi-modal-substat-value">
                    <NumberInput
                        value={ props.data.value }
                        onChange={ props.valueChange }
                        isDecimal={ percent }
                        minValue={ 0 }
                    />
                    <div className="gi-modal-substat-add-rolls">
                        { divRolls }
                    </div>
                </div>
                <div className="gi-modal-substat-value-rolls">
                    { values }
                </div>
            </div>
        </div>
    );
}
