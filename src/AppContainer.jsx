// @flow
import { connect } from 'react-redux';
import App from './App';
import { choosePlaylist, chooseSong } from './actions';

function mapStateToProps(state: AppState) {
    return {
        chosenSongId: state.chosenSongId,
        chosenPlaylistId: state.chosenPlaylistId,
        library: state.library
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
