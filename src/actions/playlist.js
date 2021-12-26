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

export function playlistAddSong(songId: SongId, index?: number): Action {
  return {
    type: playlistActions.ADD_SONG,
    id: songId,
    index
  };
}

export function playlistMoveSong(oldIndex: number, newIndex: number): Action {
  return {
    type: playlistActions.MOVE_SONG,
    newIndex,
    oldIndex
  };
}

export function playlistRemoveSong(songIndex: number): Action {
  return {
    type: playlistActions.REMOVE_SONG,
    index: songIndex
  };
}
