import React from 'react'
import playlist from '../public/playlist.svg'

export const PlaylistButton = () => {
  return (
    <div tw="h-1/3 flex items-start">
      <button tw="focus:outline-none">
        <img alt="heart" src={playlist} />
      </button>
    </div>
  )
}
