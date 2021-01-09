import tw from 'twin.macro'
import { useSpotifyPlayerSettings } from '../hooks/useSpotifyPlayerSettings'

const WrapperPlayerSettings = tw.div`w-1/4 flex flex-col justify-center`

export const SpotifyPlayerSettings = () => {
  const { devices, changeMediaPlayer } = useSpotifyPlayerSettings()

  return (
    <WrapperPlayerSettings>
      {devices?.find(device => device.is_active)?.name}
      SELECT DEVICE
      <ul>
        {devices
          ?.filter(device => !device.is_active)
          .map(device => (
            <li>
              <button
                onClick={() => changeMediaPlayer(device.id)}
                tw="bg-red-400 m-2 p-1 rounded-md"
              >
                {device.name}
              </button>
            </li>
          ))}
      </ul>
    </WrapperPlayerSettings>
  )
}
