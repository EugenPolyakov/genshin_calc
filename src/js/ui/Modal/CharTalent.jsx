import React from "react";
import parse from 'html-react-parser';

import "../../../css/modal/CharTalent.css"
import "../../../css/ui/Widget/TalentTable.css"

import { DialogContainer } from "../Components/Dialog/Container";
import { Modal } from "../Modal";
import { BetaWarning } from "../Components/TextBlocks";
import { GroupBox } from "../Components/Inputs/GroupBox";
import { FullHeight, FullHeightScrollable } from "../Components/FullHeight";
import { DB } from "../../db/DB";
import { UI } from "../../ui";
import { StickyTableBlock, StickyTableHeader } from "../Components/ScrolledTable";

const maxLevels = {
    attack: 15,
    skill: 15,
    burst: 15,
    other: 0,
};

export class CharTalentModal extends Modal {
    createContent() {
        return (
            <CharTalentComponent
                ref={(obj) => this.modal = obj}
                storage={this.app.storage.char}
                artifactStorage={this.app.storage.artifacts}
                addClass="lockartifacts-select-modal"
            />
        );
    }
}

export class CharTalentComponent extends React.Component {
    constructor(props) {
        super(props);

        this.tabs = [];
        this.links = [];
        this.state = {
            isVisible: false,
        };
    }

    show(name, charId) {
        this.loadChar(charId);
        this.setState({
            isVisible: true,
            name: name,
        });
    }

    loadChar(charId) {
        let prevCharId = this.char ? this.char.getId() : 0;
        if (prevCharId == charId) { return }

        if (charId) {
            this.char = DB.Chars.getById(charId);
        } else {
            this.char = UI.Layout.app.getChar().get();
        }

        this.tabs = [];
        this.links = [];

        if (!this.char) {
            return
        }

        for (let category of ['attack', 'skill', 'burst', 'other']) {
            let cData = this.char.getTalentTable(category);
            if (!cData) continue;

            this.tabs.push({
                name: category,
                title: UI.Lang.get(cData.title),
                descr() {
                    return UI.Lang.getTalent(this.data.getDescription ? this.data.getDescription(UI.Layout.app.current.getAllSettings({})) : this.data.description);
                },
                data: cData,
            });
        }

        let links = this.char.getTalentTable('links');
        if (Array.isArray(links)) {
            for (const link_id of links) {
                let category = 'n' + link_id;
                this.links.push({
                    name: category,
                    title: UI.Lang.get('talent_name.'+ category),
                    descr() {
                        return UI.Lang.getTalent('talent_descr.' + this.name);
                    },
                });
            }
        }
    }

    handleClose() {
        this.setState({isVisible: false});
    }

    handleTabChange(name) {
        this.setState({name: name});
    }

    render() {
        return (
            <DialogContainer
                addClass="gi-window-talent"
                width={1000}
                isVisible={this.state.isVisible}
                maxHeight={true}
                title={ (this.char ? UI.Lang.get(this.char.getName()) + ': ' : '') + UI.Lang.get('char_talent.caption') }
                closeCallback={() => this.handleClose()}
                data-char={ this.char ? this.char.getId() : "" }
            >
                <div className="gi-window-talent-content">
                    <div>
                        <SkillNameTabs
                            active={this.state.name}
                            items={this.tabs}
                            onTabChange={(name) => this.handleTabChange(name)}
                        />
                        <SkillNameTabs
                            active={this.state.name}
                            items={this.links}
                            small={true}
                            onTabChange={(name) => this.handleTabChange(name)}
                        />
                        {this.char && this.char.isBeta() ? <BetaWarning /> : ''}
                    </div>
                    <div>
                        <SkillDescription active={this.state.name} items={[...this.tabs, ...this.links]} />
                    </div>
                </div>
            </DialogContainer>
        );
    }
}

function SkillNameTabs(props) {
    let items = [];

    for (let item of props.items) {
        let classes = ['gi-talent-title'];
        if (props.small) { classes.push('small') }
        if (item.name == props.active) { classes.push('active') }

        items.push(
            <div key={item.name} className={classes.join(' ')} onClick={() => props.onTabChange(item.name)}>
                {item.title}
            </div>
        );
    }

    return (
        <div className="gi-talent-wrapper">
            {items}
        </div>
    );
}

function SkillDescription(props) {
    let active = props.items.filter((i) => { return i.name == props.active })[0];
    if (!active) { return '' }

    return (
        <GroupBox addClass="gi-talent-description">
            <FullHeight>
                <FullHeightScrollable>
                    { parse(active.descr()) }
                </FullHeightScrollable>
            </FullHeight>
            <FullHeight>
                <FullHeightScrollable>
                    <TalentTable item={ active } />
                </FullHeightScrollable>
            </FullHeight>
        </GroupBox>
    );
}

