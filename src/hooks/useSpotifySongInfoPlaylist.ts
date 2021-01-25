import {
  ListItem,
  useListBox,
} from '@bit/jannikwienecke.personal.react-listbox'
import React from 'react'
import { usePlayerStore } from '../hooks/usePlayerStore'
import { getArtistsString, getTrackString } from '../utils'
import { usePlayFromContext } from './usePlayFromContext'
import { usePreviousPlayedTracks } from './usePreviousPlayedTracks'
import { useQueueStore } from './useQueueStore'

export const useSpotifySongInfoPlaylist = () => {
  const defaultItem: ListItem = { name: 'HI', id: '123', isActive: true }
  const { track } = usePlayerStore()
  const { queue } = useQueueStore()
  const { playFromContext } = usePlayFromContext()
  const { data: previousPlayedTracks } = usePreviousPlayedTracks()
  const [listItems, setListItems] = React.useState<ListItem[]>([defaultItem])

  const _getListItems = (
    tracksFull: SpotifyApi.TrackObjectFull[],
  ): ListItem[] => {
    const isActive = (
      trackComp: SpotifyApi.TrackObjectFull | undefined | null,
    ) => {
      if (!trackComp) return false

      if (trackComp.id === track?.item?.id) {
        return true
      }

      return false
    }

    return tracksFull.map(track_ => {
      const imageSrc = track_?.album.images.find(image => image.url)?.url || ''
      const item = {
        name: getTrackString(track_?.name),
        subName: getArtistsString(track_?.artists),
        id: track_?.id || '0',
        isActive: isActive(track_),
        imageSrc: imageSrc || '',
      }
      return item
    })
  }

  React.useEffect(() => {
    setListItems(_getListItems([...(previousPlayedTracks || []), ...queue]))
  }, [queue, previousPlayedTracks, track])

  const playTrackFromPlaylist = (activeItem: ListItem) => {
    if (track?.item && track?.item.id === activeItem.id) {
      playFromContext(track.item)
    } else if (queue) {
      let newTrack = queue.find(track => track.id === activeItem.id)
      if (newTrack) playFromContext(newTrack)
    } else if (previousPlayedTracks) {
      let newTrack = previousPlayedTracks.find(
        track => track.id === activeItem.id,
      )
      if (newTrack) playFromContext(newTrack)
    }
  }

  const { value, handleChange } = useListBox({
    listItems,
    onChange: playTrackFromPlaylist,
  })

  return { value, listItems, handleChange }
}
