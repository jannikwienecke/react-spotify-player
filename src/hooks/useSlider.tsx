import React from 'react'
import { sliderReducer } from '../reducer/sliderReducer'
import { useClickHandlers } from './useClickHandlers'
import { usePlayerStore } from './usePlayerStore'
import { useSeekPosition } from './useSeekPosition'
import { useSliderActions } from './useSliderActions'

const DEFAULT_SLIDER = {
  isPlaying: false,
  currentMediaId: '',
  currentMsSong: 0,
  totalMsSong: 100,
}

export const useSlider = () => {
  const [state, dispatch] = React.useReducer(sliderReducer, DEFAULT_SLIDER)

  const {
    _play,
    _pause,
    _change_track,
    _change_ms,
    _change_playerAction,
  } = useSliderActions(dispatch)

  const {
    track,
    lastAction,
    setLoading,
    trackIdPrev,
    setTrackIdPrev,
    setAction,
  } = usePlayerStore()

  const { seekToPosition } = useSeekPosition()
  const { handleClickNext } = useClickHandlers()

  React.useEffect(() => {
    if (track?.is_playing) {
      _play
    } else {
      _pause()
    }
  }, [track?.is_playing])

  React.useEffect(() => {
    _change_track()
  }, [track?.item?.id])

  React.useEffect(() => {
    if (track?.item?.id === trackIdPrev) {
      return
    } else {
      setTrackIdPrev('')
    }
    _change_ms()
  }, [track?.progress_ms])

  React.useEffect(() => {
    if (!lastAction) return
    _change_playerAction()
    setAction('')
  }, [lastAction])

  const handleDragStart = () => {
    setLoading(true)
  }

  const handleEnd = () => {
    handleClickNext
  }

  const handleChange = (ms: number) => {
    setLoading(true)
    seekToPosition(ms)
  }

  return { state, handleDragStart, handleEnd, handleChange }
}
