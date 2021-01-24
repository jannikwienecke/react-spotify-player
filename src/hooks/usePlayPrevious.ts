import React from 'react'
import { useDevices } from './useDevices'
import { useLocalDeviceStore } from './useLocalDeviceStore'
import { usePlay } from './usePlay'
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
    console.log('error:', error)
    if (!error) return

    // IF PRESS PREVIOUS - BUT NO PREVIOUS TRACk
    // THEN PLAY SAME SONG FROM START
    if (error.error.status === 403 && track?.item) {
      console.log('play.... set 0 ')
      playFromContext(track?.item)
      // setAction('opt_previous_track')
      setAction('SUCCESS_PREVIOUS_TRACK')
    }
  }, [error])

  return { ...result, playPreviousTrack }
}
