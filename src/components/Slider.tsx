import React from 'react'
import { useSlider } from '../../components/react-slider'
import { usePrevious } from '../../components/react-slider/hooks/usePrevious'
import { StateSliderProps } from '../../components/react-slider/types'
import { useSeekPosition } from '../hooks/useSeekPosition'
import Slider from '../../components/react-slider/components/Slider'
import { MutationStatus } from 'react-query'

interface MusicSliderProps {
  currentSong: SpotifyApi.CurrentPlaybackResponse | undefined
  fetchCurrentSong: () => void
}

interface PropsUseStateRef {
  isPlaying: boolean
  currentMsSong: number
  media: { mediaId: number; totalMs: number }
}

interface PropsUseMusicSlider extends PropsUseStateRef {
  currentSong: SpotifyApi.CurrentPlaybackResponse | undefined
  onSettledChange: () => void
  onMsChange: (ms: number) => void
  onEnd?: () => void
  statusRequestMsChange: MutationStatus
}

const useStateRef = ({ isPlaying, currentMsSong, media }: PropsUseStateRef) => {
  const playRef = React.useRef(isPlaying)
  const currentMsRef = React.useRef(currentMsSong)
  const mediaRef = React.useRef({
    mediaId: media.mediaId,
    totalMs: media.totalMs,
  })

  // HANDLE CHANGES TO CURRENT SONG
  React.useEffect(() => {
    currentMsRef.current = currentMsSong
  }, [currentMsSong])

  React.useEffect(() => {
    mediaRef.current = {
      mediaId: media.mediaId,
      totalMs: media.totalMs,
    }
  }, [media.mediaId])

  React.useEffect(() => {
    playRef.current = isPlaying || false
  }, [isPlaying])

  return { playRef, mediaRef, currentMsRef }
}

interface PropsUseUpdateIntervall {
  updateState: () => void
}
const useUpdateIntervall = ({ updateState }: PropsUseUpdateIntervall) => {
  const stateUpdateRef = React.useRef<number | undefined>()

  // EVERY X SECONDS UPDATE THE this.state
  // ONLY THEN WILL THE SLIDER COMPONENT BE RERENDERED EXTERNALLY
  const startIntervall = () => {
    stateUpdateRef.current = window.setInterval(() => {
      updateState()
    }, 5000)
  }

  // ON MOUNT - START THE TIMER
  // ON UNMOUNT - REMOVE TIMER
  React.useEffect(() => {
    if (stateUpdateRef.current) return
    startIntervall()
    return () => {
      window.clearInterval(stateUpdateRef.current)
      stateUpdateRef.current = undefined
    }
  }, [])

  return { stateUpdateRef, startIntervall }
}

interface PropsStateRef {
  playRef: React.MutableRefObject<boolean>
  mediaRef: React.MutableRefObject<{ mediaId: number; totalMs: number }>
  currentMsRef: React.MutableRefObject<number>
}

interface PropsUseMediaState extends PropsStateRef {}

const useMediaState = ({
  playRef,
  mediaRef,
  currentMsRef,
}: PropsUseMediaState) => {
  const _getState = () => {
    return {
      currentMediaId: mediaRef.current.mediaId,
      currentMsSong: currentMsRef.current,
      isPlaying: playRef.current,
      totalMsSong: mediaRef.current.totalMs,
    }
  }

  const [state, setState] = React.useState<StateSliderProps>(_getState())

  const updateState = React.useCallback(() => {
    setState(_getState())
  }, [])

  const updateStateMs = (ms: number) => {
    setState(state => {
      return { ...state, currentMsSong: ms }
    })
  }

  return { state, updateState, updateStateMs }
}

const useMusicSlider = ({
  isPlaying,
  currentMsSong,
  media,
  currentSong,
  onSettledChange,
  onMsChange,
  onEnd,
  statusRequestMsChange,
}: PropsUseMusicSlider) => {
  const changedMs = React.useRef<undefined | number>()
  const prevStatusRequestMsChange = usePrevious(statusRequestMsChange)
  const prevCurrentSong = usePrevious(currentSong)
  const stateRef = useStateRef({
    isPlaying,
    currentMsSong,
    media,
  })
  const { state, updateState, updateStateMs } = useMediaState(stateRef)
  const { stateUpdateRef, startIntervall } = useUpdateIntervall({ updateState })

  // AS SOON AS THE COMPONENT IS LOADED
  // AND THERE IS A CURRENT SONG -> SET THE STATE OF THE SLIDER
  React.useEffect(() => {
    if (!prevCurrentSong) {
      updateState()
    }
  }, [currentSong])

  React.useEffect(() => {
    if (
      prevStatusRequestMsChange === 'loading' &&
      statusRequestMsChange === 'success'
    ) {
      updateStateMs(changedMs.current || 0)

      onSettledChange()
    }
  }, [statusRequestMsChange])

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
  }, [])

  const handleDragStart = React.useCallback(() => {
    clearInterval(stateUpdateRef.current)
    stateUpdateRef.current = undefined
  }, [])

  return { state, handleMsChange, handleDragStart, handleEnd }
}
export const MusicSlider: React.FC<MusicSliderProps> = ({
  currentSong,
  fetchCurrentSong,
}) => {
  const { seekToPosition, statusSeekToPosition } = useSeekPosition()

  // HANDLE SPOTIFY API SUCCESSFULLY SEEkED TO MS POSITION
  const onSettledChange = () => {
    fetchCurrentSong()
  }

  const onMsChange = (ms: number) => {
    seekToPosition(ms)
  }

  const mediaId = currentSong?.item?.id ? parseInt(currentSong.item.id) : 0
  const totalMs = currentSong?.item?.duration_ms || 0

  const { state, handleDragStart, handleEnd, handleMsChange } = useMusicSlider({
    isPlaying: currentSong?.is_playing || false,
    currentMsSong: currentSong?.progress_ms || 0,
    media: { mediaId, totalMs },
    currentSong,
    onSettledChange,
    onMsChange,
    statusRequestMsChange: statusSeekToPosition,
  })

  if (!currentSong) return null
  return (
    <Slider
      state={state}
      handleDragStart={handleDragStart}
      onEnd={handleEnd}
      handleChange={handleMsChange}
    />
  )
}
