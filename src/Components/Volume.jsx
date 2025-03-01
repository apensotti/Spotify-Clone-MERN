import React from 'react'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios';

function Volume() {
    const [{ token }] = useStateProvider();
    const setVolume = async (e) => {
        await axios.put(`https://api.spotify.com/v1/me/player/volume?volume_percent=${parseInt(e.target.value)}`, {}, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }
    return (
        <div id='volume'>
            <input type="range" min={0} max={100} onMouseUp={(e) => setVolume(e)} />
        </div>
    )
}

export default Volume
