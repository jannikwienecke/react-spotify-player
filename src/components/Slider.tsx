import React from 'react'
import Slider, { useSlider } from '@bit/jannikwienecke.personal.react-slider'
import { StateSliderProps } from '@bit/jannikwienecke.personal.react-slider/dist/types'
import { usePrevious } from '@bit/jannikwienecke.personal.use-previous'
import { useQueryClient } from 'react-query'
import { usePlayerStore } from '../hooks/usePlayerStore'
import { useSeekPosition } from '../hooks/useSeekPosition'
interface MusicSliderProps {
  fetchCurrentSong: () => void
  handleClickNext: () => void
}

export const MusicSlider: React.FC<MusicSliderProps> = ({
  fetchCurrentSong,
  handleClickNext,
}) => {
  const {
    nextTrack,
    track,
    setGetStateFunc,
    playerCounter,
    isPlaying,
    lastAction,
  } = usePlayerStore()
  const queryClient = useQueryClient()
  const { seekToPosition, statusSeekToPosition } = useSeekPosition()
  const [currentTrack, setCurrentTrack] = React.useState(track?.item)
  const [currentState, setCurrentState] = React.useState<StateSliderProps>({
    currentMsSong: 0,
    totalMsSong: 250000,
    currentMediaId: '1',
    isPlaying: false,
  })

  React.useEffect(() => {
    if (nextTrack?.id) {
      setCurrentTrack(nextTrack)
    }
  }, [nextTrack?.id])

  React.useEffect(() => {
    if (track?.item?.id) {
      setCurrentTrack(track.item)
    }
  }, [track?.item?.id])

  const ignoreStateChangeRef = React.useRef(false)
  const ignoreStateChangeRef2 = React.useRef(false)
  const prevTrackId = usePrevious(track?.item?.id)
  React.useEffect(() => {
    if (playerCounter) {
      let newMs = 0
      let newIsPlaying = null

      if (ignoreStateChangeRef2.current && prevTrackId !== track?.item?.id) {
        ignoreStateChangeRef2.current = false
        return
      } else if (ignoreStateChangeRef2.current) {
        return
      }
      if (lastAction === 'change') {
        newMs = newMs === currentState.currentMsSong ? 1 : 0
        newIsPlaying = isPlaying
        ignoreStateChangeRef2.current = true
      } else if (lastAction === 'songUpdate') {
        newIsPlaying = isPlaying
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
        isPlaying: newIsPlaying || false,
        currentMsSong: newMs,
        totalMsSong: currentTrack?.duration_ms || 250000,
      })
    }
  }, [playerCounter, prevTrackId])

  const onSettledChange = async () => {
    await queryClient.invalidateQueries()
    fetchCurrentSong()
  }
  const manualMsChangeRef = React.useRef(false)
  const onMsChange = async (ms: number) => {
    manualMsChangeRef.current = true
    seekToPosition(ms)
  }

  const mediaId = currentTrack?.id ? currentTrack.id : ''
  const totalMs = currentTrack?.duration_ms || 0

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
    if (ignoreStateChangeRef2.current) return
    if (state) {
      if (ignoreStateChangeRef.current) {
        ignoreStateChangeRef.current = false

        setCurrentState(prevState => {
          return {
            ...prevState,
            isPlaying: state.isPlaying,
            currentMediaId: state.currentMediaId,
          }
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
    if (ignoreStateChangeRef2.current) return
    if (track?.is_playing !== currentState.isPlaying) {
      console.log('track', track)

      setCurrentState(prevState => {
        console.log('set state3')
        return {
          ...prevState,
          isPlaying: track?.is_playing || state.isPlaying,
        }
      })
    }
  }, [track?.is_playing])

  // React.useEffect(() => {
  //   console.log('currentState: ', currentState)
  // }, [currentState])
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
