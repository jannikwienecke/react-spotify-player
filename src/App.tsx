import React from 'react'
import { GlobalStyles } from 'twin.macro'
import NavPlayer from './components/NavPlayer'
import './index.css'

export const TEMP_TOkEN =
  'BQCOtuTJvuBrTf91JHjfMtINTYn9O6rN6lo8MQpX7iUP5AqxtlRlU79CASMuOW5L7xbT5wF5t24JnCiveGjn8Locmp0qpBJMXhCLLHQFJFaD4VWITtw56GkRCMj7JdykDkGm1LMF2zC7TThxWQd0xCmS7opF7RykcO2PBw2vb4n4YaxykNu61smapuvuyA_lc_dTdToAlxYgSL3t3i-HhHq2AaccuFxatX7Bc6KrYAabwioVpQyzq5feoHUFWZStiKbeAllb1xlifGMR'
const App = () => {
  return (
    <div tw="h-screen bg-gray-200 flex flex-col justify-end">
      <GlobalStyles />

      <h1 tw="text-5xl text-center p-10 font-bold text-spotifyGreen">
        REACT SPOTIFY PLAYER
      </h1>
      <NavPlayer
        visibleOnLoading={true}
        onReady={() => console.log('Music Player Is Ready')}
        token={TEMP_TOkEN}
      />
    </div>
  )
}

export default App
