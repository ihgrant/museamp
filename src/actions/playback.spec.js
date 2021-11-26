const test = require("tape");
import i from "icepick";
import { chooseAndPlaySong } from "./playback";

test("playback thunks", t => {
  t.test("chooseAndPlaySong", st => {
    let loadWasCalled = false;
    let playWasCalled = false;
    let dispatchCalls = 0;
    const mockAudioContext = {
      load: () => {
        loadWasCalled = true;
        console.info("LOAD");
        return Promise.resolve();
      },
      play: () => {
        playWasCalled = true;
      }
    };
    const dispatchAction = chooseAndPlaySong({
      songId: 2,
      filepath: "./test-path",
      _audioContext: mockAudioContext
    });

    dispatchAction(dispatchedAction => {
      dispatchCalls += 1;

      if (dispatchCalls === 1) {
        st.deepEqual(
          dispatchedAction,
          { type: "PLAYBACK/CHOOSE_SONG", id: 2 },
          "dispatches choose action"
        );
        st.equal(loadWasCalled, true, "load was called");
      } else if (dispatchCalls === 2) {
        st.equal(playWasCalled, true, "play was called");
        st.deepEqual(
          dispatchedAction,
          { type: "PLAYBACK/PLAY" },
          "dispatches play action"
        );
      }
    });

    st.end();
  });

  t.end();
});
