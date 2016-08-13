'use strict';
import React, {Component, PropTypes} from 'react';

class PlaylistItem extends Component {
    constructor() {
        super();
        this.onDoubleClick = this.onDoubleClick.bind(this);
    }
    onDoubleClick(e) {
        console.log(this.props.item.title);
    }
    render() {
        return (
            <tr onDoubleClick={this.onDoubleClick}>
                {this.props.columns.map(col => <td key={col}>{this.props.item[col]}</td>)}
            </tr>
        );
    }
}

PlaylistItem.propTypes = {
    columns: PropTypes.array,
    item: PropTypes.object.isRequired
};

export default PlaylistItem;
