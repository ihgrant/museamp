// actions.js

export function addLibrary(library: Song[]) {
    return {
        type: 'ADD_LIBRARY',
        library
    };
}

export function addPlaylist(name) {
    return {
        type: 'ADD_PLAYLIST',
        name: name
    };
}

export function removePlaylist(id) {
    return {
        type: 'REMOVE_PLAYLIST',
        id: id
    };
}

export function addSong(song) {
    return {
        type: 'ADD_SONG',
        song: song
    };
}

export function choosePlaylist(playlistId) {
    return {
        type: 'CHOOSE_PLAYLIST',
        id: playlistId
    };
}

export function chooseSong(songId) {
    return {
        type: 'CHOOSE_SONG',
        id: songId
    };
}

export function playlistAddSong(songId) {
    return {
        type: 'PLAYLIST_ADD_SONG',
        id: songId
    };
}

export function playlistRemoveSong(songId) {
    return {
        type: 'PLAYLIST_REMOVE_SONG',
        id: songId
    };
}

export function toggleShuffle() {
    return { type: 'TOGGLE_SHUFFLE' };
}

export function updateMessage(message) {
    return { type: 'UPDATE_MESSAGE', message };
}
