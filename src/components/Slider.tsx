import React from 'react'
import { useSeekPosition } from '../hooks/useSeekPosition'
import Slider, { useSlider } from '@bit/jannikwienecke.personal.react-slider'
interface MusicSliderProps {
  currentSong: SpotifyApi.CurrentPlaybackResponse | undefined
  fetchCurrentSong: () => void
}

export const MusicSlider: React.FC<MusicSliderProps> = ({
  currentSong,
  fetchCurrentSong,
}) => {
  const { seekToPosition, statusSeekToPosition } = useSeekPosition()

  const onSettledChange = () => {
    console.log('fetch songs....')

    fetchCurrentSong()
  }

  const onMsChange = (ms: number) => {
    seekToPosition(ms)
  }

  const mediaId = currentSong?.item?.id ? parseInt(currentSong.item.id) : 0
  const totalMs = currentSong?.item?.duration_ms || 0

  const { state, handleDragStart, handleEnd, handleMsChange } = useSlider({
    isPlaying: currentSong?.is_playing || false,
    currentMsSong: currentSong?.progress_ms || 0,
    media: { mediaId, totalMs },
    onSettledChange,
    onMsChange,
    statusRequestMsChange: statusSeekToPosition,
    stateUpdateIntervall: 5000,
  })

  // if (!currentSong) return null
  return (
    <Slider
      state={state}
      onDragStart={handleDragStart}
      onEnd={handleEnd}
      onChange={handleMsChange}
      stylesSlider={{ height: '6px' }}
    />
  )
}
