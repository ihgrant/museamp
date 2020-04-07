// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { ipcRenderer } = require('electron');
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import museAmp from './reducers';
import { addSongBulk } from './actions/library';
import AppContainer from './AppContainer';

const { Menu } = require('electron').remote
let library = [];
let app;
let store = createStore(museAmp);

// set up menu items
// let template = [
//     {
//         submenu: [{ role: 'quit' }]
//     },
//     {
//         label: 'Playback',
//         submenu: [
//             { label: 'Shuffle', click: () => store.dispatch(toggleShuffle()), type: 'checkbox', value: store.getState().playbackSettings.shuffle }
//         ]
//     }
// ]
// const menu = Menu.buildFromTemplate(template)
// Menu.setApplicationMenu(menu)

function onChooseDirectory(e) {
    if (e.target.files[0]) {
        ipcRenderer.send('CHOOSE_DIR', e.target.files[0].path);
    }
}

function getLibrary() {
    return new Promise((resolve, reject) => {
        ipcRenderer.on('GET_LIBRARY_REPLY', (event, library) => {
            if (library instanceof Error) {
                reject(err);
            }
            resolve(library);
        });
        ipcRenderer.send('GET_LIBRARY', '');
    })
}

render(
    <Provider store={store}>
        <AppContainer onChooseDirectory={onChooseDirectory} />
    </Provider>,
    document.getElementById('page'),
    () => {
        getLibrary().then(library => {
            store.dispatch(addSongBulk(library));
        });
    }
);
