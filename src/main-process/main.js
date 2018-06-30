const Promise = require('bluebird');
const getFiles = require('./get-files');
const songLibrary = require('./song-library');
const api = require('./api')(songLibrary);

const { app, Menu, BrowserWindow } = require('electron');
const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS
} = require('electron-devtools-installer');
const { ipcMain } = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// menu stuff
function createMenus() {
    let template = [
        {
            submenu: [{ role: 'quit' }]
        },
        {
            label: 'Playback',
            submenu: [{ label: 'Shuffle', click: () => null, type: 'checkbox' }]
        }
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// initialization
function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 1024, height: 768 });

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/../../static/index.html`);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();
    // createMenus();
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('CHOOSE_DIR', (event, arg) => {
    console.log('CHOOSE_DIR', arg);

    getFiles(arg)
        .then(songs => Promise.map(songs, song => songLibrary.addSong(song)))
        .then(() => songLibrary.getAllSongs())
        .then(songs => {
            event.sender.send('GET_LIBRARY_REPLY', songs);
        })
        .catch(err => {
            event.sender.send('GET_LIBRARY_REPLY', err);
        });
});

ipcMain.on('GET_LIBRARY', (event, arg) => {
    songLibrary
        .getAllSongs()
        .then(songs => {
            event.sender.send('GET_LIBRARY_REPLY', songs);
        })
        .catch(err => {
            event.sender.send('GET_LIBRARY_REPLY', err);
        });
});

songLibrary
    .initialize()
    .then(() => {
        console.log('library initialized.');
    })
    .catch(err => console.error(err));
