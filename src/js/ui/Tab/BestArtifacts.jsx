import React from 'react';
import parse from 'html-react-parser';

import "../../../css/Components/Tab/BestArtifact.css"

import { Accordion, AccordionItem } from '../Components/Accordion';
import { AccordionArtifactGroups } from '../Components/Accordion/ArtifactGroups';
import { AccordionArtifactSlots } from '../Components/Accordion/ArtifactSlots';
import { AccordionRequredSets } from '../Components/Accordion/RequredSets';
import { AccordionSetBonuses } from '../Components/Accordion/SetBonuses';
import { AccordionStatFilter } from '../Components/Accordion/StatFilter';
import { AccordionSuggesterStats } from '../Components/Accordion/SuggesterStats';
import { Condition } from '../../classes/Condition';
import { ControlsBar } from '../Components/ControlsBar';
import { Dropdown } from '../Components/Inputs/Dropdown';
import { Feature2 } from '../../classes/Feature2';
import { formatNumber } from '../../Utils';
import { FullHeight, FullHeightStatic, FullHeightScrollable } from '../Components/FullHeight';
import { GroupBox } from '../Components/Inputs/GroupBox';
import { NumberInput } from '../Components/Inputs/Input';
import { ReactTab } from '../Components/Tab';
import { SuggestProgressModal } from '../Components/Dialog/SuggestProgressModal';
import { SuggestResult } from '../Components/SuggestResult';
import { Tab } from "../Tab";
import { TitledButton } from '../Components/Inputs/Buttons';
import { WorkerFactorySuggestArtifacts } from '../../classes/WorkerFactory/SuggestArtifacts';
import { FeatureCompiler } from '../../classes/Feature2/Compiler';
import { isPercent } from '../../classes/Stats';
import { DB } from '../../db/DB';
import { UI } from '../../ui';

const MIN_THREADS = 1;
const MAX_THREADS = 16;

export class BestArtifactTab extends Tab {
    constructor(params) {
        super(params);
        this.id = 'bestart';
        this.rightRab = true;
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

    getSuggestData() {
        return {
            artifacts: this.component.getFilteredArtifacts(),
            settings: this.component.getSettings(),
            featureType: this.component.state.featureType,
            maxThreads: this.component.state.maxThreads,
        };
    }

    createContent() {
        return (
            <BestArtifact
                ref={BestArtifact => { this.component = BestArtifact }}
                feature={this.app.getFeature()}
                displayMode={this.app.getDisplayMode()}
                onFeatureChanged={(feature) => this.app.setFeature(feature)}
            />
        )
    }
}

class BestArtifact extends React.Component {
    constructor(props) {
        super(props);

        this.storage = UI.Layout.app.storage.artifacts;
        this.factory = new WorkerFactorySuggestArtifacts({
            callback: (data) => this.suggestCompleteCallback(data),
            startCallback: (data) => this.suggestStartCallback(data),
            terminateCallback: (data) => this.suggestTerminateCallback(data),
            progressCallback: (data) => this.suggestProgressCallback(data),
        });

        this.state = {
            view: '',
            result: {
                feature: '',
                items: [],
            },
            feature: props.feature,
            featureType: 'average',
            displayMode: props.displayMode,
            otherFeatures: [],
            settings: {
                stats: {},
                groups: {},
                slots: {},
                sets: {},
                sets_settings: {},
                filter: {
                    min_level: 0,
                    max_level: 20,
                    main_stats: {},
                },
                required_sets: {},
            },
            maxThreads: 5,
            artifactFilter: false,
        };

        this.setInitialSettings();

        this.strings = {
            title: UI.Lang.get('tab_header.artifact_pool_suggest'),
            item_stats: UI.Lang.get('artifacts_ui.accordion_stats'),
            item_groups: UI.Lang.get('artifacts_ui.accordion_groups'),
            item_slots: UI.Lang.get('artifacts_ui.accordion_slots'),
            item_required_sets: UI.Lang.get('artifacts_ui.accordion_required_sets'),
            item_sets: UI.Lang.get('artifacts_ui.accordion_sets'),
            item_filter: UI.Lang.get('artifacts_ui.accordion_filter'),
            no_artifacts: UI.Lang.getTalent('artifacts_ui.no_artifacts'),
            total_arts: UI.Lang.get('artifacts_ui.total_arts'),
            total_combinations: UI.Lang.get('artifacts_ui.total_combinations'),
            total_locked: UI.Lang.get('artifacts_ui.total_locked'),
            total_filtered: UI.Lang.get('artifacts_ui.total_filtered'),
            total_used: UI.Lang.get('artifacts_ui.total_used'),
            start: UI.Lang.get('artifacts_ui.start'),
            show_results: UI.Lang.get('artifacts_ui.show_results'),
            lock_window: UI.Lang.get('artifacts_ui.lock_window'),
        };

        this.featureTypeValues = [
            {value: 'normal',  text: UI.Lang.get('pool_view.type_normal')},
            {value: 'crit',    text: UI.Lang.get('pool_view.type_crit')},
            {value: 'average', text: UI.Lang.get('pool_view.type_average')},
        ];
    }

