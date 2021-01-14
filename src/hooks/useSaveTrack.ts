import { useSpotifyMutation } from './useSpotify'
import React from 'react'

// interface UsePlayInterface {}
export const useSaveTrack = () => {
  const [url, setUrl] = React.useState('')
  const [method, setMethod] = React.useState<'PUT' | 'DELETE'>('PUT')

  const { mutate, error, ...result } = useSpotifyMutation<null>({
    url,
    method: method,
  })

  const saveTracks = (ids: string[], newMethod: 'PUT' | 'DELETE' = 'PUT') => {
    const baseUrl = 'me/tracks?ids='
    const newUrl = baseUrl + ids.join(',')

    const sameUrl = newUrl === url
    const sameMethod = newMethod === method

    if (sameMethod && sameUrl) {
      mutate({})
    } else {
      if (!sameUrl) setUrl(newUrl)
      if (!sameMethod) setMethod(newMethod)
    }
  }

  React.useEffect(() => {
    if (!url) return
    mutate({})
  }, [url, method])

  React.useEffect(() => {
    if (error) console.error('ERROR saveTracks: ', error)
  }, [error])

  return { saveTracks, statusSaveTrack: result.status }
}
