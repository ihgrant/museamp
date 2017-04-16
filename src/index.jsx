// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { ipcRenderer } = require('electron');
const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./app');
// var input = document.querySelector('input[type="file"]');
// input.addEventListener('change', e => {
// 	console.log(e.target.files[0].path);
// })

let library = [];
let app;

function onChooseDirectory(e) {
    if (e.target.files[0]) {
        ipcRenderer.send('CHOOSE_DIR', e.target.files[0].path);
    }
}

function onPlay(songId) {
    console.log(songId);
    ipcRenderer.send('PLAY_SONG', songId);
}

function render(library, song) {
    console.log(song);
    app = ReactDOM.render(
        <App
            library={library}
            onChooseDirectory={onChooseDirectory}
            onChoose={onPlay}
            song={song}
        />,
        document.getElementById('page')
    );
}

setTimeout(() => {
    ipcRenderer.send('GET_LIBRARY', '');
}, 500);

ipcRenderer.on('GET_LIBRARY_REPLY', (event, arg) => {
    if (arg instanceof Error) {
        console.error(err);
    } else {
        library = arg;
        render(library);
    }
});

ipcRenderer.on('GET_SONG', (e, song) => {
    render(library, song);
});

render(library);
