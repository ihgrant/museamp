// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {ipcRenderer} = require('electron');
const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./app');

let library = [];
let path = '';

function onChooseDirectory(e) {
	if (e.target.files[0]) {
		ipcRenderer.send('CHOOSE_DIR', e.target.files[0].path);
	}
}

function onChooseSong(id) {
	ipcRenderer.send('GET_SONG_PATH', id);
}

function render(library, path) {
	ReactDOM.render(
		<App
			library={library}
			currentPath={path}
			onChooseDirectory={onChooseDirectory}
			onChooseSong={onChooseSong} />,
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
		render(library, path);
	}
});

ipcRenderer.on('GET_SONG_PATH_REPLY', (event, arg) => {
	if (arg instanceof Error) {
		console.error(err);
	} else {
		path = arg;
		render(library, path);
	}
});

render(library, path);
