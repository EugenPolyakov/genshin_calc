import React from 'react';

import { EnemyLevelLine } from '../../Components/ObjectBlock';
import { DB } from '../../../db/DB';
import { UI } from '../../../ui';

export class CustomEnemy extends React.Component {
    constructor(props) {
        super(props);

        this.elements = DB.Objects.Elements.getList().map((v) => {return v.name});
    }

    render() {
        let items = [];

        for (const element of this.elements) {
            items.push(
                <EnemyLevelLine
                    key={element}
                    title={UI.Lang.get('stat.res_'+ element)}
                    value={this.props.resistances[element]}
                    minValue={-100}
                    maxValue={400}
                    onChange={(value) => {this.props.onResistanceChange(element, value)}}
                />
            );
        }

        return (
            <div className={this.props.hidden ? 'hidden' : ''}>
                {items}
            </div>
        );
    }
}
