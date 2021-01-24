import React from 'react'
import 'twin.macro'
import tw from 'twin.macro'
import { useAlertStore } from '../hooks/useAlertStore'
import { useDevices } from '../hooks/useDevices'
import { useSpotifyPlayer } from '../hooks/useSpotifyPlayer'
import { useSpotifyToken } from '../hooks/useSpotifyToken'
import { Alert } from './Alert'
import { BarRemotePlayer } from './BarRemotePlayer'
import Modal from './Modal'
import { PlayerControl } from './PlayerControl'
import { MusicSlider } from './Slider'
import { SpotifyPlayerSettings } from './SpotifyPlayerSettings'
import SpotifySongInfo from './SpotifySongInfo'
import { WrapperControl } from './WrapperControl'
import { WrapperMainPlayer } from './WrapperMainPlayer'
import { WrapperPlayerMain } from './WrapperPlayerMain'
import { WrapperProgressBar } from './WrapperProgressBar'
import { WrapperTrackInfo } from './WrapperTrackInfo'

interface PropsSpotifyPlayer {
  onReady: () => void
  visibleOnLoading: boolean
  token: string
}

const SpotifyPlayer: React.FC<PropsSpotifyPlayer> = ({
  onReady,
  visibleOnLoading = false,
  token,
}) => {
  const {
    handleClickPlay,
    handleClickPause,
    handleClickNext,
    handleClickPrevious,
    handleClickShuffle,
    handleClickRepeat,
    fetchCurrentSong,

    isLoading,
  } = useSpotifyPlayer({ onReady })

  const { alert } = useAlertStore()
  const { setToken } = useSpotifyToken()

  const playerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!token) {
      console.error('NO TOKEN PROVIDED')
    } else {
      setToken(token)
    }
  }, [token])

  return (
    <>
      <div
        css={[!visibleOnLoading && isLoading && tw`invisible`]}
        ref={playerRef}
      >
        <WrapperPlayerMain>
          <WrapperTrackInfo tw="text-white">
            <SpotifySongInfo />
          </WrapperTrackInfo>

          <WrapperMainPlayer>
            <WrapperControl>
              <PlayerControl
                handleClickPlay={handleClickPlay}
                handleClickPause={handleClickPause}
                handleClickNext={handleClickNext}
                handleClickPrevious={handleClickPrevious}
                handleClickShuffle={handleClickShuffle}
                handleClickRepeat={handleClickRepeat}
                isLoading={isLoading}
              />
            </WrapperControl>

            <WrapperProgressBar>
              <MusicSlider
                fetchCurrentSong={fetchCurrentSong}
                handleClickNext={handleClickNext}
              />
            </WrapperProgressBar>
          </WrapperMainPlayer>

          <SpotifyPlayerSettings />
        </WrapperPlayerMain>
        <BarRemotePlayer />
      </div>
      {alert && (
        <Modal>
          <Alert rectPosition={playerRef.current?.getBoundingClientRect()}>
            {alert}
          </Alert>
        </Modal>
      )}
    </>
  )
}

export default SpotifyPlayer
