import { SPOTIFY_BASE_URL } from './spotifyConfig'
import { State, StateCreator } from 'zustand'
import produce, { Draft } from 'immer'
interface PropsClient {
  endpoint: string
  token: string
  data?: {} | undefined
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  config?: {} | undefined
}
async function client({
  endpoint,
  token,
  data = undefined,
  method = 'GET',
}: PropsClient) {
  if (!token) {
    console.warn('No Token provided')
    return
  }
  const config = {
    method,
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  return window
    .fetch(`${SPOTIFY_BASE_URL}${endpoint}`, config)
    .then(async response => {
      if (response.status === 401) {
        window.localStorage.setItem('spotifyToken', '')
        window.localStorage.setItem('spotifyRefreshToken', '')
        // window.location.assign('/')
        console.error('The Token is INVALID!')

        return Promise.reject({ message: 'Please re-authenticate.' })
      }

      let data: any

      try {
        data = await response.json()
      } catch (error) {
        Promise.resolve()
      }

      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

function createResource(promise: Promise<any>) {
  let status = 'pending'
  let result = promise.then(
    resolved => {
      status = 'success'
      result = resolved
    },
    rejected => {
      status = 'error'
      result = rejected
    },
  )
  return {
    read() {
      console.log('reading...')
      console.log('status', status)
      console.log('result', result)
      if (status === 'pending') throw result
      if (status === 'error') throw result
      if (status === 'success') return result
      throw new Error('This should be impossible')
    },
  }
}

function preloadImage(src: string) {
  return new Promise(resolve => {
    const img = document.createElement('img')
    img.src = src
    img.onload = () => resolve(src)
  })
}

export const immerMiddleware = <T extends State>(
  config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>,
): StateCreator<T> => (set, get, api) =>
  config(fn => set(produce(fn) as (state: T) => T), get, api)

export { createResource, preloadImage }
export { client }
