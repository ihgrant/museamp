import { playbackActions } from '../consts';

export function chooseSong(songId: number) {
    return {
        type: playbackActions.CHOOSE_SONG,
        id: songId,
    };
}

export function next() {
    return { type: playbackActions.NEXT };
}

export function pause() {
    return { type: playbackActions.PAUSE };
}

export function play() {
    return { type: playbackActions.PLAY };
}

export function previous() {
    return { type: playbackActions.PREVIOUS };
}

export function stop() {
    return { type: playbackActions.STOP };
}

export function toggleShuffle() {
    return { type: playbackActions.TOGGLE_SHUFFLE };
}
