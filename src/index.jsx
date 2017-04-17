// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { ipcRenderer } = require('electron');
const React = require('react');
const ReactDOM = require('react-dom');
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import museAmp from './reducers';
import { addSong } from './actions';
import AppContainer from './AppContainer';

let library = [];
let app;
let store = createStore(museAmp);

function onChooseDirectory(e) {
    if (e.target.files[0]) {
        ipcRenderer.send('CHOOSE_DIR', e.target.files[0].path);
    }
}

function onPlay(songId) {
    console.log(songId);
    ipcRenderer.send('PLAY_SONG', songId);
}

function render() {
    ReactDOM.render(
        <Provider store={store}>
            <AppContainer onChooseDirectory={onChooseDirectory} />
        </Provider>,
        document.getElementById('page')
    );
}

setTimeout(() => {
    ipcRenderer.send('GET_LIBRARY', '');
}, 500);

ipcRenderer.on('GET_LIBRARY_REPLY', (event, library) => {
    if (library instanceof Error) {
        console.error(err);
    } else {
        library.forEach(el => {
            store.dispatch(addSong(el));
        });
    }
});

ipcRenderer.on('GET_SONG', (e, song) => {
    render(library, song);
});

render(library);
