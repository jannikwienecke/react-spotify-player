import create from 'zustand'
import { immerMiddleware } from '../utils'

export type PlaylistStore = {
  alert: string
  setAlert: (alert: string) => void
  removeAlert: () => void
}

export const useAlertStore = create<PlaylistStore>(
  immerMiddleware(set => ({
    alert: '',
    setAlert: alert => {
      set(state => void (state.alert = ''))
      set(state => void (state.alert = alert))
    },
    removeAlert: () => set(state => void (state.alert = '')),
  })),
)
