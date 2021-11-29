// @flow

const draggableTypes = {
  LIBRARYITEM: "libraryitem",
  PLAYLISTITEM: "playlistitem"
};

const libraryActions = {
  ADD_SONG: "LIBRARY/ADD_SONG",
  ADD_SONG_BULK: "LIBRARY/ADD_SONG_BULK"
};
const playbackActions = {
  CHOOSE_SONG: "PLAYBACK/CHOOSE_SONG",
  NEXT: "PLAYBACK/NEXT",
  PAUSE: "PLAYBACK/PAUSE",
  PLAY: "PLAYBACK/PLAY",
  PREVIOUS: "PLAYBACK/PREVIOUS",
  STOP: "PLAYBACK/STOP",
  TOGGLE_SHUFFLE: "PLAYBACK/TOGGLE_SHUFFLE"
};
const playlistActions = {
  ADD: "PLAYLIST/ADD",
  ADD_SONG: "PLAYLIST/ADD_SONG",
  CHOOSE: "PLAYLIST/CHOOSE",
  MOVE_SONG: "PLAYLIST/MOVE_SONG",
  REMOVE: "PLAYLIST/REMOVE",
  REMOVE_SONG: "PLAYLIST/REMOVE_SONG"
};

export { draggableTypes, libraryActions, playbackActions, playlistActions };
