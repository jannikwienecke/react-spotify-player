export interface useProgressBarProps {
  startMs: number
}

export interface PropsStyleSliderProgress {
  backgroundColor?: string
  backgroundColorOnHover?: string
}

export interface PropsStylesSlider {
  height?: string
  width?: string
  backgroundColor?: string
  margin?: string
}

export interface PropsStylesPointer {
  width?: string
  height?: string
  backgroundColor?: string
  borderRadius?: string
  top?: string
  left?: string
}
export interface ProgressBarProps {
  handleChange: (newMs: number) => void
  play: boolean
  currentMs: number
  totalMs: number
  mediaId: number

  stylesSlider?: PropsStylesSlider
  stylesSliderProgress?: PropsStyleSliderProgress
  stylesPointer?: PropsStylesPointer
}

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
