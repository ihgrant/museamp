// @flow
import { connect } from 'react-redux';
import App from './App';
import { choosePlaylist } from './actions/playlist';
import { chooseSong } from './actions/playback';
import type { OwnProps, Props } from './App';

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

const AppContainer = connect<Props, OwnProps, _, _, _, _>(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer;
