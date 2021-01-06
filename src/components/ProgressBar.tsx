import React from 'react'
import 'twin.macro'
import tw from 'twin.macro'
import { useProgressBar } from '../hooks/useProgressBar'
import { Pointer } from './Pointer'
import { ProgressBarSiderContainer } from './ProgressBarSiderContainer'

export interface useProgressBarProps {
  startMs: number
}

export interface ProgressBarProps {
  handleChange: (newMs: number) => void
  play: boolean
  currentMs: number
  totalMs: number
  mediaId: number
}

export const Slider: React.FC<ProgressBarProps> = ({
  handleChange,
  play,
  totalMs,
  mediaId,
  currentMs,
}) => {
  const pB = useProgressBar({
    play,
    handleChange,
    currentMs,
    mediaId,
    totalMs,
  })

  return (
    <ProgressBarWrapper
      ref={pB.progressBarRef}
      onClick={pB.handleClickProgressBar}
      onMouseDown={pB.handleMouseDownProgressBar}
      onMouseOver={pB.handleHoverProgressBar}
      // onMouseMove={pB.handleMouseMove}
      onMouseLeave={pB.handleMouseLeave}
    >
      <ProgressBarSiderContainer
        progress={pB.playbackProgress}
        hover={pB.isHoveringProgressBar}
      >
        <Pointer {...pB} />
      </ProgressBarSiderContainer>
    </ProgressBarWrapper>
  )
}

const ProgressBarWrapper = tw.button`bg-gray-600 h-2 relative focus:outline-none w-3/4 mx-auto`

// const ProgressBarWrapper = () => {
//   return <button></button>
// }
