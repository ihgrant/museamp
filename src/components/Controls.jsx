// @flow
import React from "react";
import { connect } from "react-redux";
import {
  next,
  pause,
  playSong,
  previous,
  stop
} from "../actions/playback";
import Button from "./Button";
import ButtonGroup from "./ButtonGroup";

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
      this.dir.setAttribute("webkitdirectory", "true");
    }
  }
  render() {
    return (
      <div className="toolbar-actions">
        <ButtonGroup>
          <Button icon="fast-backward" onClick={this.props.onPrevious} />
          {this.props.paused ? (
            <Button icon="play" onClick={this.props.onPlay} />
          ) : (
            <Button icon="pause" onClick={this.props.onPause} />
          )}
          <Button icon="stop" onClick={this.props.onStop} />
          <Button icon="fast-forward" onClick={this.props.onNext} />
        </ButtonGroup>
        <Button icon="folder" onClick={() => this.openDirectory()}>
          {`Open Folder...`}
        </Button>
        <input
          onChange={this.props.onChooseDirectory}
          ref={el => (this.dir = el)}
          style={{ display: "none" }}
          type="file"
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
    onPlay: () => dispatch(playSong({})),
    onPrevious: () => dispatch(previous),
    onStop: () => dispatch(stop())
  };
}

export default connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
