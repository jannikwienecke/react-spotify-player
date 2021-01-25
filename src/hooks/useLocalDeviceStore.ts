import create from 'zustand'
import { immerMiddleware } from '../utils'

export type Queue = {
  deviceId: string
  deviceIsReady: boolean
  setDeviceId: (deviceId: string) => void
  setDeviceIsReady: () => void
}

export const useLocalDeviceStore = create<Queue>(
  immerMiddleware(set => ({
    deviceId: '',
    deviceIsReady: false,
    setDeviceId: deviceId => set(state => void (state.deviceId = deviceId)),
    setDeviceIsReady: () => set(state => void (state.deviceIsReady = true)),
  })),
)
