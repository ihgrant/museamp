// @flow
import { libraryActions } from "../consts";

export function addSong(song: Song) {
  return {
    type: libraryActions.ADD_SONG,
    song: song
  };
}

export function addSongBulk(songs: Song[]) {
  return {
    type: libraryActions.ADD_SONG_BULK,
    songs
  };
}
