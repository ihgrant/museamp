const test = require("tape");
import reducer from "../src/reducers";

test("reducers", function(t) {
  let state = reducer(undefined, {});
  t.deepEqual(
    state,
    {
      chosenSongId: -1,
      chosenPlaylistId: -1,
      library: [],
      playback: {
        paused: true,
        progress: 0,
        songId: -1
      },
      playbackSettings: {
        cursorFollowsPlayback: false,
        playbackFollowsCursor: false,
        repeat: false,
        shuffle: false
      },
      playlists: []
    },
    "returns initial state"
  );

  t.test("playlist", st => {
    const addState = reducer(state, { type: "PLAYLIST/ADD", name: "test" });
    st.deepEqual(
      addState.playlists,
      [{ name: "test", songIds: [] }],
      "adds a playlist"
    );

    const chooseState = reducer(addState, { type: "PLAYLIST/CHOOSE", id: 0 });
    st.equal(chooseState.chosenPlaylistId, 0, "chooses a playlist");

    const addSongState = reducer(chooseState, {
      type: "PLAYLIST/ADD_SONG",
      id: 0
    });
    st.deepEqual(
      addSongState.playlists,
      [{ name: "test", songIds: [0] }],
      "adds a song to a playlist"
    );

    const addSongState2 = reducer(addSongState, {
      type: "PLAYLIST/ADD_SONG",
      id: 1
    });
    st.deepEqual(
      addSongState2.playlists,
      [{ name: "test", songIds: [0, 1] }],
      "adds another song to a playlist"
    );

    const removeSongState = reducer(addSongState2, {
      type: "PLAYLIST/REMOVE_SONG",
      index: 0
    });
    st.deepEqual(
      removeSongState.playlists,
      [{ name: "test", songIds: [1] }],
      "removes a song from a playlist"
    );

    const removeState = reducer(removeSongState, {
      type: "PLAYLIST/REMOVE",
      id: 0
    });
    st.deepEqual(removeState.playlists, [], "removes a playlist");

    const shuffleState = reducer(removeState, {
      type: "PLAYBACK/TOGGLE_SHUFFLE"
    });
    st.deepEqual(
      shuffleState.playbackSettings.shuffle,
      true,
      "toggles shuffle"
    );

    st.end();
  });

  t.end();
});
