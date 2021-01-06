import React from 'react'
import { PropsStylesPointer } from '../types'

export let widthPointerElement = 15
export interface PointerElementProps {
  hover: boolean
  stylesPointer?: PropsStylesPointer
}

export type Ref = HTMLDivElement

export const PointerElement: React.FC<PointerElementProps> = ({
  hover,
  stylesPointer,
}) => {
  const defaultStyles = {
    width: `${widthPointerElement}px`,
    height: '15px',
    backgroundColor: 'lightgrey',
    position: 'absolute',
    borderRadius: '10px',
    top: '-3.5px',
    left: '-1.75px',
  }

  const styles = hover
    ? {
        ...defaultStyles,
        ...stylesPointer,
      }
    : {}

  return <div className="slider-pointer" style={styles}></div>
}
