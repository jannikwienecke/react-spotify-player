import {
  useListBox,
  ListItem,
} from '@bit/jannikwienecke.personal.react-listbox'
import { PropsDevicesListBox } from '../components/DeviceListBox'

export const useDeviceListBox = ({
  devices,
  changeMediaPlayer,
}: PropsDevicesListBox) => {
  const listItems: ListItem[] = devices.map(device => {
    return {
      id: device.id || '',
      name: device.name || '',
      isActive: device.is_active || false,
    }
  })

  const { value, handleChange } = useListBox({
    listItems: listItems || [],
    onChange: activeItem => {
      changeMediaPlayer(`${activeItem.id}`)
    },
  })

  return { handleChange, value, listItems }
}
