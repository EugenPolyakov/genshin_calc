import React from 'react';

import "../../../../css/Components/Accordion/StatFilter.css";

import { Checkbox, NumberInput } from '../Inputs/Input';
import { ControlsBar } from '../ControlsBar';
import { TitledButton } from '../Inputs/Buttons';
import { UI } from '../../../ui';

export class AccordionStatFilter extends React.Component {
    render() {
        return (
            <div className="accordion-stat-filter">
                <div className="line">
                    <div className="name">{UI.Lang.get('object_view.level')}</div>
                    <div className="value">
                        <NumberInput
                            addClass="stat-input"
                            minValue={0}
                            maxValue={20}
                            value={this.props.settings.min_level}
                            onChange={(value) => this.props.onLevelChange(value, this.props.settings.max_level)}
                        />
                        <div className="separator">-</div>
                        <NumberInput
                            addClass="stat-input"
                            minValue={0}
                            maxValue={20}
                            value={this.props.settings.max_level}
                            onChange={(value) => this.props.onLevelChange(this.props.settings.min_level, value)}
                        />
                    </div>
                </div>
                <ControlsBar>
                    <TitledButton title={ UI.Lang.get('artifacts_ui.auto_stats') } onClick={this.props.autoStats} icon="icon-ok"/>
                    <TitledButton title={ UI.Lang.get('artifacts_ui.all_stats') } onClick={this.props.enableAllFilter} icon="icon-check"/>
                </ControlsBar>
                <SlotLine
                    slot="sands"
                    settings={this.props.settings.main_stats.sands}
                    onChange={this.props.onStatChange}
                />
                <SlotLine
                    slot="goblet"
                    settings={this.props.settings.main_stats.goblet}
                    onChange={this.props.onStatChange}
                />
                <SlotLine
                    slot="circlet"
                    settings={this.props.settings.main_stats.circlet}
                    onChange={this.props.onStatChange}
                />
                <div className="remark">{UI.Lang.get('artifacts_ui.ctrl_click_info')}</div>
            </div>
        );
    }
}

function SlotLine(props) {
    let items = [];
    for (let stat of Object.keys(props.settings)) {
        items.push(
            <div key={stat} className="stat">
                <Checkbox
                    title={UI.Lang.get('stat.'+ stat)}
                    checked={props.settings[stat]}
                    onChange={(value, keys) => props.onChange(props.slot, stat, value, keys)}
                />
            </div>
        );
    }

    return (
        <div className="slot-line">
            <div className="name">{UI.Lang.get('artifact_set.'+ props.slot)}</div>
            <div className="list">
                {items}
            </div>
        </div>
    )
}
