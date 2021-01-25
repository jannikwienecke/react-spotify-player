import React from 'react'
import { Media } from './useSlider'

export interface PropsStateRef {
  playRef: React.MutableRefObject<boolean>
  mediaRef: React.MutableRefObject<{ mediaId: string; totalMs: number }>
  currentMsRef: React.MutableRefObject<number>
}

export interface PropsUseStateRef {
  isPlaying: boolean
  currentMsSong: number
  media: Media
}

export const useStateRef = ({
  isPlaying,
  currentMsSong,
  media,
}: PropsUseStateRef): PropsStateRef => {
  const playRef = React.useRef(isPlaying)
  const currentMsRef = React.useRef(currentMsSong)
  const mediaRef = React.useRef({
    mediaId: media.mediaId,
    totalMs: media.totalMs,
  })

  // HANDLE CHANGES TO CURRENT SONG
  // CURRENT SONG COMES FROM SPOTIFY with ms 1000
  // STATE UPDATES for example two seconds later
  // add this two seconds to the ms that came from spotify => 3000ms final
  // time at state update
  const intervalRef = React.useRef<number>()
  const startIntervall = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = 0
    currentMsRef.current += 130
    intervalRef.current = window.setInterval(() => {
      currentMsRef.current += 100
    }, 100)
  }
  React.useEffect(() => {
    if (isPlaying) {
      startIntervall()
    } else {
      intervalRef.current && clearInterval(intervalRef.current)
      intervalRef.current = 0
    }

    currentMsRef.current = currentMsSong
  }, [currentMsSong, isPlaying])

  React.useEffect(() => {
    mediaRef.current = {
      mediaId: media.mediaId,
      totalMs: media.totalMs,
    }
  }, [media.mediaId, media.totalMs])

  React.useEffect(() => {
    playRef.current = isPlaying || false
  }, [isPlaying])

  return { playRef, mediaRef, currentMsRef }
}
