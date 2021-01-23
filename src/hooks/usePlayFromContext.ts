import React from 'react'
import { useDevices } from './useDevices'
import { usePlayerStore } from './usePlayerStore'
import { useRefetchCurrentSong } from './useRefetchCurrentSong'
import { useSpotifyMutation } from './useSpotify'

export const usePlayFromContext = () => {
  const [uri, setUri] = React.useState<string | undefined>()
  const [url, setUrl] = React.useState<string>('')
  const { setAction, updatePlayer } = usePlayerStore()
  const { contextUri: context_uri, setNextTrack } = usePlayerStore()
  const { getActiveDeviceId } = useDevices()

  const { mutate, error, status: statusPlay, ...result } = useSpotifyMutation<
    null
  >({
    url,
    method: 'PUT',
  })

  useRefetchCurrentSong(statusPlay, () => {
    setAction('change')
    updatePlayer()
  })

  const playFromContext = React.useCallback(
    (newTrack: SpotifyApi.TrackObjectFull) => {
      const activeDevice = getActiveDeviceId()
      if (!activeDevice) return

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
  }, [url, mutate, uri])

  return { playFromContext, ...result }
}
