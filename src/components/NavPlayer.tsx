import React from 'react'
import 'twin.macro'
import { ControlButtonPrimary } from './ControlButtonPrimary'
import { ControlButtonSecondary } from './ControlButtonSecondary'
import { ControlWrapperInner } from './ControlWrapperInner'
import { ControlWrapperOuter } from './ControlWrapperOuter'
import { WrapperControl } from './WrapperControl'
import { WrapperMainPlayer } from './WrapperMainPlayer'
import { WrapperPlaterSettings } from './WrapperPlaterSettings'
import { WrapperPlayerMain } from './WrapperPlayerMain'
import { WrapperProgressBar } from './WrapperProgressBar'
import { WrapperTrackInfo } from './WrapperTrackInfo'

import nextImg from '../public/next.png'
import previousImg from '../public/previous.png'
import plagImg from '../public/play.png'
import pauseImg from '../public/pause.png'
import repeatImg from '../public/repeat.png'
import shuffleImg from '../public/shuffle.png'
import { MusicSlider } from './Slider'
import { useSpotifyPlayer } from '../hooks/useSpotifyPlayer'

const logoHeight = '15px'
const logoWidth = '15px'
const SpotifyPlayer = () => {
  const { handleClickPlay, onChange, play, currentMs } = useSpotifyPlayer()

  return (
    <WrapperPlayerMain>
      <WrapperTrackInfo>Track Info</WrapperTrackInfo>

      <WrapperMainPlayer>
        <WrapperControl>
          <ControlWrapperOuter>
            <ControlWrapperInner>
              <ControlButtonSecondary>
                <img
                  src={shuffleImg}
                  alt="play"
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
                  src={previousImg}
                  alt="play"
                  height={logoHeight}
                  width={logoWidth}
                />
              </ControlButtonSecondary>
            </ControlWrapperInner>
          </ControlWrapperOuter>
          <ControlWrapperOuter>
            <ControlWrapperInner>
              <ControlButtonPrimary onClick={handleClickPlay}>
                <img
                  src={!play ? plagImg : pauseImg}
                  alt="play"
                  height={logoHeight}
                  width={logoWidth}
                />
              </ControlButtonPrimary>
            </ControlWrapperInner>
          </ControlWrapperOuter>
          <ControlWrapperOuter>
            <ControlWrapperInner>
              <ControlButtonSecondary>
                <img
                  src={nextImg}
                  alt="play"
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
            play={play}
            currentMs={currentMs}
            handleChange={onChange}
          />
        </WrapperProgressBar>
      </WrapperMainPlayer>

      <WrapperPlaterSettings>Settings</WrapperPlaterSettings>
    </WrapperPlayerMain>
  )
}

export default SpotifyPlayer
