import React from 'react'
import { PropsNewPlaylist, useCreatePlaylist } from './useCreatePlaylist'
import { usePause } from './usePause'
import { usePlayerStore } from './usePlayerStore'
import { useRecommendations } from './useRecommendations'

export const useSpotifyRadio = () => {
  const { data: recommendations, fetchRecommendations } = useRecommendations()
  const { createNewPlaylist } = useCreatePlaylist()
  const makeRequestRef = React.useRef<boolean>(false)
  const [nextSong] = React.useState<SpotifyApi.TrackObjectSimplified>()
  const {
    setAction,
    updatePlayer,
    pause: pauseStore,
    isPlaying,
  } = usePlayerStore()
  const { pause } = usePause()

  const newPlaylistOptionsRef = React.useRef<PropsNewPlaylist | undefined>()
  const setNewRadio = (
    recommendationsOptions: SpotifyApi.RecommendationsOptionsObject,
    newPlaylistOptions: PropsNewPlaylist,
  ) => {
    console.log('Start new radio: ', newPlaylistOptions)
    pauseStore()
    setAction('change')
    updatePlayer()

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
