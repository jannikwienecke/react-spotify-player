import React from 'react'
import 'twin.macro'

export interface PropsSongImagePlayer {
  image: SpotifyApi.ImageObject | undefined
}

export const SongImagePlayer: React.FC<PropsSongImagePlayer> = React.memo(
  ({ image }) => {
    return (
      <div tw="w-28 h-3/4 flex justify-center">
        <img src={image?.url} alt="player song" tw="h-full " />
      </div>
    )
  },
)
