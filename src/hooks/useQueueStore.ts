import create from 'zustand'
import { immerMiddleware } from '../utils'

export type Queue = {
  stackPastSongs: SpotifyApi.TrackObjectSimplified[]
  queue: SpotifyApi.TrackObjectSimplified[]
  addToQueue: (track: SpotifyApi.TrackObjectSimplified) => void
  addManyToQueue: (tracks: SpotifyApi.TrackObjectSimplified[]) => void
  setNewQueue: (tracks: SpotifyApi.TrackObjectSimplified[]) => void
  setNewStack: (tracks: SpotifyApi.TrackObjectSimplified[]) => void
  getNextElement: (
    queue: SpotifyApi.TrackObjectSimplified[],
    track: SpotifyApi.TrackObjectSimplified | undefined | null,
  ) => SpotifyApi.TrackObjectSimplified | false
  getLastElement: (
    stackPastSongs: SpotifyApi.TrackObjectSimplified[],
  ) => SpotifyApi.TrackObjectSimplified | false
}

export const useQueueStore = create<Queue>(
  immerMiddleware(set => ({
    stackPastSongs: [],
    queue: [],
    addToQueue: track =>
      set(state => void (state.queue = [...state.queue, track])),
    addManyToQueue: tracks =>
      set(state => void (state.queue = [...state.queue, ...tracks])),
    setNewQueue: tracks => set(state => void (state.queue = [...tracks])),
    setNewStack: tracks =>
      set(state => void (state.stackPastSongs = [...tracks])),

    getNextElement: (queue, track) => {
      if (queue.length === 0) return false

      let nextSong = queue[0]
      let numberRemove = 1
      if (nextSong.id === track?.id) {
        nextSong = queue[1]
        numberRemove = 2
      }

      const currentTrack = track as SpotifyApi.TrackObjectSimplified
      set(state => void (state.queue = [...state.queue.slice(numberRemove)]))

      if (currentTrack) {
        set(
          state =>
            void (state.stackPastSongs = [
              currentTrack,
              ...state.stackPastSongs,
            ]),
        )
      } else {
        set(state => void (state.stackPastSongs = [...state.stackPastSongs]))
      }

      return nextSong
    },
    getLastElement: stackPastSongs => {
      if (stackPastSongs.length < 2) return false

      const getLastTrack = stackPastSongs[0]

      const currentTrack = stackPastSongs[1]

      if (currentTrack) {
        set(state => void (state.queue = [currentTrack, ...state.queue!]))
      } else {
        set(state => void (state.queue = [...state.queue]))
      }
      set(
        state =>
          void (state.stackPastSongs = [...state.stackPastSongs.slice(2)]),
      )
      return getLastTrack
    },
  })),
)
