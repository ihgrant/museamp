// @flow
import { connect } from 'react-redux';
import { chooseSong } from '../actions';
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
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
