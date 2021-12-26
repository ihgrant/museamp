// @flow

function getChosenPlaylist(state: AppState): ?Playlist {
  return state.playlists[state.chosenPlaylistId];
}

export function getChosenSong(state: AppState): ?Song {
  const chosenPlaylist = getChosenPlaylist(state);

  if (!chosenPlaylist) {
    return;
  }

  const songId = chosenPlaylist.songIds[state.chosenSongIndex];
  const chosenSong = state.library.find(el => el.id === songId);
  return chosenSong;
}

export function getPlaylistSongs(state: AppState): Song[] {
  const chosenPlaylist = getChosenPlaylist(state);

  if (!chosenPlaylist) {
    return [];
  }

  return chosenPlaylist.songIds.map(songId =>
    state.library.find(el => el.id === songId)
  );
}
