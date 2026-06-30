import React from "react";
import parse from 'html-react-parser';

import { NonAppModal } from "../Modal";
import { DialogContainer } from "../Components/Dialog/Container";
import { ControlsBar, ControlsBarDivider } from "../Components/ControlsBar";
import { TitledButton } from "../Components/Inputs/Buttons";
import { UI } from "../../ui";

export class MessageModal extends NonAppModal {
    createContent() {
        return (
            <MessageComponent
                ref={(obj) => this.modal = obj}
            />
        )
    }
}

export class MessageComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
        };
    }

    show(title, message, callback) {
        this.callback = callback;

        this.setState({
            title: title,
            message: message,
            isVisible: true,
        });
    }

    handleConfirm() {
        if (this.callback) {
            this.callback();
        }
        this.handleClose();
    }

    handleClose() {
        this.setState({isVisible: false});
    }

    render() {
        return (
            <DialogContainer
                addClass="gi-window-confirm"
                width={510}
                isVisible={this.state.isVisible}
                title={UI.Lang.get(this.state.title)}
                closeCallback={() => this.handleClose()}
            >
                <div>{parse(UI.Lang.get(this.state.message))}</div>
                <div className="gi-hr" />
                <ControlsBar>
                    <ControlsBarDivider />
                    <TitledButton
                        icon="button-icon-ok"
                        title={UI.Lang.get('modal_buttons.confirm')}
                        onClick={() => this.handleConfirm()}
                    />
                </ControlsBar>
            </DialogContainer>
        );
    }
}
