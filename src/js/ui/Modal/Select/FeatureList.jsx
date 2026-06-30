import React from "react";

import "../../../../css/Components/Modal/Select/FeatureList.css"

import { Checkbox } from "../../Components/Inputs/Input";
import { ControlsBar, ControlsBarDivider } from "../../Components/ControlsBar";
import { DialogContainer } from "../../Components/Dialog/Container";
import { Feature2 } from "../../../classes/Feature2";
import { FullHeight, FullHeightScrollable, FullHeightStatic } from "../../Components/FullHeight";
import { Modal } from "../../Modal";
import { TitledButton } from "../../Components/Inputs/Buttons";
import { UI } from "../../../ui";

export class SelectFeatureListModal extends Modal {
    createContent() {
        return (
            <FeatureListComponent
                ref={(obj) => this.modal = obj}
                addClass="feature-list-modal"
            />
        );
    }
}

class FeatureListComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
            selectedNames: [],
        };
    }

    show(callback, selectedNames) {
        this.callback = callback;

        this.setState({
            selectedNames: selectedNames,
            isVisible: true,
        });
    }

    handleConfirm() {
        if (this.callback) {
            this.callback([].concat(this.state.selectedNames));
        }
        this.handleClose();
    }

    handleReset() {
        if (this.callback) {
            this.callback([]);
        }
        this.handleClose();
    }

    handleClose() {
        this.setState({isVisible: false});
    }

    handleSelectName(name) {
        let names = this.state.selectedNames;

        if (names.includes(name)) {
            var index = names.indexOf(name);
            if (index !== -1) {
                names.splice(index, 1);
            }
        } else {
            names.push(name);
        }

        this.setState({selectedNames: names});
    }

    render() {
        return (
            <DialogContainer
                addClass={this.props.addClass}
                width={510}
                isVisible={this.state.isVisible}
                title={UI.Lang.get('modal_window.select_feature_list')}
                closeCallback={() => this.handleClose()}
            >
                <FullHeight>
                    <FullHeightScrollable>
                        <FeatureList
                            selectedNames={this.state.selectedNames}
                            onChange={(name) => this.handleSelectName(name)}
                        />
                    </FullHeightScrollable>
                    <FullHeightStatic>
                        <div className="gi-hr" />
                        <ControlsBar>
                            <TitledButton
                                icon="button-icon-delete"
                                title={UI.Lang.get('modal_buttons.reset')}
                                onClick={() => this.handleReset()}
                            />
                            <ControlsBarDivider />
                            <TitledButton
                                icon="button-icon-ok"
                                title={UI.Lang.get('modal_buttons.confirm')}
                                onClick={() => this.handleConfirm()}
                            />
                            <TitledButton
                                icon="button-icon-cancel"
                                title={UI.Lang.get('modal_buttons.cancel')}
                                onClick={() => this.handleClose()}
                            />
                        </ControlsBar>
                    </FullHeightStatic>
                </FullHeight>
            </DialogContainer>
        );
    }
}

function FeatureList(props) {
    let stats    = UI.Layout.app.getStats();
    let features = UI.Layout.app.getFeatures(stats, 1);
    let tree     = Feature2.getTree(features);

    let selected = {};
    let rendered = {};

    for (let item of props.selectedNames) {
        let section = item.split('.')[0];
        if (!selected[section]) {
            selected[section] = [];
        }

        selected[section].push(item);
    }

    let sections = [];
    for (let section of Object.keys(tree)) {
        let items = []

        for (let name of Object.keys(tree[section])) {
            let featName = section +'.'+ name;
            let feature = tree[section][name];
            if (feature.hidden) {
                continue;
            }

            let str = 'feature_'+ feature.name;

            items.push(
                <Checkbox
                    key={featName}
                    title={UI.Lang.get(str)}
                    checked={props.selectedNames.includes(featName)}
                    onChange={() => props.onChange(featName)}
                />
            );
            rendered[featName] = 1;
        }

        if (selected[section]) {
            for (let featName of selected[section]) {
                if (!rendered[featName]) {
                    items.push(
                        <Checkbox
                            key={featName}
                            title={UI.Lang.get('feature_'+ featName)}
                            checked={props.selectedNames.includes(featName)}
                            onChange={() => props.onChange(featName)}
                        />
                    );
                }
            }
        }

        sections.push(
            <div key={section} className="feature-select-section">
                <div className="feature-select-caption">{UI.Lang.get('feature_section.'+ section)}</div>
                <div className="feature-select-items">{items}</div>
            </div>
        );
    }

    return sections;
}
