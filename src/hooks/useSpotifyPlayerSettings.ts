import React from 'react'
import { useDevices } from './useDevices'
import { useSpotify } from './useInitialSpotify'
import { usePlayer } from './usePlayer'

export const TEMP_TOkEN =
  'BQAqkHN_lQlCnwHNdomDX4CK6FMiae-lMkKoK-Tl5eOPX0vpGT9rs1QWooWue9b5rAIF6gicy1Ra5tsUoFkrkyHQYp6IsZWW8xtnoTa4b1lvPGApB-S51ve3QX0voaJlfQZ7wNJM6JvGqvcs5e9uJnmDDPSHQ1mHWW6Af-RnUfZD499GjdWia-zkvsurxfkPVx_wF7x4MaVvHXNwHJFFHABVusSrnSja-5OkTPIfc2NP-8dGHAuwhBKja6RgRtdM4qmNM10Q3w87WA'
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
