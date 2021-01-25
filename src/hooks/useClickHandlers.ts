import { useDevices } from './useDevices'
import { useLocalDeviceStore } from './useLocalDeviceStore'
import { useNext } from './useNextSong'
import { usePause } from './usePause'
import { usePlay } from './usePlay'
import { usePlayerStore } from './usePlayerStore'
import { usePlayFromContext } from './usePlayFromContext'
import { usePlayPrevious } from './usePlayPrevious'
import { useShuffle } from './useShuffle'
import { useRepeat } from './useRepeat'

export const useClickHandlers = () => {
  const { setAction, track, setLoading } = usePlayerStore()
  const { play: playSongs } = usePlay()
  const { playFromContext } = usePlayFromContext()
  const { pause: pauseSong } = usePause()
  const { playNextSong } = useNext()
  const { playPreviousTrack } = usePlayPrevious()
  const { firstTrackId } = usePlayerStore()
  const { getActiveDeviceId } = useDevices()
  const { deviceId } = useLocalDeviceStore()
  const { toggleShuffle } = useShuffle()
  const { updateRepeatMode } = useRepeat()

  const handleClickPlay = () => {
    if (track) {
      setAction('opt_play')
      setLoading(true)
      playSongs()
    } else {
      console.log('play next songs')
      playNextSong()
    }
  }

  const handleClickPause = () => {
    setAction('opt_pause')
    setLoading(true)
    pauseSong()
  }

  const handleClickNext = () => {
    setAction('opt_next_track')
    setLoading(true)
    playNextSong()
  }

  const handleClickPrevious = () => {
    if (!track?.item) return

    const playingOnThisPlayer = deviceId === getActiveDeviceId()
    const playSameTrackFromStart =
      track?.progress_ms && track?.progress_ms > 5000

    if (
      (playingOnThisPlayer && track?.item?.id === firstTrackId) ||
      playSameTrackFromStart
    ) {
      playFromContext(track?.item)
    } else {
      setAction('opt_previous_track')
      setLoading(true)
      playPreviousTrack()
    }
  }

  const handleClickShuffle = () => {
    toggleShuffle()
  }
  const handleClickRepeat = () => {
    updateRepeatMode()
  }

  return {
    handleClickPlay,
    handleClickPause,
    handleClickNext,
    handleClickPrevious,
    handleClickShuffle,
    handleClickRepeat,
  }
}
