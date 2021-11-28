// @flow
import { playbackActions } from "../consts";
import audioContext from "../audio-context";

export function chooseAndPlaySong({
  _audioContext = audioContext,
  filepath,
  songId
}: {
  songId: SongId,
  filepath: string,
  _audioContext?: typeof audioContext
}): ThunkAction {
  return function(dispatch: Dispatch) {
    return _audioContext.load(filepath).then(() => {
      dispatch(chooseSong(songId));
      _audioContext.play();
      dispatch(play());
    });
  };
}

export function chooseSong(songId: SongId) {
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

export function pauseSong({
  _audioContext = audioContext
}: {
  _audioContext?: typeof audioContext
}): ThunkAction {
  return function(dispatch: Dispatch) {
    _audioContext.pause();
    dispatch(pause());
  };
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
