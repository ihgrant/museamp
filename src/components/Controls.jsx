// @flow
'use strict';
import React from 'react';
import Button from './Button';
import ButtonGroup from './ButtonGroup';

class Controls extends React.Component<
    {
        onBack: () => void,
        onChooseDirectory: () => void,
        onPlayPause: () => void,
        onStop: () => void,
        onForward: () => void,
        paused: boolean
    },
    {}
> {
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

export default Controls;
