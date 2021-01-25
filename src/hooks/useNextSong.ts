import _ from 'lodash'
import React from 'react'
import { usePlayerStore } from './usePlayerStore'
import { useQueueStore } from './useQueueStore'
import { useRefetchCurrentSong } from './useRefetchCurrentSong'
import { useSpotifyMutation } from './useSpotify'
import { useSpotifyRadio } from './useSpotifyRadio'
import { useTopArtistsTracks } from './useTopArtistsTracks'

export const useNext = () => {
  const url = 'me/player/next'
  const setNext = React.useRef(false)
  const playTopTracks = React.useRef(false)
  const { setNewRadio } = useSpotifyRadio()
  const { topTracks } = useTopArtistsTracks()
  const { track, contextUri } = usePlayerStore()
  const { preloadedFullTracks } = useQueueStore()
  const { queue } = useQueueStore()
  const { isShuffle, pause, setAction, setNextTrack } = usePlayerStore()

  const {
    mutate: playNextTrack,
    error,
    status: statusPlayNextTrack,
    ...result
  } = useSpotifyMutation<null>({
    url,
    method: 'POST',
  })

  useRefetchCurrentSong(statusPlayNextTrack, () => {
    setAction('SUCCESS_NEXT_TRACK')
  })

  const playNextSong = React.useCallback(() => {
    setNext.current = true
    if (contextUri) {
      const trackQueue = queue.find(track_ => track_.id === track?.item?.id)
      if (trackQueue) {
        const indexCurrentSong = queue.indexOf(trackQueue)
        if (queue.length >= indexCurrentSong && !isShuffle) {
          setNextTrack(queue[indexCurrentSong + 1])
        }
      }
      pause()
      playNextTrack({})
    } else if (track) {
      setNewRadio(
        { seed_tracks: track.item?.id },
        { name: `Radio - ${track.item?.name}` },
      )
    } else {
      if (topTracks) {
        const newSong = _.shuffle(topTracks.items)[0]
        setNewRadio(
          { seed_tracks: newSong.id },
          { name: `Radio - ${newSong.name}` },
        )
      } else {
        playTopTracks.current = true
      }
    }
  }, [topTracks, track, preloadedFullTracks])

  React.useEffect(() => {
    if (!topTracks) return
    if (!playTopTracks.current) return

    const newSong = _.shuffle(topTracks.items)[0]
    setNewRadio(
      { seed_tracks: newSong.id },
      { name: `Radio - ${newSong.name}` },
    )
  }, [topTracks])

  return { ...result, playNextSong }
}
