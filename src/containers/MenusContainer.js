// @flow
import { connect } from 'react-redux';
import { toggleShuffle } from '../actions/playback';
import Menus from '../components/Menus';
import type { OwnProps, Props } from '../components/Menus';
const { ipcRenderer } = require('electron');

function mapStateToProps(state: AppState) {
    return {
        shuffle: state.playbackSettings.shuffle,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        deleteLibrary() {
            ipcRenderer.send('DELETE_LIBRARY');
        },
        toggleShuffle() {
            dispatch(toggleShuffle());
        },
    };
}

export default connect<Props, OwnProps, _, _, _, _>(
    mapStateToProps,
    mapDispatchToProps
)(Menus);
