import { useSpotifyMutation } from './useSpotify'
import React from 'react'

// interface UsePlayInterface {}
export const useSetVolume = () => {
  const [url, setUrl] = React.useState('')

  const { mutate, error, ...resutlt } = useSpotifyMutation<null>({
    url,
    method: 'PUT',
  })

  const setVolume = (volume: number) => {
    const url = 'me/player/volume'
    setUrl(url + '?volume_percent=' + parseInt(String(volume)))
  }

  React.useEffect(() => {
    if (!url) return

    mutate({})
  }, [url])

  React.useEffect(() => {
    if (error) console.error('ERROR useSetVolume: ', error)
  }, [error])

  return { setVolume, statusSetVolume: resutlt.status }
}
