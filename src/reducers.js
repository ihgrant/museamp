// @flow
import { libraryActions, playbackActions, playlistActions } from "./consts";
import i from "icepick";

const initialState: AppState = i.freeze({
  chosenSongIndex: -1,
  chosenPlaylistId: -1,
  library: [],
  playback: {
    paused: true,
    progress: 0,
    songId: -1
  },
  playbackSettings: {
    cursorFollowsPlayback: false,
    playbackFollowsCursor: false,
    repeat: false,
    shuffle: false
  },
  playlists: []
});

function museAmp(state: AppState = initialState, action: Action): AppState {
  console.info("reducer", action.type);

  let currentPlaylist = state.playlists[state.chosenPlaylistId];

  switch (action.type) {
    case libraryActions.ADD_SONG:
      return i.assign({}, state, {
        library: state.library.concat(action.song)
      });
    case libraryActions.ADD_SONG_BULK:
      return i.assign({}, state, {
        library: action.songs
      });
    case playbackActions.CHOOSE_SONG:
      return i.assign({}, state, { chosenSongIndex: action.index });
    case playbackActions.PLAY:
      return i.assocIn(state, ["playback", "paused"], false);
    case playbackActions.PAUSE:
      return i.assocIn(state, ["playback", "paused"], true);
    case playbackActions.NEXT:
    case playbackActions.PREVIOUS:
      return state;
    case playbackActions.STOP:
      return i
        .chain(state)
        .assocIn(["playback", "paused"], true)
        .assocIn(["playback", "progress"], 0)
        .value();
    case playlistActions.ADD:
      return i.assign({}, state, {
        playlists: state.playlists.concat({
          name: action.name,
          songIds: []
        })
      });
    case playlistActions.CHOOSE:
      return i.assoc(state, "chosenPlaylistId", action.id);
    case playbackActions.CHOOSE_SONG:
      return i.assoc(state, "chosenSongId", action.id);
    case playlistActions.ADD_SONG:
      const playlistPath = ["playlists", state.chosenPlaylistId, "songIds"];
      const playlistSongIds = action.index
        ? i.splice(
            state.playlists[state.chosenPlaylistId].songIds,
            action.index,
            0,
            action.id
          )
        : i.push(state.playlists[state.chosenPlaylistId].songIds, action.id);

      return i.assocIn(
        state,
        ["playlists", state.chosenPlaylistId, "songIds"],
        playlistSongIds
      );
    case playlistActions.MOVE_SONG:
      const playlistToAlter = state.playlists[state.chosenPlaylistId].songIds;
      const songToMove = playlistToAlter[action.oldIndex];
      const newPlaylistOrder = i
        .chain(playlistToAlter)
        .splice(action.newIndex + 1, 0, songToMove)
        .splice(action.oldIndex, 1)
        .value();
      return i.assocIn(
        state,
        ["playlists", state.chosenPlaylistId, "songIds"],
        newPlaylistOrder
      );
    case playlistActions.REMOVE_SONG:
      return i.assocIn(
        state,
        ["playlists", state.chosenPlaylistId, "songIds"],
        i.filter(
          (el, i) => i !== action.index,
          state.playlists[state.chosenPlaylistId].songIds
        )
      );
    case playlistActions.REMOVE:
      const newPlaylistList = state.playlists.filter(
        (el, i) => i !== action.id
      );
      return i.assign({}, state, {
        chosenPlaylistId: newPlaylistList.length - 1,
        playlists: newPlaylistList
      });
    case playbackActions.TOGGLE_SHUFFLE:
      return i.assocIn(
        state,
        ["playbackSettings", "shuffle"],
        !state.playbackSettings.shuffle
      );
    default:
      (action: empty);
      return state;
  }
}

export default museAmp;
