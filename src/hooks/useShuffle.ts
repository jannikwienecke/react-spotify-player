import React from 'react'
import { usePlayerStore } from './usePlayerStore'
import { useSpotifyMutation } from './useSpotify'
import { useValidMutation } from './useValidMutation'

export const useShuffle = () => {
  const [url, setUrl] = React.useState('')

  const { toggleShuffle: toggleShuffleStore, isShuffle } = usePlayerStore()
  const { mutate: shuffle, status } = useSpotifyMutation<
    SpotifyApi.PlaylistObjectFull
  >({
    url,
    method: 'PUT',
  })

  useValidMutation(status, () => {
    toggleShuffleStore()
  })

  const toggleShuffle = () => {
    const baseUrl = 'me/player/shuffle'
    setUrl(`${baseUrl}?state=${!isShuffle}`)
  }

  React.useEffect(() => {
    if (!url) return
    shuffle({})
    setUrl('')
  }, [url])

  return { toggleShuffle }
}
