// @flow
import { Howl, Howler } from "howler";

let currentTrack;

export default {
  load,
  pause,
  play,
  stop
};

function load(filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    currentTrack = new Howl({
      onload: resolve,
      onloaderror: reject,
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
