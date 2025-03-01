import React from 'react'
import { MdShuffle, MdSkipPrevious, MdSkipNext, MdRepeat, MdPlayCircle, MdPauseCircle } from "react-icons/md"
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios';
import reducerCases from '../utils/Constants';

function TrackControls() {
    const [{ token, playState }, dispatch] = useStateProvider();
    const changeTrack = async (type) => {
        await axios.post(`https://api.spotify.com/v1/me/player/${type}`, {}, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
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
                else {
                    dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
                }
            })
            .catch((err) => {
                console.log("Error in getting current track" + err);
            })
    }


    const playTrack = async () => {
        const state = playState ? "pause" : "play";
        await axios.put(`https://api.spotify.com/v1/me/player/${state}`, {}, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playState: !playState })
    }
    return (
        <div id='trackControls'>
            <div id='playControls'>
                <div id='icon'>
                    <MdShuffle />
                </div>
                <div id='icon'>
                    <MdSkipPrevious onClick={() => changeTrack("previous")} />
                </div>
                <div id='icon' className='playIcon'>
                    {playState ? <MdPauseCircle onClick={playTrack}/> : <MdPlayCircle onClick={playTrack}/>}
                </div>
                <div id='icon'>
                    <MdSkipNext onClick={() => changeTrack("next")} />
                </div>
                <div id='icon'>
                    <MdRepeat />
                </div>
            </div>
        </div>
    )
}

export default TrackControls
