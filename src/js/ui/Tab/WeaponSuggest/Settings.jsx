import React from "react";

import { ControlsBar, ControlsBarDivider } from "../../Components/ControlsBar";
import { DialogContainer } from "../../Components/Dialog/Container";
import { TitledButton } from "../../Components/Inputs/Buttons";
import { ArtifactGeneratorSettings, cloneSettings, getDefaultSettings } from "../../Components/ArtifactGenerator";
import { Radio } from "../../Components/Inputs/Input";
import { UI } from "../../../ui";

export class WeaponSuggestSettingsModal extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
            settings: getDefaultSettings(),
            artifactMode: false,
        };
    }

    show(data, saveCallback) {
        this.saveCallback = saveCallback;

        this.setState({
            settings: cloneSettings(data.settings),
            artifactMode: data.artifactMode,
            isVisible: true,
        });
    }

    handleSave() {
        if (this.saveCallback) {
            this.saveCallback({
                settings: cloneSettings(this.state.settings),
                artifactMode: this.state.artifactMode,
            });
        }

        this.setState({isVisible: false});
    }

    handleClose() {
        this.setState({isVisible: false});
    }

    handleartifactModeChange(value) {
        this.setState({artifactMode: value});
    }

    handleSettingsChange(data) {
        this.setState({settings: data});
    }

    render() {
        return (
            <DialogContainer
                width={500}
                isVisible={this.state.isVisible}
                title={UI.Lang.get('weapon_suggest.generator_settings')}
                closeCallback={() => this.handleClose()}
            >
                <div className="weapon-suggest-radio">
                    <Radio
                        value={'current'}
                        title={UI.Lang.get('weapon_suggest.use_equipped')}
                        selected={this.state.artifactMode == 'current'}
                        onChange={() => this.handleartifactModeChange('current')}
                    />
                </div>
                <div className="weapon-suggest-radio">
                    <Radio
                        value={'storage'}
                        title={UI.Lang.get('weapon_suggest.use_storage')}
                        selected={this.state.artifactMode == 'storage'}
                        onChange={() => this.handleartifactModeChange('storage')}
                    />
                    <div className="radio-remark">{UI.Lang.get('weapon_suggest.use_storage_remark')}</div>
                </div>
                <div className="weapon-suggest-radio">
                    <Radio
                        value={'generate'}
                        title={UI.Lang.get('weapon_suggest.use_generated')}
                        selected={this.state.artifactMode == 'generate'}
                        onChange={() => this.handleartifactModeChange('generate')}
                    />
                    <div className="radio-remark">{UI.Lang.get('weapon_suggest.use_generated_remark')}</div>
                </div>
                <ArtifactGeneratorSettings
                    settings={this.state.settings}
                    onChange={(data) => this.handleSettingsChange(data)}
                />
                <ControlsBar>
                    <ControlsBarDivider />
                    <TitledButton
                        icon="icon-ok"
                        title={UI.Lang.get('modal_buttons.confirm')}
                        onClick={() => this.handleSave()}
                    />
                    <TitledButton
                        icon="icon-cancel"
                        title={UI.Lang.get('modal_buttons.cancel')}
                        onClick={() => this.handleClose()}
                    />
                </ControlsBar>
            </DialogContainer>
        )
    }
}
