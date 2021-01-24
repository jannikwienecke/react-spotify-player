import React from 'react'
import { useAlertStore } from './useAlertStore'
import { useDevices } from './useDevices'
import { usePlayerStore } from './usePlayerStore'
import { useRefetchCurrentSong } from './useRefetchCurrentSong'
import { useSpotifyMutation } from './useSpotify'

export const usePlayPlaylist = () => {
  const [url, setUrl] = React.useState<string>('')
  const [contextUri, setContextUri] = React.useState<string | undefined>()
  const { getActiveDeviceId } = useDevices()
  const { setAction, setLoadRadio } = usePlayerStore()
  const { setAlert } = useAlertStore()

  const { mutate, error, status: statusPlay, ...result } = useSpotifyMutation<
    null
  >({
    url,
    method: 'PUT',
  })

  useRefetchCurrentSong(statusPlay, () => {
    setAction('SUCCESS_PLAY')
    setLoadRadio(false)
    setAlert('Your Radio Was Loaded ')
  })

  React.useEffect(() => {
    if (!url || !contextUri) return
    mutate({ context_uri: contextUri })
  }, [url, mutate, contextUri])

  const playPlaylist = React.useCallback(
    (context_uri?: string) => {
      const activeDevice = getActiveDeviceId()
      if (!activeDevice) return

      const newUrl = `me/player/play?device_id=${activeDevice}`
      setUrl(newUrl)
      setContextUri(context_uri)
    },
    [getActiveDeviceId],
  )

  React.useEffect(() => {
    let err: any = error
    if (err && err?.error?.reason === 'UNKNOWN') {
      if (url) {
        console.log('mutate....')

        mutate({ context_uri: contextUri })
      }
    }
  }, [error])

  return { ...result, status, playPlaylist }
}
