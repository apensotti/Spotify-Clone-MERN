import React from 'react'
import CurrentTrack from './CurrentTrack'
import TrackControls from './TrackControls'
import Volume from './Volume'

function Footer() {
  return (
    <div id='footer'>
      <CurrentTrack />
      <TrackControls />
      <Volume />
    </div>
  )
}

export default Footer
