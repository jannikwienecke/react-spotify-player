import create from 'zustand'
import { immerMiddleware } from '../utils'

export type Queue = {
  stackPastSongs: SpotifyApi.TrackObjectSimplified[]
  queue: SpotifyApi.TrackObjectSimplified[]
  addToQueue: (track: SpotifyApi.TrackObjectSimplified) => void
  addManyToQueue: (tracks: SpotifyApi.TrackObjectSimplified[]) => void
  setNewQueue: (tracks: SpotifyApi.TrackObjectSimplified[]) => void
  getNextElement: (
    queue: SpotifyApi.TrackObjectSimplified[],
    track: SpotifyApi.TrackObjectSimplified | undefined | null,
  ) => SpotifyApi.TrackObjectSimplified | false
  getLastElement: (
    stackPastSongs: SpotifyApi.TrackObjectSimplified[],
  ) => SpotifyApi.TrackObjectSimplified
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

    getNextElement: (queue, track) => {
      console.log('queue: ', queue)
      if (queue.length === 0) return false

      let nextSong = queue[0]
      let numberRemove = 1
      if (nextSong.id === track?.id) {
        nextSong = queue[1]
        numberRemove = 2
      }

      const currentTrack = track as SpotifyApi.TrackObjectSimplified
      set(state => void (state.queue = [...state.queue.slice(numberRemove)]))

      console.log('currentTrack', currentTrack)
      console.log('nextSong', nextSong)
      if (currentTrack) {
        set(
          state =>
            void (state.stackPastSongs = [
              currentTrack,
              nextSong,
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
