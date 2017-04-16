const { Songs, SongPaths } = require('../models');

var deleteAllSongs = () => SongPaths.truncate().then(() => Songs.truncate());

function addSong(song) {
    return Songs.create({
        album: song.album,
        albumArtist: song.albumArtist,
        artist: song.artist.join('||'),
        title: song.title
    }).then(
        instance =>
            (song.path
                ? SongPaths.create({
                      path: song.path,
                      songId: instance.id
                  }).then(() => instance)
                : instance)
    );
}

function getAllSongs() {
    return Songs.findAll().then(instances => {
        return instances.map(inst => inst.dataValues);
    });
}

var getSongPath = id => {
    return SongPaths.findOne({ where: { songId: id } }).then(
        res => res.dataValues
    );
};

var flattenSong = song =>
    Object.assign({}, song, {
        artist: song.artist.join('||')
    });

var unflattenSong = song =>
    Object.assign({}, song, {
        artist: song.artist.split('||')
    });

module.exports = {
    addSong,
    deleteAllSongs,
    getAllSongs,
    getSongPath
};
