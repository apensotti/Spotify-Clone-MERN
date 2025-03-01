import React from 'react'
import Footer from './Footer'
import SideBar from './SideBar'
import NavBar from './NavBar'
import MusicBody from './MusicBody'

function Spotify() {
  return (
    <div id='homePage'>
      <div id="homePageTop">
        <SideBar />
        <div id="homePageRight">
          <NavBar />
          <MusicBody />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Spotify
