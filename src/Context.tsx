import React from 'react'
import { TEMP_TOkEN } from './hooks/useSpotifyPlayerSettings'
import { SPOTIFY_TOKEN_URL, URL_PARAMETER_REDIRECT } from './spotifyConfig'

interface SpotifyTokenContextProps {
  token: string
  setToken: (token: string) => void
  setRefreshToken: (refreshToken: string) => void
}

export const SpotifyTokenContext = React.createContext<SpotifyTokenContextProps | null>(
  null,
)

const SpotifyTokenProvider: React.FC = props => {
  const [token, setToken_] = React.useState<string>('')
  const [refreshToken, setRefreshToken_] = React.useState<string>('')

  const setRefreshToken = React.useCallback((token: string) => {
    if (!token) return
    window.localStorage.setItem('spotifyRefreshToken', token)
    setRefreshToken_(token)
  }, [])

  const startTimerRefreshToken = React.useCallback(() => {
    setTimeout(() => {
      refetchToken()
    }, 1000 * 55)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setToken = React.useCallback(
    (token: string) => {
      if (!token) return
      window.localStorage.setItem('spotifyToken', token)
      setToken_(token)
      startTimerRefreshToken()
    },
    [startTimerRefreshToken],
  )

  const refetchToken = React.useCallback(async () => {
    const token =
      'Basic ' +
      btoa(
        `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`,
      )

    const refreshToken_ = window.localStorage.getItem('spotifyRefreshToken')
    const body = `grant_type=refresh_token&refresh_token=${refreshToken_}`

    const headers = {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    const response: URL_PARAMETER_REDIRECT = await fetch(SPOTIFY_TOKEN_URL, {
      body,
      headers,
      method: 'POST',
    })
      .then(res => res.json())
      .catch(err => console.error('error fetching token...', err))
    setToken(response.access_token)
  }, [setToken])

  React.useEffect(() => {
    setToken_(TEMP_TOkEN)
    // setToken_(window.localStorage.getItem('spotifyToken') as string)
    setRefreshToken_(
      window.localStorage.getItem('spotifyRefreshToken') as string,
    )
  }, [setToken, setRefreshToken])

  const value = React.useMemo(
    () => ({ setToken, token, setRefreshToken, refreshToken }),
    [token, refreshToken, setRefreshToken, setToken],
  )

  return (
    <SpotifyTokenContext.Provider value={value}>
      {props.children}
    </SpotifyTokenContext.Provider>
  )
}

export const AppProvider: React.FC = ({ children }) => {
  return <SpotifyTokenProvider>{children}</SpotifyTokenProvider>
}
