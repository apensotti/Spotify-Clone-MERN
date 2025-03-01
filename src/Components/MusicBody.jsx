import React, { useEffect } from 'react'
import { useStateProvider } from '../utils/StateProvider'
import { MdSchedule } from "react-icons/md"
import axios from 'axios';
import reducerCases from '../utils/Constants';

function MusicBody() {
  const [{ token, selectedPlaylistId, selectedPlayList }, dispatch] = useStateProvider();
  useEffect(() => {
    async function getInitialPlaylist() {
      await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        .then((res) => {
          const selectedPlayList = {
            id: res.data.id,
            name: res.data.name,
            description: res.data.description.startsWith("<a") ? "" : res.data.description,
            image: res.data.images[0].url,
            tracks: res.data.tracks.items.map(({ track }) => ({
              id: track?.id || '',
              name: track?.name || 'Unknown Track',
              artists: track?.artists?.map((artist) => artist.name) || [],
              image: track?.album?.images?.[2]?.url || '',
              duration: track?.duration_ms || 0,
              album: track?.album?.name || 'Unknown Album',
              context_uri: track?.album?.uri || '',
              track_number: track?.track_number || 0,
            }))
          }
          dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlayList })
        })
        .catch((err) => {
          console.log(err + "error message from message body!")
        })
    }
    getInitialPlaylist()
  }, [token, dispatch, selectedPlaylistId])

  const playTrack = async (id, name, artists, image, context_uri, track_number) => {
    await axios.put("https://api.spotify.com/v1/me/player/play",
      {
        context_uri,
        offset: {
          position: track_number - 1
        },
        position_ms: 0
      },
      {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then((res) => {
        if (res.status == 204) {
          const currentPlaying = {
            id, name, artists, image
          };
          dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: currentPlaying })
          dispatch({ type: reducerCases.SET_PLAYER_STATE, playState: true })
        }
        else {
          dispatch({ type: reducerCases.SET_PLAYER_STATE, playState: true })
        }
      })
      .catch((err) => {
        console.log("error in changing playtrack on click" + err)
      })
  }
  return (
    <div id='musicBody'>
      <div id="playListMain">
        <img src={selectedPlayList?.image} alt="" />
        <div id="playListTitleBlock">
          <div id="playlistSay">PLAYLIST</div>
          <div id="playListTitle">{selectedPlayList?.name}</div>
        </div>
      </div>
      <div id="playListSongs">
        <div id="playListSongsHeader">
          <div id="number">#</div>
          <div id="title">TITLE</div>
          <div id="album">ALBUM</div>
          <div id="duration"><MdSchedule /></div>
        </div>
        <div id="playListTracks">
          {
            selectedPlayList?.tracks.map((track, index) => {
              return (
                <div id="playListSongsTrack" key={index} onClick={() => playTrack(track.id, track.name, track.artists, track.image, track.context_uri, track.track_number)}>
                  <div id="number">{index + 1}</div>
                  <div id="title">
                    <img src={track.image} alt="" />
                    <div id="trackDetails">
                      <div id="trackName">{track.name}</div>
                      <div id="trackArtists">{track.artists.join(", ")}</div>
                    </div>
                  </div>
                  <div id="album">{track.album}</div>
                  <div id="duration">{(track.duration / 60000).toFixed(2)} m</div>
                </div>
              )
            }) || ""
          }
        </div>
      </div>
    </div>
  )
}

export default MusicBody
