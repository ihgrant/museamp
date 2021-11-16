// @flow
import { Howl, Howler } from "howler";

let currentTrack;

export function load(filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    currentTrack = new Howl({
      onload: resolve,
      onloaderror: reject,
      src: filepath
    });
  });
}

export function play(): void {
  if (currentTrack && currentTrack.playing()) {
    currentTrack.stop();
  }
  currentTrack.play();
}
