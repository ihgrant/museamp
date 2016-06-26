'use strict';
import React from 'react';
import {Pane, NavGroup, NavTitle, NavGroupItem, Toolbar} from 'react-photonkit';

export default React.createClass({
	propTypes: {
		library: React.PropTypes.array
	},
	render() {
		const list = this.props.library.map((el, i) => <p>{el.title}</p>);
		return (
			<Pane ptSize="sm" sidebar>
				<h5>Songs</h5>
				{list}
				<Toolbar psType="footer" title="footer" />
			</Pane>
		);
	}

});
