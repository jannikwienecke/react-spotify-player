import { useSpotifyMutation } from './useSpotify'
import React from 'react'
import { useRefetchCurrentSong } from './useRefetchCurrentSong'

export const usePause = () => {
  const url = 'me/player/pause'

  const { mutate, error, ...result } = useSpotifyMutation<null>({
    url,
    method: 'PUT',
  })

  useRefetchCurrentSong(result.status)

  const pause = React.useCallback(() => {
    mutate({})
  }, [])

  return { ...result, pause }
}
