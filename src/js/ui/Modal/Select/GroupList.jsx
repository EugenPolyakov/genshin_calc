import React from "react";

import "../../../../css/Components/Modal/Select/GroupList.css"

import { Checkbox } from "../../Components/Inputs/Input";
import { ControlsBar, ControlsBarDivider } from "../../Components/ControlsBar";
import { DialogContainer } from "../../Components/Dialog/Container";
import { FullHeight, FullHeightScrollable, FullHeightStatic } from "../../Components/FullHeight";
import { Modal } from "../../Modal";
import { MiniButton, TitledButton } from "../../Components/Inputs/Buttons";
import { BlockRemark } from "../../Components/TextBlocks";
import { UI } from "../../../ui";

export class SelectGroupListModal extends Modal {
    createContent() {
        return (
            <GroupListComponent
                ref={(obj) => this.modal = obj}
                addClass="group-list-modal"
            />
        );
    }
}

class GroupListComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
            selectedNames: [],
        };
    }

    show(callback, selectedNames) {
        this.callback = callback;

        if (selectedNames.length == 0) {
            for (let item of UI.Layout.app.storage.artifacts.listGroups()) {
                selectedNames.push(item.value);
            }
        }

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

    handleEditGroup(title) {
        if (title) {
            UI.PromptWindow.show('artifact_group.edit_group_name', title, (newTitle) => {
                UI.Layout.app.storage.artifacts.updateGroup(title + '', newTitle + '');
                this.setState({});
            });
        }
    }

    handleDeleteGroup(title) {
        if (title) {
            UI.ConfirmWindow.show('modal.confirm', 'artifact_group.confirm_delete', () => {
                UI.Layout.app.storage.artifacts.updateGroup(title + '', '');
                this.setState({});
            });
        }
    }

    render() {
        return (
            <DialogContainer
                addClass={this.props.addClass}
                width={510}
                isVisible={this.state.isVisible}
                title={UI.Lang.get('artifact_group.select_list_modal')}
                closeCallback={() => this.handleClose()}
            >
                <FullHeight>
                    <FullHeightScrollable>
                        <GroupList
                            selectedNames={this.state.selectedNames}
                            onChange={(name) => this.handleSelectName(name)}
                            onEdit={(name) => this.handleEditGroup(name)}
                            onDelete={(name) => this.handleDeleteGroup(name)}
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

function GroupList(props) {
    let items = [];

    for (let item of UI.Layout.app.storage.artifacts.listGroups()) {
        items.push(
            <div key={'key-'+ item.value} className="item">
                <Checkbox
                    checked={props.selectedNames.includes(item.value)}
                    onChange={() => props.onChange(item.value)}
                />
                {item.value ? <>
                    <MiniButton
                        icon="edit"
                        onClick={() => props.onEdit(item.value)}
                        tooltip={UI.Lang.get('tooltip.artifact_edit')}
                    />
                    <MiniButton
                        icon="delete"
                        onClick={() => props.onDelete(item.value)}
                        tooltip={UI.Lang.get('tooltip.artifact_delete')}
                    />
                </> : ''}
                <span className="value" onClick={() => props.onChange(item.value)}>{item.title}</span>
                <span className="count" onClick={() => props.onChange(item.value)}>({item.count})</span>
            </div>
        );
    }

    return (
        <div className="art-group-list-items">
            {items}
            <BlockRemark>{UI.Lang.get('artifact_group.add_group_remark')}</BlockRemark>
        </div>
    );
}
