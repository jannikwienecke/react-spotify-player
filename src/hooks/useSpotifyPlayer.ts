import React from 'react'
import { useQueryClient } from 'react-query'
import { useCurrentContext } from './useCurrentContext'
import { currentSongUrl, useCurrentSong } from './useCurrentSong'
import { useLocalDeviceStore } from './useLocalDeviceStore'
import { useNext } from './useNextSong'
import { usePlayerStore } from './usePlayerStore'
import { useInitializeSpotify } from './useInitialSpotify'
import { useSpotifyPlayerSettings } from './useSpotifyPlayerSettings'
import { useSpotifyToken } from './useSpotifyToken'

interface PropsUseSpotifyPlayer {
  onReady?: () => void
  token: string
}
export const useSpotifyPlayer = ({ onReady, token }: PropsUseSpotifyPlayer) => {
  const [isLoading, setIsLoading] = React.useState(true)

  const isReady = React.useRef(false)
  const hasCurrentSongRef = React.useRef<boolean>(false)
  const intervalRef = React.useRef<number>()

  const { playNextSong } = useNext()
  const queryClient = useQueryClient()
  const { setToken } = useSpotifyToken()
  const { deviceIsReady, deviceId } = useLocalDeviceStore()
  const { play, pause, setTrack, track } = usePlayerStore()
  const { data: currentSong, refetch: fetchCurrentSong } = useCurrentSong()
  const { tokenIsInvalid } = useSpotifyToken()

  useInitializeSpotify()
  useCurrentContext()
  useSpotifyPlayerSettings()

  React.useEffect(() => {
    if (!token) {
      console.error('NO TOKEN PROVIDED')
      window.alert('You must provide a valid token')
    } else {
      setToken(token)
    }
  }, [token])

  React.useEffect(() => {
    if (tokenIsInvalid) {
      window.alert('Your Token is Invalid')
    }
  }, [tokenIsInvalid])

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (!deviceIsReady) return
    if (!intervalRef.current) return

    window.setTimeout(() => {
      if (!hasCurrentSongRef.current) {
        playNextSong()
      }
      clearInterval(intervalRef.current)
      intervalRef.current = 0
    }, 1000)
  }, [deviceIsReady])

  const fetchCurrentSongInterval = () => {
    intervalRef.current = window.setInterval(async () => {
      refetchCurrentSong()
    }, 200)
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

  // CHECk IF PLAYER IS READY
  React.useEffect(() => {
    if (deviceId && deviceIsReady && track && !isReady.current) {
      isReady.current = true
      setIsLoading(false)
      onReady && onReady()
    }
  }, [deviceIsReady, deviceId, track])

  return {
    isLoading,
  }
}
