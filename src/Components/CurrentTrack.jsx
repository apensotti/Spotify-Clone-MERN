import React, { useEffect } from 'react'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios';
import reducerCases from '../utils/Constants';

function CurrentTrack() {
    const [{ token, currentPlaying }, dispatch] = useStateProvider();
    useEffect(() => {
        async function getCurrentTrack() {
            await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
                .then((res) => {
                    if (res.data !== "") {
                        const { item } = res.data;
                        const currentPlaying = {
                            id: item.id,
                            name: item.name,
                            artists: item.artists.map((artist) => artist.name),
                            image: item.album.images[2].url
                        }
                        console.log(currentPlaying);
                        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying })
                    }
                })
                .catch((err) => {
                    console.log("Error in getting current track" + err);
                })
        }
        getCurrentTrack();
    }, [token, dispatch])
    return (
        currentPlaying && (
            <div id="trackDetails">
                <img src={currentPlaying.image} alt="" />
                <div id="trackTitles">
                    <div id="trackName">{currentPlaying.name}</div>
                    <div id="trackArtists">{currentPlaying.artists.join(", ")}</div>
                </div>
            </div>
        )
    )
}

export default CurrentTrack
