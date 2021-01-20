import React from 'react'
import { PropsNewPlaylist, useCreatePlaylist } from './useCreatePlaylist'
import { useQueue } from './useQueue'
import { useRecommendations } from './useRecommendations'
import { useSpotifyQueue } from './useSpotifyQueue'

export const useSpotifyRadio = () => {
  const { data: recommendations, fetchRecommendations } = useRecommendations()
  const { createNewPlaylist } = useCreatePlaylist()
  const makeRequestRef = React.useRef<boolean>(false)
  const { setNewQueue } = useQueue()
  const { addTracksToQueue } = useSpotifyQueue()
  const [nextSong, setNextSong] = React.useState<
    SpotifyApi.TrackObjectSimplified
  >()

  const newPlaylistOptionsRef = React.useRef<PropsNewPlaylist | undefined>()
  const setNewRadio = (
    recommendationsOptions: SpotifyApi.RecommendationsOptionsObject,
    newPlaylistOptions: PropsNewPlaylist,
  ) => {
    console.log('new radio....', newPlaylistOptions)

    makeRequestRef.current = true
    fetchRecommendations(recommendationsOptions)
    newPlaylistOptionsRef.current = newPlaylistOptions
  }

  React.useEffect(() => {
    console.log('recommendations', recommendations)
    console.log('newPlaylistOptionsRef: ', newPlaylistOptionsRef)
    console.log('makeRequestRef: ', makeRequestRef)

    if (!recommendations) return
    if (!newPlaylistOptionsRef.current) return
    if (!makeRequestRef.current) return

    console.log('hier after...')

    createNewPlaylist(
      newPlaylistOptionsRef.current,
      recommendations.tracks.map(track => track.uri),
    )
    // setNextSong(recommendations.tracks[0])
    // setNewQueue(recommendations.tracks)
    // addTracksToQueue(recommendations.tracks.slice(0, 5).map(track => track.uri))
    makeRequestRef.current = false
  }, [recommendations])

  return { setNewRadio, recommendations, nextSong }
}
