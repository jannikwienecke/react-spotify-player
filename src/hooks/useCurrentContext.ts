import React from 'react'
import { useTrack } from './useTrack'
import { useAlbum } from './useAlbum'
import { useQueueStore } from './useQueueStore'
import { useGetPlaylist } from './useGetPlaylist'
import { usePlayerStore } from './usePlayerStore'
import { useFullTracks } from './useFullTrack'
import { useCurrentPlayback } from './useCurrentPlayback'

export const useCurrentContext = () => {
  const { data: album, getAlbum } = useAlbum()
  const { data: track, getTrack } = useTrack()
  const { data: playlist, getPlaylist } = useGetPlaylist()
  const store = useQueueStore()
  const { setContextUri } = usePlayerStore()
  const { data: currentPlayback } = useCurrentPlayback()
  const { getFullTracks, tracksFull: tracksFullAlbum } = useFullTracks()

  React.useEffect(() => {
    console.log('currentPlayback', currentPlayback)

    const contextUri = currentPlayback?.context?.uri
    if (!contextUri) {
      store.setNewQueue([])
      return
    }

    setContextUri(contextUri)
    const albumId =
      contextUri.includes('album:') && contextUri.split('album:')[1]

    const trackId =
      contextUri.includes('track:') && contextUri.split('track:')[1]

    const playlistId =
      contextUri.includes('playlist:') && contextUri.split('playlist:')[1]

    if (albumId) getAlbum(albumId)
    if (trackId) getTrack(trackId)
    if (playlistId) getPlaylist(playlistId)
  }, [currentPlayback?.context?.uri])

  React.useEffect(() => {
    if (track) {
      store.setNewQueue([track])
    }
  }, [track])

  React.useEffect(() => {
    if (album?.tracks.items) return
    getFullTracks(album?.tracks.items, [])
  }, [album])

  React.useEffect(() => {
    if (!tracksFullAlbum) return

    store.setNewQueue(tracksFullAlbum)
  }, [tracksFullAlbum])

  React.useEffect(() => {
    if (playlist) {
      const playlistTracks = playlist.tracks.items.map(track => {
        return track.track
      })
      store.setNewQueue(playlistTracks)
    }
  }, [playlist])
}
