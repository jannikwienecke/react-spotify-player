import React from 'react'
import ReactListBox, {
  Logo,
  Headline,
  List,
} from '@bit/jannikwienecke.personal.react-listbox'

import 'twin.macro'
import { useDeviceListBox } from '../hooks/useDeviceListBox'
import { SPOTIFY_PLAYER_NAME } from '../spotifyConfig'
import { DeviceButton } from './DeviceButton'
import { PeakActiveDevice } from './PeakActiveDevice'
export interface PropsDevicesListBox {
  devices: SpotifyApi.UserDevice[]
  changeMediaPlayer: (deviceId: string | null) => void
}

export const DeviceListBox: React.FC<PropsDevicesListBox> = React.memo(
  ({ devices, changeMediaPlayer }) => {
    const { value, listItems, handleChange } = useDeviceListBox({
      devices,
      changeMediaPlayer,
    })

    const isRemotePlayer =
      devices.find(device => device.is_active)?.name !== SPOTIFY_PLAYER_NAME

    const ref = React.useRef<HTMLDivElement>(null)
    return (
      <div tw="w-24 text-center relative" ref={ref}>
        <ReactListBox
          value={value}
          handleChange={handleChange}
          ButtonComp={isRemotePlayer ? DeviceButton : undefined}
        >
          <Headline text={'Connect with a device'} />
          <Logo />
          <List
            listItems={listItems}
            stylesUl={{ maxHeight: '400px', height: 'auto' }}
          />
        </ReactListBox>
        {isRemotePlayer && (
          <PeakActiveDevice
            rectPosition={ref.current?.getBoundingClientRect()}
          />
        )}
      </div>
    )
  },
)
