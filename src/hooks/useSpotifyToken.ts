import React from 'react'
import { SpotifyTokenContext } from '../Context'

export const useSpotifyToken = () => {
  const context = React.useContext(SpotifyTokenContext)
  if (context === undefined || context === null) {
    throw new Error(
      `useSpotifyToken must be used within a AppProvider (SpotifyTokenProvider)`,
    )
  }
  return context
}
