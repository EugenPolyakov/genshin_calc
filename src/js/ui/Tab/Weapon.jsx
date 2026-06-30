import React from 'react';

import "../../../css/Components/Tab/Weapon.css"

import { ConditionList } from '../Components/ConditionList';
import { FullHeight, FullHeightScrollable, FullHeightStatic } from '../Components/FullHeight';
import { WeaponObjectBlock } from '../Components/ObjectBlock';
import { ReactTab } from '../Components/Tab';
import { Tab } from "../Tab";
import { UI } from '../../ui';

export class WeaponTab extends Tab {
    constructor(params) {
        super(params);

        this.id = 'weapon';
        this.rightRab = true;
        this.title = 'tab_header.weapon';
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
            <WeaponView
                ref={element => { this.component = element }}
                title={this.title}
            />
        )
    }
}

export class WeaponView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.strings = {
            title: UI.Lang.get(this.props.title),
        };
    }

    handleWeaponChange() {
        let char = UI.Layout.app.getChar().object;
        let weapon = this.getEquippedWeapon()

        UI.WeaponSelectReact.show({
            changeWeaponType: false,
            weaponType: char.weapon,
            selectedId: weapon ? weapon.getId() : 0,
            callback: (weapon) => {
                UI.Layout.app.setWeapon(weapon);
            },
        });
    }

    handleSettingChange(name, value) {
        let conditions = UI.Layout.app.getConditions({objects: ['weapon']});
        let oldSettings = UI.Layout.app.getSettings();

        let settings = {};

        for (let cond of conditions) {
            let n  = cond.getName();
            if (n && oldSettings[n] !== undefined) {
                settings[n] = oldSettings[n];
            }
        }

        settings[name] = value;

        UI.Layout.app.setWeaponSettings(settings);
    }

    handleLevelChange(data) {
        let settings = UI.Layout.app.getSettings();

        let levels = Object.assign({
            level: settings.weapon_level,
            ascension: settings.weapon_ascension,
            refine: settings.weapon_refine,
        }, data);

        UI.Layout.app.setWeaponLevels(levels);
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

    getEquippedWeapon() {
        return UI.Layout.app.getWeapon().object;
    }

    tabContent() {
        let settings = UI.Layout.app.getStats().settings;
        let weapon = this.getEquippedWeapon();
        let conditions = UI.Layout.app.getConditions({objects: ['weapon']});

        return (
            <FullHeight>
                <FullHeightStatic>
                    <WeaponObjectBlock
                        weapon={weapon}
                        settings={settings}
                        onObjectChange={() => this.handleWeaponChange()}
                        onLevelChange={(data) => this.handleLevelChange(data)}
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
