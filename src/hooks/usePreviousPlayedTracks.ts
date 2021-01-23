import React from 'react'
import { useFullTracks } from './useFullTrack'
import { useSpotify } from './useSpotify'

export const usePreviousPlayedTracks = () => {
  const url = 'me/player/recently-played'
  const { getFullTracks, tracksFull } = useFullTracks()

  const result = useSpotify<SpotifyApi.UsersRecentlyPlayedTracksResponse>({
    url,
  })

  React.useEffect(() => {
    if (!result?.data?.items) return

    getFullTracks(
      result.data.items.map(track => track.track),
      tracksFull,
    )
  }, [result.data?.items])

  return { ...result, data: tracksFull }
}
