// import { useArtistsTopTracks } from "app/hooks/useAritstsTopTracks
import create from 'zustand'
import { immerMiddleware } from '../utils'

export type Queue = {
  queue: SpotifyApi.TrackObjectSimplified[]
  addToQueue: (track: SpotifyApi.TrackObjectSimplified) => void
  addManyToQueue: (tracks: SpotifyApi.TrackObjectSimplified[]) => void
  setNewQueue: (tracks: SpotifyApi.TrackObjectSimplified[]) => void
}

export const useQueueStore = create<Queue>(
  immerMiddleware(set => ({
    queue: [],
    addToQueue: track =>
      set(state => void (state.queue = [...state.queue, track])),
    addManyToQueue: tracks =>
      set(state => void (state.queue = [...state.queue, ...tracks])),
    setNewQueue: tracks => set(state => void (state.queue = [...tracks])),
  })),
)
