// @flow

const initialState: AppState = {
    chosenSongId: 0,
    chosenPlaylist: 0,
    library: [],
    paused: true,
    playlist: {
        id: 0,
        songs: []
    }
};

function museAmp(state = initialState, action) {
    switch (action.type) {
        case 'ADD_SONG':
            const newLibrary = state.library.concat(action.song);
            return Object.assign({}, state, { library: newLibrary });
        case 'CHOOSE_SONG':
            return Object.assign({}, state, { chosenSongId: action.songId });
        default:
            return state;
    }
}

export default museAmp;
