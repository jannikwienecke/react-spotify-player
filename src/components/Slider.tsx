import Slider from '@bit/jannikwienecke.personal.react-slider'
import { useSlider } from '../hooks/useSlider'

export const MusicSlider = () => {
  const { state, handleDragStart, handleChange, handleEnd } = useSlider()
  return (
    <Slider
      state={state}
      onDragStart={handleDragStart}
      onEnd={handleEnd}
      onChange={handleChange}
      stylesSlider={{ height: '6px' }}
      disable={false}
    />
  )
}
