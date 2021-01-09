import { useSpotifyMutation } from './useSpotify'
import React from 'react'

// interface UsePlayInterface {}
export const useSeekPosition = () => {
  const [url, setUrl] = React.useState('')

  const { mutate, error, ...resutlt } = useSpotifyMutation<null>({
    url,
    method: 'PUT',
  })

  const seekToPosition = (position_ms: number) => {
    const url = 'me/player/seek'
    setUrl(url + '?position_ms=' + parseInt(String(position_ms)))
  }

  React.useEffect(() => {
    if (!url) return

    mutate({})
  }, [url])

  React.useEffect(() => {
    if (error) console.error('ERROR seekToPosition: ', error)
  }, [error])

  return { seekToPosition, statusSeekToPosition: resutlt.status }
}
