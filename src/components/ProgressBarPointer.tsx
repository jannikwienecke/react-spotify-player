import React from 'react'
import tw, { css } from 'twin.macro'

export const widthPointerElement = 15
export interface PointerElementProps {
  hover: boolean
}

export type Ref = HTMLDivElement

export const PointerElement: React.FC<PointerElementProps> = ({ hover }) => {
  const ProgresHoverStyles = css`
    ${tw`text-black`}
    width: ${widthPointerElement}px;
    height: 15px;
    background-color: lightgrey;
    position: absolute;
    border-radius: 10px;
    top: -5px;
    left: -3.75px;
    position: absolute;
  `

  return <div css={[hover && ProgresHoverStyles]}></div>
}
