import React from 'react'
import Draggable from 'react-draggable'
import { PropsStylesPointer, ReturnValueUseProgressBarProps } from '../types'
import { PointerElement } from './ProgressBarPointer'

export const Pointer: React.FC<{
  pB: ReturnValueUseProgressBarProps
  stylesPointer?: PropsStylesPointer
}> = ({ pB, stylesPointer }) => {
  return (
    <Draggable
      axis="x"
      handle=".handle"
      bounds={{ left: 0, right: pB.getWidthProgressBar() }}
      position={{ x: pB.positionPointer, y: 0 }}
      onStart={pB.handleDragStart}
      onStop={pB.handleDragEnd}
      onDrag={pB.handleDragging}
    >
      <div className="handle" ref={pB.pointerRef}>
        <PointerElement
          stylesPointer={stylesPointer}
          hover={pB.isHoveringProgressBar}
        />
      </div>
    </Draggable>
  )
}
