import React from 'react'
import { StateSliderProps } from '../types'
import { usePrevious } from './usePrevious'
import { Media, Status } from './useSlider'
export interface PropsUseChangesHandler {
  isPlaying: boolean
  media: Media
  updateSelectedState: (selectedState: Partial<StateSliderProps>) => void
  updateState: () => void
  statusRequestMsChange: Status
  onSettledChange: () => void
  changedMs: React.MutableRefObject<number | undefined>
}

export const useChangesHandler = ({
  isPlaying,
  media,
  updateState,
  updateSelectedState,
  statusRequestMsChange,
  onSettledChange,
  changedMs,
}: PropsUseChangesHandler) => {
  const prevMediaId = usePrevious(media.mediaId)
  const prevStatusRequestMsChange = usePrevious(statusRequestMsChange)

  // AS SOON AS THE COMPONENT IS LOADED
  // AND THERE IS A CURRENT SONG -> SET THE STATE OF THE SLIDER
  React.useEffect(() => {
    if (!prevMediaId && media.mediaId) {
      updateState()
    }
  }, [media.mediaId, prevMediaId, updateState])

  React.useEffect(() => {
    updateSelectedState({ isPlaying })
  }, [isPlaying, updateSelectedState])

  React.useEffect(() => {
    if (
      prevStatusRequestMsChange === 'loading' &&
      statusRequestMsChange === 'success'
    ) {
      changedMs.current &&
        updateSelectedState({ currentMsSong: changedMs.current || 0 })
      onSettledChange()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusRequestMsChange])
}