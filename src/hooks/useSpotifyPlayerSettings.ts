import React from 'react'
import { useDevices } from './useDevices'
import { useSpotify } from './useInitialSpotify'
import { usePlayer } from './usePlayer'
import { useQueueStore } from './useQueueStore'

export const TEMP_TOkEN =
  'BQD9uEx_QIdvCFy7GpZRpjBrfwndjVhc-x5CQoggK5Mp1Hl6I9XR1F3b6ITRzGEbzQqmhtLmJbXgEqMLqxlbvNnI-ttWcw75lw_umjqJZEfRSAn1FQJ_XM5_XqPzdKUFWlRQ0r7fj4C_83YTvlnvM729ZrfKcssQobNBVZutfmKutfU8z8EDOli1Im0uzya9spNNJX3698d_gOUscMaP9-m8X0yqBNZUwh50tFHwlK6tT8gg_odUM63YKz-mjsNSdURshMaSRWysvw'
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
