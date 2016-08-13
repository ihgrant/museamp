'use strict';
const React = require('react');
import Controls from './controls';
import LibraryNav from './library-nav';
import Playlist from './playlist';
import {Window, Toolbar, Content, Pane} from 'react-photonkit';

module.exports = React.createClass({
	propTypes: {
		library: React.PropTypes.array,
		onChooseDirectory: React.PropTypes.func
	},
	render() {
		console.log(this.props.library);
		return (
			<Window>
				<Toolbar>
					<Controls onChooseDirectory={this.props.onChooseDirectory} />
				</Toolbar>
				<Content>
					<LibraryNav library={this.props.library} />
					<Playlist list={this.props.library} />
				</Content>
				<Toolbar psType="footer" />
			</Window>
		);
	}

});
