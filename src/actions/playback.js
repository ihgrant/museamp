import { playbackActions } from '../consts';

export function chooseSong(songId: number) {
    return {
        type: playbackActions.CHOOSE_SONG,
        id: songId
    };
}

export function toggleShuffle() {
    return { type: playbackActions.TOGGLE_SHUFFLE };
}
