import { useSpotifyToken } from './useSpotifyToken'
import { useMutation, useQuery } from 'react-query'
import { client } from '../utils'

interface PropsSpotifyParameter {
  url: string
  data?: {} | undefined
  method?: 'GET' | 'POST' | 'PUT'
  enabled?: boolean
  refetchInterval?: false | number | undefined
}

export const useSpotify = <T>({
  url,
  data,
  method,
  enabled = true,
  refetchInterval = false,
}: PropsSpotifyParameter) => {
  const { token } = useSpotifyToken()
  const result = useQuery(
    [url, token?.slice(0, 20)],
    (): Promise<T> => {
      return client({ endpoint: url, token, data, method }).then(
        (res: Promise<T>) => res,
      )
    },
    { enabled, refetchInterval },
  )
  return { ...result }
}

export const useSpotifyMutation = <T>({
  url,
  method,
}: PropsSpotifyParameter) => {
  const { token } = useSpotifyToken()
  const result = useMutation(
    [url, token?.slice(0, 20)],
    (data: any): Promise<T> => {
      return client({ endpoint: url, token, data, method }).then(
        (res: Promise<T>) => res,
      )
    },
  )
  return { ...result }
}
