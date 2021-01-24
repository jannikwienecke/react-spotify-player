import React from 'react'
import { usePlayerStore } from './usePlayerStore'
import { useSpotifyMutation } from './useSpotify'
import { useValidMutation } from './useValidMutation'

export const useRepeat = () => {
  const [url, setUrl] = React.useState('')

  const {
    nextRepeatMode,
    updateRepeatMode: updateRepeatModeStore,
  } = usePlayerStore()
  const { mutate: shuffle, status } = useSpotifyMutation<
    SpotifyApi.PlaylistObjectFull
  >({
    url,
    method: 'PUT',
  })

  useValidMutation(status, () => {
    updateRepeatModeStore()
  })

  const updateRepeatMode = () => {
    console.log('nextRepeatMode', nextRepeatMode)
    const baseUrl = 'me/player/repeat'
    setUrl(`${baseUrl}?state=${nextRepeatMode}`)
  }

  React.useEffect(() => {
    if (!url) return
    shuffle({})
    setUrl('')
  }, [url])

  return { updateRepeatMode }
}
