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
        songId: songId
    };
}

export function chooseSong(songId) {
    return {
        type: 'CHOOSE_SONG',
        songId: songId
    };
}
