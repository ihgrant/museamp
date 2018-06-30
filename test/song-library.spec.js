/*const test = require('tape');
var songLibrary = require('../src/main-process/song-library');

test('song library', function(t) {
    Promise.all([
        () =>
            songLibrary.authenticate().then(result => {
                t.ok('can connect to the database');
            }),
        () =>
            songLibrary.initialize({ test: true }).then(result => {
                t.ok('initializes without error');
            }),
        () =>
            songLibrary
                .addSong({
                    title: 'test title',
                    album: 'test album',
                    artist: 'test artist',
                    path: './test.mp3'
                })
                .then(result => {
                    t.ok('adds song records without error');
                }),
        () =>
            songLibrary.getAllSongs().then(results => {
                t.ok('gets all song records with corresponding filepaths');
            })
    ])
        .then(() => {
            t.end();
        })
        .catch(t.error);
});

test.onFinish(() => {
    songLibrary.deleteAllSongs();
});
*/
