import React from 'react'
import { useSpotifySongInfoHeart } from '../hooks/useSpotifySongInfoHeart'
import heartLogoGreen from '../public/heart-green.svg'
import heartLogoRed from '../public/heart-red.svg'
import heartLogo from '../public/heart.svg'
import 'twin.macro'

export const SpotifySongInfoHeart = ({ songId }: { songId: string }) => {
  const {
    handleClickHeart,
    setHover,
    hover,
    songIsSaved,
  } = useSpotifySongInfoHeart(songId)
  return (
    <div tw="h-1/3 flex items-end">
      <button
        tw="focus:outline-none"
        onClick={handleClickHeart}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img
          alt="heart"
          tw="w-full"
          src={hover ? heartLogoGreen : songIsSaved ? heartLogoRed : heartLogo}
        />
      </button>
    </div>
  )
}
