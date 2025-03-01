import reducerCases from "./Constants";

const initialState = {
    token: null,
    playlists: [],
    userInfo: null,
    selectedPlaylistId: "6w9yXoENbUZawha9wCuW9o",
    selectedPlayList: null,
    currentPlaying: null,
    playState: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case reducerCases.SET_TOKEN: {
            return {
                ...state, token: action.token,
            }
        }
        case reducerCases.SET_PLAYLISTS: {
            return {
                ...state, playlists: action.playlists
            }
        }
        case reducerCases.SET_USERINFO: {
            return {
                ...state, userInfo: action.userInfo
            }
        }
        case reducerCases.SET_PLAYLIST: {
            return {
                ...state, selectedPlayList: action.selectedPlayList
            }
        }
        case reducerCases.SET_PLAYING: {
            return {
                ...state, currentPlaying: action.currentPlaying
            }
        }
        case reducerCases.SET_PLAYER_STATE: {
            return {
                ...state, playState: action.playState
            }
        }
        case reducerCases.SET_PLAYLIST_ID: {
            return {
                ...state, selectedPlaylistId: action.selectedPlaylistId
            }
        }
        default:
            return state;
    }
}



export { initialState, reducer }