import { COUNTRY_CODE, refetchIntervall } from '../spotifyConfig'
import { useSpotify } from './useSpotify'
export const currentSongUrl = `me/player/currently-playing?market=${COUNTRY_CODE}`

export const useCurrentSong = () => {
  type currentSongType = SpotifyApi.CurrentPlaybackResponse
  const result = useSpotify<currentSongType>({
    url: currentSongUrl,
    refetchInterval: refetchIntervall,
    // enabled: false,
  })

  return result
}
