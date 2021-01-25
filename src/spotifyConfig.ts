const authEndpoint = 'https://accounts.spotify.com/authorize'
const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT

export const redirectUri = process.env
  .NEXT_PUBLIC_SPOTIFY_REDIRECT_URL as string
// export const redirectUri = "http://localhost:3000/redirect"
const scopes = [
  'user-top-read',
  'user-read-currently-playing',
  'user-read-playback-state',
  'streaming',
  'user-read-email',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'app-remote-control',
  'user-library-read',
  'user-read-private',
  'user-modify-playback-state',
  'user-read-playback-state',
  'user-read-currently-playing',
  'app-remote-control',
  'streaming',
  'playlist-modify-public',
  'playlist-modify-private',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-follow-modify',
  'user-follow-read',
  'user-library-modify',
  'user-library-read',
  'user-read-email',
  'user-read-private',
  'user-read-recently-played',
]

const SPOTIFY_AUTH_URL = `${authEndpoint}?client_id=${clientId}&state=${'jdaoisjdioas'}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20',
)}&response_type=code&show_dialog=true`

const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1/'

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'

const COUNTRY_CODE = 'US'

const SPOTIFY_PLAYER_NAME = 'spotify_playlist_design'
export {
  SPOTIFY_PLAYER_NAME,
  SPOTIFY_AUTH_URL,
  SPOTIFY_BASE_URL,
  COUNTRY_CODE,
  SPOTIFY_TOKEN_URL,
}

export interface URL_PARAMETER_REDIRECT {
  access_token: string
  refresh_token?: string
  expires_in: string
  token_type: string
}

export interface URL_PARAMETER_REDIRECT_CODE {
  code: string
  state: string
}

export const refetchInterval = 5000
