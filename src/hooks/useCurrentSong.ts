import { COUNTRY_CODE, refetchIntervall } from '../spotifyConfig'
import { useSpotify } from './useSpotify'

export const useCurrentSong = () => {
  const url = `me/player/currently-playing?market=${COUNTRY_CODE}`
  type currentSongType = SpotifyApi.CurrentPlaybackResponse
  const result = useSpotify<currentSongType>({
    url,
    refetchInterval: refetchIntervall,
    // enabled: false,
  })

  return result
}
