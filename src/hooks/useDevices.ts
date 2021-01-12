import { useSpotify } from './useSpotify'
import { refetchIntervall } from '../spotifyConfig'

export const useDevices = () => {
  const url = 'me/player/devices'
  type devicesType = SpotifyApi.UserDevicesResponse
  const { refetch, ...result } = useSpotify<devicesType>({
    url,
    refetchInterval: refetchIntervall,
  })

  return { refetch, ...result }
}
