import { usePrevious } from '@bit/jannikwienecke.personal.use-previous'
import React from 'react'
import { useQueryClient } from 'react-query'
import { usePlayerStore } from './usePlayerStore'
import { useSpotify } from './useSpotify'
import { useSpotifyToken } from './useSpotifyToken'
export const useCurrentPlayer = () => {
  const { play, pause } = usePlayerStore()
  const { token } = useSpotifyToken()
  const queryClient = useQueryClient()
  const url = 'me/player'

  const { refetch, ...result } = useSpotify<SpotifyApi.CurrentPlaybackResponse>(
    {
      url,
      refetchInterval: false,
    },
  )

  const startInterval = () => {
    const interval = window.setInterval(async () => {
      await queryClient.invalidateQueries([url, token.slice(0, 20)])
      // await queryClient.invalidateQueries()
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
