import React from 'react'
import { useDevices } from './useDevices'
import { useSpotifyMutation } from './useSpotify'

export const useSpotifyQueue = () => {
  const [url, setUrl] = React.useState('')
  const { getActiveDeviceId } = useDevices()

  const { mutate, error, ...result } = useSpotifyMutation<null>({
    url,
    method: 'POST',
  })

  const addTrackToQueue = (uri: string) => {
    const acticeDeviceId = getActiveDeviceId()
    if (!acticeDeviceId) return

    const baseUrl = 'me/player/queue'
    const newUrl = baseUrl + '?uri=' + uri

    setUrl(newUrl)
  }

  React.useEffect(() => {
    if (!url) return
    console.log('add to tqueue: ', url)
    mutate({})
  }, [url])

  React.useEffect(() => {
    if (error) console.error('ERROR useSpotifyQueue: ', error)
  }, [error])

  return { addTrackToQueue, statusAddSongToQueue: result.status, ...result }
}
