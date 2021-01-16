import React from 'react'
import { ControlButtonPrimary } from './ControlButtonPrimary'
import { ControlButtonSecondary } from './ControlButtonSecondary'
import { ControlWrapperInner } from './ControlWrapperInner'
import { ControlWrapperOuter } from './ControlWrapperOuter'
import { WrapperControl } from './WrapperControl'
import { WrapperMainPlayer } from './WrapperMainPlayer'
import { SpotifyPlayerSettings } from './SpotifyPlayerSettings'
import { WrapperPlayerMain } from './WrapperPlayerMain'
import { WrapperProgressBar } from './WrapperProgressBar'
import { WrapperTrackInfo } from './WrapperTrackInfo'

import nextImg from '../public/next.png'
import previousImg from '../public/previous.png'
import playImg from '../public/play.png'
import pauseImg from '../public/pause.png'
import repeatImg from '../public/repeat.png'
import shuffleImg from '../public/shuffle.png'
import { MusicSlider } from './Slider'
import { useSpotifyPlayer } from '../hooks/useSpotifyPlayer'
import SpotifySongInfo from './SpotifySongInfo'
import { useLocalDeviceStore } from '../hooks/useLocalDeviceStore'
import { usePlayerStore } from '../hooks/usePlayerStore'
import tw, { css } from 'twin.macro'
import 'twin.macro'
import { usePrevious } from '@bit/jannikwienecke.personal.use-previous'

const logoHeight = '15px'
const logoWidth = '15px'

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
  } = useSpotifyPlayer()

  const { deviceIsReady, deviceId } = useLocalDeviceStore()
  const { isPlaying, track } = usePlayerStore()
  const [loading, setLoading] = React.useState(true)
  const isReady = React.useRef(false)

  React.useEffect(() => {
    if (deviceId && deviceIsReady && track && !isReady.current) {
      isReady.current = true
      console.log('ready.')
      setLoading(false)
      onReady()
    }
  }, [deviceIsReady, deviceId, track])

  return (
    <div css={[!visibleOnLoading && loading && tw`invisible`]}>
      <WrapperPlayerMain>
        <WrapperTrackInfo tw="text-white">
          <SpotifySongInfo />
        </WrapperTrackInfo>
        <WrapperMainPlayer>
          <WrapperControl>
            <ControlWrapperOuter>
              <ControlWrapperInner>
                <ControlButtonSecondary>
                  <img
                    src={shuffleImg}
                    alt="shuffle"
                    height={logoHeight}
                    width={logoWidth}
                  />
                </ControlButtonSecondary>
              </ControlWrapperInner>
            </ControlWrapperOuter>
            <ControlWrapperOuter>
              <ControlWrapperInner>
                <ControlButtonSecondary onClick={handleClickPrevious}>
                  <img
                    src={previousImg}
                    alt="previous song"
                    height={logoHeight}
                    width={logoWidth}
                  />
                </ControlButtonSecondary>
              </ControlWrapperInner>
            </ControlWrapperOuter>
            <ControlWrapperOuter>
              <ControlWrapperInner>
                <ControlButtonPrimary
                  onClick={isPlaying ? handleClickPause : handleClickPlay}
                >
                  <img
                    src={isPlaying ? pauseImg : playImg}
                    alt="play"
                    height={logoHeight}
                    width={logoWidth}
                  />
                </ControlButtonPrimary>
              </ControlWrapperInner>
            </ControlWrapperOuter>
            <ControlWrapperOuter>
              <ControlWrapperInner>
                <ControlButtonSecondary onClick={handleClickNext}>
                  <img
                    src={nextImg}
                    alt="play next"
                    height={logoHeight}
                    width={logoWidth}
                  />
                </ControlButtonSecondary>
              </ControlWrapperInner>
            </ControlWrapperOuter>
            <ControlWrapperOuter>
              <ControlWrapperInner>
                <ControlButtonSecondary>
                  <img
                    src={repeatImg}
                    alt="play"
                    height={logoHeight}
                    width={logoWidth}
                  />
                </ControlButtonSecondary>
              </ControlWrapperInner>
            </ControlWrapperOuter>
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
