import React from 'react'
import tw from 'twin.macro'
import { useSpotifyPlayerSettings } from '../hooks/useSpotifyPlayerSettings'
import { DeviceListBox } from './DeviceListBox'
import { VolumeSlider } from './VolumeSlider'

const WrapperPlayerSettings = tw.div`w-1/4 flex justify-end justify-items-center items-center`

export const SpotifyPlayerSettings = () => {
  const { devices, changeMediaPlayer } = useSpotifyPlayerSettings()

  return (
    <WrapperPlayerSettings>
      {devices && devices.length > 0 && (
        <DeviceListBox
          devices={devices}
          changeMediaPlayer={changeMediaPlayer}
        />
      )}
      <VolumeSlider devices={devices} />
    </WrapperPlayerSettings>
  )
}
