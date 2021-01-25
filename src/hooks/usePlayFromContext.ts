import React from 'react'
import { useDevices } from './useDevices'
import { usePlayerStore } from './usePlayerStore'
import { useRefetchCurrentSong } from './useRefetchCurrentSong'
import { useSpotifyMutation } from './useSpotify'

// CHANGES THE TRACk -
// BUT STAYS IN THE SAME CONTEXT - e.g. PLAYLIST
export const usePlayFromContext = () => {
  const [uri, setUri] = React.useState<string | undefined>()
  const [url, setUrl] = React.useState<string>('')
  const { setAction, setLoading } = usePlayerStore()
  const { contextUri: context_uri, setNextTrack } = usePlayerStore()
  const { getActiveDeviceId } = useDevices()

  const { mutate, error, status: statusPlay, ...result } = useSpotifyMutation<
    null
  >({
    url,
    method: 'PUT',
  })

  useRefetchCurrentSong(statusPlay, () => {
    setAction('SUCCESS_PLAY')
  })

  const playFromContext = React.useCallback(
    (newTrack: SpotifyApi.TrackObjectFull) => {
      const activeDevice = getActiveDeviceId()
      if (!activeDevice) return

      setAction('opt_track_change')
      setLoading(true)

      setNextTrack(newTrack)

      const newUrl = `me/player/play?device_id=${activeDevice}`
      setUrl(newUrl)
      setUri(newTrack.uri)
    },
    [getActiveDeviceId],
  )

  React.useEffect(() => {
    if (!url || !uri) return
    mutate({ offset: { uri }, context_uri })
    setUri('')
    setUrl('')
  }, [url, mutate, uri])

  return { playFromContext, ...result }
}
