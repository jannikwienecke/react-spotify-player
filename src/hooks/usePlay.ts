import { SPOTIFY_PLAYER_NAME } from 'app/spotifyConfig'
import { useDevices } from './useDevices'
import { useSpotifyMutation } from './useSpotify'
import React from 'react'
import _ from 'lodash'
import { TrackPagingObject } from './useTopArtistsTracks'

interface UsePlayInterface {
  deviceId: string | undefined
}
export const usePlay = ({ deviceId }: UsePlayInterface) => {
  const [url, setUrl] = React.useState<string>('')
  const [uris, setUris] = React.useState<string[] | undefined>()

  const { mutate, error, ...result } = useSpotifyMutation<null>({
    url,
    method: 'PUT',
  })

  React.useEffect(() => {
    if (url && uris) {
      console.log('play...', url)

      mutate({ uris })
    }
  }, [url, mutate, uris])

  const play = React.useCallback((uris: string[]) => {
    if (!deviceId) return

    const newUrl = deviceId ? `me/player/play?device_id=${deviceId}` : ''

    setUrl(newUrl)
    setUris(uris)
  }, [])

  React.useEffect(() => {
    let err: any = error
    if (err && err?.error?.reason === 'UNKNOWN') {
      if (url) {
        console.log('play...')

        mutate(uris)
      }
    }
  }, [error])

  return { ...result, play }
}
