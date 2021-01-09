import React from 'react'

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: any
  }
}

export const useSpotify = (token: string) => {
  const [deviceId, setDeviceId] = React.useState()

  React.useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true
    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new Spotify.Player({
        name: 'Web Player - Playlist-Designer',
        getOAuthToken: (cb: (token: string) => void) => {
          cb(token)
        },
      })

      // Error handling
      player.addListener(
        'initialization_error',
        ({ message }: { message: string }) => {
          console.error(message)
        },
      )
      player.addListener(
        'authentication_error',
        ({ message }: { message: string }) => {
          console.error(message)
        },
      )
      player.addListener(
        'account_error',
        ({ message }: { message: string }) => {
          console.error(message)
        },
      )
      player.addListener(
        'playback_error',
        ({ message }: { message: string }) => {
          console.error(message)
        },
      )

      // Playback status updates
      player.addListener('player_state_changed', (state: any) => {
        console.log(state)
      })

      // Ready
      player.addListener('ready', ({ device_id }: any) => {
        console.log('Ready with Device ID', device_id)
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

  return { deviceId }
}
