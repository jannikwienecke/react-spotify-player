import create from 'zustand'
import { immerMiddleware } from '../utils'

export type TokenStore = {
  token: string
  tokenIsInvalid: boolean
  setToken: (token: string) => void
  setTokenIsInvalid: () => void
}

export const useSpotifyToken = create<TokenStore>(
  immerMiddleware(set => ({
    token: '',
    tokenIsInvalid: false,
    setToken: token => set(state => void (state.token = token)),
    setTokenIsInvalid: () => set(state => void (state.tokenIsInvalid = true)),
  })),
)
