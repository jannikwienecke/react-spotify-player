import { useSpotify } from './useSpotify'

export const useMe = () => {
  const url = 'me'
  type meType = SpotifyApi.UserObjectPrivate

  const result = useSpotify<meType>({ url })

  return { ...result, me: result.data }
}