    setInitialSettings() {
        for (let item of this.dataArtifactGroups()) {
            this.state.settings.groups[item.value] = true;
        }

        for (let slot of this.dataArtifactSlots()) {
            this.state.settings.slots[slot] = true;
        }

        let setData = this.listSets();
        let setSettings = {};
        for (let setName of Object.keys(setData)) {
            for (let piece of setData[setName].pieces) {
                this.state.settings.sets[setName +'-'+ piece] = true;
            }

            let localSettings = Condition.allConditionsOn(setData[setName].conditions);
            Object.assign(setSettings, localSettings);
        }
        this.state.settings.sets_settings = setSettings;

        for (let slot of DB.Artifacts.Slots.getKeys()) {
            let data = DB.Artifacts.Slots.get(slot);
            if (data.mainStats.length <= 1) {
                continue;
            }

            let settings = {};
            for (let stat of data.mainStats) {
                settings[stat] = true;
            }

            this.state.settings.filter.main_stats[slot] = settings;
        }
    }

    filterArtifacts() {
        this.artifacts = this.dataArtifactsList();
        this.filteredArtifacts = [];
        this.counts = {
            total: this.artifacts.length,
            filtered: 0,
            locked: 0,
            used: 0,
        };

        let groups = [];
        for (let groupName of Object.keys(this.state.settings.groups)) {
            if (this.state.settings.groups[groupName]) {
                groups.push(groupName)
            }
        }

        let slots = this.state.settings.slots;
        let mainStats = this.state.settings.filter.main_stats
        let minLevel = this.state.settings.filter.min_level;
        let maxLevel = this.state.settings.filter.max_level;
        let hasSlots = {};

        for (let art of this.artifacts) {
            if (art.isLocked()) {
                this.counts.locked++;
                continue;
            }

            if (!art.inGroups(groups)) {
                this.counts.filtered++;
                continue;
            }

            let slot = art.getSlot();
            if (!slots[slot]) {
                this.counts.filtered++;
                continue;
            }

            hasSlots[slot] = 1;

            let level = art.getLevel();
            if (level < minLevel || level > maxLevel) {
                this.counts.filtered++;
                continue;
            }

            if (mainStats[slot]) {
                if (!mainStats[slot][art.getMainStat()]) {
                    this.counts.filtered++;
                    continue;
                }
            }

            this.filteredArtifacts.push(art);
        }

        let artifacts = UI.Layout.app.currentSet().getArtifacts();
        for (let slot of DB.Artifacts.Slots.getKeys()) {
            if (hasSlots[slot]) continue;

            let art = artifacts[slot];
            if (art) {
                this.filteredArtifacts.push(art);
            }
        }

        this.counts.used = this.filteredArtifacts.length;
        this.counts.combinations = calcCombinations(this.filteredArtifacts);
    }

    modifySettings(key, data) {
        let settings = this.state.settings
        settings[key] = data;
        this.setState({settings: settings});
    }

