// actions.js

export function addSong(song) {
    return {
        type: 'ADD_SONG',
        song: song
    };
}

export function removeSong(songId) {
    return {
        type: 'REMOVE_SONG',
        id: songId
    };
}

export function choosePlaylist(id) {
    return {
        type: 'CHOOSE_PLAYLIST',
        id: id
    };
}

export function chooseSong(songId) {
    return {
        type: 'CHOOSE_SONG',
        id: songId
    };
}
