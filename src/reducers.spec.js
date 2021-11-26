const test = require("tape");
import i from "icepick";
import reducer from "./reducers";

function initState(partialState = {}) {
  return i.assign(reducer(undefined, {}), partialState);
}

test("reducers", t => {
  t.test("playlist", st => {
    const addResult = reducer(initState(), {
      type: "PLAYLIST/ADD",
      name: "test"
    });
    st.deepEqual(
      addResult.playlists,
      [{ name: "test", songIds: [] }],
      "adds a playlist"
    );

    const chooseResult = reducer(
      initState({ playlists: [{ name: "test", songIds: [] }] }),
      {
        type: "PLAYLIST/CHOOSE",
        id: 0
      }
    );
    st.equal(chooseResult.chosenPlaylistId, 0, "chooses a playlist");

    const addSongResult = reducer(
      initState({
        chosenPlaylistId: 0,
        playlists: [{ name: "test", songIds: [] }]
      }),
      { type: "PLAYLIST/ADD_SONG", id: 0 }
    );
    st.deepEqual(
      addSongResult.playlists,
      [{ name: "test", songIds: [0] }],
      "adds a song to a playlist"
    );

    const addSongResult2 = reducer(
      initState({
        chosenPlaylistId: 0,
        playlists: [{ name: "test", songIds: [0] }]
      }),
      {
        type: "PLAYLIST/ADD_SONG",
        id: 1
      }
    );
    st.deepEqual(
      addSongResult2.playlists,
      [{ name: "test", songIds: [0, 1] }],
      "adds another song to a playlist"
    );

    const removeSongResult = reducer(
      initState({
        chosenPlaylistId: 0,
        playlists: [{ name: "test", songIds: [0, 1, 2, 3] }]
      }),
      { type: "PLAYLIST/REMOVE_SONG", index: 1 }
    );
    st.deepEqual(
      removeSongResult.playlists,
      [{ name: "test", songIds: [0, 2, 3] }],
      "removes a song from a playlist"
    );

    const removeResult = reducer(
      initState({
        chosenPlaylistId: 0,
        playlists: [{ name: "test", songIds: [] }]
      }),
      { type: "PLAYLIST/REMOVE", id: 0 }
    );
    st.deepEqual(removeResult.playlists, [], "removes a playlist");
    st.equal(
      removeResult.chosenPlaylistId,
      -1,
      "selects  library playlist if no playlists exist"
    );

    st.end();
  });

  t.test("playback", st => {
    const toggleShuffleResult = reducer(initState(), {
      type: "PLAYBACK/TOGGLE_SHUFFLE"
    });
    st.deepEqual(
      toggleShuffleResult.playbackSettings.shuffle,
      true,
      "toggles shuffle"
    );

    st.end();
  });

  t.test("queue", st => {
    const queueAddResult = reducer(initState(), { type: "QUEUE/ADD", id: 0 });
    st.deepEqual(queueAddResult.queue, [0], "adds a song to the queue");

    const queueAddFirstResult = reducer(initState({ queue: [2, 3, 4] }), {
      type: "QUEUE/ADD_FIRST",
      id: 1
    });
    st.deepEqual(
      queueAddFirstResult.queue,
      [1, 2, 3, 4],
      "adds a song to the beginning of the queue"
    );

    const queueRemoveResult = reducer(initState({ queue: [1, 2, 3] }), {
      type: "QUEUE/REMOVE",
      index: 0
    });
    st.deepEqual(
      queueRemoveResult.queue,
      [2, 3],
      "removes a song from the queue"
    );

    const clearQueueResult = reducer(initState({ queue: [1, 2, 3] }), {
      type: "QUEUE/CLEAR"
    });
    st.deepEqual(clearQueueResult.queue, [], "clears the queue");

    st.end();
  });

  t.end();
});
