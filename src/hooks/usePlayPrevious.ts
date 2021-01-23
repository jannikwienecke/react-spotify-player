import React from 'react'
import { usePlayerStore } from './usePlayerStore'
import { useRefetchCurrentSong } from './useRefetchCurrentSong'
import { useSpotifyMutation } from './useSpotify'

export const usePlayPrevious = () => {
  const { pause, updatePlayer, setAction } = usePlayerStore()
  const url = 'me/player/previous'

  const {
    mutate,
    error,
    status: statusPlayPreviousTrack,
    ...result
  } = useSpotifyMutation<null>({
    url,
    method: 'POST',
  })

  useRefetchCurrentSong(statusPlayPreviousTrack, () => {
    updatePlayer()
    pause()
    setAction('change')
  })

  const playPreviousTrack = React.useCallback(() => {
    mutate({})
  }, [])

  return { ...result, playPreviousTrack }
}
