import { useSpotify } from './useSpotify'
import React from 'react'
// export type meType<T> = T extends "artists"
//   ? SpotifyApi.PagingObject<SpotifyApi.ArtistObjectFull>
//   : T extends "tracks"
//   ? SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull>
//   : never
export type ArtistPagingObject = SpotifyApi.PagingObject<
  SpotifyApi.ArtistObjectFull
>
export type TrackPagingObject = SpotifyApi.PagingObject<
  SpotifyApi.TrackObjectFull
>
export interface OptionsPropTopArtistsTracks {
  limit?: number
}

export const useTopArtistsTracks = (
  { limit }: OptionsPropTopArtistsTracks = { limit: 50 },
) => {
  const [currentLimit, setCurrentLimit] = React.useState(50)

  const urlArtists = `me/top/${'artists'}?limit=${currentLimit}`
  const urlTracks = `me/top/${'tracks'}?limit=${currentLimit}`

  const { refetch: refetchArtists, ...resultArtists } = useSpotify<
    ArtistPagingObject
  >({
    url: urlArtists,
  })
  const { refetch: refetchTracks, ...resultTracks } = useSpotify<
    TrackPagingObject
  >({
    url: urlTracks,
  })

  /**
   * Returns  top artists and top songs of the current user
   * @param options
   * -  "limit" type: number - range: (2-50)
   */
  const fetchArtistsAndTracks = React.useCallback(
    ({ limit }: OptionsPropTopArtistsTracks = { limit: 50 }) => {
      if (limit) setCurrentLimit(limit)
    },
    [],
  )

  React.useEffect(() => {
    if (limit) {
      refetchArtists()
      refetchTracks()
    }
  }, [limit, refetchArtists, refetchTracks])

  return {
    topArtists: resultArtists.data,
    topTracks: resultTracks.data,
    fetchArtistsAndTracks,
    resultArtists,
    resultTracks,
  }
}
