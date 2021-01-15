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
    console.log('statusPauseSong change happend', status)
    updatePlayer()
  })

  useValidMutation(statusPlayNextSong, () => {
    console.log('statusPlayNextSong change happend', status)
    fetchCurrentSong()
    updatePlayer()
    play()
  })
  useValidMutation(statusPlayPreviouSong, () => {
    console.log('statusPlayPreviouSong change happend', status)
    updatePlayer()
    fetchCurrentSong()
    play()
  })

  useValidMutation(statusPlaySong, async () => {
    console.log('statusPlaySong change happend', status)

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
