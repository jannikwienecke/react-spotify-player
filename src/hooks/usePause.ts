import { useSpotifyMutation } from './useSpotify'
import React from 'react'
import { useRefetchCurrentSong } from './useRefetchCurrentSong'
import { usePlayerStore } from './usePlayerStore'

export const usePause = () => {
  const url = 'me/player/pause'

  const { setAction } = usePlayerStore()
  const { mutate, error, ...result } = useSpotifyMutation<null>({
    url,
    method: 'PUT',
  })

  useRefetchCurrentSong(result.status, () => {
    setAction('SUCCESS_PAUSE')
  })

  const pause = React.useCallback(() => {
    mutate({})
  }, [])

  return { ...result, pause }
}
