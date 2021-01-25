import { actionTypesPlayer } from '../hooks/usePlayerStore'
import { StateSliderProps } from '@bit/jannikwienecke.personal.react-slider/dist/types'

export interface ActionTypes {
  payload?: { track?: SpotifyApi.TrackObjectFull; ms?: number }
  actionType: actionTypesPlayer
  IS_LOADING?: boolean
  TRACK?: SpotifyApi.TrackObjectFull | undefined | null
  IS_PLAYING?: boolean
}

export const sliderReducer = (
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
