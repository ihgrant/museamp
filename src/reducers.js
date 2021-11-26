// @flow
import {
  libraryActions,
  playbackActions,
  playlistActions,
  queueActions
} from "./consts";
import i from "icepick";

const initialState: AppState = i.freeze({
  chosenSongId: -1,
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
  playlists: [],
  queue: []
});

function museAmp(state: AppState = initialState, action: Action): AppState {
  console.info(action.type);

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
      return i.assign({}, state, { chosenSongId: action.id });
    case playbackActions.NEXT:
    case playbackActions.PAUSE:
    case playbackActions.PLAY:
    case playbackActions.PREVIOUS:
    case playbackActions.STOP:
      console.log(action.type);
      return state;
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
      return i.assocIn(
        state,
        ["playlists", state.chosenPlaylistId, "songIds"],
        i.push(state.playlists[state.chosenPlaylistId].songIds, action.id)
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
      return i.assign({}, state, {
        playlists: state.playlists.filter((el, i) => i !== action.id)
      });
    case playbackActions.TOGGLE_SHUFFLE:
      return i.assocIn(
        state,
        ["playbackSettings", "shuffle"],
        !state.playbackSettings.shuffle
      );
    case queueActions.ADD:
      return i.assoc(state, "queue", i.push(state.queue, action.id));
    case queueActions.ADD_FIRST:
      return i.assoc(state, "queue", i.unshift(state.queue, action.id));
    case queueActions.CLEAR:
      return i.assoc(state, "queue", []);
    case queueActions.REMOVE:
      return i.assoc(
        state,
        "queue",
        i.filter((el, i) => i !== action.index, state.queue)
      );
    default:
      (action: empty);
      return state;
  }
}

export default museAmp;
