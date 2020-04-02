// @flow
import i from 'icepick';

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
    playlists: []
});

function museAmp(state: AppState = initialState, action: Action): AppState {
    console.info(action.type);

    let currentPlaylist = state.playlists[state.chosenPlaylistId];

    switch (action.type) {
        case 'ADD_PLAYLIST':
            return i.assign({}, state, {
                playlists: state.playlists.concat({
                    name: action.name,
                    songIds: []
                })
            });
        case 'ADD_SONG':
            return i.assign({}, state, {
                library: state.library.concat(action.song)
            });
        case 'CHOOSE_PLAYLIST':
            return i.assoc(state, 'chosenPlaylistId', action.id);
        case 'CHOOSE_SONG':
            return i.assoc(state, 'chosenSongId', action.id);
        case 'PLAYLIST_ADD_SONG':
            return i.assocIn(
                state,
                ['playlists', state.chosenPlaylistId, 'songIds'],
                i.push(
                    state.playlists[state.chosenPlaylistId].songIds,
                    action.id
                )
            );
        case 'PLAYLIST_REMOVE_SONG':
            return i.assocIn(
                state,
                ['playlists', state.chosenPlaylistId, 'songIds'],
                i.filter(
                    el => el !== action.id,
                    state.playlists[state.chosenPlaylistId].songIds
                )
            );
        case 'REMOVE_PLAYLIST':
            return i.assign({}, state, {
                playlists: state.playlists.filter((el, i) => i !== action.id)
            });
        case 'TOGGLE_SHUFFLE':
            return i.assocIn(
                state,
                ['playbackSettings', 'shuffle'],
                !state.playbackSettings.shuffle
            );
        default:
            (action: empty);
            return state;
    }
}

export default museAmp;
