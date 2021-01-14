import { useSpotify } from './useSpotify'
import React from 'react'

export const useAlbum = () => {
  const [url, setUrl] = React.useState('')
  const { refetch, ...result } = useSpotify<SpotifyApi.AlbumObjectFull>({
    url,
    refetchInterval: false,
    enabled: false,
  })

  const getAlbum = (albumId: string) => {
    const baseUrl = 'albums/'
    let currentUrl = baseUrl + albumId

    setUrl(currentUrl)
  }

  React.useEffect(() => {
    if (!url) return
    refetch()
  }, [url])

  return { ...result, getAlbum }
}
