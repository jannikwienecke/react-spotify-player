import React from 'react'
import { useSpotify } from './useSpotify'
import { refetchIntervall, SPOTIFY_PLAYER_NAME } from '../spotifyConfig'
import { usePlayer } from './usePlayer'
import { useLocalDeviceStore } from './useLocalDeviceStore'
import { useValidMutation } from './useValidMutation'
import { usePlayerStore } from './usePlayerStore'

export const useDevices = () => {
  const url = 'me/player/devices'
  type devicesType = SpotifyApi.UserDevicesResponse
  const { transferPlaybackToDevices, statusTransferPlayback } = usePlayer()
  const { track } = usePlayerStore()
  const { deviceId, setDeviceIsReady } = useLocalDeviceStore()
  const { refetch, ...result } = useSpotify<devicesType>({
    url,
    refetchInterval: refetchIntervall,
  })

  // WHEN PLAYBACk IS TRANSFERRED TO NEW DEVICE
  // THIS PLAYER IS READY
  useValidMutation(statusTransferPlayback, () => {
    setDeviceIsReady()
  })

  const getId = (device: SpotifyApi.UserDevice | string | null | undefined) => {
    if (!device) return
    if (typeof device === 'string') return device

    return device.id
  }

  const getActiveDevice = () => {
    const devices = result.data?.devices
    if (!devices) return undefined

    let activeDevice = devices.find(device => device.is_active)
    if (!activeDevice) {
      activeDevice = devices.find(device => device.name === SPOTIFY_PLAYER_NAME)
    }

    return activeDevice
  }
  const getActiveDeviceId = React.useCallback(() => {
    const activeDevice = getActiveDevice()
    if (!activeDevice) {
      if (!deviceId) return
      transferPlaybackToDevices([deviceId])
    }

    return getId(activeDevice || deviceId)
  }, [result.data?.devices, deviceId])

  // IF THIS SPOTIFY PLAYER IS NOT IN DEVICES - AND NO ACTIVE DEVICE
  // THEN SET THIS PLAYER AS THE ACTIVE DEVICE
  React.useEffect(() => {
    const activeDevice = getActiveDevice()

    if (activeDevice) {
      setDeviceIsReady()
    } else if (!activeDevice) {
      if (!deviceId) return
      track && transferPlaybackToDevices([deviceId])
    }
  }, [result.data?.devices, deviceId])

  return {
    refetch,
    ...result,
    getActiveDeviceId,
  }
}
