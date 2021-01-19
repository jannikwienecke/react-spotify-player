import { useSpotify } from './useSpotify'
import React from 'react'
import { client } from '../utils'
import { useSpotifyToken } from './useSpotifyToken'
export const useTrack = () => {
  const [url, setUrl] = React.useState('')
  const { token } = useSpotifyToken()
  const { refetch, ...result } = useSpotify<SpotifyApi.TrackObjectFull>({
    url,
    refetchInterval: false,
    enabled: false,
  })

  const getTrack = (trackId: string) => {
    const baseUrl = 'tracks/'
    let currentUrl = baseUrl + trackId
    setUrl(currentUrl)
  }

  const getFullTrack = (
    trackId: string,
  ): Promise<SpotifyApi.TrackObjectFull> => {
    const baseUrl = 'tracks/'
    let endpoint = baseUrl + trackId
    return client({ endpoint, token, method: 'GET' })
  }

  React.useEffect(() => {
    if (!url) return
    refetch()
  }, [url])

  return { ...result, getTrack, getFullTrack }
}
