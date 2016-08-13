'use strict';
import React, {PropTypes} from 'react';
import {Pane} from 'react-photonkit';
import Treeview from 'react-treeview';
import * as _ from 'lodash';

export default React.createClass({
	propTypes: {
		library: PropTypes.array,
		groupBy: PropTypes.oneOf(['artist', 'album', 'albumArtist'])
	},
	getDefaultProps() {
		return {
			groupBy: 'artist'
		};
	},
	render() {
		const groups = _.groupBy(this.props.library, this.props.groupBy);
		const list = _.keys(groups).map(key => {
			const members = groups[key].map(el => <span className='info'>{el.title}</span>);
			const label = <span className='node'>{key}</span>;
			return (
				<Treeview
					defaultCollapsed={true}
					nodeLabel={label}>
					{members}
				</Treeview>
			);
		});

		return (
			<Pane ptSize="sm" sidebar>
				<Treeview nodeLabel={<span>{this.props.groupBy}</span>}>
    				{list}
    			</Treeview>
			</Pane>
		);
	}

});
