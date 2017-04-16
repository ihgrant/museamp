const Promise = require('bluebird');
const getFiles = require('./get-files');
const songLibrary = require('./song-library');

const electron = require('electron');
const {ipcMain} = require('electron');

// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
	// Create the browser window.
	mainWindow = new BrowserWindow({width: 800, height: 600})

	// and load the index.html of the app.
	mainWindow.loadURL(`file://${__dirname}/../../static/index.html`)

	// Open the DevTools.
	mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('CHOOSE_DIR', (event, arg) => {
	console.log(arg);
	getFiles(arg).then(songs => {
		return Promise.map(songs, song => {
			return songLibrary.addSong(file)
		});
	}).then(() => {
		return songLibrary.getAllSongs();
	}).then(songs => {
		event.sender.send('GET_LIBRARY_REPLY', songs);
	}).catch(err => {
		event.sender.send('GET_LIBRARY_REPLY', err);
	})
});

ipcMain.on('GET_LIBRARY', (event, arg) => {
	songLibrary.getAllSongs().then(songs => {
		event.sender.send('GET_LIBRARY_REPLY', songs);
	}).catch(err => {
		event.sender.send('GET_LIBRARY_REPLY', err);
	})
});

ipcMain.on('GET_SONG_PATH', (event, arg) => {
	console.log(arg);
	songLibrary.getSongPath(arg).then(response => {
		event.sender.send('GET_SONG_PATH_REPLY', response.path);
	}).catch(err => {
		event.sender.send('GET_SONG_PATH_REPLY', err);
	})
});

songLibrary.initialize().then(() => {
	console.log('initialized.');
}).catch(err => console.error(err));

// songLibrary.deleteAllSongs().then(() => {
// 	console.log(process.cwd());
// 	console.log('done');
// 	return getFiles('/Users/ian/Music').then(files => {
// 		console.log(files);
// 		return Promise.map(files, file => {
// 			return songLibrary.addSong(file)
// 		});
// 	}).then(() => {
// 		console.log('done again.');
// 	});
// }).catch(err => console.error(err));
