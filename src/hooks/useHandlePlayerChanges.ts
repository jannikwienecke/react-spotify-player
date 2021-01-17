import { MutationStatus, useQueryClient } from 'react-query'
import { usePlayerStore } from './usePlayerStore'
import { useValidMutation } from './useValidMutation'

export interface PropsStatusChangeHandle {
  statusPauseSong?: MutationStatus
  statusPlayNextSong?: MutationStatus
  statusPlayPreviouSong?: MutationStatus
  statusPlaySong?: MutationStatus
  statusSetPlay?: MutationStatus
}

export const useHandlePlayerChanges = (
  {
    statusPauseSong,
    statusPlayNextSong,
    statusPlayPreviouSong,
    statusPlaySong,
  }: PropsStatusChangeHandle,
  fetchCurrentSong: () => void,
) => {
  const { updatePlayer, play } = usePlayerStore()

  useValidMutation(statusPauseSong, () => {
    updatePlayer()
  })

  useValidMutation(statusPlayNextSong, () => {
    fetchCurrentSong()
    updatePlayer()
    play()
  })
  useValidMutation(statusPlayPreviouSong, () => {
    updatePlayer()
    fetchCurrentSong()
    play()
  })

  useValidMutation(statusPlaySong, async () => {
    // await queryClient.invalidateQueries(
    //   'me/player/currently-playing?market=US',
    //   {
    //     exact: false,
    //     refetchActive: true,
    //     refetchInactive: true,
    //   },
    //   { throwOnError: true },
    // )

    // console.log('fetch....')

    fetchCurrentSong()
    updatePlayer()
    play()
  })
}
