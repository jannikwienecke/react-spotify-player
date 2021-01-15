import { useSpotify } from './useSpotify'
import React from 'react'

export const useCurrentPlayback = () => {
  const { refetch, ...result } = useSpotify<SpotifyApi.CurrentPlaybackResponse>(
    {
      url: 'me/player',
    },
  )

  console.log('result', result)

  return { ...result }
}
