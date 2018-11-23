import { connect } from 'react-redux';
import _ from 'lodash';
import { chooseSong } from '../actions';
import Playlist from '../components/Playlist';

function mapStateToProps(state: AppState) {
    const chosenPlaylist = state.playlists[state.chosenPlaylistId];
    return {
        chosenSongId: state.chosenSongId,
        songs:
            state.chosenPlaylistId > -1
                ? state.library.filter(el =>
                      _.includes(chosenPlaylist.songIds, el.id)
                  )
                : state.library
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
