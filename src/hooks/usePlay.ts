import { useSpotifyMutation } from './useSpotify'
import React from 'react'
import { useDevices } from './useDevices'

export const usePlay = () => {
  const [url, setUrl] = React.useState<string>('')
  const [uris, setUris] = React.useState<string[] | undefined>()
  const { activeDevice } = useDevices()

  const { mutate, error, ...result } = useSpotifyMutation<null>({
    url,
    method: 'PUT',
  })

  React.useEffect(() => {
    if (url && uris) {
      mutate({ uris })
    }
  }, [url, mutate, uris])

  const play = React.useCallback(
    (uris: string[]) => {
      if (!activeDevice) return

      const newUrl = `me/player/play?device_id=${activeDevice.id}`

      setUrl(newUrl)
      setUris(uris)
    },
    [activeDevice],
  )

  React.useEffect(() => {
    let err: any = error
    if (err && err?.error?.reason === 'UNKNOWN') {
      if (url) {
        console.log('play...')

        mutate(uris)
      }
    }
  }, [error])

  return { ...result, play }
}
