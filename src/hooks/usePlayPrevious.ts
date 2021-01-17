import React from 'react'
import { usePlay } from './usePlay'
import { useQueueStore } from './useQueueStore'
import { useRefetchCurrentSong } from './useRefetchCurrentSong'
import { useSpotifyMutation } from './useSpotify'

export const usePlayPrevious = () => {
  const url = 'me/player/previous'
  const { getLastElement, stackPastSongs } = useQueueStore()
  const { play, status: statusPlaySong } = usePlay()

  const { mutate, error, ...result } = useSpotifyMutation<null>({
    url,
    method: 'POST',
  })

  useRefetchCurrentSong(statusPlaySong)

  const playPreviousTrack = React.useCallback(() => {
    const lastTrack = getLastElement(stackPastSongs)
    if (lastTrack) {
      play([lastTrack.uri])
    } else {
      mutate({})
    }
  }, [stackPastSongs])

  return { ...result, playPreviousTrack, stackPastSongs }
}
