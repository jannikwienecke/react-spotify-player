import React from 'react'
import { useSpotifyMutation } from './useSpotify'

// interface UsePlayInterface {}
export const usePlayer = () => {
  const url = 'me/player'

  const { mutate, error } = useSpotifyMutation<null>({
    url,
    method: 'PUT',
  })

  const transferPlaybackToDevices = (device_ids: [string]) => {
    mutate({ device_ids })
  }

  React.useEffect(() => {
    if (error) console.error('ERROR TRANSFER PLAYBACk: ', error)
  }, [error])

  return { transferPlaybackToDevices }
}
