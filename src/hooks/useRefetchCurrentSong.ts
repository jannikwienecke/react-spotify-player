import { MutationStatus, useQueryClient } from 'react-query'
import { currentPlaybackUrl } from './useCurrentPlayer'
import { currentSongUrl, useCurrentSong } from './useCurrentSong'
import { useSpotifyToken } from './useSpotifyToken'
import { useValidMutation } from './useValidMutation'

export const useRefetchCurrentSong = (
  status: MutationStatus,
  callback?: () => void,
) => {
  const { refetch: fetchCurrentSong } = useCurrentSong()
  const queryClient = useQueryClient()
  useValidMutation(status, async () => {
    await queryClient.invalidateQueries()
    fetchCurrentSong()
    callback && callback()
  })
}
