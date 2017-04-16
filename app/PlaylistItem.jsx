'use strict';
import React, {Component, PropTypes} from 'react';

class PlaylistItem extends Component {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
        this.onDoubleClick = this.onDoubleClick.bind(this);
    }
    onClick(e) {
        this.props.onSelect(this.props.id);
    }
    onDoubleClick(e) {
        this.props.onChoose(this.props.item.id);
    }
    render() {
        return (
            <tr onClick={this.onClick} onDoubleClick={this.onDoubleClick}>
                {this.props.columns.map(col => <td key={col}>{this.props.item[col]}</td>)}
            </tr>
        );
    }
}

PlaylistItem.propTypes = {
    columns: PropTypes.array,
    item: PropTypes.object.isRequired,
    onChoose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default PlaylistItem;
