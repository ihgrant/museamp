'use strict';
import React, { Component, PropTypes } from 'react';

class Controls extends Component {
    constructor() {
        super();
    }
    onPlay() {
        if (this.props.player && this.props.player.paused) {
            this.props.player.play();
        } else {
            this.props.player.pause();
        }
    }
    openDirectory() {
        this.refs.dir.click();
    }
    componentDidMount() {
        this.refs.dir.setAttribute('webkitdirectory', 'true');
    }
    render() {
        const paused = this.props.player ? this.props.player.paused : true;

        return (
            <div className="toolbar-actions">
                <div className="btn-group">
                    <button className="btn btn-default">
                        <span className="icon icon-fast-backward" />
                    </button>
                    <button
                        className="btn btn-default"
                        onClick={this.onPlayPause}
                    >
                        <span
                            className={`icon icon-${paused ? 'play' : 'pause'}`}
                        />
                    </button>
                    <button className="btn btn-default">
                        <span className="icon icon-stop" />
                    </button>
                    <button className="btn btn-default">
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
    onChooseDirectory: PropTypes.func,
    player: PropTypes.element
};

export default Controls;
