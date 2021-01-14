import { useSpotify } from './useSpotify'
import React from 'react'
export const usePlaylist = () => {
  const [url, setUrl] = React.useState('')
  const { refetch, ...result } = useSpotify<SpotifyApi.PlaylistObjectFull>({
    url,
    refetchInterval: false,
    enabled: false,
  })

  const getPlaylist = (playlistId: string) => {
    const baseUrl = 'playlists/'
    let currentUrl = baseUrl + playlistId
    setUrl(currentUrl)
  }

  React.useEffect(() => {
    if (!url) return
    refetch()
  }, [url])

  return { ...result, getPlaylist }
}