    dataFeaturesItems() {
        return Feature2.buildDropdown(UI.Layout.app.currentSet());
    }

    dataArtifactGroups() {
        return this.storage.listGroups();
    }

    dataArtifactSlots() {
        return DB.Artifacts.Slots.getKeys();
    }

    dataArtifactsList() {
        return this.storage.listArtifacts();
    }

    savedHashes() {
        return UI.Layout.app.storage.char.savedHashes();
    }

    handleFeature(selectedItem) {
        let feature = selectedItem.value;
        this.setState({feature: feature});
        UI.Layout.app.setFeature(feature);
    }

    handleFeatureType(selectedItem) {
        this.setState({featureType: selectedItem.value});
    }

    handleStatSetting(stat, value) {
        let statSettings = this.state.settings.stats;
        statSettings[stat] = validateStatValue(value);
        this.modifySettings('stats', statSettings);
    }

    handleGroupSetting(group, selected, keys) {
        let groupSettings = this.state.settings.groups;
        if (keys.ctrl) {
            for (let g of Object.keys(groupSettings)) {
                groupSettings[g] = false;
            }
            groupSettings[group] = true;
        } else {
            groupSettings[group] = selected;
        }
        this.modifySettings('groups', groupSettings);
    }

    handleSlotSetting(slot, selected, keys) {
        let slotSettings = this.state.settings.slots;
        if (keys.ctrl) {
            for (let s of Object.keys(slotSettings)) {
                slotSettings[s] = false;
            }
            slotSettings[slot] = true;
        } else {
            slotSettings[slot] = selected;
        }
        this.modifySettings('slot', slotSettings);
    }

    handleRequiredSets(slot, name) {
        let reqSettings = this.state.settings.required_sets;
        reqSettings[slot] = name;
        this.modifySettings('required_sets', reqSettings);
    }

    handleRequiredSetsReset() {
        this.modifySettings('required_sets', {});
    }

    handleSetBonuses(name, value) {
        let setsSettings = this.state.settings.sets;
        setsSettings[name] = value;
        this.modifySettings('sets', setsSettings);
    }

    handleSetBonusesSettings(name, value) {
        let setsSettings = this.state.settings.sets_settings;
        setsSettings[name] = value;
        this.modifySettings('sets_settings', setsSettings);
    }

    handleSetBonusesEnable() {
        let setsSettings = this.state.settings.sets;
        for (let key of Object.keys(setsSettings)) {
            setsSettings[key] = true;
        }
        this.modifySettings('sets', setsSettings);
    }

    handleSetBonusesDisable() {
        let setsSettings = this.state.settings.sets;
        for (let key of Object.keys(setsSettings)) {
            setsSettings[key] = false;
        }
        this.modifySettings('sets', setsSettings);
    }

    handleAutoStatFilter() {
        let compilerOpts = {
            // dontProcessTree: 1,
            ignoreSideEffects: 1,
            staticStats: [],
        };
        let calcset = UI.Layout.app.currentSet().clone();
        let feature = calcset.getFeatureByName(this.state.feature);
        let vBuildData = calcset.getBuildData();
        let tree = feature.getTree(vBuildData, compilerOpts);
        let compiler = new FeatureCompiler(tree, []);
        let usedStats = compiler.usedStats;
        compilerOpts.staticStats = usedStats;

        let filterSettings = this.state.settings.filter;
        compiler.prepare(vBuildData, compilerOpts);
        let code = compiler.compile(compilerOpts);
        let stats = new Set();
        for (let stat in this.state.settings.stats) {
            let statValue = this.state.settings.stats[stat] || 0;
            if (statValue == 0)
                continue;
            stat = stat.replace('_min', '').replace('_max', '');

            let val = vBuildData.stats[stat + '_base'] || 0;
            if (isPercent(stat))
                val *= 100;
            if (val >= statValue)
                continue;
            stats.add(stat);
            stats.add(stat + '_percent');
        }
        for (let slot of ["sands", "goblet", "circlet"]) {
            for (let stat in this.state.settings.filter.main_stats[slot])
                filterSettings.main_stats[slot][stat] = usedStats.includes(stat) || stats.has(stat);
        }

        this.modifySettings('filter', filterSettings);
    }

