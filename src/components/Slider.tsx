import React from 'react'
import { useSeekPosition } from '../hooks/useSeekPosition'
import Slider, { useSlider } from '@bit/jannikwienecke.personal.react-slider'
import { usePlayerStore } from '../hooks/usePlayerStore'
import { StateSliderProps } from '@bit/jannikwienecke.personal.react-slider/dist/types'
import { useQueryClient } from 'react-query'
import { last } from 'lodash'
import { current } from 'immer'
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
      ignoreStateChangeRef.current = true
      let newMs = 0
      if (lastAction === 'change') {
        newMs = newMs === currentState.currentMsSong ? 1 : 0
      } else if (lastAction === 'pause') {
        newMs = currentState.currentMsSong
      } else if (lastAction === 'songUpdate') {
        console.log('manualMsChangeRef: ', manualMsChangeRef)
        if (manualMsChangeRef.current) {
          manualMsChangeRef.current = false
          return
        }
        newMs = track?.progress_ms || currentState.currentMsSong
      } else {
        console.warn('ERRROR!!!')
      }

      setCurrentState({
        ...currentState,
        isPlaying: lastAction === 'change' ? false : isPlaying,
        currentMsSong: newMs,
        totalMsSong: track?.item?.duration_ms || 250000,
      })
    }
  }, [playerCounter])

  const onSettledChange = async () => {
    await queryClient.invalidateQueries()
    fetchCurrentSong()
  }
  const manualMsChangeRef = React.useRef(false)
  const onMsChange = async (ms: number) => {
    manualMsChangeRef.current = true
    await queryClient.invalidateQueries()
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

  React.useEffect(() => {
    console.log('currentState: ', currentState)
  }, [currentState])

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
