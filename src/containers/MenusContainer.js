// @flow
import { connect } from "react-redux";
import { toggleShuffle } from "../actions/playback";
import {
  addPlaylist,
  playlistRemoveSong,
  removePlaylist
} from "../actions/playlist";
import Menus from "../components/Menus";
import type { OwnProps, Props } from "../components/Menus";
const { ipcRenderer } = require("electron");

function mapStateToProps(state: AppState) {
  return {
    chosenPlaylistId: state.chosenPlaylistId,
    chosenSongIndex: state.chosenSongIndex,
    shuffle: state.playbackSettings.shuffle
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPlaylist(name) {
      dispatch(addPlaylist(name));
    },
    deleteLibrary() {
      ipcRenderer.send("DELETE_LIBRARY");
    },
    playlistRemoveSong(songId) {
      dispatch(playlistRemoveSong(songId));
    },
    removePlaylist(playlistId) {
      dispatch(removePlaylist(playlistId));
    },
    toggleShuffle() {
      dispatch(toggleShuffle());
    }
  };
}

export default connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps
)(Menus);