    handleFilterLevel(min, max) {
        let filterSettings = this.state.settings.filter;
        filterSettings.min_level = min;
        filterSettings.max_level = max;
        this.modifySettings('filter', filterSettings);
    }

    handleStatAllFilter() {
        let filterSettings = this.state.settings.filter;

        for (let slot in filterSettings.main_stats)
            for (let s of Object.keys(filterSettings.main_stats[slot])) {
                filterSettings.main_stats[slot][s] = true;
            }

        this.modifySettings('filter', filterSettings);
    }

    handleStatFilter(slot, stat, checked, keys) {
        let filterSettings = this.state.settings.filter;

        if (keys.ctrl) {
            for (let s of Object.keys(filterSettings.main_stats[slot])) {
                filterSettings.main_stats[slot][s] = false;
            }
            filterSettings.main_stats[slot][stat] = true;
        } else {
            filterSettings.main_stats[slot][stat] = checked;
        }

        this.modifySettings('filter', filterSettings);
    }

    handleApplyResult(set) {
        UI.Layout.app.replaceSet(set);
    }

    handleCompareResult(set) {
        UI.CompareTab.addItem(set);
    }

    handleFeaturesSelect() {
        UI.WindowSelectFeatureList.show((items) => {
            this.setState({otherFeatures: items});
        }, this.state.otherFeatures);
    }

    handleDisplayMode(mode) {
        this.setState({displayMode: mode});
        UI.Layout.app.setDisplayMode(mode);
    }

    handleArtifactLock(art, value) {
        let hash = art.getHash();
        let item = this.storage.getByHash(hash);

        if (item) {
            item.setLocked(value);
            this.storage.updateByHash(hash, item);
            UI.Layout.app.queueUpdate();

            this.setState({view: this.state.view});
        }
    }

    handleMaxThreads(value) {
        this.setState({maxThreads: Math.max(MIN_THREADS, Math.min(MAX_THREADS, value))});
    }

    handleLockWindowOpen() {
        UI.LockArtifacts.show({
            closeCallback: () => {
                setTimeout(() => {
                    UI.Layout.app.refresh({
                        objects: ['storage.artifacts'],
                    });
                }, 1);
            },
        });
    }

    listSets() {
        let slotData = {};
        let result = {};

        for (const art of this.storage.listArtifacts()) {
            let set  = art.getSetName();
            let slot = art.getSlot();

            if (!slotData[set]) {
                slotData[set] = {};
            }

            slotData[set][slot] = 1;
        }

        for (const setName of Object.keys(slotData)) {
            let pieces = Object.keys(slotData[setName]).length;
            let conds = DB.Artifacts.Sets.get(setName).getConditionsByPieces(pieces);

            let valueble = [];
            let updateCond = false;

            for (let i in conds) {
                if (i <= pieces && conds[i].length) {
                    valueble.push(i);

                    let settingName = setName +'-'+ i;
                    if (this.state.settings.sets[settingName] === undefined) {
                        this.state.settings.sets[settingName] = true;
                        updateCond = true;

                    }
                }
            }

            let activeConds = [];
            for (let i in conds) {
                for (let cond of conds[i]) {
                    if (cond && cond.isSerializable()) {
                        activeConds.push(cond)
                    }
                }
            }

            if (updateCond) {
                let localSettings = Condition.allConditionsOn(activeConds);
                this.state.settings.sets_settings = Object.assign({}, localSettings, this.state.settings.sets_settings);
            }

            if (valueble.length) {
                result[setName] = {
                    pieces: valueble,
                    conditions: activeConds,
                };
            }
        }

        return result;
    }

