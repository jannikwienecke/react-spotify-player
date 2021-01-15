import React from 'react'
import { useQueue } from './useQueue'
import { useRecommendations } from './useRecommendations'

export const useSpotifyRadio = () => {
  const { data: recommendations, fetchRecommendations } = useRecommendations()
  const makeRequestRef = React.useRef<boolean>(false)
  const { setNewQueue } = useQueue()
  const [nextSong, setNextSong] = React.useState<
    SpotifyApi.TrackObjectSimplified
  >()

  const setNewRadio = (
    recommendationsOptions: SpotifyApi.RecommendationsOptionsObject,
  ) => {
    makeRequestRef.current = true
    fetchRecommendations(recommendationsOptions)
  }

  React.useEffect(() => {
    if (!recommendations) return
    if (!makeRequestRef.current) return

    setNextSong(recommendations.tracks[0])
    setNewQueue(recommendations.tracks)
    makeRequestRef.current = false
  }, [recommendations])

  return { setNewRadio, recommendations, nextSong }
}
