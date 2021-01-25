import { useSpotifyMutation } from './useSpotify'
import React from 'react'
import { useRefetchCurrentSong } from './useRefetchCurrentSong'
import { usePlayerStore } from './usePlayerStore'

export const useSeekPosition = () => {
  const [url, setUrl] = React.useState('')
  const { setAction } = usePlayerStore()

  const { mutate, error, ...result } = useSpotifyMutation<null>({
    url,
    method: 'PUT',
  })

  useRefetchCurrentSong(result.status, () => {
    setAction('SUCCESS_MS_CHANGE')
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

  return { seekToPosition, statusSeekToPosition: result.status }
}
