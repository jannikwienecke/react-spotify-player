import React from 'react'
import { usePlayerStore } from './usePlayerStore'
import { usePlayFromContext } from './usePlayFromContext'
import { useRefetchCurrentSong } from './useRefetchCurrentSong'
import { useSpotifyMutation } from './useSpotify'

export const usePlayPrevious = () => {
  const { playFromContext } = usePlayFromContext()
  const { track, setAction } = usePlayerStore()

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
    setAction('SUCCESS_PREVIOUS_TRACK')
  })

  const playPreviousTrack = React.useCallback(() => {
    mutate({})
  }, [track])

  React.useEffect(() => {
    if (!error) return

    const err: any = error
    // IF PRESS PREVIOUS - BUT NO PREVIOUS TRACk
    // THEN PLAY SAME SONG FROM START
    if (err.error.status === 403 && track?.item) {
      playFromContext(track?.item)
      setAction('SUCCESS_PREVIOUS_TRACK')
    }
  }, [error])

  return { ...result, playPreviousTrack }
}