    suggestCompleteCallback(data) {
        let results = [];

        UI.Layout.unlockClosing();
        this.progressModal.hide();

        for (let item of data) {
            let build = UI.Layout.app.currentSet().clone();
            for (let art of item.artifacts) {
                build.setArtifact(art);
            }
            build.setArtifactsSettings(Object.assign({}, this.state.settings.sets_settings));
            build.artifacts.removeInvalidSettings();
            results.push(build);
        }

        this.setState({
            view: 'result',
            result: {
                feature: this.state.feature,
                items: results,
            },
        });
    }

    suggestProgressCallback(data) {
        this.progressModal.updateProgress(data);
    }

    suggestTerminateCallback() {
        UI.Layout.unlockClosing();
    }

    suggestStartCallback(data) {
        UI.Layout.lockClosing();

        this.progressModal.show({
            threads: data.workers,
            closeCallback: () => {
                this.progressModal.hide();
                this.factory.terminate();
            },
        });
    }

    getFilteredArtifacts() {
        return this.filteredArtifacts;
    }

    getSettings() {
        return this.state.settings;
    }

    startSuggest() {
        this.factory.run({
            artifacts: this.filteredArtifacts,
            settings: this.state.settings,
            feature: this.state.feature,
            featureType: this.state.featureType,
            calcset: UI.Layout.app.currentSet(),
            maxThreads: this.state.maxThreads,
            fastFilter: this.state.artifactFilter,
        });
    }

    showDefault() {
        this.setState({view: ''});
    }

    showResults() {
        this.setState({view: 'result'});
    }

    render() {
        return (
            <ReactTab
                title={this.strings.title}
                backButton={this.state.view}
                backButtonCallback={() => this.showDefault()}
            >
                {this.tabContent()}
                <SuggestProgressModal
                    ref={obj => this.progressModal = obj}
                />
            </ReactTab>
        );
    }

