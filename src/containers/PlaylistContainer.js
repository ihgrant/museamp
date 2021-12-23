// @flow
import { connect } from "react-redux";
import { chooseSong, chooseAndPlaySong } from "../actions/playback";
import Playlist from "../components/Playlist";
import type { OwnProps, Props } from "../components/Playlist";
import { playlistAddSong, playlistRemoveSong } from "../actions/playlist";

function mapStateToProps(state: AppState) {
  return {
    chosenSongIndex: state.chosenSongIndex,
    songs:
      state.chosenPlaylistId > -1
        ? state.library.filter(el =>
            state.playlists[state.chosenPlaylistId].songIds.includes(el.id)
          )
        : state.library
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addSong(id: SongId) {
      dispatch(playlistAddSong(id));
    },
    chooseSong(id: number) {
      dispatch(chooseSong(id));
    },
    chooseAndPlaySong(id: number, filepath: string) {
      dispatch(chooseAndPlaySong({ songIndex: id, filepath }));
    },
    removeSong(songId) {
      dispatch(playlistRemoveSong(songId));
    }
  };
}

export default connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps
)(Playlist);
