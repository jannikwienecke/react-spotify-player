import { useSpotifyMutation } from './useSpotify'
import React from 'react'
import { useDevices } from './useDevices'
import { useSeekPosition } from './useSeekPosition'
import { useValidMutation } from './useValidMutation'
import { useQueryClient } from 'react-query'
import { useCurrentSong } from './useCurrentSong'

export const usePlay = () => {
  const [url, setUrl] = React.useState<string>('')
  const [uris, setUris] = React.useState<string[] | undefined>()
  const { getActiveDeviceId } = useDevices()
  const currentMs = React.useRef(0)

  const { mutate, error, status, ...result } = useSpotifyMutation<null>({
    url,
    method: 'PUT',
  })

  React.useEffect(() => {
    if (url) {
      if (uris) {
        console.log('uris: ', uris)
        mutate({ context_uri: uris[0] })
        // mutate({ uris, position_ms: currentMs.current })
      } else {
        mutate({ position_ms: currentMs.current })
      }
      currentMs.current = 0
    }
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
