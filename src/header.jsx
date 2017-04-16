'use strict';
import React from 'react';

export default React.createClass({
	propTypes: {
		onChooseDirectory: React.PropTypes.func
	},
	componentDidMount() {
		this.refs.dir.setAttribute('webkitdirectory', 'true');
	},
	render() {
		return (
			<header className='header'>
				this is the header class
				<input type='file' ref='dir' onChange={this.props.onChooseDirectory} />
			</header>
		);
	}

});
