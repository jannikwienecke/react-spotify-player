import React from 'react'
import { useDevices } from './useDevices'
import { usePlayerStore } from './usePlayerStore'
import { useRefetchCurrentSong } from './useRefetchCurrentSong'
import { useSpotifyMutation } from './useSpotify'

export const usePlay = () => {
  const [url, setUrl] = React.useState<string>('')
  const [uris, setUris] = React.useState<string[] | undefined>()
  const { getActiveDeviceId } = useDevices()
  const currentMs = React.useRef(0)
  const { setAction } = usePlayerStore()

  const { mutate, error, status: statusPlay, ...result } = useSpotifyMutation<
    null
  >({
    url,
    method: 'PUT',
  })

  useRefetchCurrentSong(statusPlay, () => {
    setAction('SUCCESS_PLAY')
  })

  React.useEffect(() => {
    if (url) {
      if (uris && currentMs.current) {
        mutate({
          uris,
          position_ms: currentMs.current,
        })
      } else if (uris) {
        mutate({ uris })
      } else if (currentMs.current !== undefined) {
        mutate({ position_ms: currentMs.current })
      } else {
        mutate({})
      }
      currentMs.current = 0
    }
    setUrl('')
  }, [url, mutate, uris])

  const play = React.useCallback(
    (uris?: string[], ms: number = 0) => {
      const activeDevice = getActiveDeviceId()
      if (!activeDevice) return

      currentMs.current = ms
      const newUrl = `me/player/play?device_id=${activeDevice}`
      setUrl(newUrl)
      setUris(uris)
    },
    [getActiveDeviceId],
  )

  React.useEffect(() => {
    let err: any = error
    if (err && err?.error?.reason === 'UNKNOWN') {
      if (url) {
        mutate(uris)
      }
    }
  }, [error])

  return { ...result, status, play }
}
