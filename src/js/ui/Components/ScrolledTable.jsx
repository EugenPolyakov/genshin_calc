import React from 'react';

import "../../../css/Components/ScrolledTable.css"

export function StickyTableBlock(props) {
    return (
        <table className={ "sticky-table" + (props.addClass ? ' ' + props.addClass : '') }>
            { props.children }
        </table>
    );
}

export function StickyTableHeader(props) {
    return (
        <thead>
            { props.children }
        </thead>
    )
}

export function FloatTitleBlock(props) {
    return (
        <tbody>
            <tr className="float-line">
                <td className="title" colSpan="5" ><div>{ props.title }</div></td>
            </tr>
            { props.children }
        </tbody>
    );
}

