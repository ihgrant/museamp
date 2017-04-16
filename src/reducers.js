import { combineReducers } from 'redux'
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ]
        case TOGGLE_TODO:
            return state.map((todo, index) => {
                if (index === action.index) {
                    return Object.assign({}, todo, {
                        completed: !todo.completed
                    })
                }
                return todo
            })
        default:
            return state
    }
}

function playlist(state = -1, action) {

}

const todoApp = combineReducers({
    visibilityFilter,
    todos
})

export default todoApp

/* --------------------------------------------------------------

let museamp = (state, action) => {
    return {
        paused: false
        playingSongId: 0 // songId
        playlists: [
            {
                name: '',
                songs: []
            }
        ],
        playbackMode: 'DEFAULT' || 'SHUFFLE' || 'REPEAT',
        nextMode: 'SELECTED' || 'PLAYLIST',
        selectedSongId: 0,
        selectedPlaylistId: 0
    }
}

function paused(state = false, action) {
    switch(action.type) {
        case 'PAUSE': return true;
        case 'UNPAUSE': return false;
        default: return state;
    }
}

function playingSongId(state = 0, action) {
    switch(action.type) {
        case 'NEXT_SONG':
            switch()
        default: return state;
    }
}

*/
