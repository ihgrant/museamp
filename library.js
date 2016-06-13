var SONG_TABLE = require('./consts').SONG_TABLE;
var knex = require('knex')({
	dialect: 'sqlite3',
	connection: {
		filename: './library.db'
	},
	useNullAsDefault: true
});

var initialize = function () {
	return knex.schema.createTableIfNotExists(SONG_TABLE, function (table) {
		table.increments('id');
		table.string('title');
		table.string('album');
		table.string('artist');
	}).createTableIfNotExists('file_references', function (table) {
		table.increments('id');
		table.string('filepath');
		table.integer('song_id').unsigned().references('songs.id');
	})
	.then(() => knex.table(SONG_TABLE).count('title'));
};

var deleteAllSongs = function () {
	return knex(SONG_TABLE).del().then(res => res);
};

var addSong = function (song) {
	return knex(SONG_TABLE).insert({
		title: song.title,
		album: song.album,
		artist: song.artist
	}).then(rows => {
		return knex('file_references').insert({
			filepath: song.filepath,
			song_id: rows[0]
		});
	});
};

var getAllSongs = function () {
	return knex(SONG_TABLE)
	.join('file_references', 'songs.id', 'file_references.song_id')
	.select('songs.title as title', 'file_references.filepath as filepath')
	.then(rows => {
		console.log(rows);
		return rows;
	}).catch(err => {
		console.log(err);
		throw err;
	});
};

module.exports = {
	addSong,
	deleteAllSongs,
	getAllSongs,
	initialize
};
