import React, { useEffect } from 'react'
import axios from "axios"
import { useStateProvider } from '../utils/StateProvider'
import reducerCases from '../utils/Constants';

function Playlists() {
    const [{ token, playlists }, dispatch] = useStateProvider();
    useEffect(() => {
        async function getPlayListsData() {
            await axios.get("https://api.spotify.com/v1/me/playlists", {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
                .then((res) => {
                    const playlists = res.data.items.map((playlist) => {
                        return { name: playlist.name, id: playlist.id }
                    })
                    dispatch({ type: reducerCases.SET_PLAYLISTS, playlists })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        getPlayListsData()
    }, [])

    const changeCurrentPlayList = (selectedPlaylistId) => {
        dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId: selectedPlaylistId })
    }
    return (
        <div id='playlists'>
            {
                playlists.map((playlist) => {
                    return (
                        <div id='playlist' key={playlist.id} onClick={() => changeCurrentPlayList(playlist.id)}>{playlist.name}</div>
                    )
                })
            }
        </div>
    )
}

export default Playlists