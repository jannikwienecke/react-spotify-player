import React from 'react'
import { useDevices } from './useDevices'
import { useSpotify } from './useInitialSpotify'
import { usePlayer } from './usePlayer'

export const TEMP_TOkEN =
  'BQBtyqArU3RkxHLYoWtvRTWQxPdiW9JPvb5mJDTOA0O-QeEjQECaNtOYayQn0IMUsLd4s4pzEcxQ-vp_X3rR4ofXA_8MErMV9G9xdE2p1MNoBYB1PxA1UA7YyqrLy5rTRGpAYxzIgPqET140J4AdYWPpPJrMD0tqiPcnMeYd6Y12EB14kkFjODJzZ4YxG2zDn-HhVA2ktGEghyHzhvLGforP53Q-SQQ9ItYWayo7hP4FtCyHJLPwr-6I0VtZanr0F4DSeZmcIydo0A'
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

  const changeMediaPlayer = (deviceId: string | null) => {
    if (!deviceId) return
    transferPlaybackToDevices([deviceId])
    setTimeout(() => {
      refetch()
    }, 1000)
  }

  return {
    devices: dataDevices?.devices,
    changeMediaPlayer,
  }
}