function TalentTable(props) {
    if (!props.item.data) { return '' }

    let items = props.item.data.items;
    let max = props.item.data.maxLevel || maxLevels[props.item.name];

    let captionItems = [];
    let lineItems = [];

    for (let i = 1; i <= max; ++i) {
        captionItems.push(
            <th key={ i }>
                <span className="gi-foreground-text">{UI.Lang.get('char_talent.level')}</span>
                {i}
            </th>
        );
    }

    let settings = UI.Layout.app.current.getAllSettings({});

    for (let item of items) {
        if (item.isHidden && item.isHidden(settings))
            continue;

        let first = Array.isArray(item.table) ? item.table[0] : item.table;
        let talent = item.name || first.getName();
        let type = item.type || '';
        let unit = '%';
        let title = UI.Lang.get('feature_'+ props.item.name +'.'+ talent);
        let formatOpts = {
            digits: item.digits,
            integer : item.integer,
        };

        if (item.unit !== undefined) {
            if (item.unit) {
                unit = UI.Lang.get('char_talent.unit_'+ item.unit);
            } else {
                unit = '';
            }
        }

        let cols = [];

        for (let i = 1; i <= max; ++i) {
            if (type == 'multihit') {
                let hits = item.hits || 1;
                cols.push(
                    <td key={ i }>
                        {formatValue(first.getValue(i), formatOpts)}
                        <span className="gi-foreground-text">{unit} *&nbsp;{hits}</span>
                    </td>
                );
            } else if (type == 'multihit_sum') {
                let hits = item.hits || 1;
                let values = [];

                for (let j = 1; j <= hits; ++j) {
                    values.push(formatValue(first.getValue(i), formatOpts));
                    values.push(<span key={'val'+j} className="gi-foreground-text">{unit}</span>);

                    if (j < hits) {
                        values.push(
                            <span key={'sep'+j} className="gi-foreground-text"> + </span>
                        );
                    }
                }

                cols.push(
                    <td key={ i }>
                        {values}
                    </td>
                );
            } else if (type == 'hits') {
                let values = [];

                let tables = Array.isArray(item.table) ? item.table : [item.table];
                let isFirst = true;
                for (const t of tables) {
                    if (!isFirst) {
                        values.push(<span key={'sep' + values.length} className="gi-foreground-text"> + </span>);
                    }

                    values.push(formatValue(t.getValue(i), formatOpts));

                    if (unit) {
                        values.push(<span key={'sep' + values.length} className="gi-foreground-text">{unit}</span>);
                    }

                    isFirst = false;
                }

                cols.push(
                    <td key={ i }>
                        {values}
                    </td>
                );
            } else if (type == 'shield') {
                let second = item.table[1];

                cols.push(
                    <td key={ i }>
                        {formatValue(first.getValue(i), formatOpts)}
                        <span className="gi-foreground-text">{unit} </span>
                        +{Math.round(second.getValue(i))}
                    </td>
                );
            } else if (type == 'separated') {
                let tables = Array.isArray(item.table) ? item.table : [item.table];
                let counts = item.counts || [];
                let values = [];

                for (let j = 0; j < tables.length; ++j) {
                    let t = tables[j];
                    let hits = counts[j];

                    values.push(formatValue(t.getValue(i), formatOpts));

                    if (unit && !item.unitLast) {
                        values.push(<span key={'sep'+ values.length} className="gi-foreground-text">{unit}</span>);
                    }
                    if (hits) {
                        values.push(<span key={'sep'+ values.length} className="gi-foreground-text">{hits}</span>);
                    }

                    if (j + 1 < tables.length) {
                        if (item.separator) {
                            values.push(<span key={'sep'+ values.length} className="gi-foreground-text">{item.separator}</span>);
                        } else {
                            values.push(<br key={'sep'+ values.length} />);
                        }
                    }
                }

                if (unit && item.unitLast) {
                    values.push(<span key="last" className="gi-foreground-text">{unit}</span>);
                }

                cols.push(
                    <td key={ i }>
                        {values}
                    </td>
                );
            } else if (type == 'multivalue') {
                let tables = Array.isArray(item.table) ? item.table : [item.table];
                let values = [];
                let units = [].concat(item.units);

                for (let j = 0; j < tables.length; ++j) {
                    let t = tables[j];

                    values.push(formatValue(t.getValue(i), formatOpts));
                    let unit = units.shift();

                    values.push(
                        <span key={'sep'+ values.length} className="gi-foreground-text">
                            {unit ? UI.Lang.get('char_talent.unit_'+ unit) : '%'}
                        </span>
                    );

                    if (j + 1 < tables.length) {
                        if (item.separator) {
                            values.push(<span key={'sep'+ values.length} className="gi-foreground-text">{item.separator}</span>);
                        } else {
                            values.push(<br key={'sep'+ values.length} />);
                        }
                    }
                }

                if (unit && item.unitLast) {
                    values.push(<span key="last" className="gi-foreground-text">{unit}</span>);
                }

                if (item.multiplier) {
                    values = (
                        <>
                            ({values}) ×&nbsp; {item.multiplier}
                        </>
                    );
                }

                cols.push(
                    <td key={ i }>
                        {values}
                    </td>
                );
            } else {
                cols.push(
                    <td key={ i }>
                        {formatValue(first.getValue(i), formatOpts)}
                        <span className="gi-foreground-text">{unit}</span>
                    </td>
                );
            }
        }

        lineItems.push(
            <tr>
                <td>{title}</td>
                {cols}
            </tr>
        );
    }

    return (
        <StickyTableBlock addClass="gi-talent-table">
            <StickyTableHeader>
                <tr>
                    <th></th>
                    { captionItems }
                </tr>
            </StickyTableHeader>
            <tbody>
                { lineItems }
            </tbody>
        </StickyTableBlock>
    );
}

function formatValue(value, formatOpts) {
    let result = value;

    if (isFloat(value)) {
        result += 0.00000001;
        if (formatOpts.integer) {
            result = Math.round(result).toLocaleString(UI.Lang.getLocale());
        } else {
            result = result.toLocaleString(UI.Lang.getLocale(), { maximumFractionDigits: formatOpts.digits || 1 });
        }
    }

    return result;
}

function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}
