import { connect } from 'react-redux';
import _ from 'lodash';
import { chooseSong } from '../actions'
import Playlist from '../components/Playlist'

function mapStateToProps(state: AppState) {
    return {
        chosenSongId: state.chosenSongId,
        songs: state.chosenPlaylistId > -1
            ? state.library.filter(el => _.includes(state.playlists[state.chosenPlaylistId].songIds, el.id))
            : state.library
    }
}

function mapDispatchToProps(dispatch) {
    return {
        chooseSong(id: number) {
            dispatch(chooseSong(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
