import { playlistActions } from "../consts";

export function addPlaylist(name: string) {
  return {
    type: playlistActions.ADD,
    name: name
  };
}

export function removePlaylist(id: number) {
  return {
    type: playlistActions.REMOVE,
    id: id
  };
}

export function choosePlaylist(playlistId: number) {
  return {
    type: playlistActions.CHOOSE,
    id: playlistId
  };
}

export function playlistAddSong(songId: number) {
  return {
    type: playlistActions.ADD_SONG,
    id: songId
  };
}

export function playlistRemoveSong(songId: number) {
  return {
    type: playlistActions.REMOVE_SONG,
    id: songId
  };
}
