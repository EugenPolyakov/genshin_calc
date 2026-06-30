import React from 'react';

import "../../../css/Components/Tab/Rotation.css"

import { ReactTab } from '../Components/Tab';
import { Tab } from "../Tab";
import { RotationEditor } from '../Components/Rotation/Editor';
import { UI } from '../../ui';

export class RotationTab extends Tab {
    constructor(params) {
        super(params);

        this.id = 'rotation';
        this.rightRab = true;
        this.title = 'tab_header.rotation';
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
            <RotationView
                ref={element => { this.component = element }}
                title={this.title}
            />
        )
    }
}

export class RotationView extends React.Component {
    constructor(props) {
        super(props);

        this.strings = {
            title: UI.Lang.get(this.props.title),
        };
    }

    handleRotationChange(rotation) {
        UI.Layout.app.setRotation(rotation);
        UI.Layout.app.refresh({objects: ['build']});
    }

    render() {
        return (
            <ReactTab title={this.strings.title}>
                <RotationEditor
                    build={UI.Layout.app.currentSet()}
                    storage={UI.Layout.app.storage.rotation}
                    onRotationChange={(rotation) => this.handleRotationChange(rotation)}
                />
            </ReactTab>
        );
    }
}
