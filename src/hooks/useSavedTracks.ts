import React from 'react'
import { useSpotify } from './useSpotify'
import { usePrevious } from '@bit/jannikwienecke.personal.use-previous'

export const useSavedTracks = (songIds: string[]) => {
  const url = 'me/tracks/contains?ids=' + songIds.join(',')

  const { data, error, refetch, ...result } = useSpotify<null>({
    url,
    enabled: false,
    refetchInterval: false,
  })

  const prevSongIds = usePrevious(songIds)
  React.useEffect(() => {
    const isEqual =
      prevSongIds?.map(id => id).join('') === songIds.map(id => id).join('')
    if (songIds.length === 0) return
    if (isEqual) return
    if (songIds[0] === '') return

    refetch()
  }, [songIds])

  React.useEffect(() => {
    if (error) console.error('ERROR useSavedTracks: ', error)
  }, [error])

  return { data, error, ...result, refetch }
}
