import React from 'react'
import { useDevices } from './useDevices'
import { useSpotify } from './useInitialSpotify'
import { usePlayer } from './usePlayer'

export const TEMP_TOkEN =
  'BQDxXElYKYjbzag6iabGlUX2PiIxheDZFtHPY88SojOwOJy9vrBZ4unVmyZk0xWx2fAXSoKK8MrQL7bBzskY6U3K2F1Bln-FNS3N3w5yu3DOxM7AS7ohdCP2CI5nyAIbxnLpIVt8PfedKOXv3xSAxG5KBRbfcsAvscWjn3-d_n4jkjKAXYVZwric12n9YXXHQfhGBMfiReDCHNqY8Cc9Q0NTxiL9nbFS0W-_TP3_2lWMtDEyZabzjvnwTKp3qO8e0GWQ-MS_qE-EBf99'
export const useSpotifyPlayerSettings = () => {
  const [currentDeviceId, setCurrentDeviceId] = React.useState<string>()

  useSpotify(TEMP_TOkEN)

  const { data: dataDevices, refetch } = useDevices()
  const { transferPlaybackToDevices } = usePlayer()

  // SETS NEW CURRENTDEVICE WHEN CHANGED OR WHEN LOADED AT THE START
  React.useEffect(() => {
    if (!dataDevices || !dataDevices.devices) return
    const newCurrentDevice =
      dataDevices.devices.find(device => device.is_active)?.id || undefined
    setCurrentDeviceId(newCurrentDevice)
  }, [dataDevices])

  const changeMediaPlayer = React.useCallback((deviceId: string | null) => {
    if (!deviceId) return
    transferPlaybackToDevices([deviceId])
    setTimeout(() => {
      refetch()
    }, 10000)
  }, [])

  return {
    devices: dataDevices?.devices,
    changeMediaPlayer,
    currentDeviceId,
  }
}
