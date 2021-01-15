import { usePrevious } from '@bit/jannikwienecke.personal.use-previous'
import React from 'react'
import { MutationStatus } from 'react-query'

export const useValidMutation = (
  status: MutationStatus | undefined,
  callback: () => void,
) => {
  const statusSaveTrack = status
  const prevStatus = usePrevious(status)

  React.useEffect(() => {
    const isSuccess = statusSaveTrack === 'success'
    const prevIsLoading = prevStatus === 'loading'
    if (isSuccess && prevIsLoading) {
      callback()
    }
  }, [status])
}
