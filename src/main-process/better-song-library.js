var Database = require('better-sqlite3');
var db = new Database('database.sqlite');

db.exec(
    'CREATE TABLE IF NOT EXISTS `songs` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `album` VARCHAR(255), `albumArtist` VARCHAR(255), `artist` VARCHAR(255), `title` VARCHAR(255), `path` VARCHAR(255))'
);
db.exec(
    'CREATE TABLE IF NOT EXISTS `playlists` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `name` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL)'
);
db.exec(
    'CREATE TABLE IF NOT EXISTS `playlistDetails` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `playlistId` INTEGER REFERENCES `playlists` (`id`), `songId` INTEGER REFERENCES `songs` (`id`), `sort` INTEGER)'
);

const addSong = db.prepare(
    'INSERT INTO `songs` (`album`,`artist`,`title`,`path`) VALUES (@album, @artist, @title, @path);'
);
const getSongs = db.prepare('SELECT album, artist, title, path FROM songs;');

module.exports.addSongs = function addSongs(songs) {
    songs.forEach(song => addSong.run(song));
    return;
};

module.exports.getSongs = function getSongs() {
    return Promise.resolve(getSongs.run());
};
