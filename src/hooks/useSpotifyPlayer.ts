import React from 'react'
import { useQueryClient } from 'react-query'
import { useCurrentContext } from './useCurrentContext'
import { currentSongUrl, useCurrentSong } from './useCurrentSong'
import { useDevices } from './useDevices'
import { useLocalDeviceStore } from './useLocalDeviceStore'
import { useNext } from './useNextSong'
import { usePause } from './usePause'
import { usePlay } from './usePlay'
import { usePlayerStore } from './usePlayerStore'
import { usePlayFromContext } from './usePlayFromContext'
import { usePlayPrevious } from './usePlayPrevious'
import { usePreloadFullTracks } from './usePreloadFullTracks'
import { useQueueStore } from './useQueueStore'
import { useRandom } from './useRandom'
import { useRepeat } from './useRepeat'
import { useSpotifyToken } from './useSpotifyToken'

export const useSpotifyPlayer = ({ onReady }: { onReady?: () => void }) => {
  const { data: currentSong, refetch: fetchCurrentSong } = useCurrentSong()
  useCurrentContext()
  const { queue } = useQueueStore()
  const {
    play,
    pause,
    setTrack,
    setAction,
    track,
    setLoading,
    isPlaying,
  } = usePlayerStore()
  const { play: playSongs } = usePlay()
  const { playFromContext } = usePlayFromContext()
  const { pause: pauseSong } = usePause()
  const { playNextSong } = useNext()
  const { playPreviousTrack } = usePlayPrevious()
  const queryClient = useQueryClient()
  const { token } = useSpotifyToken()
  const { firstTrackId } = usePlayerStore()
  const { getActiveDeviceId } = useDevices()
  const { deviceIsReady, deviceId } = useLocalDeviceStore()
  const [isLoading, setIsLoading] = React.useState(true)
  const isReady = React.useRef(false)
  const { toggleShuffle } = useRandom()
  const { updateRepeatMode } = useRepeat()
  usePreloadFullTracks()

  const handleClickPlay = () => {
    pauseRef.current = false
    if (track) {
      setAction('opt_play')
      setLoading(true)
      playSongs()
    } else {
      console.log('play next songs')
      playNextSong()
    }
  }

  const pauseRef = React.useRef(false)
  const handleClickPause = () => {
    setAction('opt_pause')
    setLoading(true)
    pauseSong()
    pauseRef.current = true
    setTimeout(() => {
      pauseRef.current = false
    }, 3000)
  }

  const handleClickNext = () => {
    setAction('opt_next_track')
    setLoading(true)
    playNextSong()
  }

  const handleClickPrevious = () => {
    if (!track?.item) return

    const playingOnThisPlayer = deviceId === getActiveDeviceId()
    const playSameTrackFromStart =
      track?.progress_ms && track?.progress_ms > 5000

    if (
      (playingOnThisPlayer && track?.item?.id === firstTrackId) ||
      playSameTrackFromStart
    ) {
      playFromContext(track?.item)
    } else {
      setAction('opt_previous_track')
      setLoading(true)
      playPreviousTrack()
    }
  }

  const handleClickShuffle = () => {
    toggleShuffle()
  }
  const handleClickRepeat = () => {
    console.log('repeat...')
    updateRepeatMode()
  }

  const hasCurrentSongRef = React.useRef<boolean>(false)
  React.useEffect(() => {
    if (pauseRef.current) {
      return
    }

    if (currentSong) {
      hasCurrentSongRef.current = true
      clearInterval(intervalRef.current)
      intervalRef.current = 0
    }
  }, [currentSong])

  React.useEffect(() => {
    if (!deviceIsReady) return

    if (currentSong?.is_playing) {
      play()
    } else {
      pause()
    }
  }, [track])

  React.useEffect(() => {
    setTrack(currentSong)
  }, [currentSong])

  React.useEffect(() => {
    if (!currentSong) return
    if (currentSong?.item) return

    fetchCurrentSongInterval()
    window.setTimeout(() => {
      clearInterval(intervalRef.current)
      intervalRef.current = 0
    }, 300)
  }, [currentSong?.item?.id])

  const intervalRef = React.useRef<number>()
  React.useEffect(() => {
    if (!deviceIsReady) return
    if (!intervalRef.current) return

    window.setTimeout(() => {
      if (!hasCurrentSongRef.current) {
        playNextSong()
      }
      clearInterval(intervalRef.current)
      intervalRef.current = 0
    }, 800)
  }, [deviceIsReady])

  const fetchCurrentSongInterval = () => {
    intervalRef.current = window.setInterval(async () => {
      refetchCurrentSong()
    }, 100)
  }

  const refetchCurrentSong = async () => {
    await queryClient.invalidateQueries(
      [currentSongUrl, token.slice(0, 20)],
      {},
      { throwOnError: true },
    )

    fetchCurrentSong()
  }

  React.useEffect(() => {
    fetchCurrentSongInterval()
  }, [])

  React.useEffect(() => {
    if (deviceId && deviceIsReady && track && !isReady.current) {
      isReady.current = true
      setIsLoading(false)
      onReady && onReady()
    }
  }, [deviceIsReady, deviceId, track])

  return {
    handleClickPlay,
    handleClickPause,
    handleClickNext,
    handleClickPrevious,
    handleClickShuffle,
    handleClickRepeat,
    fetchCurrentSong,
    queue,
    isLoading,
    track,
    isPlaying,
  }
}
