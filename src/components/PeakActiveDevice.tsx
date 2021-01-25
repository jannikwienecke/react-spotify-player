import React from 'react'

import 'twin.macro'

export type Ref = React.RefObject<HTMLDivElement>

export const PeakActiveDevice = ({
  rectPosition,
}: {
  rectPosition: DOMRect | undefined
}) => {
  return (
    <div tw="flex justify-center">
      <div
        className="rotate"
        style={{ ...rectPosition }}
        tw="absolute text-center  bg-spotifyGreen h-5 w-5 top-20 transform rotate-45"
      />
    </div>
  )
}
