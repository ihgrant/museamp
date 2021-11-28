const test = require("tape");
import i from "icepick";
import { chooseAndPlaySong, pauseSong, playSong, stopSong } from "./playback";

test("playback thunks", t => {
  t.test("chooseAndPlaySong", st => {
    st.plan(4);
    let loadWasCalled = false;
    let playWasCalled = false;
    let dispatchCalls = 0;
    const mockAudioContext = {
      load: () => {
        loadWasCalled = true;
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

    return dispatchAction(dispatchedAction => {
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

    // st.end();
  });

  t.test("pauseSong", st => {
    let pauseWasCalled = false;
    const mockAudioContext = {
      pause: () => {
        pauseWasCalled = true;
      }
    };
    const dispatchAction = pauseSong({
      _audioContext: mockAudioContext
    });

    dispatchAction(dispatchedAction => {
      st.deepEqual(
        dispatchedAction,
        { type: "PLAYBACK/PAUSE" },
        "dispatches pause action"
      );
      st.equal(pauseWasCalled, true, "pause was called");
    });

    st.end();
  });

  t.test("playSong", st => {
    let playWasCalled = false;
    const mockAudioContext = {
      play: () => {
        playWasCalled = true;
      }
    };
    const dispatchAction = playSong({
      _audioContext: mockAudioContext
    });

    dispatchAction(
      dispatchedAction => {
        throw new Error("no actions should be dispatched");
      },
      () => ({
        chosenSongId: -1,
        playback: { paused: true }
      })
    );
    st.equal(playWasCalled, false, "does not call play if no song is chosen");
    playWasCalled = false;

    dispatchAction(
      dispatchedAction => {
        throw new Error("no actions should be dispatched");
      },
      () => ({
        chosenSongId: 1,
        playback: { paused: false }
      })
    );
    st.equal(playWasCalled, false, "does not call play if song is not paused");
    playWasCalled = false;

    dispatchAction(
      dispatchedAction => {
        st.deepEqual(
          dispatchedAction,
          { type: "PLAYBACK/PLAY" },
          "dispatches play action if song is chosen and paused"
        );
        st.equal(
          playWasCalled,
          true,
          "calls play if song is chosen and paused"
        );
      },
      () => ({
        chosenSongId: 1,
        playback: { paused: true }
      })
    );
    // starts playback if song is chosen and paused
    st.end();
  });

  t.test("stopSong", st => {
    let stopWasCalled = false;
    const mockAudioContext = {
      stop: () => {
        stopWasCalled = true;
      }
    };
    const dispatchAction = stopSong({
      _audioContext: mockAudioContext
    });

    dispatchAction(dispatchedAction => {
      st.deepEqual(
        dispatchedAction,
        {
          type: "PLAYBACK/STOP"
        },
        "dispatches stop action"
      );
      st.equal(stopWasCalled, true, "calls stop method");
    });

    st.end();
  });

  t.end();
});
