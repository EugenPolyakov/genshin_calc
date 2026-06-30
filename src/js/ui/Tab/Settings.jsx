import React from 'react';
import parse from 'html-react-parser';
import "../../../css/Components/Tab/Settings.css"

import { FullHeight, FullHeightScrollable } from '../Components/FullHeight';
import { ReactTab } from '../Components/Tab';
import { Tab } from "../Tab";
import { Accordion, AccordionItem } from '../Components/Accordion';
import { GroupBox } from '../Components/Inputs/GroupBox';
import { TitledButton } from '../Components/Inputs/Buttons';
import { Checkbox, CheckboxList, FileInput } from '../Components/Inputs/Input';
import { Backup } from '../classes/Backup';
import { ImporterGood } from '../../classes/Importer/Good';
import * as FileSaver from 'file-saver';
import { UI } from '../../ui';

export class SettingsTab extends Tab {
    constructor(params) {
        super(params);

        this.id = 'settings';
        this.rightRab = true;
    }

    refresh() {
        if (!this.component) {
            return;
        }

        this.component.setState({
            needRefreshBuilds: true,
        });
    }

    createContent() {
        return (
            <SettingsView
                ref={element => { this.component = element }}
                title={this.title}
            />
        );
    }
}

export class SettingsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            create_backup: {
                saveChars: true,
                saveArts: true,
                saveRotations: true,
            },
            load_backup: {
                addChars: false,
                addArts: false,
                addRotations: false,
            },
        };

        this.file = null;
    }

    refresh() {
        this.setState(this.state);
    }

    handleCreateBackupFlag(name, value) {
        let vals = this.state.create_backup;
        vals[name] = value;
        this.setState({create_backup: vals});
    }

    handleLoadBackupFlag(name, value) {
        let vals = this.state.load_backup;
        vals[name] = value;
        this.setState({load_backup: vals});
    }

    handleCreateBackup() {
        let data = UI.Layout.app.storage.createBackup(this.state.create_backup);
        FileSaver.saveAs(data.toBlob(), 'backup.json');
    }

    handleSelectFile(e) {
        this.file = e.target.files[0];
    }

    handleLoadBackup() {
        if (!this.file) {
            return;
        }

        let reader = new FileReader();
        reader.readAsText(this.file);

        reader.onload = () => {
            let backup = Backup.fromString(reader.result);
            let opts = this.state.load_backup;

            if (UI.Layout.app.storage.loadBackup(backup, opts)) {
                UI.WindowMessage.show('settings_view.success', 'settings_view.success_text');
                UI.Layout.app.refresh();
            } else {
                this.backupError();
            }
        };

        reader.onerror = () => {this.backupError()};
    }

    backupError() {
        UI.WindowMessage.show('settings_view.error', 'settings_view.error_text');
    }

    handleSyncEnable() {
        UI.Layout.app.enableSync();
        this.refresh();
    }

    handleSyncDisable(del_files) {
        if (del_files) {
            UI.ConfirmWindow.show('modal.confirm', 'sync.delete_confirm', () => {
                UI.Layout.app.disableSync(true);
                this.refresh();
            });
        } else {
            UI.Layout.app.disableSync();
            this.refresh();
        }
    }

    handleGoodImport() {
        UI.WindowGood.show();
    }

    handleGoodExport() {
        let data = ImporterGood.export(UI.Layout.app.storage.artifacts.listArtifacts());
        let blob = new Blob([JSON.stringify(data)], {type: "application/json;charset=utf-8"});
        FileSaver.saveAs(blob, 'artifacts_GOOD.json');
    }

    handleToggleBetaContent(value) {
        UI.Layout.app.setSetting('show_beta_content', value ? 1 : 0)
        this.refresh();
    }

    render() {
        this.beta_content = UI.Layout.app.showBetaContent();

        return (
            <ReactTab title={UI.Lang.get('tab_header.settings_view')}>
                <FullHeight>
                    <FullHeightScrollable>
                        <Accordion>
                            <AccordionItem id="backup" title={UI.Lang.get('settings_view.backup')}>
                                <GroupBox title={UI.Lang.get('settings_view.create_backup')}>
                                    <CheckboxList
                                        onChange={(name, value) => this.handleCreateBackupFlag(name, value)}
                                        items={[
                                            {
                                                name: 'saveChars',
                                                title: UI.Lang.get('settings_view.create_backup_chars'),
                                                checked: this.state.create_backup.saveChars,
                                            },
                                            {
                                                name: 'saveArts',
                                                title: UI.Lang.get('settings_view.create_backup_artifacts'),
                                                checked: this.state.create_backup.saveArts,
                                            },
                                            {
                                                name: 'saveRotations',
                                                title: UI.Lang.get('settings_view.create_backup_rotations'),
                                                checked: this.state.create_backup.saveRotations,
                                            },
                                        ]}
                                    />
                                    <TitledButton
                                        icon='icon-ok'
                                        title={UI.Lang.get('settings_view.create_backup_button')}
                                        onClick={() => this.handleCreateBackup()}
                                    />
                                </GroupBox>

                                <GroupBox addClass="description" title={UI.Lang.get('settings_view.load_backup')}>
                                    <div>{UI.Lang.get('settings_view.restore_title')}</div>
                                    <CheckboxList
                                        onChange={(name, value) => this.handleLoadBackupFlag(name, value)}
                                        items={[
                                            {
                                                name: 'addChars',
                                                title: UI.Lang.get('settings_view.restore_chars'),
                                                checked: this.state.load_backup.addChars,
                                            },
                                            {
                                                name: 'addArts',
                                                title: UI.Lang.get('settings_view.restore_artifacts'),
                                                checked: this.state.load_backup.addArts,
                                            },
                                            {
                                                name: 'addRotations',
                                                title: UI.Lang.get('settings_view.restore_rotations'),
                                                checked: this.state.load_backup.addRotations,
                                            },
                                        ]}
                                    />
                                    <FileInput
                                        onChange={(e) => this.handleSelectFile(e)}
                                    />
                                    <TitledButton
                                        icon='icon-ok'
                                        title={UI.Lang.get('settings_view.load_backup_button')}
                                        onClick={() => this.handleLoadBackup()}
                                    />
                                </GroupBox>

                                <GroupBox addClass="description" title={UI.Lang.get('sync.settings_title')}>
                                    {parse(UI.Lang.get('sync.settings_text'))}
                                    <GoogleButtons
                                        handleSyncDisable={(val) => this.handleSyncDisable(val)}
                                        handleSyncEnable={() => this.handleSyncEnable()}
                                    />
                                </GroupBox>
                            </AccordionItem>
                            <AccordionItem id="good" title={UI.Lang.get('good_import.title')}>
                                {parse(UI.Lang.get('good_import.disclaimer'))}
                                <TitledButton
                                    icon='icon-ok'
                                    title={UI.Lang.get('good_import.open_window')}
                                    onClick={() => this.handleGoodImport()}
                                />
                                <TitledButton
                                    icon='icon-ok'
                                    title={UI.Lang.get('good_import.export')}
                                    onClick={() => this.handleGoodExport(true)}
                                />
                            </AccordionItem>
                            <AccordionItem id="beta" title={UI.Lang.get('settings_view.beta')}>
                                <Checkbox
                                    title={UI.Lang.get('settings_view.show_beta')}
                                    checked={this.beta_content}
                                    onChange={(value) => this.handleToggleBetaContent(value)}
                                />
                            </AccordionItem>
                        </Accordion>
                    </FullHeightScrollable>
                </FullHeight>
            </ReactTab>
        );
    }
}

function GoogleButtons(props) {
    if (!UI.Layout.app.storage.sync.isScriptsLoaded()) {
        return (
            <div className="beta-warning">
                {parse(UI.Lang.get('sync.api_fail'))}
            </div>
        );
    }

    if (UI.Layout.app.getSetting('storage_sync_enabled')) {
        return (<>
            <TitledButton
                icon='icon-cancel'
                title={UI.Lang.get('sync.settings_disable')}
                onClick={() => props.handleSyncDisable()}
            />
            <TitledButton
                icon='icon-delete'
                title={UI.Lang.get('sync.settings_disable_delete')}
                onClick={() => props.handleSyncDisable(true)}
            />
        </>);
    } else {
        return (
            <TitledButton
                icon='icon-ok'
                title={UI.Lang.get('sync.settings_enable')}
                onClick={() => props.handleSyncEnable()}
            />
        );
    }
}
