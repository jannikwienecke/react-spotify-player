import React from 'react'
import { useDevices } from './useDevices'
import { useSpotify } from './useInitialSpotify'
import { usePlayer } from './usePlayer'

export const TEMP_TOkEN =
  'BQDRJXXrE6W8IwIHqm6GtMOuKtgTfpgytXRKfn6XNeiSlqMx2AfA6l-089I8S8bHUHj9evEbIwO5YQSZYCyxpBsAfajB9LsVmRRqiTbZ__Gq39EhDmiLbt4XavtvFkfwSuBgkbBJVIRt8GkTVakm9Sy4TCSofHI9t5BIssFzNEpND74rCLEjBB9nj3YgJikd9TODk-iAGD0jBJhd9QpFYdU9Nze08YMHgLdHzY6-8iQJvtRXN3CHfnYlNbqBZ1IdJA4aZKMLWhgCsA'

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
