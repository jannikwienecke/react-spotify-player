// @ts-nocheck
import React from 'react'
import { SPOTIFY_PLAYER_NAME } from '../spotifyConfig'
import { useLocalDeviceStore } from './useLocalDeviceStore'

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: any
  }
  interface Spotify {
    Player: any
  }
}

export const useSpotify = (token: string) => {
  const [spotifyContext, setSpotifyContext] = React.useState()
  const { setDeviceId } = useLocalDeviceStore()

  React.useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true
    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new Spotify.Player({
        name: SPOTIFY_PLAYER_NAME,
        getOAuthToken: (cb: (token: string) => void) => {
          cb(token)
        },
      })

      // Error handling
      player.addListener(
        'initialization_error',
        ({ message }: { message: string }) => {
          console.error('initialization_error: ', message)
        },
      )
      player.addListener(
        'authentication_error',
        ({ message }: { message: string }) => {
          console.error('authentication_error: ', message)
        },
      )
      player.addListener(
        'account_error',
        ({ message }: { message: string }) => {
          console.error('account_error', message)
        },
      )
      player.addListener(
        'playback_error',
        ({ message }: { message: string }) => {
          console.error('playback_error', message)
        },
      )

      // Ready
      player.addListener('ready', ({ device_id }: any) => {
        setDeviceId(device_id)
      })

      // Not Ready
      player.addListener('not_ready', ({ device_id }: any) => {
        console.log('Device ID has gone offline', device_id)
      })

      // Connect to the player!
      player.connect()
    }
  }, [])
}
