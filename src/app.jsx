'use strict';
const React = require('react');
import LibraryNav from './library-nav';
import {Window, Toolbar, Content, Pane} from 'react-photonkit';

module.exports = React.createClass({
	propTypes: {
		library: React.PropTypes.array,
		onChooseDirectory: React.PropTypes.func
	},
	componentDidMount() {
		this.refs.dir.setAttribute('webkitdirectory', 'true');
	},
	render() {
		return (
			<Window>
				<Toolbar>
					<input type='file' ref='dir' onChange={this.props.onChooseDirectory} />
				</Toolbar>
				<Content>
					<LibraryNav library={this.props.library} />
					<Pane>
				    	basic template
				    </Pane>
				</Content>
				<Toolbar psType="footer" />
			</Window>
		);
	}

});
