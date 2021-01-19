import { usePlay } from './usePlay'
import { usePlayerStore } from './usePlayerStore'
import { useQueueStore } from './useQueueStore'
import { useRefetchCurrentSong } from './useRefetchCurrentSong'

export const usePlayFromQueue = () => {
  const { play, status: statusPlay } = usePlay()
  const { queue, setNewQueue, stackPastSongs, setNewStack } = useQueueStore()
  const { track } = usePlayerStore()
  useRefetchCurrentSong(statusPlay)

  const playFromQueue = (newTrack: SpotifyApi.TrackObjectFull) => {
    const newQueue = queue.filter(track_ => track_.id !== newTrack.id)

    setNewQueue(newQueue)

    if (track?.item) {
      setNewStack([track.item, ...stackPastSongs])
    }

    play([newTrack.uri])
  }

  return { playFromQueue }
}
