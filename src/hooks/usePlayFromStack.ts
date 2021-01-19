import { usePlay } from './usePlay'
import { useQueueStore } from './useQueueStore'
import { useRefetchCurrentSong } from './useRefetchCurrentSong'

export const usePlayFromStack = () => {
  const { play, status: statusPlay } = usePlay()
  const { stackPastSongs, setNewStack } = useQueueStore()
  useRefetchCurrentSong(statusPlay)

  const playFromStack = (track: SpotifyApi.TrackObjectFull) => {
    const newStack = stackPastSongs.filter(track_ => track_.id !== track.id)

    setNewStack(newStack)

    console.log('newStack', newStack)

    play([track.uri])
  }

  return { playFromStack }
}
