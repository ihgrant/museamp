import { connect } from 'react-redux';
import _ from 'lodash';
import Playlist from '../components/Playlist'

function mapStateToProps(state) {
    return {
        songs: state.chosenPlaylistId > -1
            ? state.library.filter(el => _.includes(state.playlists[state.chosenPlaylistId].songIds, el.id))
            : state.library
    }
}

export default connect(mapStateToProps)(Playlist)
