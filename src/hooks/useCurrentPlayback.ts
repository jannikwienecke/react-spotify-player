import { refetchIntervall } from '../spotifyConfig'
import { useSpotify } from './useSpotify'

export const useCurrentPlayback = () => {
  const { refetch, ...result } = useSpotify<SpotifyApi.CurrentPlaybackResponse>(
    {
      url: 'me/player',
      refetchInterval: refetchIntervall,
    },
  )

  return { ...result }
}
