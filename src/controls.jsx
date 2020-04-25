// @flow
import React from 'react';
import { connect } from 'react-redux';
import { next, pause, play, previous, stop } from './actions/playback';
import Button from './components/Button';
import ButtonGroup from './components/ButtonGroup';

type OwnProps = {| onChooseDirectory: string => void |};
type Props = {|
    ...OwnProps,
    onNext: () => void,
    onPause: () => void,
    onPlay: () => void,
    onPrevious: () => void,
    onStop: () => void,
    paused: boolean
|};

class Controls extends React.Component<Props, {}> {
    dir: ?HTMLInputElement;
    constructor() {
        super();
    }
    openDirectory() {
        if (this.dir) {
            this.dir.click();
        }
    }
    componentDidMount() {
        if (this.dir) {
            this.dir.setAttribute('webkitdirectory', 'true');
        }
    }
    render() {
        const PauseButton = (
            <Button icon={'pause'} onClick={this.props.onPause} />
        );
        const PlayButton = <Button icon={'play'} onClick={this.props.onPlay} />;
        return (
            <div className="toolbar-actions">
                <ButtonGroup>
                    <Button
                        icon="fast-backward"
                        onClick={this.props.onPrevious}
                    />
                    {this.props.paused ? PlayButton : PauseButton}
                    <Button icon="stop" onClick={this.props.onStop} />
                    <Button icon="fast-forward" onClick={this.props.onNext} />
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

function mapStateToProps(state: AppState) {
    return {
        paused: state.playback.paused
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onNext: () => dispatch(next),
        onPause: () => dispatch(pause()),
        onPlay: () => dispatch(play()),
        onPrevious: () => dispatch(previous),
        onStop: () => dispatch(stop())
    };
}

export default connect<Props, OwnProps, _, _, _, _>(
    mapStateToProps,
    mapDispatchToProps
)(Controls);
