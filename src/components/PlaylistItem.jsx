'use strict';
import React from 'react';

function PlaylistItem(props: {
    active: ?boolean,
    columns: string[],
    item: Song,
    onDoubleClick: e => void,
    onClick: e => void
} = { active: false }) {
    return (
        <tr className={props.active ? 'active' : ''} onDoubleClick={props.onDoubleClick} onClick={props.onClick}>
            {props.columns.map(col => (
                <td key={col}>{props.item[col]}</td>
            ))}
        </tr>
    );
}

export default PlaylistItem;
