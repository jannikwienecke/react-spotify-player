import { COUNTRY_CODE, refetchInterval } from '../spotifyConfig'
import { useSpotify } from './useSpotify'
export const currentSongUrl = `me/player/currently-playing?market=${COUNTRY_CODE}`

export const useCurrentSong = () => {
  type currentSongType = SpotifyApi.CurrentPlaybackResponse
  const result = useSpotify<currentSongType>({
    url: currentSongUrl,
    refetchInterval: refetchInterval,
  })

  return result
}
