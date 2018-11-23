var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage:
        process.env.NODE_ENV === 'test'
            ? './test-database.sqlite'
            : './database.sqlite'
});

var Songs = sequelize.define(
    'songs',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        album: Sequelize.STRING,
        albumArtist: Sequelize.STRING,
        artist: Sequelize.STRING,
        title: Sequelize.STRING,
        path: Sequelize.STRING
    },
    {
        freezeTableName: true // Model tableName will be the same as the model name
    }
);

var SongPaths = sequelize.define('song_paths', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    songId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'songs',
            key: 'id'
        }
    },
    path: Sequelize.STRING
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

// Songs.hasOne(SongPaths);

var authenticate = () => {
    return sequelize.authenticate();
};

var initialize = function() {
    return sequelize.sync();
};

var deleteAllSongs = function() {
    return SongPaths.truncate().then(() => {
        return Songs.truncate();
    });
};

var addSong = song => {
    return Songs.create({
        album: song.album,
        albumArtist: song.albumArtist,
        artist: song.artist.join('||'),
        title: song.title,
        path: song.path
    }).then(instance => {
        // if (song.path) {
        //     console.log(`adding song ${song.path}`);
        //     return SongPaths.create({
        //         path: song.path,
        //         songId: instance.id
        //     }).then(() => instance);
        // } else {
        return instance;
        // }
    });
};

var addSongs = songs => {
    return Songs.bulkCreate(
        songs.map(song => ({
            album: song.album,
            albumArtist: song.albumArtist,
            artist: song.artist.join('||'),
            title: song.title,
            path: song.path
        }))
    );
};

var getAllSongs = function() {
    // return Songs.findAll({ include: [SongPaths] }).then(instances => {
    return Songs.findAll().then(instances => {
        return instances.map(inst => inst.get({ plain: true }));
    });
};

var getSongWithPath = songId => {
    return Songs.find({
        // include: [SongPaths],
        where: { id: songId }
    }).then(songPath => {
        if (songPath) {
            return songPath.get({
                plain: true
            });
        }
        throw new Error('Song not found!');
    });
};

var flattenSong = song => {
    return Object.assign({}, song, {
        artist: song.artist.join('||')
    });
};

var unflattenSong = song => {
    return Object.assign({}, song, {
        artist: song.artist.split('||')
    });
};

module.exports = {
    addSong,
    addSongs,
    authenticate,
    deleteAllSongs,
    getAllSongs,
    getSongWithPath,
    initialize
};
