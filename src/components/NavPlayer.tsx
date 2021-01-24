import React from 'react'
import 'twin.macro'
import tw from 'twin.macro'
import { useSpotifyPlayer } from '../hooks/useSpotifyPlayer'
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
}

const SpotifyPlayer: React.FC<PropsSpotifyPlayer> = ({
  onReady,
  visibleOnLoading = false,
}) => {
  const {
    handleClickPlay,
    handleClickPause,
    handleClickNext,
    handleClickPrevious,
    fetchCurrentSong,
    isPlaying,
    isLoading,
  } = useSpotifyPlayer({ onReady })

  return (
    <div css={[!visibleOnLoading && isLoading && tw`invisible`]}>
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
              isLoading={isLoading}
              isPlaying={isPlaying}
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
    </div>
  )
}

export default SpotifyPlayer
