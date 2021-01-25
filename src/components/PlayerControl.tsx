import React from 'react'
import 'twin.macro'
import { usePlayerStore } from '../hooks/usePlayerStore'
import nextImg from '../public/next.png'
import pauseImg from '../public/pause.png'
import playImg from '../public/play.png'
import previousImg from '../public/previous.png'
import repeatImg from '../public/repeat.svg'
import repeatGreen from '../public/repeat-green.svg'
import shuffleGreen from '../public/shuffle-green.svg'
import shuffleImg from '../public/shuffle.svg'
import { ControlButtonPrimary } from './ControlButtonPrimary'
import { ControlButtonSecondary } from './ControlButtonSecondary'
import { ControlWrapperInner } from './ControlWrapperInner'
import { ControlWrapperOuter } from './ControlWrapperOuter'
import { Spinner } from './Spinner'
import { useClickHandlers } from '../hooks/useClickHandlers'
import { ShufflePoint } from './ShufflePoint'

const logoHeight = '15px'
const logoWidth = '15px'

interface PropsPlayerControl {
  isLoading: boolean
}
export const PlayerControl: React.FC<PropsPlayerControl> = ({ isLoading }) => {
  const { isPlaying, isShuffle, repeatMode } = usePlayerStore()
  const {
    handleClickNext,
    handleClickPause,
    handleClickPlay,
    handleClickPrevious,
    handleClickRepeat,
    handleClickShuffle,
  } = useClickHandlers()

  return (
    <>
      <ControlWrapperOuter>
        <ControlWrapperInner>
          <ControlButtonSecondary onClick={handleClickShuffle}>
            <img
              src={isShuffle ? shuffleGreen : shuffleImg}
              alt="shuffle"
              height={'20px'}
              width={'20px'}
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
          {!isLoading ? (
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
          ) : (
            <Spinner />
          )}
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
          <ControlButtonSecondary onClick={handleClickRepeat}>
            <img
              src={repeatMode === 'off' ? repeatImg : repeatGreen}
              alt="repeat"
              height={'20px'}
              width={'20px'}
            />
            {repeatMode !== 'off' && (
              <div tw="relative top-2 left-0 flex w-5 justify-around">
                <ShufflePoint />
                {repeatMode === 'context' && (
                  <>
                    <ShufflePoint />
                    <ShufflePoint />
                  </>
                )}
              </div>
            )}
          </ControlButtonSecondary>
        </ControlWrapperInner>
      </ControlWrapperOuter>
    </>
  )
}
