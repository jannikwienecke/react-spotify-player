import { MutationStatus, useQueryClient } from 'react-query'
import { currentSongUrl, useCurrentSong } from './useCurrentSong'
import { useSpotifyToken } from './useSpotifyToken'
import { useValidMutation } from './useValidMutation'

export const useRefetchCurrentSong = (status: MutationStatus) => {
  const { refetch: fetchCurrentSong } = useCurrentSong()
  const queryClient = useQueryClient()
  const { token } = useSpotifyToken()

  useValidMutation(status, async () => {
    await queryClient.invalidateQueries(
      [currentSongUrl, token.slice(0, 20)],
      {},
      { throwOnError: true },
    )
    console.log('fetch current song...')

    fetchCurrentSong()
  })
}
