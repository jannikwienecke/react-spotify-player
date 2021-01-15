import _ from 'lodash'
import React from 'react'
import { useQueryClient } from 'react-query'
import { useCurrentSong } from './useCurrentSong'
import { useDevices } from './useDevices'
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
  const { track } = usePlayerStore()
  const { refetch: fetchCurrentSong } = useCurrentSong()
  const queryClient = useQueryClient()

  // WHEN SONG IS ADDED TO THE QUEUE - PLAY IT!
  useValidMutation(statusAddSongToQueue, () => {
    setNext.current && mutate({})
    setNext.current = false
  })

  const refPlay = React.useRef<boolean>(false)

  useHandlePlayerChanges({ statusPlaySong }, async () => {
    if (!refPlay.current) {
      console.log('first === play')
      refPlay.current = true
    } else {
      console.log('second === fetch===')

      refPlay.current = false
      await queryClient.invalidateQueries()
      fetchCurrentSong()
    }
  })

  const { mutate, error, ...result } = useSpotifyMutation<null>({
    url,
    method: 'POST',
  })

  const playNextSong = React.useCallback(() => {
    console.log('-----')
    // console.log('queue', queue)
    let nextSong = getNextElement(queue, track?.item)
    setNext.current = true

    if (nextSong) {
      // console.log('play next song from queue', nextSong)
      // addTrackToQueue(nextSong?.uri)
      console.log('nextSong', nextSong)
      play([nextSong.uri])
    } else if (track) {
      // console.log('new radio...')
      setNewRadio({ seed_tracks: track.item?.id })
    } else {
      // console.log('play radio from radom liked songs...')
      if (topTracks) {
        console.log(topTracks)
        const newSong = _.shuffle(topTracks.items)[0]
        setNewRadio({ seed_tracks: newSong.id })
      } else {
        playTopTracks.current = true
      }
    }
  }, [queue, topTracks])

  React.useEffect(() => {
    if (!nextSong) return
    playNextSong()
  }, [nextSong])

  React.useEffect(() => {
    if (!topTracks) return
    if (!playTopTracks.current) return

    const newSong = _.shuffle(topTracks.items)[0]
    setNewRadio({ seed_tracks: newSong.id })
  }, [topTracks])

  return { ...result, playNextSong, statusPlaySong }
}
