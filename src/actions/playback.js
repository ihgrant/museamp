// @flow
import { getChosenSong } from "../selectors";
import { playbackActions } from "../consts";
import audioContext from "../audio-context";

export function chooseAndPlaySong({
  _audioContext = audioContext,
  filepath,
  songIndex
}: {
  songIndex: number,
  filepath: string,
  _audioContext?: typeof audioContext
}): ThunkAction {
  return function(dispatch: Dispatch, getState: GetState) {
    const state = getState();
    const chosenSong = getChosenSong(state);

    if (!chosenSong) {
      return;
    }

    return Promise.resolve()
      .then(() =>
        _audioContext.load({
          filepath,
          onPause: () => dispatch(pause()),
          onPlay: () => dispatch(play()),
          onStop: () => dispatch(stop())
        })
      )
      .then(() => {
        dispatch(chooseSong(songIndex));
        _audioContext.play();
      });
  };
}

export function chooseSong(songIndex: number): Action {
  return {
    type: playbackActions.CHOOSE_SONG,
    index: songIndex
  };
}

export function next(): Action {
  return { type: playbackActions.NEXT };
}

export function pause(): Action {
  return { type: playbackActions.PAUSE };
}

export function pauseSong({
  _audioContext = audioContext
}: {
  _audioContext?: typeof audioContext
}): ThunkAction {
  return function(dispatch: Dispatch) {
    _audioContext.pause();
    // dispatch(pause());
  };
}

function play(): Action {
  return { type: playbackActions.PLAY };
}

export function playSong({
  _audioContext = audioContext
}: {
  _audioContext?: typeof audioContext
}): ThunkAction {
  return function(dispatch: Dispatch, getState: GetState) {
    const state = getState();
    if (state.playback.paused && state.chosenSongIndex > -1) {
      _audioContext.play();
      // dispatch(play());
    }
  };
}

export function previous(): Action {
  return { type: playbackActions.PREVIOUS };
}

function stop(): Action {
  return { type: playbackActions.STOP };
}

export function stopSong({
  _audioContext = audioContext
}: {
  _audioContext?: typeof audioContext
}): ThunkAction {
  return function(dispatch: Dispatch) {
    _audioContext.stop();
    // dispatch(stop());
  };
}

export function toggleShuffle(): Action {
  return { type: playbackActions.TOGGLE_SHUFFLE };
}
