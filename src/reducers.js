// @flow

const initialState: AppState = {
    chosenSongId: 0,
    chosenPlaylistId: -1,
    library: [],
    paused: true,
    playlists: []
};

function museAmp(state: AppState = initialState, action: Action): AppState {
    switch (action.type) {
        case 'ADD_SONG':
            const newLibrary = state.library.concat(action.song);
            return Object.assign({}, state, { library: newLibrary });
        case 'CHOOSE_PLAYLIST':
            return Object.assign({}, state, { chosenPlaylistId: action.id });
        case 'CHOOSE_SONG':
            return Object.assign({}, state, { chosenSongId: action.id });
        default:
            (action: empty);
            return state;
    }
}

export default museAmp;
