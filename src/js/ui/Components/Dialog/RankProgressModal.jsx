import React from "react";
import "../../../../css/Components/Dialog/SuggestProgressModal.css"

import { DialogContainer } from "./Container";
import { ProgressBar } from "../ProgressBar";
import { ControlsBar, ControlsBarDivider } from "../ControlsBar";
import { TitledButton } from "../Inputs/Buttons";
import { UI } from "../../../ui";

export class RankProgressModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            total: 0,
            isVisible: false,
        };
    }

    show(data) {
        this.closeCallback = data.closeCallback;

        this.setState({
            count: 0,
            total: 0,
            isVisible: true,
            started: performance.now(),
        });
    }

    hide() {
        this.setState({isVisible: false});
    }

    handleClose() {
        this.closeCallback();
        this.hide();
    }

    updateProgress(data) {
        this.setState({
            count: data.completed || 0,
            total: data.total || 0,
        });
    }

    render() {
        return (
            <DialogContainer
                addClass="artifact-progress-modal"
                width={500}
                isVisible={this.state.isVisible}
                title={UI.Lang.get('modal_window.suggest_artifact')}
            >
                <ProgressBar count={this.state.count} total={this.state.total} />
                <ElapsedTime started={this.state.started} />

                <ControlsBar>
                    <ControlsBarDivider />
                    <TitledButton
                        icon="icon-cancel"
                        title={UI.Lang.get('modal_buttons.cancel')}
                        onClick={() => this.handleClose()}
                    />
                </ControlsBar>
            </DialogContainer>
        );
    }
}


function ElapsedTime(props) {
    return (
        <div className="info-line">
            <span className="rem">{UI.Lang.get('artifacts_suggest.elapsed_time')}</span> {formatSeconds(performance.now() - props.started)}
        </div>
    );
}

function formatSeconds(sec) {
    sec = Math.floor(sec / 1000) || 0;
    let parts = [];

    while (sec >= 60) {
        let number = sec % 60;
        sec = Math.floor(sec / 60);

        parts.push(number);
    }

    parts.push(sec);
    parts = parts.reverse();

    while (parts.length < 2) {
        parts.unshift(0);
    }

    return parts.map((i) => {return String(i).padStart(2, '0')}).join(':');
}
