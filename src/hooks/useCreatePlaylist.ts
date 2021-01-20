import { useSpotifyMutation } from './useSpotify'
import React from 'react'
import { useMe } from './useMe'
import { usePlaylist } from './usePlaylist'
import { useValidMutation } from './useValidMutation'
import { usePlay } from './usePlay'

export interface PropsNewPlaylist {
  name: string
  public?: boolean
  collaborative?: boolean
  description?: string
}

export const useCreatePlaylist = () => {
  const { me } = useMe()
  const { getPlaylist, data: playlist } = usePlaylist()
  const { play } = usePlay()
  const [urlCreatePlaylist, setUrlCreatePlaylist] = React.useState('')
  const [urlAddSongsPlaylist, setUrlAddSongsPlaylist] = React.useState('')

  const {
    mutate: createPlaylist,
    data: responseCreatePlaylist,
  } = useSpotifyMutation<SpotifyApi.PlaylistObjectFull>({
    url: urlCreatePlaylist,
    method: 'POST',
  })

  const {
    mutate: addItemsToPlaylist,
    data: responseAddItems,
    status: statusAddItems,
  } = useSpotifyMutation<SpotifyApi.PlaylistObjectFull>({
    url: urlAddSongsPlaylist,
    method: 'POST',
  })

  useValidMutation(statusAddItems, () => {
    if (!responseCreatePlaylist) return
    getPlaylist(responseCreatePlaylist.id)
  })

  const urisRef = React.useRef<string[] | undefined>()
  const createNewPlaylist = (options: PropsNewPlaylist, uris: string[]) => {
    urisRef.current = uris
    console.log('urlCreatePlaylist', urlCreatePlaylist)
    console.log('create playlist', options)

    createPlaylist(options)
  }

  React.useEffect(() => {
    if (!urlAddSongsPlaylist) return
    if (!urisRef.current) return
    addItemsToPlaylist({ uris: urisRef.current })
    urisRef.current = undefined
  }, [urlAddSongsPlaylist])

  React.useEffect(() => {
    if (!me) return
    setUrlCreatePlaylist(`users/${me.id}/playlists`)
  }, [me])

  React.useEffect(() => {
    setUrlAddSongsPlaylist(`playlists/${responseCreatePlaylist?.id}/tracks`)
  }, [responseCreatePlaylist?.id])

  React.useEffect(() => {
    console.log('responseAddItems', responseAddItems)
  }, [responseAddItems])

  React.useEffect(() => {
    console.log('playlist: ', playlist)
    if (playlist) {
      console.log('play', playlist.uri)

      play([playlist.uri])
    }
  }, [playlist])

  return { createNewPlaylist }
}
