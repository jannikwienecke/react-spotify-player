import React from 'react'
import { useDevices } from './useDevices'
import { useSpotify } from './useInitialSpotify'
import { usePlayer } from './usePlayer'

export const TEMP_TOkEN =
  'BQCrE3Z1cihZYmch-8VvFtK7-m4gk7hdqUqIGeci87CEiACPy9YasnRYRgeSgT0QeuDgX87A33bkjaylTZljf0GYgPexyqPoha00t--PyqEcuDPAYXYWthkP5n0nbUgZo0u0zKuLujbRVY4NzgzeJkN2XMi3EsOQQaRqdAkGCABQ4l_RNKN9gUwSGMgXi2-78RGeY8FuA-vE_9pclsd0JvGaXvJqORxXEBnOveHUug-kis5pnt6SBGfCANgCsy4kpfWUJAq0enjOJQ'
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
