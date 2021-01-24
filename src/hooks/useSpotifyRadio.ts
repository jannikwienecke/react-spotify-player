import React from 'react'
import { PropsNewPlaylist, useCreatePlaylist } from './useCreatePlaylist'
import { usePlayerStore } from './usePlayerStore'
import { useRecommendations } from './useRecommendations'

export const useSpotifyRadio = () => {
  const { data: recommendations, fetchRecommendations } = useRecommendations()
  const { createNewPlaylist } = useCreatePlaylist()
  const makeRequestRef = React.useRef<boolean>(false)
  const [nextSong] = React.useState<SpotifyApi.TrackObjectSimplified>()
  const { setAction, setLoading } = usePlayerStore()

  const newPlaylistOptionsRef = React.useRef<PropsNewPlaylist | undefined>()
  const setNewRadio = (
    recommendationsOptions: SpotifyApi.RecommendationsOptionsObject,
    newPlaylistOptions: PropsNewPlaylist,
  ) => {
    console.log('Start new radio: ', newPlaylistOptions)
    setAction('opt_track_change')
    setLoading(true)

    makeRequestRef.current = true
    fetchRecommendations(recommendationsOptions)
    newPlaylistOptionsRef.current = newPlaylistOptions
  }

  React.useEffect(() => {
    if (!recommendations) return
    if (!newPlaylistOptionsRef.current) return
    if (!makeRequestRef.current) return

    createNewPlaylist(
      newPlaylistOptionsRef.current,
      recommendations.tracks.map(track => track.uri),
    )
    makeRequestRef.current = false
  }, [recommendations])

  return { setNewRadio, recommendations, nextSong }
}
