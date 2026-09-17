import React from 'react';
import parse from 'html-react-parser';
import "../../../css/Components/Tab/Features.css"

import { ControlsBar } from '../Components/ControlsBar';
import { Dropdown } from '../Components/Inputs/Dropdown';
import { FeatureViewTree } from './Features/Tree';
import { FullHeight, FullHeightScrollable, FullHeightFooter, FullHeightHeader } from '../Components/FullHeight';
import { Lang } from '../Lang';
import { ReactTab } from '../Components/Tab';
import { Tab } from "../Tab";
import { Feature2 } from '../../classes/Feature2';
import { TitledButton } from '../Components/Inputs/Buttons';
import { BlockRemark } from '../Components/TextBlocks';
import { UI } from '../../ui';
import { FloatTitleBlock, StickyTableBlock, StickyTableHeader } from '../Components/ScrolledTable';
import { formatNumber } from '../Utils';

let lang = new Lang();

const REACTION_ITEMS = [
    {value: '', text: lang.get('feature_reaction.none')},
    {value: 'melt', text: lang.get('feature_reaction.melt')},
    {value: 'vaporize', text: lang.get('feature_reaction.vaporize')},
    {value: 'quicken', text: lang.get('feature_reaction.quicken')},
];

export class FeaturesTab extends Tab {
    constructor(params) {
        super(params);

        this.id = 'features';
        this.rightRab = false;
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
            <FeaturesView
                ref={element => { this.component = element }}
                feature={this.app.getFeature()}
                title={UI.Lang.get('tab_header.features')}
            />
        );
    }
}

class FeaturesView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            view: '',
            feature: props.feature,
            reaction: '',
        };
    }

    getFeaturesDropdown() {
        return Feature2.buildDropdown(UI.Layout.app.currentSet());
    }

    getFeaturesDetailsDropdown() {
        return Feature2.buildDropdown(UI.Layout.app.currentSet(), {
            checkCallback: (f) => {return f.hasDetails()},
        });
    }

    getFeatureItems() {
        let build = UI.Layout.app.currentSet();
        let buildData = build.getBuildData();
        let featuresHash = build.getFeaturesHash(buildData);
        let tree = Feature2.getTree(featuresHash);
        let groups = [];

        for (const section in tree) {
            if (section == 'stats') {
                continue;
            }

            let rows = [];
            let blocks = tree[section];

            for (const block in blocks) {
                let featureName = blocks[block].getName();
                let feature = blocks[block];
                if (!feature || !feature.isActive(buildData)) {
                    continue;
                }

                let display = feature.getDisplaySettings(buildData);

                if (display) {
                    let total = 0;
                    for (let item of display) {
                        let localBuildData = buildData.clone();
                        if (item.settings) {
                            localBuildData.addSettings(item.settings);
                        }

                        if (this.state.reaction) {
                            localBuildData.settings.reaction = this.state.reaction;
                        }

                        let portion = 0;
                        let featureValue = feature.getResult(localBuildData)[featureName];
                        if (item.setTotal) {
                            total = featureValue.average;
                        } else if (item.getTotal && total) {
                            portion = 100 * featureValue.average / total;
                        }

                        rows.push({
                            key: item.subItemId || featureName + (item.title ? '.' + item.title : ''),
                            title: item.title || feature.getTitle(),
                            hits: item.hits,
                            isChild: item.isChild,
                            feature: featureValue,
                            portion: portion,
                            icon: item.icon,
                        });
                    }
                } else {
                    let localBuildData = buildData.clone();

                    if (this.state.reaction) {
                        localBuildData.settings.reaction = this.state.reaction;
                    }

                    let result = feature.getResult(localBuildData);
                    for (let resultName of Object.keys(result)) {
                        rows.push({
                            key: resultName,
                            title: result[resultName].title || resultName,
                            isChild: feature.getIsChild(),
                            hits: feature.getHits(),
                            feature: result[resultName],
                        });
                    }
                }
            }

            if (rows.length > 0) {
                groups.push({
                    name: section,
                    items: rows,
                });
            }

            delete tree[section];
        }

        return groups;
    }

    handleFeature(feature) {
        UI.Layout.app.setFeature(feature);
        this.setState({feature: feature});
    }

    handleReaction(reaction) {
        this.setState({reaction: reaction});
    }

    handleViewChange(name) {
        this.setState({view: name});
    }

    getContentList() {
        let sections = this.getFeatureItems();
        let items = [];

        for (let section of sections) {
            items.push(
               <FeaturesTableBlock key={ section.name } title={ UI.Lang.get('feature_section.' + section.name) } items={section.items} />
            );
        }

        return (
            <>
                <FullHeightHeader>
                    <ControlsBar>
                        <Dropdown
                            key="reaction"
                            barClass="resizable"
                            items={REACTION_ITEMS}
                            selected={this.state.reaction}
                            onChange={(item) => this.handleReaction(item.value)}
                        />
                        <TitledButton
                            icon="icon-ok"
                            title={UI.Lang.get('features_view.details')}
                            onClick={() => this.handleViewChange('detail')}
                        />
                    </ControlsBar>
                </FullHeightHeader>
                <FullHeightScrollable>
                    <StickyTableBlock addClass="features-table">
                        <FeatureTableHeader />
                        { items }
                    </StickyTableBlock>
                </FullHeightScrollable>
                { this.state.reaction ? <FullHeightFooter>
                    <BlockRemark>{parse(UI.Lang.getTalent('features_view.reaction_remark'))}</BlockRemark>
                </FullHeightFooter> : ''}
            </>
        );
    }

    getContentDetail() {
        let build = UI.Layout.app.currentSet();
        let dropdownItems = this.getFeaturesDetailsDropdown();
        let feature = build.getFeatureByName(this.state.feature);
        let selectedFeature = this.state.feature;

        if (!feature.hasDetails()) {
            feature = null;

            for (let i of dropdownItems) {
                if (i.isCaption) continue;

                selectedFeature = i.value;
                feature = build.getFeatureByName(i.value);
                break;
            }
        }

        let item;
        if (feature) {
            item = <FeatureViewTree build={build} feature={feature} reaction={this.state.reaction} />
        }

        return (
            <>
                <FullHeightHeader>
                    <ControlsBar>
                        <Dropdown
                            barClass="resizable"
                            items={dropdownItems}
                            selected={selectedFeature}
                            onChange={(item) => this.handleFeature(item.value)}
                        />
                        <Dropdown
                            key="reaction"
                            barClass="feature-type"
                            items={REACTION_ITEMS}
                            selected={this.state.reaction}
                            onChange={(item) => this.handleReaction(item.value)}
                        />
                    </ControlsBar>
                </FullHeightHeader>
                <FullHeightScrollable>
                    {item}
                </FullHeightScrollable>
            </>
        );
    }

    render() {
        return (
            <ReactTab
                title={this.props.title}
                backButton={this.state.view}
                backButtonCallback={() => this.handleViewChange('')}
            >
                <FullHeight>
                    {this.state.view == 'detail' ? this.getContentDetail() : this.getContentList()}
                </FullHeight>
            </ReactTab>
        );
    }
}

