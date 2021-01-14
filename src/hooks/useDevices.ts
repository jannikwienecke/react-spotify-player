import { useSpotify } from './useSpotify'
import { refetchIntervall, SPOTIFY_PLAYER_NAME } from '../spotifyConfig'

export const useDevices = () => {
  const url = 'me/player/devices'
  type devicesType = SpotifyApi.UserDevicesResponse
  const { refetch, ...result } = useSpotify<devicesType>({
    url,
    refetchInterval: refetchIntervall,
  })

  const getActiveDevice = () => {
    const devices = result.data?.devices
    if (!devices) return undefined

    let activeDevice = devices.find(device => device.is_active)
    if (!activeDevice) {
      activeDevice = devices.find(device => device.name === SPOTIFY_PLAYER_NAME)
    }

    return activeDevice
  }

  return { refetch, ...result, activeDevice: getActiveDevice() }
}
