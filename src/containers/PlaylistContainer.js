// @flow
import { connect } from 'react-redux';
import { chooseSong, chooseAndPlaySong } from '../actions/playback';
import Playlist from '../components/Playlist';

function mapStateToProps(state: AppState) {
    return {
        chosenSongId: state.chosenSongId,
        songs:
            state.chosenPlaylistId > -1
                ? state.library.filter((el) =>
                      state.playlists[state.chosenPlaylistId].songIds.includes(
                          el.id
                      )
                  )
                : state.library,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        chooseSong(id: number) {
            dispatch(chooseSong(id));
        },
        chooseAndPlaySong(id: number, filepath: string) {
            dispatch(chooseAndPlaySong(id, filepath));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
