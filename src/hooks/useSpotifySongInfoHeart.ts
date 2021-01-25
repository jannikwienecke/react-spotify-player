import React from 'react'
import { useSavedTracks } from '../hooks/useSavedTracks'
import { useSaveTrack } from '../hooks/useSaveTrack'
import { useValidMutation } from '../hooks/useValidMutation'
import { useAlertStore } from './useAlertStore'

export const useSpotifySongInfoHeart = (songId: string) => {
  const [hover, setHover] = React.useState(false)

  const intervalRef = React.useRef<number>()

  const { saveTracks, statusSaveTrack } = useSaveTrack()
  const { setAlert } = useAlertStore()
  const { data: isSavedList, refetch: refetchSavedTracks } = useSavedTracks([
    songId,
  ])

  useValidMutation(statusSaveTrack, () => {
    refetchSavedTracks()
    setHover(false)
    const msgAdded = 'Track was added to your favorites'
    const msgRemoved = 'Track was removed from your favorites'
    const alertMsg = songIsSaved ? msgRemoved : msgAdded
    setAlert(alertMsg)
  })

  React.useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      refetchSavedTracks()
    }, 10000)
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])

  const handleClickHeart = () => {
    const method = songIsSaved ? 'DELETE' : 'PUT'
    saveTracks([songId], method)
  }

  const songIsSaved = (isSavedList && isSavedList[0]) || false

  return { hover, setHover, handleClickHeart, songIsSaved }
}
