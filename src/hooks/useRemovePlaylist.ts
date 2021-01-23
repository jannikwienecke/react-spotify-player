import React from 'react'
import { useSpotifyMutation } from './useSpotify'

export const useUnfollowPlaylist = () => {
  const [url, setUrl] = React.useState('')
  const { mutate: removePlaylist } = useSpotifyMutation<
    SpotifyApi.PlaylistObjectFull
  >({
    url,
    method: 'DELETE',
  })

  const unfollowPlaylist = (playlistId: string) => {
    const newUrl = `playlists/${playlistId}/followers`
    setUrl(newUrl)
  }

  React.useEffect(() => {
    if (!url) return

    removePlaylist({})
  }, [url])

  return { unfollowPlaylist }
}
