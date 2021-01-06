import React from 'react'
import { start } from 'repl'
import 'twin.macro'
import { ProgressBarProps } from '../components/ProgressBar'
import { widthPointerElement } from '../components/ProgressBarPointer'

export interface ReturnValueUseProgressBarProps {
  handleClickProgressBar: () => void
  handleDragEnd: () => void
  handleDragStart: () => void
  handleHoverProgressBar: () => void
  handleMouseDownProgressBar: () => void
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
  const progressBarRef = React.useRef<HTMLButtonElement>(null)
  const isDragging = React.useRef(false)

  const startProgressBar = progressBarRef.current?.getBoundingClientRect().left

  const _handlePositionChange = (eventXValue: number) => {
    if (startProgressBar === undefined) return
    const newXValue = eventXValue - startProgressBar

    const newDisplayPosition = getNewDisplayPositionPointer(newXValue)
    const newMsPosition = getPositionMs(newDisplayPosition)
    setPlaybackProgress(newMsPosition / totalMs)

    handleChange(newMsPosition)
  }

  const handleClickProgressBar = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (isDragging.current) return
    intervallRef.current && clearInterval(intervallRef.current)
    _handlePositionChange(event.pageX)
  }

  const handleMouseDownProgressBar = () => {}

  const handleHoverProgressBar = () => {
    setIsHoveringProgressBar(true)
  }

  const handleMouseLeave = () => {
    if (isDragging.current) return
    setIsHoveringProgressBar(false)
  }

  const handleDragStart = () => {
    isDragging.current = true
    intervallRef.current && clearInterval(intervallRef.current)
  }

  const handleDragEnd = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setIsHoveringProgressBar(false)
    setTimeout(() => {
      isDragging.current = false
    }, 0)

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
    if (!play && intervallRef.current) {
      clearInterval(intervallRef.current)
    } else {
      startIntervall()
    }
  }, [play])

  // React.useEffect(() => {
  //   intervallRef.current && clearInterval(intervallRef.current)
  // }, [playbackProgress])

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

  const startIntervall = () => {
    intervallRef.current = setInterval(() => {
      console.log('hier')

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
    handleMouseDownProgressBar,
    handleMouseLeave,
    getCurrentPositionPointer,
    getWidthProgressBar,
    playbackProgress,
    pointerRef,
    progressBarRef,
    isHoveringProgressBar,
    positionPointer,
  }
}
