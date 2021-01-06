import React from 'react'
import { GlobalStyles } from 'twin.macro'
import { Slider } from './components/ProgressBar'

const useProgressBar = () => {
  const [currentMs, setCurrentMs] = React.useState(0)

  return {
    currentMs,
    setCurrentMs,
  }
}

const songs = [
  { totalMs: 3000, id: 1 },
  { totalMs: 500, id: 2 },
]

const useSlider = () => {
  const [play, setPlay] = React.useState(false)
  const { currentMs, setCurrentMs } = useProgressBar()

  const setMs = (ms: number) => {
    return new Promise<number>(res => {
      setTimeout(() => {
        setCurrentMs(ms)
        res(ms)
      }, 100)
    })
  }

  return {
    play,
    setPlay,
    currentMs,
    setCurrentMs,
    setMs,
  }
}

const App = () => {
  const [song, setSong] = React.useState(songs[0])

  const { play, setPlay, currentMs, setMs } = useSlider()

  return (
    <div>
      <GlobalStyles />

      <div tw="text-center mx-auto bg-gray-400 h-screen flex flex-col justify-items-center justify-center">
        <h1 tw="text-3xl m-10">PROGRESS SLIDER EXAMPLE</h1>

        <div>
          <button onClick={() => setSong(songs[1])}>Next Song</button>
        </div>

        <div tw="text-center p-2">
          <button
            tw="rounded-md bg-red-300 p-2 pr-4 pl-4 text-gray-600 hover:bg-gray-300 hover:text-gray-800 focus:outline-none"
            onClick={() => setPlay(!play)}
          >
            {!play ? 'Play' : 'Pause'}
          </button>
        </div>

        <Slider
          mediaId={song.id}
          handleChange={setMs}
          currentMs={currentMs}
          totalMs={song.totalMs}
          play={play}
        />
      </div>
    </div>
  )
}

export default App
