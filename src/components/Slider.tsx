import React from 'react'
import { useSlider } from '../../components/react-slider'
import { usePrevious } from '../../components/react-slider/hooks/usePrevious'
import { StateSliderProps } from '../../components/react-slider/types'
import { useSeekPosition } from '../hooks/useSeekPosition'
import Slider from '../../components/react-slider/components/Slider'

interface MusicSliderProps {
  currentSong: SpotifyApi.CurrentPlaybackResponse | undefined
  fetchCurrentSong: () => void
}

export const MusicSlider: React.FC<MusicSliderProps> = ({
  currentSong,
  fetchCurrentSong,
}) => {
  const play = currentSong?.is_playing || false
  const mediaId = currentSong?.item?.id ? parseInt(currentSong.item.id) : 0
  const totalMsSong = currentSong?.item?.duration_ms || 0
  const currentMsSong = currentSong?.progress_ms || 0

  const stateUpdateRef = React.useRef<number | undefined>()
  const changedMs = React.useRef<undefined | number>()

  const { seekToPosition, statusSeekToPosition } = useSeekPosition()

  const handleChangeMsPositionSong = (ms: number) => {
    clearInterval(stateUpdateRef.current)
    stateUpdateRef.current = undefined

    seekToPosition(ms)

    changedMs.current = ms

    if (!stateUpdateRef.current) {
      startInterval()
    }
  }

  const prevStatusSeekToPosition = usePrevious(statusSeekToPosition)
  React.useEffect(() => {
    if (
      prevStatusSeekToPosition === 'loading' &&
      statusSeekToPosition === 'success'
    ) {
      setState(state => {
        return { ...state, currentMsSong: changedMs.current || 0 }
      })
      fetchCurrentSong()
    }
  }, [statusSeekToPosition])

  const { onChange } = useSlider(handleChangeMsPositionSong)

  const [state, setState] = React.useState<StateSliderProps>({
    isPlaying: play,
    currentMediaId: mediaId,
    currentMsSong: currentMsSong,
    totalMsSong: totalMsSong,
  })

  const playRef = React.useRef(play)
  const currentMsRef = React.useRef(currentMsSong)
  const mediaRef = React.useRef({ mediaId, totalMs: totalMsSong })
  React.useEffect(() => {
    playRef.current = currentSong?.is_playing || false
  }, [currentSong?.is_playing])

  React.useEffect(() => {
    currentMsRef.current = currentSong?.progress_ms || 0
  }, [currentSong?.progress_ms])

  React.useEffect(() => {
    mediaRef.current = {
      mediaId: currentSong?.item?.id ? parseInt(currentSong.item.id) : 0,
      totalMs: currentSong?.item?.duration_ms || 0,
    }
  }, [currentSong?.item?.id])

  const startInterval = () => {
    stateUpdateRef.current = window.setInterval(() => {
      setState({
        currentMediaId: mediaRef.current.mediaId,
        currentMsSong: currentMsRef.current,
        isPlaying: playRef.current,
        totalMsSong: mediaRef.current.totalMs,
      })
    }, 5000)
  }

  React.useEffect(() => {
    if (stateUpdateRef.current) return
    console.log('START INTERVALL')
    startInterval()
    return () => {
      console.log('==============clear intervall.....')
      window.clearInterval(stateUpdateRef.current)
    }
  }, [])

  const handleEnd = React.useCallback(() => {
    console.log('end....')
  }, [])

  const handleDragStart = React.useCallback(() => {
    clearInterval(stateUpdateRef.current)
    stateUpdateRef.current = undefined
  }, [])

  if (!currentSong) return null
  // console.log('currentSong', currentSong)

  // console.log('state', state)
  return (
    <Slider
      state={state}
      handleDragStart={handleDragStart}
      onEnd={handleEnd}
      handleChange={onChange}
    />
  )
}
