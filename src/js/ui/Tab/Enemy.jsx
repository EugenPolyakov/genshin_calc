import React from 'react';

import "../../../css/Components/Tab/Enemy.css"

import { ConditionList } from '../Components/ConditionList';
import { FullHeight, FullHeightScrollable, FullHeightStatic } from '../Components/FullHeight';
import { EnemyObjectBlock } from '../Components/ObjectBlock';
import { ResistanceBlock } from '../Components/ResistanceBlock';
import { ReactTab } from '../Components/Tab';
import { Tab } from "../Tab";
import { CustomEnemy } from './Enemy/Custom';
import { UI } from '../../ui';

export class EnemyTab extends Tab {
    constructor(params) {
        super(params);

        this.id = 'enemy';
        this.rightRab = true;
        this.title = 'tab_header.enemy';
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
            <EnemyView
                ref={element => { this.component = element }}
                title={this.title}
            />
        )
    }
}

export class EnemyView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.strings = {
            title: UI.Lang.get(this.props.title),
        };
    }

    handleEnemyChange() {
        let enemy = UI.Layout.app.getEnemy().object;
        let enemyId = enemy ? enemy.getId() : 0;

        UI.EnemySelectReact.show({
            selectedId: enemyId,
            callback: (item) => {
                if (item) {
                    UI.Layout.app.setEnemy(item);
                } else {
                    UI.Layout.app.setEnemy(null);
                }
            },
        });
    }

    handleSettingChange(name, value) {
        let conditions = UI.Layout.app.getConditions({objects: ['enemy']});
        let oldSettings = UI.Layout.app.getSettings();
        let settings = {};

        for (let cond of conditions) {
            let n  = cond.getName();
            if (n && oldSettings[n] !== undefined) {
                settings[n] = oldSettings[n];
        }
        }

        settings[name] = value;

        UI.Layout.app.setEnemySettings(settings);
    }

    handleLevelChange(level) {
        UI.Layout.app.setEnemyLevels({
            level: level,
        });
    }

    handleResistanceChange(element, value) {
        let res = UI.Layout.app.currentSet().enemy.getResistances();
        res[element] = value;
        UI.Layout.app.setEnemyResistances(res);
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
        let data = UI.Layout.app.current.getBuildData();
        data.applyPostEffects();
        let enemy = UI.Layout.app.getEnemy().object;
        let conditions = UI.Layout.app.getConditions({objects: ['enemy']});

        return (
            <FullHeight>
                <FullHeightStatic>
                    <EnemyObjectBlock
                        enemy={enemy}
                        stats={data.stats}
                        settings={data.settings}
                        onObjectChange={() => this.handleEnemyChange()}
                        onLevelChange={(data) => this.handleLevelChange(data)}
                    />
                    <CustomEnemy
                        hidden={!!enemy}
                        resistances={UI.Layout.app.currentSet().enemy.getResistances()}
                        onResistanceChange={(element, value) => this.handleResistanceChange(element, value)}
                    />
                    <ResistanceBlock
                        title={UI.Lang.get('object_view.total_resistance')}
                        stats={data.stats}
                        settings={data.settings}
                    />
                </FullHeightStatic>
                <FullHeightScrollable>
                    <ConditionList
                        addClass="last"
                        items={conditions}
                        settings={data.settings}
                        onChange={(name, value) => this.handleSettingChange(name, value)}
                    />
                </FullHeightScrollable>
            </FullHeight>
        );
    }
}
