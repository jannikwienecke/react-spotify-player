import React from 'react'
import { useQueryClient } from 'react-query'
import { useCurrentContext } from './useCurrentContext'
import { currentSongUrl, useCurrentSong } from './useCurrentSong'
import { useHandlePlayerChanges } from './useHandlePlayerChanges'
import { useLocalDeviceStore } from './useLocalDeviceStore'
import { useNext } from './useNextSong'
import { usePause } from './usePause'
import { usePlay } from './usePlay'
import { usePlayerStore } from './usePlayerStore'
import { usePlayPrevious } from './usePlayPrevious'
import { usePreloadFullTracks } from './usePreloadFullTracks'
import { useQueueStore } from './useQueueStore'
import { useSpotifyToken } from './useSpotifyToken'

export const useSpotifyPlayer = () => {
  const { data: currentSong, refetch: fetchCurrentSong } = useCurrentSong()
  useCurrentContext()
  const { queue } = useQueueStore()
  const {
    play,
    pause,
    setTrack,
    setAction,
    track,
    updatePlayer,
  } = usePlayerStore()
  const { play: playSongs } = usePlay()
  const { pause: pauseSong } = usePause()
  const { playNextSong } = useNext()
  const { playPreviousTrack } = usePlayPrevious()
  const { deviceIsReady } = useLocalDeviceStore()
  usePreloadFullTracks()
  const queryClient = useQueryClient()
  const { token } = useSpotifyToken()

  const handleClickPlay = () => {
    pauseRef.current = false
    if (track) {
      console.log('play songs..')
      playSongs()
    } else {
      console.log('play next songs')
      playNextSong()
    }
  }

  const pauseRef = React.useRef(false)
  const handleClickPause = () => {
    console.log('click pause')

    pauseSong()
    pauseRef.current = true
    setTimeout(() => {
      pauseRef.current = false
    }, 3000)
  }

  const handleClickNext = () => {
    playNextSong()
    setAction('change')
  }

  const handleClickPrevious = () => {
    playPreviousTrack()
    setAction('change')
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
    setAction('songUpdate')
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

  return {
    handleClickPlay,
    handleClickPause,
    handleClickNext,
    handleClickPrevious,
    fetchCurrentSong,
    queue,
  }
}
