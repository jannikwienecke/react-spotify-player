import _ from 'lodash'
import React from 'react'
import { useQueryClient } from 'react-query'
import { useCurrentSong } from './useCurrentSong'
import { useHandlePlayerChanges } from './useHandlePlayerChanges'
import { usePlay } from './usePlay'
import { usePlayerStore } from './usePlayerStore'
import { useQueueStore } from './useQueueStore'
import { useSpotifyMutation } from './useSpotify'
import { useSpotifyQueue } from './useSpotifyQueue'
import { useSpotifyRadio } from './useSpotifyRadio'
import { useTopArtistsTracks } from './useTopArtistsTracks'
import { useValidMutation } from './useValidMutation'

export const useNext = () => {
  const url = 'me/player/next'
  const setNext = React.useRef(false)
  const playTopTracks = React.useRef(false)
  const { queue, getNextElement } = useQueueStore()
  const { statusAddSongToQueue } = useSpotifyQueue()
  const { play, status: statusPlaySong } = usePlay()
  const { setNewRadio, nextSong } = useSpotifyRadio()
  const { topTracks } = useTopArtistsTracks()
  const { track, setNextTrack } = usePlayerStore()
  const { refetch: fetchCurrentSong } = useCurrentSong()
  const { preloadedFullTracks } = useQueueStore()

  const queryClient = useQueryClient()

  // WHEN SONG IS ADDED TO THE QUEUE - PLAY IT!
  useValidMutation(statusAddSongToQueue, () => {
    setNext.current && mutate({})
    setNext.current = false
  })

  useHandlePlayerChanges({ statusPlaySong }, async () => {
    await queryClient.invalidateQueries()
    fetchCurrentSong()
  })

  const { mutate, error, ...result } = useSpotifyMutation<null>({
    url,
    method: 'POST',
  })

  const playNextSong = React.useCallback(() => {
    let nextSong = getNextElement(queue, track?.item)

    setNext.current = true
    if (nextSong) {
      play([nextSong.uri])
      const preLoadedTrack = preloadedFullTracks.find(
        preloadedTrack => nextSong && preloadedTrack.id === nextSong.id,
      )
      if (preLoadedTrack) {
        setNextTrack(preLoadedTrack)
      }
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
  }, [queue, topTracks, track, preloadedFullTracks])

  React.useEffect(() => {
    if (!nextSong) return
    playNextSong()
  }, [nextSong])

  React.useEffect(() => {
    if (!topTracks) return
    if (!playTopTracks.current) return

    const newSong = _.shuffle(topTracks.items)[0]
    setNewRadio(
      { seed_tracks: newSong.id },
      { name: `Radio - ${newSong.name}` },
    )
  }, [topTracks])

  return { ...result, playNextSong, statusPlaySong }
}
