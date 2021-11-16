import { playbackActions } from "../consts";
import { load as loadAudio, play as playAudio } from "../audio-context";

export function chooseAndPlaySong(songId: number, filepath: string) {
  return function(dispatch) {
    dispatch(chooseSong(songId));
    loadAudio(filepath).then(() => {
      dispatch(play());
      playAudio();
    });
  };
}

export function chooseSong(songId: number) {
  return {
    type: playbackActions.CHOOSE_SONG,
    id: songId
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
