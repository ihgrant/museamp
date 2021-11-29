// @flow

type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => AppState;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Action =
  | { type: "LIBRARY/ADD_SONG", song: Song }
  | { type: "LIBRARY/ADD_SONG_BULK", songs: Song[] }
  | { type: "PLAYBACK/CHOOSE_SONG", id: SongId }
  | { type: "PLAYBACK/NEXT" }
  | { type: "PLAYBACK/PAUSE" }
  | { type: "PLAYBACK/PLAY" }
  | { type: "PLAYBACK/PREVIOUS" }
  | { type: "PLAYBACK/STOP" }
  | { type: "PLAYBACK/TOGGLE_SHUFFLE" }
  | { type: "PLAYLIST/ADD", name: string }
  | { type: "PLAYLIST/ADD_SONG", id: SongId }
  | { type: "PLAYLIST/CHOOSE", id: number }
  | { type: "PLAYLIST/REMOVE", id: number }
  | { type: "PLAYLIST/REMOVE_SONG", index: number };

type AppState = {
  +chosenSongId: SongId,
  +chosenPlaylistId: number,
  +library: Song[],
  +playback: {
    +paused: boolean,
    +progress: number,
    +songId: SongId
  },
  +playbackSettings: {
    +cursorFollowsPlayback: boolean,
    +playbackFollowsCursor: boolean,
    +repeat: boolean,
    +shuffle: boolean
  },
  +playlists: Playlist[]
};

type Playlist = {
  +name: string,
  +songIds: SongId[]
};

type Song = {
  album: ?string,
  albumArtist: ?string,
  artist: ?string,
  id: SongId,
  song_path: SongPath,
  title: ?string
};

type SongId = number;

type SongPath = {
  id: number,
  path: string
};

type GenericCallback = () => void;
