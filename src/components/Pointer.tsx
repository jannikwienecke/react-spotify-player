import React from 'react'
import Draggable from 'react-draggable'
import { ReturnValueUseProgressBarProps } from '../hooks/useProgressBar'
import { PointerElement } from './ProgressBarPointer'

export const Pointer: React.FC<ReturnValueUseProgressBarProps> = props => {
  return (
    <Draggable
      axis="x"
      handle=".handle"
      bounds={{ left: 0, right: props.getWidthProgressBar() }}
      position={{ x: props.positionPointer, y: 0 }}
      onStart={props.handleDragStart}
      onStop={props.handleDragEnd}
    >
      <div className="handle" ref={props.pointerRef}>
        <PointerElement hover={props.isHoveringProgressBar} />
      </div>
    </Draggable>
  )
}
