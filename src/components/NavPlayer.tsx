import React from 'react'
import 'twin.macro'
import tw from 'twin.macro'
import { useAlertStore } from '../hooks/useAlertStore'
import { useSpotifyPlayer } from '../hooks/useSpotifyPlayer'
import { useSpotifyToken } from '../hooks/useSpotifyToken'
import { Alert } from './Alert'
import { BarRemotePlayer } from './BarRemotePlayer'
import { ErrorInvalidToken } from './ErrorInvalidToken'
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
  onReady?: () => void
  visibleOnLoading?: boolean
  token: string
}

const ReactSpotifyPlayer: React.FC<PropsSpotifyPlayer> = ({
  onReady,
  visibleOnLoading = false,
  token,
}) => {
  const { isLoading } = useSpotifyPlayer({ onReady, token })
  const playerRef = React.useRef<HTMLDivElement>(null)
  const { alert } = useAlertStore()
  const { tokenIsInvalid } = useSpotifyToken()

  if (tokenIsInvalid) {
    return <ErrorInvalidToken />
  }
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
              <PlayerControl isLoading={isLoading} />
            </WrapperControl>

            <WrapperProgressBar>
              <MusicSlider />
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

export default ReactSpotifyPlayer
