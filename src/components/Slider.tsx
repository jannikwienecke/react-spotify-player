import React from 'react'
import Slider from '../../components/react-slider'

interface MusicSliderProps {
  play: boolean
  currentMs: number
  handleChange: (ms: number) => Promise<number>
}

export const MusicSlider: React.FC<MusicSliderProps> = ({
  play,
  currentMs,
  handleChange,
}) => {
  return (
    <Slider
      mediaId={1}
      totalMs={3000}
      currentMs={currentMs}
      play={play}
      handleChange={handleChange}
      onEnd={() => console.log('end')}
    />
  )
}
