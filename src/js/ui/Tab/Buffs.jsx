import React from 'react';
import "../../../css/Components/Tab/Buffs.css"
import { Condition } from '../../classes/Condition';
import { Stats } from '../../classes/Stats';

import { Accordion, AccordionItem } from '../Components/Accordion';
import { ConditionList } from '../Components/ConditionList';
import { ControlsBar, ControlsBarDivider } from '../Components/ControlsBar';
import { FullHeight, FullHeightScrollable } from '../Components/FullHeight';
import { TitledButton } from '../Components/Inputs/Buttons';
import { ReactTab } from '../Components/Tab';
import { Tab } from "../Tab";
import { CustomStats } from './Buffs/CustomStats';
import { PartyList } from './Buffs/PartyList';
import { DB } from '../../db/DB';
import { UI } from '../../ui';

export class BuffsTab extends Tab {
    constructor(params) {
        super(params);

        this.id = 'buffs';
        this.rightRab = true;
        this.title = 'tab_header.artifact_pool_suggest';
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
            <Buffs
                ref={element => { this.component = element }}
                title={this.title}
            />
        )
    }
}

export class Buffs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.strings = {
            title: UI.Lang.get('tab_header.buff_view'),
            party: UI.Lang.get('buff_group.elemental_resonance'),
            artifacts: UI.Lang.get('buff_group.artifacts'),
            weapons: UI.Lang.get('buff_group.weapons'),
            custom: UI.Lang.get('buff_group.custom'),
            load_char: UI.Lang.get('buff_view.buff_char_load'),
        };

        this.resonanceConditions = DB.Buffs.get('ElementalResonance').getConditions();
        this.artifactsConditions = DB.Buffs.get('Artifacts').getConditions();
        this.weaponsConditions = DB.Buffs.get('Weapons').getConditions();
    }

    handleSettingChange(name, value) {
        let data = {};
        data[name] = value;
        UI.Layout.app.modifyBuffsSettings(data);
    }

    handlePartyChars(ids) {
        UI.Layout.app.setPartyChars(ids);
    }

    handleCharLoad(charId, data) {
        let char = DB.Chars.getById(charId);

        if (char) {
            UI.PartyLoad.show({
                charId: charId,
                stats: data ? data.stats: null,
                settings: data ? data.settings: null,
                callback: (data) => {
                    UI.Layout.app.modifyBuffsSettings(
                        partyCharSettings(char, data)
                    );
                },
            });
        }
    }

    render() {
        return (
            <ReactTab
                title={this.strings.title}
            >
                {this.tabContent()}
            </ReactTab>
        );
    }

    tabContent() {
        let settings = UI.Layout.app.getStats().settings;

        let charItems = [];
        for (let name of ['party_char_1', 'party_char_2', 'party_char_3']) {
            let char = DB.Chars.getById(settings[name]);
            if (!char) {
                continue;
            }

            let conditions = char.getPartyConditions();
            if (countConditions(conditions) < 1) {
                continue;
            }

            charItems.push(
                <AccordionItem id={'char'+ char.getId()} title={makeTitleWithCount(UI.Lang.get(char.getName()), conditions, settings)}>
                    <ControlsBar>
                        <ControlsBarDivider />
                        <TitledButton
                            icon="icon-ok"
                            title={ this.strings.load_char }
                            onClick={ () => this.handleCharLoad(char.getId(), char.isLoadParty()) }
                        />
                    </ControlsBar>
                    <ConditionList
                        charId={char.getId()}
                        items={conditions}
                        settings={settings}
                        hideInactive={true}
                        onChange={(name, value) => this.handleSettingChange(name, value)}
                    />
                </AccordionItem>
            );
        }

        let buffCount = countCustomStats(settings);

        return (
            <FullHeight>
                <FullHeightScrollable>
                    <Accordion>
                        <AccordionItem id="party" title={makeTitleWithCount(this.strings.party, this.resonanceConditions, settings)}>
                            <PartyList
                                settings={settings}
                                onChange={(ids) => this.handlePartyChars(ids)}
                            />
                            <ConditionList
                                items={this.resonanceConditions}
                                settings={settings}
                                hideInactive={true}
                                onChange={(name, value) => this.handleSettingChange(name, value)}
                            />
                        </AccordionItem>
                        <AccordionItem id="artifacts" title={makeTitleWithCount(this.strings.artifacts, this.artifactsConditions, settings)}>
                            <ConditionList
                                items={this.artifactsConditions}
                                settings={settings}
                                onChange={(name, value) => this.handleSettingChange(name, value)}
                            />
                        </AccordionItem>
                        <AccordionItem id="weapons" title={makeTitleWithCount(this.strings.weapons, this.weaponsConditions, settings)}>
                            <ConditionList
                                showBeta={UI.Layout.app.showBetaContent()}
                                items={this.weaponsConditions}
                                settings={settings}
                                onChange={(name, value) => this.handleSettingChange(name, value)}
                            />
                        </AccordionItem>
                        {charItems[0] ? charItems[0] : null}
                        {charItems[1] ? charItems[1] : null}
                        {charItems[2] ? charItems[2] : null}
                        <AccordionItem id="custom" title={this.strings.custom + (buffCount ? ` (${buffCount})` : '')}>
                            <CustomStats
                                settings={settings}
                                onChange={(name, value) => this.handleSettingChange(name, value)}
                            />
                        </AccordionItem>
                    </Accordion>
                </FullHeightScrollable>
            </FullHeight>
        );
    }
}

function makeTitleWithCount(title, conditions, settings) {
    let cntActive = 0;

    for (const cond of conditions) {
        if (cond.isHidden(settings)) {
            continue;
        }

        let type = cond.getType();
        if (!type || type == 'static' || type == 'number' && !cond.params.countable) {
            continue;
        }

        if (cond.isActive(settings)) {
            cntActive++;
        }
    }

    let result = title;
    if (cntActive) {
        result += ` (${cntActive})`;
    }
    return result;
}

function countConditions(conditions) {
    let cnt = 0;

    for (const cond of conditions) {
        if (cond.isSerializable()) {
            ++cnt;
        }
    }

    return cnt;
}

function countCustomStats(settings) {
    let count = 0;

    for (let key of Object.keys(settings)) {
        let m = key.match(/custom_buffs.(.*)+/);
        if (m && settings[key]) {
            ++count;
        }
    }

    return count;
}

function partyCharSettings(char, data) {
    let conditions = char.getPartyConditions();
    let settings = {};
    let totals = data.stats.calcTotals();

    for (const cond of conditions) {
        let info = cond.getInfo();

        if (cond.params.partyStat) {
            let value = data.stats.get(cond.params.partyStat) || totals.get(cond.params.partyStat);
            value = Stats.format(cond.params.partyStat, value);
            value = value.replace(/[^\d\.]/, '');
            settings[cond.getName()] = value;
        } else if (cond.params.partySetting) {
            settings[cond.getName()] = data.settings[cond.params.partySetting] || '';
        } else if (info) {
            let isOn = info.constellation && data.settings.char_constellation >= info.constellation;
            isOn ||= info.ascension && data.settings.char_ascension >= info.ascension;

            if (isOn) {
                settings = Object.assign(settings, Condition.allConditionsOn([cond]));
            }
        }
    }

    return settings;
}
