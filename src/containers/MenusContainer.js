// @flow
import { connect } from 'react-redux';
import { toggleShuffle } from '../actions/playback';
import Menus from '../components/Menus';
import type { OwnProps, Props } from '../components/Menus';

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

export default connect<Props, OwnProps, _, _, _, _>(
    mapStateToProps,
    mapDispatchToProps
)(Menus);
