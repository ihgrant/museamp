// @flow
import { connect } from 'react-redux';
import App from './App';
import { choosePlaylist, chooseSong } from './actions';

function mapStateToProps(state: AppState) {
    return {
        chosenSongId: state.chosenSongId,
        chosenPlaylistId: state.chosenPlaylistId,
        playlist: state.chosenPlaylistId > -1
            ? state.playlists[state.chosenPlaylistId]
            : { name: 'Library Selection', songs: state.library }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChoosePlaylist: playlistId => {
            dispatch(choosePlaylist(playlistId));
        },
        onChooseSong: songId => {
            dispatch(chooseSong(songId));
        }
    };
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
