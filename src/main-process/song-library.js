const Sequelize = require("sequelize");
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  storage:
    process.env.NODE_ENV === "test"
      ? "./test-database.sqlite"
      : "./database.sqlite"
});

const Songs = sequelize.define(
  "songs",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    album: Sequelize.STRING,
    albumArtist: Sequelize.STRING,
    artist: Sequelize.STRING,
    title: Sequelize.STRING
  },
  {
    freezeTableName: true // Model tableName will be the same as the model name
  }
);

const SongPaths = sequelize.define("song_paths", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  songId: {
    type: Sequelize.INTEGER,
    references: {
      model: "songs",
      key: "id"
    }
  },
  path: Sequelize.STRING
});

const Playlists = sequelize.define("playlists", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: Sequelize.STRING
});

const PlaylistDetails = sequelize.define("playlistDetails", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  playlistId: {
    type: Sequelize.INTEGER,
    references: {
      model: Playlists,
      key: "id"
    }
  },
  songId: {
    type: Sequelize.INTEGER,
    references: {
      model: Songs,
      key: "id"
    }
  },
  sort: Sequelize.INTEGER
});

Songs.hasOne(SongPaths);

const authenticate = () => {
  return sequelize.authenticate();
};

const initialize = function() {
  return sequelize.sync();
};

const deleteAllSongs = function() {
  return SongPaths.truncate().then(() => {
    return Songs.truncate();
  });
};

const addSong = song => {
  return Songs.create({
    album: song.album,
    albumArtist: song.albumArtist,
    artist: song.artist.join("||"),
    title: song.title
  }).then(instance => {
    if (song.path) {
      return SongPaths.create({
        path: song.path,
        songId: instance.id
      }).then(() => instance);
    } else {
      return instance;
    }
  });
};

const getAllSongs = function() {
  return Songs.findAll({ include: [SongPaths] }).then(instances => {
    return instances.map(inst => inst.get({ plain: true }));
  });
};

const getSongWithPath = songId => {
  return Songs.findOne({
    include: [SongPaths],
    where: { id: songId }
  }).then(songPath => songPath.get({ plain: true }));
};

const flattenSong = song => {
  return Object.assign({}, song, {
    artist: song.artist.join("||")
  });
};

const unflattenSong = song => {
  return Object.assign({}, song, {
    artist: song.artist.split("||")
  });
};

module.exports = {
  addSong,
  authenticate,
  deleteAllSongs,
  getAllSongs,
  getSongWithPath,
  initialize
};
