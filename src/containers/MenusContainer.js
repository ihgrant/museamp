// @flow
import { connect } from 'react-redux';
import { toggleShuffle } from '../actions/playback';
import Menus from '../components/Menus';

function mapStateToProps(state: AppState) {
    return {
        shuffle: state.playbackSettings.shuffle
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleShuffle() {
            dispatch(toggleShuffle());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menus)
