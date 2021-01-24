import React from 'react'
import { useDevices } from './useDevices'
import { useSpotify } from './useInitialSpotify'
import { usePlayer } from './usePlayer'

export const TEMP_TOkEN =
  'BQCdPBj86nQN6nDKSSnSQLIwwYs7D3QKGSwhDvR2bgPWACqZEKCuzbBlRZ3DkWtdXgCxhgRK-vTNIyfBeZC5mTv0j9Cdz2fIXZ0rTOCVgOWDaGDuiJB3IBwhHvKi9vGc2fk1b2dXvLqPe5TKu5ZqPzLV7IAZsGt42IWyGQY05Y8FZTznGw8WMn-OEdGrWOqV8khvpAz3X99ezKqIfuoAhpvMR1usa0JIr1kEOHihZvV0czYqoayhpFwFl9bKKrQWcvb2weK6zJJSRsDy'
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
