import { useTrack } from './useTrack'
import React from 'react'
export const useFullTracks = () => {
  const [tracksFull, setTracksFull] = React.useState<
    SpotifyApi.TrackObjectFull[] | undefined
  >()

  const { getFullTrack } = useTrack()

  const getFullTracks = async (
    tracks:
      | (SpotifyApi.TrackObjectSimplified | SpotifyApi.TrackObjectFull)[]
      | null
      | undefined,
    tracksFull: SpotifyApi.TrackObjectFull[] | undefined,
  ) => {
    if (!tracks) return
    const trackIds: string[] = []
    const trackPromises: Promise<SpotifyApi.TrackObjectFull>[] = []

    const tracksAlreadyFull: SpotifyApi.TrackObjectFull[] = []
    tracks.forEach(async track => {
      if (!track) return
      if (trackIds.includes(track.id)) return

      trackIds.push(track.id)
      if (tracksFull) {
        const trackAlreadyFull = tracksFull.find(
          trackFull => trackFull.id === track.id,
        )
        if (trackAlreadyFull) {
          tracksAlreadyFull.push(trackAlreadyFull)
          return
        }
      }

      const fullTrackPromise = getFullTrack(track.id)
      trackPromises.push(fullTrackPromise)
    })
    const tracksResolved = await Promise.all(trackPromises)
    setTracksFull([...tracksAlreadyFull, ...tracksResolved])
  }

  return { getFullTracks, tracksFull }
}
