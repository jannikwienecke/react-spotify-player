import React from 'react'
import { ProgressBarProps, StateSliderProps } from '../types'
import { usePrevious } from './usePrevious'
// import { usePrevious } from "./usePrevious";

export let widthPointerElement = 15

export const useProgressBar = ({
  handleChange,
  handleDragStart: tellUserDragStart,
  onEnd,
  state,
}: ProgressBarProps) => {
  const [positionPointer, setPositionPointer] = React.useState(0)
  const [isHoveringProgressBar, setIsHoveringProgressBar] = React.useState(
    false,
  )

  const {
    isPlaying: play,
    totalMsSong: totalMs,
    currentMsSong: currentMs,
  } = state

  const [playbackProgress, setPlaybackProgress] = React.useState(
    currentMs / totalMs,
  )

  const pointerRef = React.useRef<HTMLDivElement>(null)
  const intervallRef = React.useRef<number | undefined>()
  const progressBarRef = React.useRef<HTMLDivElement>(null)
  const isDragging = React.useRef(false)
  const startProgressBar = progressBarRef.current?.getBoundingClientRect().left

  // ====== FUNCTION THAT IS CALLED WHENEVER THE
  // ====== USER MANUALLY CHANGES THE POSITION OF POINTER
  // ====== e.g DRAGGING OR CLICkING
  const _handlePositionChange = (eventXValue: number) => {
    if (startProgressBar === undefined) return

    const newXValue = eventXValue - startProgressBar

    const newDisplayPosition = getNewDisplayPositionPointer(newXValue)
    const newMsPosition = getPositionMs(newDisplayPosition)

    setPlaybackProgress(newMsPosition / totalMs)

    clearAllIntervalls()

    if (!handleChange) {
      console.warn('Please Provide a handleChange Function')
      return
    }

    // RUN USER FUNCTION
    handleChange(newMsPosition)
  }

  // ==== HANDLE MOUSE CLICk AND HOVER =========
  const handleClickProgressBar = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (isDragging.current) return
    _handlePositionChange(event.pageX)
  }

  const handleHoverProgressBar = () => {
    setIsHoveringProgressBar(true)
  }

  const handleMouseLeave = () => {
    if (isDragging.current) return
    setIsHoveringProgressBar(false)
  }
  // =====================

  // ========== DRAGGING HANDLER =============
  const handleDragStart = () => {
    isDragging.current = true
    tellUserDragStart()
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

  const handleDragEnd = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    _handlePositionChange(event.pageX)
    startIntervall()
    setIsHoveringProgressBar(false)
    setTimeout(() => {
      isDragging.current = false
    }, 0)
  }
  // =================END DRAGGING HANDLER==========================

  // ========HANDLE END - PROGRESS === 100% =======
  React.useEffect(() => {
    if (playbackProgress) {
      if (playbackProgress.toFixed(2) === '1.00') {
        clearAllIntervalls()
        // USER FUNCTION
        onEnd()
      } else setPositionPointer(playbackProgress * getWidthProgressBar())
    }
  }, [playbackProgress, onEnd])
  // ===================END HANDLE END==========

  // ======= HELPER FUNCTIONS============
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
  // ================END HELPER FUNCTIONS ======================

  // ========== START INTERVAL FOR SETTING THE POSITION ======
  // ========== OF THE POINTER AND PROGRESS ==================
  const startIntervall = React.useCallback(() => {
    if (!play) return

    clearInterval(intervallRef.current)

    intervallRef.current = window.setInterval(() => {
      setPlaybackProgress((position: number) => {
        const currentMsValue = position * totalMs
        const newProcent = (currentMsValue + 50) / totalMs

        return newProcent
      })
    }, 50)
  }, [totalMs, play])
  //===================END INTEVALL===========================

  //============ CLEAR INTERVALL ==========
  const clearAllIntervalls = () => {
    if (!intervallRef.current) return
    clearInterval(intervallRef.current)
  }
  // ==========================

  const prevState = usePrevious<StateSliderProps>(state)
  React.useEffect(() => {
    console.log('----------------------')

    console.log(`EVALUATE STATE: `, state)

    window.clearInterval(intervallRef.current)

    // console.log("currentMsSong=", state.currentMsSong);
    // console.log("prevMsSong=", prevState?.currentMsSong);
    if (state.currentMsSong !== prevState?.currentMsSong) {
      setPlaybackProgress(state.currentMsSong / state.totalMsSong)
    }

    if (state.isPlaying) startIntervall()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return {
    handleClickProgressBar,
    handleDragStart,
    handleDragEnd,
    handleDragging,
    handleHoverProgressBar,
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
