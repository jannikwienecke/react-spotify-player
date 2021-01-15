import { useSpotifyMutation } from './useSpotify'
import React from 'react'

export const usePause = () => {
  const url = 'me/player/pause'

  const { mutate, error, ...result } = useSpotifyMutation<null>({
    url,
    method: 'PUT',
  })

  const pause = React.useCallback(() => {
    mutate({})
  }, [])

  return { ...result, pause }
}
