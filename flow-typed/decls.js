// @flow

type Action =
    | { type: 'ADD_SONG', song: Song }
    | { type: 'REMOVE_SONG', id: number }
    | { type: 'CHOOSE_PLAYLIST', id: number }
    | { type: 'CHOOSE_SONG', id: number };

type AppState = {
    +chosenSongId: number,
    +chosenPlaylistId: number,
    +library: Song[],
    +paused: boolean,
    +playlists: Playlist[]
};

type Playlist = {
    +name: string,
    +songs: Song[]
};

type Song = {
    album: ?string,
    albumArtist: ?string,
    artist: ?string,
    id: number,
    song_path: ?SongPath,
    title: ?string
};

type SongPath = {
    id: number,
    songPath: string
};
