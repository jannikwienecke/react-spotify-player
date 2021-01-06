import React from 'react'
import 'twin.macro'
import { widthPointerElement } from '../components/ProgressBarPointer'
import { ProgressBarProps } from '../types'

export interface ReturnValueUseProgressBarProps {
  handleClickProgressBar: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void
  handleDragEnd: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  handleHoverProgressBar: () => void
  handleDragStart: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  handleDragging: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  handleMouseLeave: () => void
  getCurrentPositionPointer: () => void
  getWidthProgressBar: () => number
  pointerRef: React.RefObject<HTMLDivElement>
  progressBarRef: React.RefObject<HTMLDivElement>
  isHoveringProgressBar: boolean
  playbackProgress: number
  positionPointer: number
}

export const useProgressBar = ({
  handleChange,
  play,
  currentMs,
  mediaId,
  totalMs,
}: ProgressBarProps) => {
  const [positionPointer, setPositionPointer] = React.useState(0)
  const [isHoveringProgressBar, setIsHoveringProgressBar] = React.useState(
    false,
  )
  const [playbackProgress, setPlaybackProgress] = React.useState(
    currentMs / totalMs,
  )

  const pointerRef = React.useRef<HTMLDivElement>(null)
  const intervallRef = React.useRef<NodeJS.Timer | undefined>()
  const progressBarRef = React.useRef<HTMLDivElement>(null)
  const isDragging = React.useRef(false)

  const startProgressBar = progressBarRef.current?.getBoundingClientRect().left

  const _handlePositionChange = (eventXValue: number) => {
    if (startProgressBar === undefined) return
    const newXValue = eventXValue - startProgressBar

    const newDisplayPosition = getNewDisplayPositionPointer(newXValue)
    const newMsPosition = getPositionMs(newDisplayPosition)
    setPlaybackProgress(newMsPosition / totalMs)
    clearAllIntervalls()

    // RUN USER FUNCTION
    handleChange(newMsPosition)
  }

  const handleClickProgressBar = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (isDragging.current) return
    clearAllIntervalls()
    _handlePositionChange(event.pageX)
  }

  const handleHoverProgressBar = () => {
    setIsHoveringProgressBar(true)
  }

  const handleMouseLeave = () => {
    if (isDragging.current) return
    setIsHoveringProgressBar(false)
  }

  const handleDragStart = () => {
    isDragging.current = true

    clearAllIntervalls()
  }

  const handleDragging = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const eventXValue = event.pageX

    isDragging.current = true
    clearAllIntervalls()

    if (startProgressBar === undefined) return

    const newXValue = eventXValue - startProgressBar

    const newDisplayPosition = getNewDisplayPositionPointer(newXValue)
    const newMsPosition = getPositionMs(newDisplayPosition)

    // WHEN DRAGGING ONLY UPDATE THE POINTER
    // OTHERWISE POINTER JUMPS BACk AND FORTH
    setPositionPointer((newMsPosition / totalMs) * getWidthProgressBar())
  }

  const handleDragEnd = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setIsHoveringProgressBar(false)
    isDragging.current = false

    _handlePositionChange(event.pageX)
  }

  React.useEffect(() => {
    if (playbackProgress) {
      setPositionPointer(playbackProgress * getWidthProgressBar())
    }
  }, [playbackProgress])

  React.useEffect(() => {
    startIntervall()
  }, [])

  React.useEffect(() => {
    currentMs && startIntervall()
  }, [currentMs])

  React.useEffect(() => {
    setPlaybackProgress(0)
    clearAllIntervalls()
    startIntervall()
  }, [mediaId])

  React.useEffect(() => {
    if (!play) {
      clearAllIntervalls()
    } else {
      startIntervall()
    }
  }, [play])

  const getWidthProgressBar = () => {
    if (!progressBarRef.current) return 0
    return progressBarRef.current.getBoundingClientRect().width
  }

  const getCurrentPositionPointer = () => {
    if (!pointerRef.current) return 0
    return pointerRef.current?.getBoundingClientRect().x
  }

  const getPositionMs = (positionDisplay: number) => {
    const widthProgressBar = getWidthProgressBar()

    const relativDisplayPosition = positionDisplay / widthProgressBar
    const positionMs = totalMs * relativDisplayPosition

    return positionMs
  }

  const getNewDisplayPositionPointer = (eventXValue: number) => {
    return eventXValue - widthPointerElement / 2
  }

  const clearAllIntervalls = () => {
    for (var i = 1; i < 999; i++) clearInterval(i)
  }

  const startIntervall = () => {
    if (!play) return

    intervallRef.current = setInterval(() => {
      setPlaybackProgress((position: number) => {
        return position + 1 / totalMs
      })
    }, 100)
  }

  return {
    handleClickProgressBar,
    handleDragEnd,
    handleDragStart,
    handleHoverProgressBar,
    handleMouseLeave,
    getCurrentPositionPointer,
    getWidthProgressBar,
    playbackProgress,
    pointerRef,
    progressBarRef,
    isHoveringProgressBar,
    positionPointer,
    handleDragging,
  }
}
