const app = require('express')();
const fs = require('fs');

module.exports = function(songLibrary) {
    app.get('/', (req, res) => {
        res.send({ message: 'ok' });
    });

    app.get('/songs', (req, res) => {
        songLibrary.getAllSongs().then(songs => res.json(songs));
    });

    app.get('/songs/:id', (req, res) => {
        songLibrary
            .getSongWithPath(Number(req.params.id))
            .then(songWithPath => {
                if (songWithPath.song_path && songWithPath.song_path.path) {
                    res.sendFile(songWithPath.song_path.path);
                } else {
                    res.status(400).send({ message: 'Path is not local!' });
                }
            })
            .catch(err => res.status(500).send({ message: err.message }));
    });

    app.listen(3000, () => {
        console.info('--> http api listening on port 3000');
    });
};
