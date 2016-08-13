'use strict';
import React from 'react';

export default React.createClass({
	propTypes: {
		onChooseDirectory: React.PropTypes.func
	},
	openDirectory() {
		this.refs.dir.click();
	},
	componentDidMount() {
		this.refs.dir.setAttribute('webkitdirectory', 'true');
	},
	render() {
		return (
			<div className='toolbar-actions'>
				<div className='btn-group'>
					<button className='btn btn-default'>
						<span className='icon icon-fast-backward'></span>
					</button>
					<button className='btn btn-default'>
						<span className='icon icon-play'></span>
					</button>
					<button className='btn btn-default'>
						<span className='icon icon-stop'></span>
					</button>
					<button className='btn btn-default'>
						<span className='icon icon-fast-forward'></span>
					</button>
				</div>
				<div className='btn-group'>
					<button className='btn btn-default' onClick={this.openDirectory}>
						<span className='icon icon-folder icon-text'></span>
						Open Folder...
					</button>
				</div>
				<input
					type='file'
					ref='dir'
					onChange={this.props.onChooseDirectory}
					style={{display: 'none'}} />
			</div>
		);
	}

});
