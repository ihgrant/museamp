import { connect } from 'react-redux';
import App from './App';
import { chooseSong } from './actions';

function mapStateToProps(state) {
    return { chosenSongId: state.chosenSongId, library: state.library };
}

function mapDispatchToProps(dispatch) {
    return {
        onChooseSong: songId => {
            dispatch(chooseSong(songId));
        }
    };
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
