import { usePrevious } from '@bit/jannikwienecke.personal.use-previous'
import React from 'react'
// import { usePlaylistStore } from './usePlaylistStore'
// import { useUnfollowPlaylist } from './useRemovePlaylist'

export const usePlaylist = () => {
  // const { playlist } = usePlaylistStore()
  // const { unfollowPlaylist } = useUnfollowPlaylist()
  // const previousPlaylistId = usePrevious(playlist?.id)
  // React.useEffect(() => {
  //   if (!playlist?.id) return
  //   if (previousPlaylistId && previousPlaylistId !== playlist.id) {
  //     console.log('unfollow playlist', previousPlaylistId)
  //     unfollowPlaylist(previousPlaylistId)
  //   }
  // }, [playlist?.id])
  // React.useEffect(() => {
  //   return () => {
  //     if (!playlist) return
  //     console.log('unfollow', playlist)
  //   }
  // }, [])
}
