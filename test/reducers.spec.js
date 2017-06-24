const test = require('tape');
import reducer from '../src/reducers';

test('reducers', function (t) {
    let state = reducer(undefined, {});

    t.deepEqual(
        state,
        {
            chosenSongId: -1,
            chosenPlaylistId: -1,
            library: [],
            paused: true,
            playlists: []
        },
        'returns initial state'
    );

    state = reducer(state, { type: 'ADD_PLAYLIST', name: 'test' });

    t.deepEqual(
        state,
        {
            chosenSongId: -1,
            chosenPlaylistId: -1,
            library: [],
            paused: true,
            playlists: [{ name: 'test', songIds: [] }]
        },
        'adds a playlist'
    );

    state = reducer(state, { type: 'CHOOSE_PLAYLIST', id: 0 });

    t.deepEqual(
        state,
        {
            chosenSongId: -1,
            chosenPlaylistId: 0,
            library: [],
            paused: true,
            playlists: [{ name: 'test', songIds: [] }]
        },
        'chooses a playlist'
    );

    state = reducer(state, { type: 'PLAYLIST_ADD_SONG', id: 0 });

    t.deepEqual(
        state,
        {
            chosenSongId: -1,
            chosenPlaylistId: 0,
            library: [],
            paused: true,
            playlists: [{ name: 'test', songIds: [0] }]
        },
        'adds a song to a playlist'
    );

    state = reducer(state, { type: 'PLAYLIST_ADD_SONG', id: 1 });

    t.deepEqual(
        state,
        {
            chosenSongId: -1,
            chosenPlaylistId: 0,
            library: [],
            paused: true,
            playlists: [{ name: 'test', songIds: [0, 1] }]
        },
        'adds another song to a playlist'
    );

    state = reducer(state, { type: 'PLAYLIST_REMOVE_SONG', id: 0 });

    t.deepEqual(
        state,
        {
            chosenSongId: -1,
            chosenPlaylistId: 0,
            library: [],
            paused: true,
            playlists: [{ name: 'test', songIds: [1] }]
        },
        'removes a song from a playlist'
    );

    state = reducer(state, { type: 'REMOVE_PLAYLIST', id: 0 });

    t.deepEqual(
        state,
        {
            chosenSongId: -1,
            chosenPlaylistId: 0,
            library: [],
            paused: true,
            playlists: []
        },
        'removes a playlist'
    );

    t.end();
});
