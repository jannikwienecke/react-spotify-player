import React from 'react'
import { useDevices } from './useDevices'
import { useSpotify } from './useInitialSpotify'
import { usePlayer } from './usePlayer'

export const TEMP_TOkEN =
  'BQDpS1B3CK8eA2BC5vzhymaM0t5UMC6W0VyVxPozQxmih629_52hF-cpC_Ww30VQ34vK6kQyMBSz5BI4zu4933cgC8Cl6Hn8J_ZvdklKLnZBj5TqP6aA8yKkkcwUW7zEquedDSsEO9n3KmHlyhI_S8pVUEBo9f9bzeAnpRTrMh00kKiuxf4TBkD_lWaO147l1IT6Dsr6HeIJIDkuAiY9O1ReIbphfRGluo0MTT0OakRj6GKFs6Miv9cdhZeVtMaReFVxItnO7ZUjXg'

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
