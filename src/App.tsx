import React from 'react'
import { GlobalStyles } from 'twin.macro'
import NavPlayer from './components/NavPlayer'

const App = () => {
  return (
    <div tw="h-screen bg-gray-200 flex flex-col justify-center">
      <GlobalStyles />
      <h1 tw="text-5xl text-center p-10 font-bold text-green-500">
        REACT SPOTIFY PLAYER
      </h1>
      <NavPlayer />
    </div>
  )
}

export default App
