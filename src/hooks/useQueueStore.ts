import create from 'zustand'
import { immerMiddleware } from '../utils'

export type Queue = {
  stackPastSongs: SpotifyApi.TrackObjectSimplified[]
  queue: SpotifyApi.TrackObjectFull[]
  preloadedFullTracks: SpotifyApi.TrackObjectFull[]
  addToQueue: (track: SpotifyApi.TrackObjectFull) => void
  addManyToQueue: (tracks: SpotifyApi.TrackObjectFull[]) => void
  setNewQueue: (tracks: SpotifyApi.TrackObjectFull[]) => void
  setPreloadedFullTrack: (tracks: SpotifyApi.TrackObjectFull[]) => void
  setNewStack: (tracks: SpotifyApi.TrackObjectFull[]) => void
}

export const useQueueStore = create<Queue>(
  immerMiddleware(set => ({
    stackPastSongs: [],
    queue: [],
    preloadedFullTracks: [],
    addToQueue: track =>
      set(state => void (state.queue = [...state.queue, track])),
    addManyToQueue: tracks =>
      set(state => void (state.queue = [...state.queue, ...tracks])),
    setNewQueue: tracks => {
      set(state => void (state.queue = [...tracks]))
    },
    setPreloadedFullTrack: tracks =>
      set(state => void (state.preloadedFullTracks = [...tracks])),
    setNewStack: tracks =>
      set(state => void (state.stackPastSongs = [...tracks])),
  })),
)
