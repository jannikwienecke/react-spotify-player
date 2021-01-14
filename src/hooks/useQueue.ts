import React from 'react'
import { useCurrentSong } from './useCurrentSong'
import { useTrack } from './useTrack'
import { useAlbum } from './useAlbum'
import { useQueueStore } from './useQueueStore'
import { usePlaylist } from './usePlaylist'

export const useQueue = () => {
  const { data: album, getAlbum } = useAlbum()
  const { data: track, getTrack } = useTrack()
  const { data: playlist, getPlaylist } = usePlaylist()

  const { data: currentSong } = useCurrentSong()
  const store = useQueueStore()

  React.useEffect(() => {
    const contextUri = currentSong?.context?.uri
    if (!contextUri) return

    const albumId =
      contextUri.includes('album:') && contextUri.split('album:')[1]

    const trackId =
      contextUri.includes('track:') && contextUri.split('track:')[1]

    const playlistId =
      contextUri.includes('playlist:') && contextUri.split('playlist:')[1]

    if (albumId) getAlbum(albumId)
    if (trackId) getTrack(trackId)
    if (playlistId) getPlaylist(playlistId)
  }, [currentSong?.context?.uri])

  React.useEffect(() => {
    if (track) {
      const simplifiedTrack = track as SpotifyApi.TrackObjectSimplified
      store.setNewQueue([simplifiedTrack])
    }
  }, [track])

  React.useEffect(() => {
    if (album) store.setNewQueue(album.tracks.items)
  }, [album])

  React.useEffect(() => {
    if (playlist) {
      const playlistTracksSimplified = playlist.tracks.items.map(item => {
        const simplifiedItem: SpotifyApi.TrackObjectSimplified = item.track
        return simplifiedItem
      })

      store.setNewQueue(playlistTracksSimplified)
    }
  }, [playlist])

  return { ...store }
}
