import React from 'react'
import { useDevices } from './useDevices'
import { useSpotify } from './useInitialSpotify'
import { usePlayer } from './usePlayer'

export const TEMP_TOkEN =
  'BQC2qze0gwMPYq8Cyx1vyJeryBrqK1h4JMQPQpFqHHyEYpKp_sc3UnyShzgiyK8nqNlEpImRgWdtZNTmgjLe4ASU1YwGcbm5GBv8um15AnjNvMd7QgKQo3ayzKK26LQJfZYRkTblohl9wJ3H9HQ4SHiP2GB6I8b4cqsaTCNCeOcG9BiP80NQFkpxQsl_97pDyfHk_mml0Rh98NBYqsT3giPYQFYUTbIbX_voOEbig05el6yr2qRxz9S3Pni1JYRySQfTphOOOMkPFA'
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
