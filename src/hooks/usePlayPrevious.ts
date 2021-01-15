import { useSpotifyMutation } from './useSpotify'
import React from 'react'

export const usePlayPrevious = () => {
  const url = 'me/player/previous'

  const { mutate, error, ...result } = useSpotifyMutation<null>({
    url,
    method: 'POST',
  })

  const playPreviousTrack = React.useCallback(() => {
    mutate({})
  }, [])

  return { ...result, playPreviousTrack }
}
