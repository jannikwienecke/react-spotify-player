import React from 'react'
import { useSeekPosition } from '../hooks/useSeekPosition'
import Slider, { useSlider } from '@bit/jannikwienecke.personal.react-slider'
import { usePlayerStore } from '../hooks/usePlayerStore'
import { StateSliderProps } from '@bit/jannikwienecke.personal.react-slider/dist/types'
import { useQueryClient } from 'react-query'
import { useSpotifyPlayer } from '../hooks/useSpotifyPlayer'
interface MusicSliderProps {
  fetchCurrentSong: () => void
  handleClickNext: () => void
}

export const MusicSlider: React.FC<MusicSliderProps> = ({
  fetchCurrentSong,
  handleClickNext,
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
    currentMediaId: '1',
    isPlaying: false,
  })

  const ignoreStateChangeRef = React.useRef(false)
  React.useEffect(() => {
    if (playerCounter) {
      console.log('playerCounter: ', playerCounter)
      ignoreStateChangeRef.current = true

      let newMs = 0
      if (lastAction === 'change') {
        newMs = newMs === currentState.currentMsSong ? 1 : 0
      } else {
        newMs = track?.progress_ms || 0
      }

      setCurrentState({
        ...currentState,
        isPlaying: lastAction === 'change' ? false : isPlaying,
        currentMsSong: newMs,
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

  const mediaId = track?.item?.id ? track.item.id : 'abc'
  const totalMs = track?.item?.duration_ms || 0
  const { state, handleDragStart, handleMsChange, getState } = useSlider({
    isPlaying: isPlaying || false,
    currentMsSong: currentState.currentMsSong || 0,
    media: { mediaId, totalMs },
    statusRequestMsChange: statusSeekToPosition,
    stateUpdateIntervall: 3000,
    onSettledChange,
    onMsChange,
    onEnd: handleClickNext,
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
        setCurrentState({ ...state })
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

  return (
    <Slider
      state={currentState}
      onDragStart={handleDragStart}
      onEnd={handleClickNext}
      onChange={handleMsChange}
      stylesSlider={{ height: '6px' }}
      disable={false}
    />
  )
}
