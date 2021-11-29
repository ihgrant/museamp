// @flow
import { Howl, Howler } from "howler";

let currentTrack;
let _onPause;
let _onPlay;
let _onStop;

export default {
  load,
  pause,
  play,
  stop
};

function load(
  {
    filepath,
    onPause,
    onPlay,
    onStop
  }: {
    filepath: string,
    onPause?: GenericCallback,
    onPlay?: GenericCallback,
    onStop?: GenericCallback
  } = {
    onPause: _onPause,
    onPlay: _onPlay,
    onStop: _onStop
  }
): Promise<void> {
  _onPause = onPause;
  _onPlay = onPlay;
  _onStop = onStop;

  return new Promise((resolve, reject) => {
    Howler.stop();
    currentTrack = new Howl({
      onload: resolve,
      onloaderror: reject,
      onpause: onPause,
      onplay: onPlay,
      onstop: onStop,
      src: filepath
    });
  });
}

function pause(): void {
  if (currentTrack && currentTrack.playing()) {
    currentTrack.pause();
  }
}

function play(): void {
  if (currentTrack && !currentTrack.playing()) {
    currentTrack.play();
  }
}

function stop(): void {
  Howler.stop();
}
