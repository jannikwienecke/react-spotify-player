import React from 'react'
import { useProgressBar } from '../hooks/useProgressBar'
import { ProgressBarProps } from '../types'
import { Pointer } from './Pointer'
import { ProgressBarSideContainer } from './ProgressBarSideContainer'

import './Slider.css'

/**
 *
 * This Component allows to control and track the progress of music, video ... media types
 */

// * @param handleChange: Must Return a promise containing the ms that is send to the media service
const Slider: React.FC<ProgressBarProps> = ({
  onChange,
  onDragStart,
  onEnd,
  state,
  disable,
  stylesSlider,
  stylesSliderProgress,
  stylesPointer,
}) => {
  const pB = useProgressBar({
    onChange,
    onDragStart,
    onEnd,
    state,
    disable,
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
      role="button"
      tabIndex={-1}
      onKeyDown={() => {}}
      onFocus={() => {}}
      style={styles}
      ref={pB.progressBarRef}
      onClick={pB.handleClickProgressBar}
      onMouseOver={pB.handleHoverProgressBar}
      onMouseLeave={pB.handleMouseLeave}
    >
      {!disable && (
        <ProgressBarSideContainer
          progress={pB.playbackProgress}
          hover={pB.isHoveringProgressBar}
          stylesSliderProgress={stylesSliderProgress}
        >
          <Pointer pB={pB} stylesPointer={stylesPointer} />
        </ProgressBarSideContainer>
      )}
    </div>
  )
}

export default React.memo(Slider)
