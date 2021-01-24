import Slider from '@bit/jannikwienecke.personal.react-slider'
import { StateSliderProps } from '@bit/jannikwienecke.personal.react-slider/dist/types'
import React from 'react'
import { actionTypesPlayer, usePlayerStore } from '../hooks/usePlayerStore'
import { useSeekPosition } from '../hooks/useSeekPosition'
interface MusicSliderProps {
  fetchCurrentSong: () => void
  handleClickNext: () => void
}

interface ActionTypes {
  payload?: { track?: SpotifyApi.TrackObjectFull; ms?: number }
  actionType: actionTypesPlayer
  IS_LOADING?: boolean
  TRACK?: SpotifyApi.TrackObjectFull | undefined | null
  IS_PLAYING?: boolean
}

const dispatchSlider = (
  state: StateSliderProps,
  action: ActionTypes,
): StateSliderProps => {
  const currentMsIsZero = state.currentMsSong === 0
  const newMsIfZero = currentMsIsZero ? 1 : 0

  if (action.IS_LOADING) {
    switch (action.actionType) {
      case 'opt_play':
        if (state.isPlaying) return state
        return { ...state, isPlaying: true }
      case 'opt_pause':
        if (!state.isPlaying) return state
        return { ...state, isPlaying: false }
      case 'opt_next_track':
        return { ...state, isPlaying: false, currentMsSong: newMsIfZero }
      case 'opt_previous_track':
        if (!state.isPlaying) return state
        return { ...state, isPlaying: false, currentMsSong: newMsIfZero }
      case 'opt_track_change':
        return { ...state, isPlaying: false, currentMsSong: newMsIfZero }
      default:
        return state
    }
  }

  switch (action.actionType) {
    case 'play':
      if (state.isPlaying) return state
      return { ...state, isPlaying: true }
    case 'SUCCESS_PLAY':
      if (state.isPlaying) return state
      return { ...state, isPlaying: true }
    case 'pause':
      if (!state.isPlaying) return state
      return { ...state, isPlaying: false }
    case 'SUCCESS_PAUSE':
      if (!state.isPlaying) return state
      return { ...state, isPlaying: false }
    case 'SUCCESS_NEXT_TRACK':
      return {
        ...state,
        isPlaying: action.IS_PLAYING || false,
        currentMsSong: newMsIfZero,
      }
    case 'SUCCESS_PREVIOUS_TRACK':
      return {
        ...state,
        isPlaying: action.IS_PLAYING || false,
        currentMsSong: newMsIfZero,
      }
    case 'ms_change':
      const newMs = action.payload?.ms
      if (newMs === undefined) return state
      return {
        ...state,
        currentMsSong: newMs,
        totalMsSong: action.TRACK?.duration_ms || 100,
      }
    case 'track_change':
      const newTrack = action.payload?.track
      if (!newTrack) return state
      if (state.currentMediaId === newTrack?.id) return state
      return {
        ...state,
        currentMediaId: newTrack.id,
        currentMsSong: newMsIfZero,
        totalMsSong: newTrack.duration_ms,
      }
    default:
      return state
  }
}

export const MusicSlider: React.FC<MusicSliderProps> = ({
  handleClickNext,
}) => {
  const [state, dispatch] = React.useReducer(dispatchSlider, {
    isPlaying: false,
    currentMediaId: '',
    currentMsSong: 0,
    totalMsSong: 100,
  })

  const {
    track,
    lastAction,
    IS_LOADING,
    setLoading,
    trackIdPrev,
    setTrackIdPrev,
    setAction,
  } = usePlayerStore()
  const { seekToPosition } = useSeekPosition()

  const dispatchWrapper = (action: ActionTypes) => {
    dispatch({
      ...action,
      IS_LOADING,
      IS_PLAYING: track?.is_playing,
      TRACK: track?.item,
    })
  }

  React.useEffect(() => {
    if (track?.is_playing) {
      dispatchWrapper({ actionType: 'play' })
    } else {
      dispatchWrapper({ actionType: 'pause' })
    }
  }, [track?.is_playing])

  React.useEffect(() => {
    if (track?.item?.id) {
      dispatchWrapper({
        actionType: 'track_change',
        payload: { track: track.item },
      })
    }
  }, [track?.item?.id])

  React.useEffect(() => {
    if (track?.progress_ms) {
      if (track?.item?.id === trackIdPrev) {
        return
      } else {
        setTrackIdPrev('')
      }

      dispatchWrapper({
        actionType: 'ms_change',
        payload: { ms: track.progress_ms },
      })
    }
  }, [track?.progress_ms])

  React.useEffect(() => {
    if (!lastAction) return
    dispatchWrapper({ actionType: lastAction })
    setAction('')
  }, [lastAction])

  // React.useEffect(() => {
  //   console.log('state: ', state)
  // }, [state])

  return (
    <Slider
      state={state}
      onDragStart={() => {
        setLoading(true)
      }}
      onEnd={handleClickNext}
      onChange={ms => {
        setLoading(true)
        seekToPosition(ms)
      }}
      stylesSlider={{ height: '6px' }}
      disable={false}
    />
  )
}
