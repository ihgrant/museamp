const test = require("tape");
import { getChosenSong, getPlaylistSongs } from "./selectors";

test("selectors", t => {
  t.test("getChosenSong", st => {
    const testState = {
      chosenSongIndex: 1,
      chosenPlaylistId: 0,
      playlists: [{ name: "test playlist", songIds: [0, 1, 2] }],
      library: [
        { id: 0, title: "song 1" },
        { id: 1, title: "song 2" },
        { id: 2, title: "song 3" }
      ]
    };
    const chosenSong = getChosenSong(testState);
    st.deepEqual(
      chosenSong,
      { id: 1, title: "song 2" },
      "returns the chosen song record"
    );

    st.end();
  });

  t.test("getPlaylistSongs", st => {
    const testState = {
      chosenSongIndex: 1,
      chosenPlaylistId: 0,
      playlists: [{ name: "test playlist", songIds: [0, 1] }],
      library: [
        { id: 0, title: "song 1" },
        { id: 1, title: "song 2" },
        { id: 2, title: "song 3" }
      ]
    };
    const playlist = getPlaylistSongs(testState);
    st.deepEqual(
      playlist,
      [
        { id: 0, title: "song 1" },
        { id: 1, title: "song 2" }
      ],
      "returns the chosen playlist"
    );

    st.end();
  });

  t.end();
});
