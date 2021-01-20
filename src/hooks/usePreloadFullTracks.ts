import { usePrevious } from '@bit/jannikwienecke.personal.use-previous'
import React from 'react'
import { useFullTracks } from './useFullTrack'
import { useQueueStore } from './useQueueStore'

export const usePreloadFullTracks = () => {
  // const [preloadedFullTracks, setPreloadedFullTracks] = React.useState<
  // SpotifyApi.TrackObjectFull[]
  // >([])
  const { getFullTracks, tracksFull } = useFullTracks()
  const {
    queue,
    stackPastSongs,
    preloadedFullTracks,
    setPreloadedFullTrack,
  } = useQueueStore()

  const prevQueue = usePrevious(queue)
  const prevStackPastSongs = usePrevious(stackPastSongs)

  React.useEffect(() => {
    if (!queue && !stackPastSongs) return
    if (queue === prevQueue) return
    if (stackPastSongs === prevStackPastSongs) return

    const newSongsToPrefetch = queue
      .slice(0, 5)
      .concat(stackPastSongs.slice(0, 2))

    getFullTracks(newSongsToPrefetch, preloadedFullTracks)
  }, [queue, stackPastSongs])

  React.useEffect(() => {
    if (!tracksFull) return
    console.log('tracksFull: ', tracksFull)
    setPreloadedFullTrack(tracksFull)
  }, [tracksFull])
}
