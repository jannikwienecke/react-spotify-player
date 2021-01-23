import React from 'react'
import create from 'zustand'
import { immerMiddleware } from '../utils'

type PlaylistType = SpotifyApi.PlaylistObjectFull | undefined

export type PlaylistStore = {
  playlist: PlaylistType
  setPlaylist: (playlist: PlaylistType) => void
  removePlaylist: () => void
}

export const usePlaylistStore = create<PlaylistStore>(
  immerMiddleware(set => ({
    playlist: undefined,
    setPlaylist: playlist => set(state => void (state.playlist = playlist)),
    removePlaylist: () => set(state => void (state.playlist = undefined)),
  })),
)
