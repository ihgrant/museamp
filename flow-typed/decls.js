// @flow

type AppState = {
    chosenSongId: number,
    chosenPlaylist: number,
    library: Song[],
    paused: boolean,
    playlists: Playlist[]
}

type Playlist = Song[]

type Song: {
    album: ?string,
    albumArtist: ?string,
    artist: ?string,
    id: number,
    song_path: ?SongPath
    title: ?string
}

type SongPath = {
    id: number,
    songPath: string
}
