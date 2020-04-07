const test = require('tape');
import reducer from '../src/reducers';

test('reducers', function(t) {
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
        'returns initial state'
    );

    state = reducer(state, { type: 'PLAYLIST/ADD', name: 'test' });
    t.deepEqual(
        state.playlists,
        [{ name: 'test', songIds: [] }],
        'adds a playlist'
    );

    state = reducer(state, { type: 'PLAYLIST/CHOOSE', id: 0 });
    t.equal(state.chosenPlaylistId, 0, 'chooses a playlist');

    state = reducer(state, { type: 'PLAYLIST/ADD_SONG', id: 0 });
    t.deepEqual(
        state.playlists,
        [{ name: 'test', songIds: [0] }],
        'adds a song to a playlist'
    );

    state = reducer(state, { type: 'PLAYLIST/ADD_SONG', id: 1 });
    t.deepEqual(
        state.playlists,
        [{ name: 'test', songIds: [0, 1] }],
        'adds another song to a playlist'
    );

    state = reducer(state, { type: 'PLAYLIST/REMOVE_SONG', id: 0 });
    t.deepEqual(
        state.playlists,
        [{ name: 'test', songIds: [1] }],
        'removes a song from a playlist'
    );

    state = reducer(state, { type: 'PLAYLIST/REMOVE', id: 0 });
    t.deepEqual(state.playlists, [], 'removes a playlist');

    state = reducer(state, { type: 'PLAYBACK/TOGGLE_SHUFFLE' });
    t.deepEqual(state.playbackSettings.shuffle, true, 'toggles shuffle');

    t.end();
});
