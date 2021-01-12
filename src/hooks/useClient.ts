import React from 'react'
import { client } from '../utils'
import { useSpotifyToken } from './useSpotifyToken'

export type QueryConfig = {
  data?: {}
  method?: string
}

export function useClient() {
  let { token } = useSpotifyToken()

  return React.useCallback(
    (endpoint, config: QueryConfig) => {
      return client({ endpoint, token, config })
    },
    [token],
  )
}
