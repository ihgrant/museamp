// @flow
import { playlistActions } from "../consts";

export function addPlaylist(name: string): Action {
  return {
    type: playlistActions.ADD,
    name: name
  };
}

export function removePlaylist(id: number): Action {
  return {
    type: playlistActions.REMOVE,
    id: id
  };
}

export function choosePlaylist(playlistId: number): Action {
  return {
    type: playlistActions.CHOOSE,
    id: playlistId
  };
}

export function playlistAddSong(songId: SongId): Action {
  return {
    type: playlistActions.ADD_SONG,
    id: songId
  };
}

export function playlistRemoveSong(songIndex: number): Action {
  return {
    type: playlistActions.REMOVE_SONG,
    index: songIndex
  };
}
