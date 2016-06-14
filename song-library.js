var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', {
	dialect: 'sqlite',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	storage: './database.sqlite'
});

var Songs = sequelize.define('songs', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	album: Sequelize.STRING,
	albumArtist: Sequelize.STRING,
	artist: Sequelize.STRING,
	title: Sequelize.STRING,
}, {
	freezeTableName: true // Model tableName will be the same as the model name
});

var Playlists = sequelize.define('playlists', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: Sequelize.STRING
});

var PlaylistDetails = sequelize.define('playlistDetails', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	playlistId: {
		type: Sequelize.INTEGER,
		references: {
			model: Playlists,
			key: 'id'
		}
	},
	songId: {
		type: Sequelize.INTEGER,
		references: {
			model: Songs,
			key: 'id'
		}
	},
	sort: Sequelize.INTEGER
});

var initialize = function () {
	return sequelize.sync();
};

var deleteAllSongs = function () {
	return Songs.truncate();
};

var addSong = function (song) {
	return Songs.create({
		album: song.album,
		albumArtist: song.albumArtist,
		artist: song.artist,
		title: song.title
	});
};

var getAllSongs = function () {
	return Songs.findAll();
};

module.exports = {
	addSong,
	deleteAllSongs,
	getAllSongs,
	initialize
};
