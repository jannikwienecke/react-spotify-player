import create from 'zustand'
import { immerMiddleware } from '../utils'

export type TokenStore = {
  token: string
  setToken: (token: string) => void
}

export const useSpotifyToken = create<TokenStore>(
  immerMiddleware(set => ({
    token: '',
    setToken: token => set(state => void (state.token = token)),
  })),
)
