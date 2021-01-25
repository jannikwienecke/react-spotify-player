import React from 'react'
import { useQueryClient } from 'react-query'
import { devicesUrl } from './useDevices'
import { useSpotifyMutation } from './useSpotify'
import { useSpotifyToken } from './useSpotifyToken'
import { useValidMutation } from './useValidMutation'

export const usePlayer = () => {
  const url = 'me/player'

  const queryClient = useQueryClient()
  const { token } = useSpotifyToken()
  const { mutate, error, status } = useSpotifyMutation<null>({
    url,
    method: 'PUT',
  })

  useValidMutation(status, () => {
    queryClient.invalidateQueries([devicesUrl, token.slice(0, 20)])
  })

  const transferPlaybackToDevices = (device_ids: [string]) => {
    mutate({ device_ids })
  }

  React.useEffect(() => {
    if (error) console.error('ERROR TRANSFER PLAYBACk: ', error)
  }, [error])

  return { transferPlaybackToDevices, statusTransferPlayback: status }
}
