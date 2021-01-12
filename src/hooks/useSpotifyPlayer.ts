import { useCurrentSong } from './useCurrentSong'

export const useSpotifyPlayer = () => {
  // const [songInfo, setSongInfo] = React.useState<
  //   SpotifyApi.CurrentPlaybackResponse
  // >()
  // const [seekPosition, setSeekPosition] = React.useState<number>()

  const { data: currentSong, refetch: fetchCurrentSong } = useCurrentSong()
  // const { play } = usePlay({ deviceId: currentDeviceId })

  // SETS NEW CURRENTDEVICE WHEN CHANGED OR WHEN LOADED AT THE START
  const handleClickPlay = () => {
    // console.log('slider.play change to ', !slider.play)
    // slider.setPlay(!slider.play)
  }

  // React.useEffect(() => {
  //   if (!currentSong?.progress_ms) return

  //   if (seekPosition && seekPosition !== currentSong.progress_ms) return

  //   console.log('set current song...', currentSong.progress_ms)

  //   setSongInfo(currentSong)
  // }, [currentSong?.progress_ms])

  return {
    currentSong,
    handleClickPlay,
    fetchCurrentSong,
  }
}
