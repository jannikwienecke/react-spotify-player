import React from 'react'
import { useDevices } from './useDevices'
import { useSpotify } from './useInitialSpotify'
import { usePlayer } from './usePlayer'

export const TEMP_TOkEN =
  'BQD1AYeet7QVPwGOqs7saaRdgfcFb6hCbFvO_du3UuYSZTjX54IBeD4psiBPgL9ngPkqG1zpnalID1Hxhi6h3aEBnQzjkm8dBSAsc3ZQ50BG0W2uN5BM_e0ynJPHvayglCXLchxvKnShdliGnDAdFgAnL7hgUzjNlV_gc8dINSxPM9UAllI17xr2QCvctDNzmVFqnpD6iyPqfBi6iE9OrT-leOSMXAuXXDgn5Hcvn3C-BFGBk0rD9nDJjVAHqlQpCfSbIkhWag6K5g'
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
