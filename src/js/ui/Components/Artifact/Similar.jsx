import React from "react";

import { UI } from "../../../ui";
import { ArtifactListItem } from "../Artifact";

export class ArtifactListItemSimilar extends ArtifactListItem {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.hash != nextProps.hash
            || this.props.locked != nextProps.locked
            || this.props.equipped != nextProps.equipped
            || this.props.charIcons != nextProps.charIcons
            || this.props.selected != nextProps.selected
            || this.props.index != nextProps.index
            || this.props.sample != nextProps.sample
        ;
    }

    isHighlight(stat, value) {
        if (this.props.sample.getMainStat() == stat)
            return this.props.sample.getMainStatValue() > value;
        else
            return this.props.sample.getSubStatValue(stat) > value;
    }

    getButtons() {
        let id = 'storage_index_' + this.props.index;
        return (
            <div className="gi-radio-wrapper">
                <input className="gi-radio" type="radio" id={ id } name="storage_index" value={ this.props.index } checked={ !!this.props.selected } onChange={ this.props.onChange } />
                <label htmlFor={ id }><span className="span-label">{ UI.Lang.get('scanner.use_similar') }</span></label>
            </div>
        );
    }
}

