import { StateSliderProps } from '@bit/jannikwienecke.personal.react-slider/dist/types'
import create from 'zustand'
import { immerMiddleware } from '../utils'

export type actionTypes = 'pause' | 'play' | 'change' | 'songUpdate' | ''
export type Player = {
  isPlaying: boolean
  playerCounter: number
  lastAction: actionTypes
  currentMs: number
  contextUri: string
  setMs: (ms: number) => void
  setAction: (action: actionTypes) => void
  play: () => void
  pause: () => void
  updatePlayer: () => void
  setGetStateFunc: (func: () => StateSliderProps) => void
  getStateFunc: () => StateSliderProps
  track: SpotifyApi.CurrentPlaybackResponse | undefined
  nextTrack: SpotifyApi.TrackObjectFull | undefined
  setTrack: (track: SpotifyApi.CurrentPlaybackResponse | undefined) => void
  setContextUri: (contextUri: string) => void
  setNextTrack: (nextTrack: SpotifyApi.TrackObjectFull | undefined) => void
}

export const usePlayerStore = create<Player>(
  immerMiddleware(set => ({
    lastAction: '',
    isPlaying: false,
    playerCounter: 0,
    track: undefined,
    nextTrack: undefined,
    currentMs: 0,
    getStateFunc: () => {},
    setGetStateFunc: func => set(state => void (state.getStateFunc = func)),
    setMs: ms => set(state => void (state.currentMs = ms)),
    setContextUri: contextUri =>
      set(state => void (state.contextUri = contextUri)),

    setAction: action => set(state => void (state.lastAction = action)),
    setTrack: track => {
      set(state => void (state.track = track))
      set(state => void (state.playerCounter += 1))
    },
    setNextTrack: nextTrack => {
      set(state => void (state.nextTrack = nextTrack))
    },
    play: () => {
      set(state => void (state.isPlaying = true))
    },
    pause: () => {
      set(state => void (state.isPlaying = false))
    },
    updatePlayer: () => set(state => void (state.playerCounter += 1)),
  })),
)
