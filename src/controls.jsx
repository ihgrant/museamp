'use strict';
import React, { Component, PropTypes } from 'react';

class Controls extends Component {
    constructor() {
        super();
    }
    openDirectory() {
        this.refs.dir.click();
    }
    componentDidMount() {
        this.refs.dir.setAttribute('webkitdirectory', 'true');
    }
    render() {
        return (
            <div className="toolbar-actions">
                <div className="btn-group">
                    <button
                        className="btn btn-default"
                        onClick={this.props.onBack}
                    >
                        <span className="icon icon-fast-backward" />
                    </button>
                    <button
                        className="btn btn-default"
                        onClick={this.props.onPlayPause}
                    >
                        <span
                            className={`icon icon-${this.props.paused ? 'play' : 'pause'}`}
                        />
                    </button>
                    <button
                        className="btn btn-default"
                        onClick={this.props.onStop}
                    >
                        <span className="icon icon-stop" />
                    </button>
                    <button
                        className="btn btn-default"
                        onClick={this.props.onForward}
                    >
                        <span className="icon icon-fast-forward" />
                    </button>
                </div>
                <div className="btn-group">
                    <button
                        className="btn btn-default"
                        onClick={this.openDirectory}
                    >
                        <span className="icon icon-folder icon-text" />
                        Open Folder...
                    </button>
                </div>
                <input
                    type="file"
                    ref="dir"
                    onChange={this.props.onChooseDirectory}
                    style={{ display: 'none' }}
                />
            </div>
        );
    }
}

Controls.propTypes = {
    onBack: PropTypes.func,
    onChooseDirectory: PropTypes.func,
    onPlayPause: PropTypes.func,
    onStop: PropTypes.func,
    onForward: PropTypes.func,
    paused: PropTypes.bool
};

export default Controls;
