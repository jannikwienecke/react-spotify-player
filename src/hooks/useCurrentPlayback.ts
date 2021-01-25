import { refetchInterval } from '../spotifyConfig'
import { useSpotify } from './useSpotify'

export const useCurrentPlayback = () => {
  const { refetch, ...result } = useSpotify<SpotifyApi.CurrentPlaybackResponse>(
    {
      url: 'me/player',
      refetchInterval: refetchInterval,
    },
  )

  return { ...result }
}
