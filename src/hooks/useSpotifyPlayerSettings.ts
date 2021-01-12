import React from 'react'
import { useDevices } from './useDevices'
import { useSpotify } from './useInitialSpotify'
import { usePlayer } from './usePlayer'

export const TEMP_TOkEN =
  'BQCN9K510I7dKdlJtlQF8XT9OKHrQYUVq7MBjvczqVbe0ZnsBbb0LEi7ziIYXQ_crduvx9WQrsuwoeX2g975YhwowHLFYr_lnOz0EKlcIsuDZjrn8k9cLu_iEhMLnHZbe36_g92MeCDVkftJ39EPaNThF-hTk6XosIXAek5TTP8aYfaRtmCCOwuG2xskRaEs_QhIr-SJ99Dp1GYfPk5m57zGDDu25AVhm6tYyDp5xviwvbfkkgQYNI5GCp_SdSZVyihxW-aGX-E9SQ'
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
    }, 1000)
  }, [])

  return {
    devices: dataDevices?.devices,
    changeMediaPlayer,
    currentDeviceId,
  }
}
