import React from 'react'
import { useSeekPosition } from '../hooks/useSeekPosition'
import Slider, { useSlider } from '@bit/jannikwienecke.personal.react-slider'
import { usePlayerStore } from '../hooks/usePlayerStore'
import { StateSliderProps } from '@bit/jannikwienecke.personal.react-slider/dist/types'
import { useQueryClient } from 'react-query'
interface MusicSliderProps {
  fetchCurrentSong: () => void
}

export const MusicSlider: React.FC<MusicSliderProps> = ({
  fetchCurrentSong,
}) => {
  const {
    track,
    setGetStateFunc,
    playerCounter,
    isPlaying,
    lastAction,
  } = usePlayerStore()
  const queryClient = useQueryClient()
  const { seekToPosition, statusSeekToPosition } = useSeekPosition()

  const [currentState, setCurrentState] = React.useState<StateSliderProps>({
    currentMsSong: 0,
    totalMsSong: 200000,
    currentMediaId: 1,
    isPlaying: false,
  })

  const ignoreStateChangeRef = React.useRef(false)
  React.useEffect(() => {
    if (playerCounter) {
      ignoreStateChangeRef.current = true
      setCurrentState({
        ...currentState,
        isPlaying: lastAction === 'change' ? false : isPlaying,
        currentMsSong: lastAction === 'change' ? 0 : currentState.currentMsSong,
      })
    }
  }, [playerCounter])

  const onSettledChange = async () => {
    await queryClient.invalidateQueries()
    fetchCurrentSong()
  }

  const onMsChange = (ms: number) => {
    seekToPosition(ms)
  }

  const mediaId = track?.item?.id ? track.item.id : 0
  const totalMs = track?.item?.duration_ms || 0
  const {
    state,
    handleDragStart,
    handleEnd,
    handleMsChange,
    getState,
  } = useSlider({
    isPlaying: isPlaying || false,
    currentMsSong: track?.progress_ms || 0,
    media: { mediaId, totalMs },
    statusRequestMsChange: statusSeekToPosition,
    stateUpdateIntervall: 3000,
    onSettledChange,
    onMsChange,
  })

  React.useEffect(() => {
    if (state) {
      if (ignoreStateChangeRef.current) {
        ignoreStateChangeRef.current = false
        setCurrentState({
          ...currentState,
          isPlaying: state.isPlaying,
          currentMediaId: state.currentMediaId,
        })
      } else {
        setCurrentState({
          ...state,
          currentMsSong: currentState.currentMsSong,
        })
      }
    }
  }, [state])

  React.useEffect(() => {
    setGetStateFunc(getState)
  }, [])

  React.useEffect(() => {
    if (track?.is_playing !== currentState.isPlaying) {
      setCurrentState({
        ...currentState,
        isPlaying: track?.is_playing || state.isPlaying,
      })
    }
  }, [track])

  React.useEffect(() => {
    console.log('====')
    console.log(currentState.currentMsSong)
    console.log('====')
  }, [currentState.currentMsSong])

  return (
    <Slider
      state={currentState}
      onDragStart={handleDragStart}
      onEnd={handleEnd}
      onChange={handleMsChange}
      stylesSlider={{ height: '6px' }}
    />
  )
}
