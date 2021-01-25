import { useDevices } from '../hooks/useDevices'
import 'twin.macro'
import { SPOTIFY_PLAYER_NAME } from '../spotifyConfig'
import { useLocalDeviceStore } from '../hooks/useLocalDeviceStore'

export const BarRemotePlayer = () => {
  const { data: devices } = useDevices()
  const { deviceIsReady } = useLocalDeviceStore()

  const currentDevice = devices?.devices.find(device => device.is_active)?.name
  const isRemotePlayer = currentDevice !== SPOTIFY_PLAYER_NAME

  if (!currentDevice || !deviceIsReady || !isRemotePlayer) return null
  return (
    <div tw="flex justify-end pr-20 text-white text-sm bg-spotifyGreen z-10">
      <span tw="opacity-75">Your Device:</span>{' '}
      {devices?.devices.find(device => device.is_active)?.name}
    </div>
  )
}
