import React from 'react'
import 'twin.macro'
import { usePlayerStore } from '../hooks/usePlayerStore'
import { SongImagePlayer } from './SongImagePlayer'
import { SpotifySongInfoHeart } from './SpotifySongInfoHeart'
import { SpotifySongInfoPlaylist } from './SpotifySongInfoPlaylist'
import { SpotifySongInfoRadio } from './SpotifySongInfoRadio'

const SpotifySongInfo = () => {
  const { track, nextTrack } = usePlayerStore()
  const [trackToDisplay, setTrackToDisplay] = React.useState<
    SpotifyApi.TrackObjectFull | undefined
  >(undefined)

  React.useEffect(() => {}, [trackToDisplay])

  React.useEffect(() => {
    if (nextTrack?.id) {
      setTrackToDisplay(nextTrack)
    }
  }, [nextTrack?.id])

  React.useEffect(() => {
    if (track?.item?.id) setTrackToDisplay(track?.item)
  }, [track?.item?.id])

  const songId = trackToDisplay?.id || ''
  const songName = trackToDisplay?.name?.split('(feat')[0]
  return (
    <div tw="flex  w-full h-full ml-6">
      {songId && (
        <>
          <div tw="flex justify-items-center  items-center">
            <SongImagePlayer
              image={trackToDisplay?.album.images.find(image => image.url)}
            />
          </div>
          <div tw="flex w-full h-full">
            <div tw=" flex flex-col justify-center">
              <div tw="">{songName}</div>
              <div>
                {trackToDisplay?.artists.map(artist => artist.name).join(', ')}
              </div>
            </div>
            <div tw=" flex flex-col justify-center w-6 ml-4 ">
              <SpotifySongInfoHeart songId={songId} />
              <SpotifySongInfoRadio songId={songId} songName={songName || ''} />
              <SpotifySongInfoPlaylist />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default SpotifySongInfo
