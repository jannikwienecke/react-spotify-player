import React from 'react'
import { useQueue } from './useQueue'
import { useRecommendations } from './useRecommendations'

export const useSpotifyRadio = () => {
  const { data: recommendations, fetchRecommendations } = useRecommendations()
  const makeRequestRef = React.useRef<boolean>(false)
  const { setNewQueue } = useQueue()

  const setNewRadio = (
    recommendationsOptions: SpotifyApi.RecommendationsOptionsObject,
  ) => {
    makeRequestRef.current = true
    fetchRecommendations(recommendationsOptions)
  }

  React.useEffect(() => {
    if (!recommendations) return
    if (!makeRequestRef.current) return

    setNewQueue(recommendations.tracks)
    recommendations.tracks.forEach(track => track)
    makeRequestRef.current = false
  })

  return { setNewRadio, recommendations }
}
