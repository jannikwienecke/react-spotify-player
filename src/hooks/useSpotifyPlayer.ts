import { useSlider } from '../../components/react-slider'

export const useSpotifyPlayer = () => {
  const handleMsChange = (ms: number) => {
    return new Promise<number>(res => {
      res(ms)
    })
  }

  const slider = useSlider(handleMsChange)

  const handleClickPlay = () => {
    console.log('slider.play change to ', !slider.play)
    slider.setPlay(!slider.play)
  }

  return { handleClickPlay, ...slider }
}
