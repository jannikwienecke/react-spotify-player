import React from 'react'
import { useProgressBar } from '../hooks/useProgressBar'
import { ProgressBarProps } from '../types'
import { Pointer } from './Pointer'
import { ProgressBarSiderContainer } from './ProgressBarSiderContainer'

import '../index.css'

export const Slider: React.FC<ProgressBarProps> = ({
  handleChange,
  play,
  totalMs,
  mediaId,
  currentMs,
  stylesSlider,
  stylesSliderProgress,
  stylesPointer,
}) => {
  const pB = useProgressBar({
    play,
    handleChange,
    currentMs,
    mediaId,
    totalMs,
  })

  const styles = {
    ...{
      backgroundColor: 'rgba(75, 85, 99, 1)',
      height: '0.5rem',
      width: '75%',
      margin: '0 auto',
    },
    ...stylesSlider,
  }

  return (
    <div
      className="slider-wrapper"
      style={styles}
      ref={pB.progressBarRef}
      onClick={pB.handleClickProgressBar}
      onMouseOver={pB.handleHoverProgressBar}
      onMouseLeave={pB.handleMouseLeave}
    >
      <ProgressBarSiderContainer
        progress={pB.playbackProgress}
        hover={pB.isHoveringProgressBar}
        stylesSliderProgress={stylesSliderProgress}
      >
        <Pointer pB={pB} stylesPointer={stylesPointer} />
      </ProgressBarSiderContainer>
    </div>
  )
}
