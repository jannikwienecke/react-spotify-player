import React from 'react'
import { useMediaState } from './useMediaState'
import { PropsUseStateRef, useStateRef } from './useStateRef'
import { useUpdateIntervall } from './useUpdateIntervall'
import { useChangesHandler } from './useChangesHandler'
import { StateSliderProps } from '../types'

export type Status = 'idle' | 'loading' | 'success' | 'error' | undefined

interface PropsUseMusicSlider extends PropsUseStateRef {
  onSettledChange: () => void
  onMsChange: (ms: number) => void
  onEnd?: () => void
  statusRequestMsChange: Status
  stateUpdateIntervall?: number
}

export type Media = {
  mediaId: string
  totalMs: number
}

export const useSlider = ({
  isPlaying,
  currentMsSong,
  media,
  stateUpdateIntervall,
  onSettledChange,
  onMsChange,
  onEnd,
  statusRequestMsChange,
}: PropsUseMusicSlider) => {
  const changedMs = React.useRef<undefined | number>()

  const stateRef = useStateRef({
    isPlaying,
    currentMsSong,
    media,
  })
  const { state, updateState, updateSelectedState } = useMediaState(stateRef)

  const { stateUpdateRef, startIntervall } = useUpdateIntervall({
    updateState,
    stateUpdateIntervall: stateUpdateIntervall || 3000,
  })

  useChangesHandler({
    isPlaying,
    media,
    updateSelectedState,
    updateState,
    statusRequestMsChange,
    onSettledChange,
    changedMs,
  })

  const handleMsChange = (ms: number) => {
    clearInterval(stateUpdateRef.current)
    stateUpdateRef.current = undefined

    onMsChange(ms)

    changedMs.current = ms

    if (!stateUpdateRef.current) {
      startIntervall()
    }
  }

  const handleEnd = React.useCallback(() => {
    onEnd && onEnd()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDragStart = React.useCallback(() => {
    clearInterval(stateUpdateRef.current)
    stateUpdateRef.current = undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getState = (): StateSliderProps => {
    return {
      currentMediaId: stateRef.mediaRef.current.mediaId,
      totalMsSong: stateRef.mediaRef.current.totalMs,
      currentMsSong: stateRef.currentMsRef.current,
      isPlaying: stateRef.playRef.current,
    }
  }

  return { state, handleMsChange, handleDragStart, handleEnd, getState }
}
