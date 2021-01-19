import React from 'react'
import { useDevices } from './useDevices'
import { useSpotify } from './useInitialSpotify'
import { usePlayer } from './usePlayer'
import { useQueueStore } from './useQueueStore'

export const TEMP_TOkEN =
  'BQDzCz02VlnfUwLZkAspQf5Tm2Riiri4WnbpW3KUlEUMqhSnA3dn2oW4j8jP_fpZBr08LhdZCsLvznUGY908GVBriKpng1UynA2NU-c8We5XQcOup_wDWj2IHnHY2K66OLgumrq2JAuXtny6ie25MHmJCGP5G2gB1JDZjkkY2TfbX188O42wrW2vB3EFI2ZfLYUeBeZPVBxtcx3TWJd_9EYmeFabFKUoDf7c6D7yFvtNWDS-RqYBt7GFHjEky8c62omkgRSge89Hsg'
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
