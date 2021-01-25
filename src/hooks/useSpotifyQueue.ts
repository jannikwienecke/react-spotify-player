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

  const addTracksToQueue = (uris: string[]) => {
    let index = 0
    window.setInterval(() => {
      addTrackToQueue(uris[index])
      index++
    }, 50)
  }

  React.useEffect(() => {
    if (!url) return
    mutate({})
  }, [url])

  React.useEffect(() => {
    if (error) console.error('ERROR useSpotifyQueue: ', error)
  }, [error])

  return {
    addTrackToQueue,
    addTracksToQueue,
    statusAddSongToQueue: result.status,
    ...result,
  }
}
