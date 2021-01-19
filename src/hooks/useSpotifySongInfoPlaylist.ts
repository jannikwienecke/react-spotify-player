import {
  ListItem,
  useListBox,
} from '@bit/jannikwienecke.personal.react-listbox'
import React from 'react'
import { useFullTracks } from '../hooks/useFullTrack'
import { usePlayerStore } from '../hooks/usePlayerStore'
import { useQueueStore } from '../hooks/useQueueStore'

import { getArtistsString, getTrackString } from '../utils'
import { usePlayFromQueue } from './usePlayFromQueue'
import { usePlayFromStack } from './usePlayFromStack'

export const useSpotifySongInfoPlaylist = () => {
  const defaultItem: ListItem = { name: 'HI', id: '123', isActive: true }

  const { queue, stackPastSongs } = useQueueStore()
  const { track } = usePlayerStore()
  const {
    tracksFull: tracksFullPast,
    getFullTracks: getFullTracksPast,
  } = useFullTracks()
  const { tracksFull, getFullTracks } = useFullTracks()
  const { playFromQueue } = usePlayFromQueue()
  const { playFromStack } = usePlayFromStack()

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

  const { value, handleChange } = useListBox({
    listItems,
    onChange: (activeItem: ListItem) => {
      if (track?.item && track?.item.id === activeItem.id) {
        playFromQueue(track.item)
      } else if (tracksFullPast && tracksFull) {
        let trackFullActiveItem = tracksFull?.find(
          track => track.id === activeItem.id,
        )
        if (trackFullActiveItem) playFromQueue(trackFullActiveItem)

        trackFullActiveItem = tracksFullPast?.find(
          track => track.id === activeItem.id,
        )
        if (trackFullActiveItem) playFromStack(trackFullActiveItem)
      }
    },
  })

  React.useEffect(() => {
    if (!track?.item) return

    const trackFullPast_ =
      !tracksFullPast || tracksFullPast.length === 0 ? [] : tracksFullPast
    const trackFullQueue_ =
      !tracksFull || tracksFull.length === 0 ? [] : tracksFull

    setListItems(
      _getListItems([...trackFullPast_, track.item, ...trackFullQueue_]),
    )
  }, [track?.item?.id, tracksFull, tracksFullPast])

  React.useEffect(() => {
    if (!queue) return

    getFullTracks(queue, tracksFull)
  }, [queue])

  React.useEffect(() => {
    if (!stackPastSongs) return

    getFullTracksPast([...stackPastSongs].reverse(), tracksFullPast)
  }, [stackPastSongs])

  return { value, listItems, handleChange }
}
