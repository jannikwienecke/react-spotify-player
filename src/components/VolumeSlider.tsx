import Slider, { useSlider } from '@bit/jannikwienecke.personal.react-slider'
import React from 'react'
import 'twin.macro'
import { useSetVolume } from '../hooks/useSetVolume'
import { SPOTIFY_PLAYER_NAME } from '../spotifyConfig'

export interface PropsVolumeSlider {
  devices: SpotifyApi.UserDevice[] | undefined
}

export const VolumeSlider: React.FC<PropsVolumeSlider> = ({ devices }) => {
  const { setVolume } = useSetVolume()
  const onMsChange = (volume: number) => {
    setVolume(volume)
  }

  const { state, handleDragStart, handleEnd, handleMsChange } = useSlider({
    isPlaying: false,
    currentMsSong: 50,
    media: { mediaId: '1', totalMs: 100 },
    onSettledChange: () => {},
    onMsChange,
    statusRequestMsChange: 'idle',
    stateUpdateIntervall: 5000,
  })

  const playerIsRemote =
    devices?.find(device => device.is_active)?.name !== SPOTIFY_PLAYER_NAME

  return (
    <div tw="mr-14 w-32 flex flex-row justify-items-center items-center ">
      <div>
        <svg
          color="white"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 128 128"
          style={{ marginRight: '8px' }}
        >
          <path
            d="M0 85.869V40.38h21.24l39.41-22.743v90.974L21.24 85.87H0zm53.069 9.627V30.754L23.285 47.963H7.581v30.324h15.704L53.07 95.496zM92.355 18.86l4.889-5.723c13.772 12.64 21.94 30.407 21.94 49.724 0 19.318-8.168 37.085-21.94 49.725l-4.89-5.724c12.104-11.208 19.318-26.89 19.318-44 0-17.112-7.214-32.793-19.317-44.002zM75.303 38.835l4.889-5.724c5.246 5.008 9.062 11.209 11.149 18.542a41.69 41.69 0 0 1 1.55 11.21c0 11.506-4.77 22.12-12.7 29.75l-4.888-5.723c6.26-6.26 10.076-14.786 10.076-24.028 0-9.241-3.697-17.767-10.076-24.027z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      <Slider
        disable={playerIsRemote}
        state={state}
        onDragStart={handleDragStart}
        onEnd={handleEnd}
        onChange={handleMsChange}
        stylesSlider={{ height: '4px' }}
      />
    </div>
  )
}
