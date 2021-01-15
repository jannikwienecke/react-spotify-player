import { useSpotify } from './useSpotify'
import React from 'react'
// me/top/{type}
export const useTrack = () => {
  const [url, setUrl] = React.useState('')
  const { refetch, ...result } = useSpotify<SpotifyApi.TrackObjectFull>({
    url,
    refetchInterval: false,
    enabled: false,
  })

  const getTrack = (type: string) => {
    const baseUrl = 'tracks/'
    let currentUrl = baseUrl + trackId
    setUrl(currentUrl)
  }

  React.useEffect(() => {
    if (!url) return
    refetch()
  }, [url])

  return { ...result, getTrack }
}
