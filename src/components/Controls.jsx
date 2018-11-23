'use strict';
import React, { Component, PropTypes } from 'react';
import Button from './Button';
import ButtonGroup from './ButtonGroup';

class Controls extends Component {
    constructor() {
        super();
    }
    openDirectory() {
        this.dir.click();
    }
    componentDidMount() {
        this.dir.setAttribute('webkitdirectory', 'true');
    }
    render() {
        return (
            <div className="toolbar-actions">
                <ButtonGroup>
                    <Button icon="fast-backward" onClick={this.props.onBack} />
                    <Button
                        icon={this.props.paused ? 'play' : 'pause'}
                        onClick={this.props.onPlayPause}
                    />
                    <Button icon="stop" onClick={this.props.onStop} />
                    <Button
                        icon="fast-forward"
                        onClick={this.props.onForward}
                    />
                </ButtonGroup>
                <Button icon="folder" onClick={() => this.openDirectory()}>
                    {`Open Folder...`}
                </Button>
                <input
                    type="file"
                    ref={el => (this.dir = el)}
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
