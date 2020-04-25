// @flow

type Action =
    | { type: 'LIBRARY/ADD_SONG', song: Song }
    | { type: 'LIBRARY/ADD_SONG_BULK', songs: Song[] }
    | { type: 'PLAYBACK/CHOOSE_SONG', id: number }
    | { type: 'PLAYBACK/NEXT' }
    | { type: 'PLAYBACK/PAUSE' }
    | { type: 'PLAYBACK/PLAY' }
    | { type: 'PLAYBACK/PREVIOUS' }
    | { type: 'PLAYBACK/STOP' }
    | { type: 'PLAYBACK/TOGGLE_SHUFFLE' }
    | { type: 'PLAYLIST/ADD', name: string }
    | { type: 'PLAYLIST/ADD_SONG', id: number }
    | { type: 'PLAYLIST/CHOOSE', id: number }
    | { type: 'PLAYLIST/REMOVE', id: number }
    | { type: 'PLAYLIST/REMOVE_SONG', id: number };

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
