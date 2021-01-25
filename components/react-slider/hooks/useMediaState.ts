import React from 'react'
import { StateSliderProps } from '../types'
import { PropsStateRef } from './useStateRef'

export interface PropsUseMediaState extends PropsStateRef {}

export const useMediaState = ({
  playRef,
  mediaRef,
  currentMsRef,
}: PropsUseMediaState) => {
  const _getState = React.useCallback(() => {
    return {
      currentMediaId: mediaRef.current.mediaId,
      currentMsSong: currentMsRef.current,
      isPlaying: playRef.current,
      totalMsSong: mediaRef.current.totalMs,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [state, setState] = React.useState<StateSliderProps>(_getState())

  const updateState = React.useCallback(() => {
    setState(_getState())
  }, [_getState])

  const updateSelectedState = React.useCallback(
    (newState: Partial<StateSliderProps>) => {
      setState(state => {
        return { ...state, ...newState }
      })
    },
    [],
  )

  return { state, updateState, updateSelectedState }
}
