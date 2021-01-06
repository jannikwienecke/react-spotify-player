import React from 'react'
import tw, { css } from 'twin.macro'

interface ProgressBarSiderContainerProps {
  hover: boolean
  progress: number
}

/**
 *
 * This Component displays the progress of the song when hovering on the Progress bar
 * Progress is the value of the current milliseconds of the song / total milliseconds of the song
 */
export const ProgressBarSiderContainer: React.FC<ProgressBarSiderContainerProps> = ({
  hover,
  children,
  progress,
}) => {
  const ProgressStyles = css`
    width: ${progress * 100}%;
  `

  return (
    <div
      css={[
        tw`relative h-full bg-blue-500 `,
        ProgressStyles,
        hover && tw`bg-green-400`,
      ]}
    >
      {children}
    </div>
  )
}
