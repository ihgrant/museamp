// @flow

export function getChosenSong(state: AppState): ?Song {
  const chosenPlaylist = state.playlists[state.chosenPlaylistId];
  const songId = chosenPlaylist.songIds[state.chosenSongIndex];
  const chosenSong = state.library.find(el => el.id === songId);
  return chosenSong;
}

export function getPlaylistSongs(state: AppState): Song[] {
  const chosenPlaylist = state.playlists[state.chosenPlaylistId];

  if (!chosenPlaylist) {
    return [];
  }

  return chosenPlaylist.songIds.map(songId =>
    state.library.find(el => el.id === songId)
  );
}
