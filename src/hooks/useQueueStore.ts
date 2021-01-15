// import { useArtistsTopTracks } from "app/hooks/useAritstsTopTracks
import create from 'zustand'
import { immerMiddleware } from '../utils'

export type Queue = {
  queue: SpotifyApi.TrackObjectSimplified[]
  addToQueue: (track: SpotifyApi.TrackObjectSimplified) => void
  addManyToQueue: (tracks: SpotifyApi.TrackObjectSimplified[]) => void
  setNewQueue: (tracks: SpotifyApi.TrackObjectSimplified[]) => void
  getNextElement: (
    queue: SpotifyApi.TrackObjectSimplified[],
    currentSong: SpotifyApi.TrackObjectFull | undefined | null,
  ) => SpotifyApi.TrackObjectSimplified | false
}

export const useQueueStore = create<Queue>(
  immerMiddleware(set => ({
    queue: [],
    addToQueue: track =>
      set(state => void (state.queue = [...state.queue, track])),
    addManyToQueue: tracks =>
      set(state => void (state.queue = [...state.queue, ...tracks])),
    setNewQueue: tracks => set(state => void (state.queue = [...tracks])),
    getNextElement: (queue, currentSong) => {
      if (queue.length === 0) return false

      let nextSong = queue[0]
      let numberRemove = 1
      if (currentSong && nextSong.id === currentSong.id) {
        nextSong = queue[1]
        numberRemove = 2
      }
      set(state => void (state.queue = [...state.queue.slice(numberRemove)]))

      return nextSong
    },
  })),
)
