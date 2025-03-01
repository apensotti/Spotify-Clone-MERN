import React from 'react'
import { MdHome, MdSearch, MdPlaylistPlay } from "react-icons/md"
import Playlists from './Playlists'

function SideBar() {
  return (
    <div id="sidebar">
      <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_White-300x82.png" alt="Spotify" />
      <div id="sidebarList">
        <div id="menu">
          <MdHome size={20} color='rgb(181, 179, 179)'/>
          <div id="menuTitle">Home</div>
        </div>
        <div id="menu">
          <MdSearch size={20} color='rgb(181, 179, 179)'/>
          <div id="menuTitle">Search</div>
        </div>
        <div id="menu">
          <MdPlaylistPlay size={20} color='rgb(181, 179, 179)'/>
          <div id="menuTitle">Your Library</div>
        </div>
        <Playlists />
      </div>
    </div>
  )
}

export default SideBar
