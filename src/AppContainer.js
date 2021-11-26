// @flow
import { connect } from "react-redux";
import { find } from "lodash";
import App from "./App";
import { choosePlaylist } from "./actions/playlist";
import { play } from "./actions/playback";
import { chooseSong } from "./actions/playback";
import type { OwnProps, Props } from "./App";

function mapStateToProps(state: AppState) {
  return {
    chosenSong: find(state.library, el => el.id === state.chosenSongId),
    library: state.library
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const AppContainer = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
