// me/tracks/contains

import React from 'react'
import { useSpotify } from './useSpotify'

const transformSeedToString = (seed: string | string[] | undefined) => {
  return seed === undefined
    ? ''
    : typeof seed === 'string'
    ? seed
    : seed.join(',')
}
export const useRecommendations = () => {
  const [url, setUrl] = React.useState('')
  let baseUrl = 'recommendations'

  const { data, error, refetch, ...result } = useSpotify<
    SpotifyApi.RecommendationsFromSeedsResponse
  >({
    url,
    enabled: false,
  })

  React.useEffect(() => {
    if (!url) return
    refetch()
  }, [url])

  React.useEffect(() => {
    if (error) console.error('ERROR useRecommendations: ', error)
  }, [error])

  const fetchRecommendations = ({
    seed_artists,
    seed_genres,
    seed_tracks,
  }: SpotifyApi.RecommendationsOptionsObject) => {
    let newUrl = baseUrl + '?'
    newUrl += `seed_artists=${transformSeedToString(
      seed_artists,
    )}&seed_tracks=${transformSeedToString(
      seed_tracks,
    )}&seed_genres=${transformSeedToString(seed_genres)}`

    setUrl(newUrl)
  }

  return { data, error, ...result, fetchRecommendations }
}