    tabContent() {
        if (this.state.view == 'result') {
            return (
                <SuggestResult
                    result={this.state.result}
                    savedHashes={this.savedHashes()}
                    onApply={(set) => this.handleApplyResult(set)}
                    onCompare={(set) => this.handleCompareResult(set)}
                    onFeatureSelect={() => this.handleFeaturesSelect()}
                    otherFeatures={this.state.otherFeatures}
                    displayMode={this.state.displayMode}
                    onDisplayModeChange={(mode) => this.handleDisplayMode(mode)}
                    onLock={(art, locked) => this.handleArtifactLock(art, locked)}
                />
            );
        }

        this.filterArtifacts();

        if (this.artifacts.length == 0) {
            return (
                <div className="tab-message">{parse(this.strings.no_artifacts)}</div>
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
                    <GroupBox addClass="artifact-stats">
                        <div className="line">
                            <div className="value">{this.counts.total}</div>
                            <div className="title">{this.strings.total_arts}</div>
                        </div>
                        <div className="line">
                            <div className="value">{this.counts.locked}</div>
                            <div className="title">{this.strings.total_locked}</div>
                        </div>
                        <div className="line">
                            <div className="value">{this.counts.filtered}</div>
                            <div className="title">{this.strings.total_filtered}</div>
                        </div>
                        <div className="line">
                            <div className="value">{this.counts.used}</div>
                            <div className="title">{this.strings.total_used}</div>
                        </div>
                        <div className="line">
                            <div className="value">{this.counts.combinations}</div>
                            <div className="title">{this.strings.total_combinations}</div>
                        </div>
                        <div className="line">
                            <div className="value">{UI.Lang.get('artifacts_ui.max_threads')}</div>
                            <div className="title">
                                <NumberInput
                                    addClass="inputs-2digit"
                                    value={this.state.maxThreads}
                                    onChange={(value) => this.handleMaxThreads(value)}
                                    minValue={MIN_THREADS}
                                    maxValue={MAX_THREADS}
                                    showButtons={true}
                                />
                            </div>
                        </div>
                        {/* <div className="line">
                            <div className="value right">
                                <Checkbox
                                    checked={this.state.artifactFilter}
                                    onChange={(checked) => this.setState({artifactFilter: checked})}
                                />
                            </div>
                            <div className="title">{UI.Lang.get('artifacts_ui.suggest_filter_artifacts')}</div>
                        </div> */}
                        <TitledButton
                            icon="icon-ok"
                            title={this.strings.start}
                            onClick={() => this.startSuggest()}
                            disabled={this.counts.used == 0}
                        />
                        {
                            this.state.result.items.length ?
                                <TitledButton
                                icon="icon-ok"
                                title={this.strings.show_results}
                                onClick={() => this.showResults()}
                            /> : ''
                        }
                        <TitledButton
                            icon="icon-lock"
                            title={this.strings.lock_window}
                            onClick={() => this.handleLockWindowOpen()}
                        />
                    </GroupBox>
                </FullHeightStatic>
                <FullHeightScrollable>
                    <Accordion>
                        <AccordionItem id="stats" title={this.strings.item_stats}>
                            <AccordionSuggesterStats
                                values={this.state.settings.stats}
                                onChange={(stat, value) => this.handleStatSetting(stat, value)}
                            />
                        </AccordionItem>
                        <AccordionItem id="filter" title={ this.strings.item_filter }>
                            <AccordionStatFilter
                                settings={ this.state.settings.filter }
                                onLevelChange={ (min, max) => this.handleFilterLevel(min, max) }
                                onStatChange={ (slot, stat, checked, keys) => this.handleStatFilter(slot, stat, checked, keys) }
                                autoStats={ () => this.handleAutoStatFilter() }
                                enableAllFilter={ () => this.handleStatAllFilter() }
                            />
                        </AccordionItem>
                        <AccordionItem id="groups" title={this.strings.item_groups}>
                            <AccordionArtifactGroups
                                items={this.dataArtifactGroups()}
                                values={this.state.settings.groups}
                                onChange={(name, value, keys) => this.handleGroupSetting(name, value, keys)}
                            />
                        </AccordionItem>
                        <AccordionItem id="slots" title={this.strings.item_slots}>
                            <AccordionArtifactSlots
                                items={this.dataArtifactSlots()}
                                values={this.state.settings.slots}
                                onChange={(name, value, keys) => this.handleSlotSetting(name, value, keys)}
                            />
                        </AccordionItem>
                        <AccordionItem id="required_sets" title={this.strings.item_required_sets}>
                            <AccordionRequredSets
                                set1={this.state.settings.required_sets.set1}
                                set2={this.state.settings.required_sets.set2}
                                onChange={(slot, name) => this.handleRequiredSets(slot, name)}
                                onReset={() => this.handleRequiredSetsReset()}
                            />
                        </AccordionItem>
                        <AccordionItem id="sets" title={this.strings.item_sets}>
                            <AccordionSetBonuses
                                sets={this.listSets()}
                                settings={this.state.settings.sets}
                                setsSettings={this.state.settings.sets_settings}
                                onChange={(param, value) => this.handleSetBonuses(param, value)}
                                onSettingChange={(param, value) => this.handleSetBonusesSettings(param, value)}
                                enableAction={() => this.handleSetBonusesEnable()}
                                disableAction={() => this.handleSetBonusesDisable()}
                            />
                        </AccordionItem>
                    </Accordion>
                </FullHeightScrollable>
            </FullHeight>
        );
    }
}

function validateStatValue(value) {
    value = '' + value;
    value = value.replace(',', '.');
    value = value.replace(/[^\d\.]/, '');
    value = value.replace(/^(\d+(?:\.\d*)?).*$/, '$1');
    if (value.length > 9) {
        value = value.substring(0, 9);
    }
    return value || '';
}

function calcCombinations(items) {
    let countBySlot = {
        flower: 0,
        plume: 0,
        sands: 0,
        goblet: 0,
        circlet: 0,
    };

    if (items.length == 0) {
        return 0;
    }

    for (let art of items) {
        countBySlot[art.getSlot()]++;
    }

    let result = 1;
    for (let slot of Object.keys(countBySlot)) {
        result *= countBySlot[slot] || 1;
    }
    return formatNumber(result);
}
