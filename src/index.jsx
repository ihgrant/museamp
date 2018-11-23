// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const { ipcRenderer } = require('electron');
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import museAmp from './reducers';
import { addLibrary, updateMessage } from './actions';
import AppContainer from './containers/AppContainer';

const { Menu } = require('electron').remote;
let library = [];
let app;
let store = createStore(museAmp);

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
    });
}

// ipcRenderer.on('MESSAGE', (event, message) => {
//     store.dispatch(updateMessage(message));
// });

render(
    <Provider store={store}>
        <AppContainer onChooseDirectory={onChooseDirectory} />
    </Provider>,
    document.getElementById('page'),
    () => {
        getLibrary().then(library => {
            store.dispatch(addLibrary(library));
        });
    }
);
