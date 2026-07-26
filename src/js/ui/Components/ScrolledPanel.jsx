import React from 'react';

import "../../../css/Components/ScrolledPanel.css"

export function ScrolledPanel(props) {
    let customStyle = Object.assign({}, props.style);
    let classes = "scrolled-content";
    if (props.addClass)
        classes += ' ' + props.addClass;

    return (
        <div className={ classes } style={ customStyle }>
            { props.children }
        </div>
    );
}

