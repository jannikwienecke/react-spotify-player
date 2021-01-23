import _ from 'lodash'
import React from 'react'
import { usePlayerStore } from './usePlayerStore'
import { usePlaylistStore } from './usePlaylistStore'
import { useQueueStore } from './useQueueStore'
import { useRefetchCurrentSong } from './useRefetchCurrentSong'
import { useSpotifyMutation } from './useSpotify'
import { useSpotifyQueue } from './useSpotifyQueue'
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
  const {
    play,
    pause,
    updatePlayer,
    setAction,
    setNextTrack,
  } = usePlayerStore()

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
    play()
  })

  const playNextSong = React.useCallback(() => {
    setNext.current = true
    console.log('contextUri', contextUri)
    if (contextUri) {
      const trackQueue = queue.find(track_ => track_.id === track?.item?.id)
      if (trackQueue) {
        console.log('trackQueue: ', trackQueue)
        console.log('queue: ', queue)
        const indexCurrentSong = queue.indexOf(trackQueue)
        console.log('indexCurrentSong', indexCurrentSong)
        if (queue.length >= indexCurrentSong) {
          setNextTrack(queue[indexCurrentSong + 1])
          console.log('set new track', queue[indexCurrentSong + 1])
        }
      }
      // setNextTrack()
      pause()
      setAction('change')
      updatePlayer()
      playNextTrack({})
    } else if (track) {
      console.log('new RADIO START 1')

      setNewRadio(
        { seed_tracks: track.item?.id },
        { name: `Radio - ${track.item?.name}` },
      )
    } else {
      if (topTracks) {
        console.log('new RADIO START 2')

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
    console.log('new RADIO START 3')

    setNewRadio(
      { seed_tracks: newSong.id },
      { name: `Radio - ${newSong.name}` },
    )
  }, [topTracks])

  return { ...result, playNextSong }
}
