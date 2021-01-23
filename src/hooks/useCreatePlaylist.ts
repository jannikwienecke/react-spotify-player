import { useSpotifyMutation } from './useSpotify'
import React from 'react'
import { useMe } from './useMe'
import { useGetPlaylist } from './useGetPlaylist'
import { useValidMutation } from './useValidMutation'
import { usePlay } from './usePlay'
import { usePlaylistStore } from './usePlaylistStore'
import { useUnfollowPlaylist } from './useRemovePlaylist'

export interface PropsNewPlaylist {
  name: string
  public?: boolean
  collaborative?: boolean
  description?: string
}

export const useCreatePlaylist = () => {
  const { me } = useMe()
  const { getPlaylist, data: playlist } = useGetPlaylist()
  const { unfollowPlaylist } = useUnfollowPlaylist()
  const { setPlaylist } = usePlaylistStore()
  const { playPlaylist } = usePlay()
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
    if (!responseCreatePlaylist?.id) return
    setUrlAddSongsPlaylist(`playlists/${responseCreatePlaylist?.id}/tracks`)
  }, [responseCreatePlaylist?.id])

  React.useEffect(() => {
    if (playlist?.id) {
      setPlaylist(playlist)
      unfollowPlaylist(playlist.id)
      playPlaylist(playlist.uri)
    }
  }, [playlist?.id])

  return { createNewPlaylist }
}
