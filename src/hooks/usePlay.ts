import React from 'react'
import { useDevices } from './useDevices'
import { usePlayerStore } from './usePlayerStore'
import { useRefetchCurrentSong } from './useRefetchCurrentSong'
import { useSpotifyMutation } from './useSpotify'

export const usePlay = () => {
  const [url, setUrl] = React.useState<string>('')
  const [uris, setUris] = React.useState<string[] | undefined>()
  const [contextUri, setContextUri] = React.useState<string | undefined>()
  const { getActiveDeviceId } = useDevices()
  const currentMs = React.useRef(0)
  const {
    setAction,
    updatePlayer,
    play: playStore,
    setTrack,
  } = usePlayerStore()

  const { mutate, error, status: statusPlay, ...result } = useSpotifyMutation<
    null
  >({
    url,
    method: 'PUT',
  })

  // const isResumeRef = React.useRef(false)
  useRefetchCurrentSong(statusPlay, () => {
    // if (isResumeRef.current) return
    // console.log('set change..........');
    // setAction('change')
    // updatePlayer()
    // playStore()
    // setTrack(undefined)
  })

  React.useEffect(() => {
    if (url) {
      if (uris && currentMs.current) {
        mutate({
          uris,
          position_ms: currentMs.current,
        })
      } else if (uris) {
        mutate({ uris })
      } else if (currentMs.current) {
        mutate({ position_ms: currentMs.current })
      } else {
        console.log('play - no arguments.')
        // isResumeRef.current = true
        mutate({})
      }
      currentMs.current = 0
    }
    setUrl('')
  }, [url, mutate, uris])

  React.useEffect(() => {
    if (!url || !contextUri) return
    mutate({ context_uri: contextUri })
    currentMs.current = 0
  }, [url, mutate, contextUri])

  const play = React.useCallback(
    (uris?: string[], ms: number = 0) => {
      const activeDevice = getActiveDeviceId()
      if (!activeDevice) return

      currentMs.current = ms
      const newUrl = `me/player/play?device_id=${activeDevice}`
      setUrl(newUrl)
      setUris(uris)
    },
    [getActiveDeviceId],
  )

  const playPlaylist = React.useCallback(
    (context_uri?: string) => {
      const activeDevice = getActiveDeviceId()
      if (!activeDevice) return

      const newUrl = `me/player/play?device_id=${activeDevice}`
      setUrl(newUrl)
      setContextUri(context_uri)
    },
    [getActiveDeviceId],
  )

  React.useEffect(() => {
    let err: any = error
    if (err && err?.error?.reason === 'UNKNOWN') {
      if (url) {
        console.log('mutate....')

        mutate(uris)
      }
    }
  }, [error])

  return { ...result, status, play, playPlaylist }
}
