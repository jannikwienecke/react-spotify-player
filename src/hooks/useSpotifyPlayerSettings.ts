import React from 'react'
import { useDevices } from './useDevices'
import { useSpotify } from './useInitialSpotify'
import { usePlayer } from './usePlayer'

export const TEMP_TOkEN =
  'BQB_7JAWIY6xLgyZ4kRlfcHntkuncms9ekGnWg8p1tDV-3GY53ADxOpGhR5iycOX_Tz57Og_BVsCdR4RXi_721RZ41i_O08eOgObuKtaDiYc8I_YsFLV8SlJFSMJUGLegW0a_KrqWy7p1oHGw1399puRSU7KSF6W3HLR23uFh5ePVo0J5f9jkWv9NBdTV3evu2xX6bZnyUwlcvPxL_meCUa178h7refiq6L16Fi9lUA7Wn9dsoJAUIeYTyN4kD_2g4jpBn82SmMSDKv7'

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
