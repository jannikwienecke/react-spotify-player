import React from 'react'
import radioLogo from '../public/radio.svg'
import radioLogoGreen from '../public/radio-green.svg'
import { useSpotifyRadio } from '../hooks/useSpotifyRadio'
import 'twin.macro'
import { Spinner } from './Spinner'
import { usePlayerStore } from '../hooks/usePlayerStore'
export const SpotifySongInfoRadio = ({
  songId,
  songName,
}: {
  songId: string
  songName: string
}) => {
  const [hover, setHover] = React.useState(false)
  const { setNewRadio } = useSpotifyRadio()
  const { setLoadRadio, loadRadio } = usePlayerStore()
  const handleClickRadio = () => {
    setLoadRadio(true)
    setNewRadio({ seed_tracks: songId }, { name: `Radio - ${songName}` })
  }

  return (
    <div
      tw="h-1/3 flex items-center"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {!loadRadio ? (
        <button tw="focus:outline-none" onClick={handleClickRadio}>
          <img
            alt="radio-green"
            tw="w-full"
            src={hover ? radioLogoGreen : radioLogo}
          />
        </button>
      ) : (
        <Spinner styles={{ width: '20px', height: '20px' }} />
      )}
    </div>
  )
}
