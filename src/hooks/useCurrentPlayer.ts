import { usePrevious } from '@bit/jannikwienecke.personal.use-previous'
import React from 'react'
import { useQueryClient } from 'react-query'
import { usePlayerStore } from './usePlayerStore'
import { useSpotify } from './useSpotify'
import { useSpotifyToken } from './useSpotifyToken'

export const currentPlaybackUrl = 'me/player'
export const useCurrentPlayer = () => {
  const { play, pause } = usePlayerStore()
  const { token } = useSpotifyToken()
  const queryClient = useQueryClient()

  const { refetch, ...result } = useSpotify<SpotifyApi.CurrentPlaybackResponse>(
    {
      url: currentPlaybackUrl,
      refetchInterval: false,
    },
  )

  const startInterval = () => {
    const interval = window.setInterval(async () => {
      await queryClient.invalidateQueries([
        currentPlaybackUrl,
        token.slice(0, 20),
      ])
      refetch()
    }, 300)

    window.setTimeout(() => {
      clearInterval(interval)
    }, 4000)
  }

  const prevData = usePrevious(result.data)
  React.useEffect(() => {
    if (result.data?.is_playing) {
      if (!prevData) {
        startInterval()
      }
      play()
    } else {
      pause()
    }
  }, [result.data?.is_playing])

  return { ...result }
}
