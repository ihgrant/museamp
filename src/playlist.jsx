'use strict';
import React, {Component, PropTypes} from 'react';
import {Content, Pane, Table} from 'react-photonkit';
import PlaylistItem from './playlist-item';

class Playlist extends Component {
	constructor() {
		super();
	}
	render() {
		const tabs = this.props.playlists.map(el => {
			<div className='tab-item' key={el.id}>
				<span className='icon icon-cancel icon-close-tab' onClick={this.closePlaylist.bind(null, el.id)}></span>
				{el.name}
			</div>
		});
		const columns = this.props.list.length ?
			_.keys(this.props.list[0]) : 
			[];

		return (
			<Pane>
				<div className='tab-group'>
					<div className='tab-item'>
						{'Library Selection'}
					</div>
					{tabs}
					<div className='tab-item tab-item-fixed'>
						<span className='icon icon-plus'></span>
					</div>
				</div>
				<Content>
    				<Table>
        				<thead><tr>
							{columns.map(el => <th key={el}>{el}</th>)}
            			</tr></thead>
						<tbody>
							{this.props.list.map(el => <PlaylistItem
								columns={columns}
								item={el}
								key={el.id} />)
							}
						</tbody>
        			</Table>
    			</Content>
			</Pane>
		);
	}
}

Playlist.propTypes = {
	playlists: PropTypes.array,
	list: PropTypes.array
};

Playlist.defaultProps = {
	list: [],
	playlists: []
};

export default Playlist;
