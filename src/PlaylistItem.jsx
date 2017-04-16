'use strict';
import React, { Component, PropTypes } from 'react';

class PlaylistItem extends Component {
    constructor() {
        super();
        this.onDoubleClick = this.onDoubleClick.bind(this);
    }
    onDoubleClick(e) {
        console.log(this.props.item.id);
    }
    render() {
        return (
            <tr onDoubleClick={this.props.onDoubleClick}>
                {this.props.columns.map(col => (
                    <td key={col}>{this.props.item[col]}</td>
                ))}
            </tr>
        );
    }
}

PlaylistItem.propTypes = {
    columns: PropTypes.array,
    item: PropTypes.object.isRequired
};

export default PlaylistItem;
