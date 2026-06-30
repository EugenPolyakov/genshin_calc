import React from 'react';

import "../../../css/Components/Tab/Char.css"

import { ConditionList } from '../Components/ConditionList';
import { FullHeight, FullHeightScrollable, FullHeightStatic } from '../Components/FullHeight';
import { CharObjectBlock } from '../Components/ObjectBlock';
import { ReactTab } from '../Components/Tab';
import { Tab } from "../Tab";
import { UI } from '../../ui';

export class CharTab extends Tab {
    constructor(params) {
        super(params);

        this.id = 'char';
        this.rightRab = true;
        this.title = 'tab_header.char';
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
            <CharView
                ref={element => { this.component = element }}
                title={this.title}
            />
        )
    }
}

export class CharView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.strings = {
            title: UI.Lang.get(this.props.title),
        };
    }

    handleSettingChange(name, value) {
        let conditions = UI.Layout.app.getConditions({objects: ['char']});
        let oldSettings = UI.Layout.app.getSettings();
        let settings = {};

        for (let cond of conditions) {
            for (let n of cond.getNamesList()) {
                if (n && oldSettings[n] !== undefined) {
                    settings[n] = oldSettings[n];
                }
            }
        }

        settings[name] = value;

        UI.Layout.app.setCharSettings(settings);
    }

    handleCharChange() {
        let currentChar = UI.Layout.app.getChar().object

        UI.CharSelectReact.show({
            selectedId: currentChar.getId(),
            showReset: true,
            callback: (char) => {
                if (char) {
                    UI.Layout.app.setChar(char);
                } else {
                    UI.Layout.app.resetBuild(UI.Layout.app.currentSet().getChar().getId());
                }
            },
        });
    }

    handleLevelChange(data) {
        let settings = UI.Layout.app.getSettings();

        let levels = Object.assign({
            level: settings.char_level,
            ascension: settings.char_ascension,
            constellation: settings.char_constellation,
        }, data);

        UI.Layout.app.setCharLevels(levels);
    }

    handleSkillChange(data) {
        let skills = UI.Layout.app.getChar().skills;

        let levels = Object.assign({
            attack: skills.attack,
            elemental: skills.elemental,
            burst: skills.burst,
        }, data);

        UI.Layout.app.setCharSkills(levels);
    }

    handleInfoClick(name) {
        let char = UI.Layout.app.getChar();
        UI.WindowCharTalent.show(name, char.getId());
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
        let char = UI.Layout.app.getChar();
        let conditions = UI.Layout.app.getConditions({objects: ['char']});

        return (
            <FullHeight>
                <FullHeightStatic>
                    <CharObjectBlock
                        char={char}
                        settings={settings}
                        skills={UI.Layout.app.getChar().skills}
                        onObjectChange={() => this.handleCharChange()}
                        onInfoClick={(name) => this.handleInfoClick(name)}
                        onLevelChange={(data) => this.handleLevelChange(data)}
                        onSkillChange={(data) => this.handleSkillChange(data)}
                    />
                </FullHeightStatic>
                <FullHeightScrollable>
                    <ConditionList
                        addClass="last"
                        items={conditions}
                        settings={settings}
                        onChange={(name, value) => this.handleSettingChange(name, value)}
                    />
                </FullHeightScrollable>
            </FullHeight>
        );
    }
}

