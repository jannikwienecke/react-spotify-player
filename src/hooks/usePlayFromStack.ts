import { usePlay } from './usePlay'
import { usePlayerStore } from './usePlayerStore'
import { useQueueStore } from './useQueueStore'
import { useRefetchCurrentSong } from './useRefetchCurrentSong'

export const usePlayFromStack = () => {
  const { play, status: statusPlay } = usePlay()
  const { stackPastSongs, setNewStack } = useQueueStore()
  const { setAction, updatePlayer, setNextTrack } = usePlayerStore()
  useRefetchCurrentSong(statusPlay)

  const playFromStack = (track: SpotifyApi.TrackObjectFull) => {
    const newStack = stackPastSongs.filter(track_ => track_.id !== track.id)

    setNewStack(newStack)

    play([track.uri])
    setNextTrack(track)

    setAction('change')
    updatePlayer()
  }

  return { playFromStack }
}
