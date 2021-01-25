import React from 'react'
import { usePlayerStore } from './usePlayerStore'
import { ActionTypes } from '../reducer/sliderReducer'

export const useSliderActions = (dispatch: React.Dispatch<ActionTypes>) => {
  const { track, IS_LOADING, lastAction } = usePlayerStore()

  const dispatchWrapper = (action: ActionTypes) => {
    dispatch({
      ...action,
      IS_LOADING,
      IS_PLAYING: track?.is_playing,
      TRACK: track?.item,
    })
  }

  const _play = () => {
    dispatchWrapper({ actionType: 'play' })
  }
  const _pause = () => {
    dispatchWrapper({ actionType: 'pause' })
  }

  const _change_track = () => {
    if (!track?.item?.id) return
    dispatchWrapper({
      actionType: 'track_change',
      payload: { track: track.item },
    })
  }

  const _change_ms = () => {
    if (!track?.progress_ms) return
    dispatchWrapper({
      actionType: 'ms_change',
      payload: { ms: track.progress_ms },
    })
  }
  const _change_playerAction = () => {
    dispatchWrapper({ actionType: lastAction })
  }

  return { _play, _pause, _change_track, _change_ms, _change_playerAction }
}