const FEATURE_VALUES = ['normal', 'crit', 'average'];
const FEATURE_HEAL_EMPTY = ['normal', 'crit'];

function FeatureTableHeader(props) {
    return (
        <StickyTableHeader>
            <tr>
                <th colSpan="2"/>
                <th>{ UI.Lang.get('stat_view.normal') }</th>
                <th>{ UI.Lang.get('stat_view.crit') }</th>
                <th>{ UI.Lang.get('stat_view.average') }</th>
            </tr>
        </StickyTableHeader>
    );
}

function FeatureTableValues(props) {
    let items = [];
    let format = props.result ? { format: props.result.format, digits: props.result.digits, no_decimal_zero: true } : null;

    for (let name of FEATURE_VALUES) {
        let value = props.result ? props.result[name] : 0;
        let base = props.base ? props.base[name] : 0;

        if (props.result && props.result.noCritValues && FEATURE_HEAL_EMPTY.includes(name)) {
            base = value = 0;
        }

        items.push(
            <FeatureTableValue
                key={ name }
                value={ value }
                base={ base }
                displayMode={ props.displayMode }
                format={ format }
            />
        )
    }

    return (
        <>{ items }</>
    )
}

function FeatureTableValue(props) {
    let value = '';
    let subValue;
    let addClass = '';
    let format = props.format ? props.format.format : '';

    if (format == 'percent') {
        value = formatNumber(props.value, { percent: true, digits: props.format.digits, no_decimal_zero: 1 });
    } else if (format == 'decimal') {
        value = formatNumber(props.value, { digits: props.format.digits });
    } else {
        value = formatNumber(props.value);
    }

    if (props.base) {
        if (props.displayMode == 'percent') {
            subValue = formatNumber(props.value / props.base * 100, { percent: 1, digits: 1, no_decimal_zero: 1 });
        } else if (props.displayMode == 'absolute') {
            let diff = Math.round(props.value - props.base, 5);
            subValue = formatNumber(diff, { signed: true, minimize: true, zero:'-' });
            addClass = diff > 0 ? ' positive' : (diff < 0 ? ' negative' : '');
        }
    }

    return (
        <td>
            { value }
            { subValue !== undefined ? <div className={ 'remark' + addClass }>{ subValue }</div> : null }
        </td>
    );
}

function FeaturesTableBlock(props) {
    let items = [];
    let index = 0;

    for (let item of props.items) {
        let classes = ['line'];

        if (++index % 2) {
            classes.push('odd');
        }

        let str = 'feature_' + item.title;

        let title = UI.Lang.get(str);

        if (item.isChild) {
            classes.push('optional');
            title = '• '+ title;
        }

        if (item.hits && item.hits > 1) {
            title += ' ('+ item.hits +' '+ UI.Lang.get('feature_attack.hits') +')';
        }

        items.push(
            <tr className={classes.join(' ')} key={item.key }>
                <td>{parse(title) }</td>
                <td className="icon"><div className={'stat-'+ (item.icon || item.feature.icon) } /></td>
                <FeatureTableValues
                    result={item.feature}
                />
                <td>{item.base}</td>
                <td className="green">{item.bonus}</td>
                <td>{item.total}</td>
            </tr>
        );
    }

    return (
        <FloatTitleBlock title={ props.title }>
            {items}
        </FloatTitleBlock>
    );
}
