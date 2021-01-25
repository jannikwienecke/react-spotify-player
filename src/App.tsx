import React from 'react'
import { GlobalStyles } from 'twin.macro'
import ReactSpotifyPlayer from './components/NavPlayer'
import './index.css'

const App = () => {
  return (
    <div tw="h-screen bg-gray-200 flex flex-col justify-end">
      <GlobalStyles />

      <h1 tw="text-5xl text-center p-10 font-bold text-spotifyGreen">
        REACT SPOTIFY PLAYER
      </h1>
      <ReactSpotifyPlayer
        visibleOnLoading={true}
        onReady={() => console.log('Music Player Is Ready')}
        token={process.env.REACT_APP_TOKEN || ''}
      />
    </div>
  )
}

export default App
