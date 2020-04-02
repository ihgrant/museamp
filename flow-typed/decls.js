// @flow

type Action =
    | { type: 'ADD_PLAYLIST', name: string }
    | { type: 'ADD_SONG', song: Song }
    | { type: 'CHOOSE_PLAYLIST', id: number }
    | { type: 'CHOOSE_SONG', id: number }
    | { type: 'PLAYLIST_ADD_SONG', id: number }
    | { type: 'PLAYLIST_REMOVE_SONG', id: number }
    | { type: 'REMOVE_PLAYLIST', id: number }
    | { type: 'TOGGLE_SHUFFLE' };

type AppState = {
    +chosenSongId: number,
    +chosenPlaylistId: number,
    +library: Song[],
    +playback: {
        +paused: boolean,
        +progress: number,
        +songId: number
    },
    +playbackSettings: {
        +cursorFollowsPlayback: boolean,
        +playbackFollowsCursor: boolean,
        +repeat: boolean,
        +shuffle: boolean
    },
    +playlists: Playlist[]
};

type Playlist = {
    +name: string,
    +songIds: number[]
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
