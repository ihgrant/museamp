// @flow
import { connect } from "react-redux";
import { find } from "lodash";
import App from "./App";
import { choosePlaylist } from "./actions/playlist";
import { chooseSong } from "./actions/playback";
import type { OwnProps, Props } from "./App";
import { getChosenSong } from "./selectors";

function mapStateToProps(state: AppState) {
  return {
    chosenSong: getChosenSong(state),
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
